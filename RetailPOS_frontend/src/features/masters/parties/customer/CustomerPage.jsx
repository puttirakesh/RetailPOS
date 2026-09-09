import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  RefreshCw,
  Save,
  RotateCcw,
  Edit3,
  Trash2,
  X,
  Users,
  MapPin,
  Eye,
} from "lucide-react";

/* =========================================================
   MOCK MASTER DATA
   ========================================================= */

const STATE_OPTIONS = [
  { code: "PB", name: "Punjab", stateType: 1 },
  { code: "DL", name: "Delhi", stateType: 2 },
  { code: "HR", name: "Haryana", stateType: 2 },
  { code: "UP", name: "Uttar Pradesh", stateType: 2 },
];

const CITY_OPTIONS = [
  { code: "LDH", name: "Ludhiana", stateCode: "PB" },
  { code: "JAL", name: "Jalandhar", stateCode: "PB" },
  { code: "AMR", name: "Amritsar", stateCode: "PB" },
  { code: "NDL", name: "New Delhi", stateCode: "DL" },
  { code: "GGN", name: "Gurugram", stateCode: "HR" },
  { code: "NOI", name: "Noida", stateCode: "UP" },
];

/* =========================================================
   CONFIG
   ========================================================= */

const EMPTY_FORM = {
  customerId: "",
  customerCode: "",
  customerName: "",
  mobile: "",
  email: "",
  stateCode: "",
  stateName: "",
  cityCode: "",
  cityName: "",
  gstNo: "",
  openingBalance: 0,
  discountPercent: 0,
  discountAmount: 0,
  ledgerRequired: true,
  active: true,
};

const INITIAL_CUSTOMERS = [
  {
    customerId: 1,
    customerCode: "CUS0001",
    customerName: "Walk-in Customer",
    mobile: "9999999999",
    email: "",
    stateCode: "PB",
    stateName: "Punjab",
    cityCode: "LDH",
    cityName: "Ludhiana",
    gstNo: "",
    openingBalance: 0,
    discountPercent: 0,
    discountAmount: 0,
    ledgerRequired: false,
    active: true,
  },
  {
    customerId: 2,
    customerCode: "CUS0002",
    customerName: "ABC Retail Store",
    mobile: "9876543210",
    email: "abc@example.com",
    stateCode: "PB",
    stateName: "Punjab",
    cityCode: "JAL",
    cityName: "Jalandhar",
    gstNo: "03ABCDE1234F1Z5",
    openingBalance: 5000,
    discountPercent: 5,
    discountAmount: 0,
    ledgerRequired: true,
    active: true,
  },
  {
    customerId: 3,
    customerCode: "CUS0003",
    customerName: "North India Traders",
    mobile: "9812345678",
    email: "north@example.com",
    stateCode: "DL",
    stateName: "Delhi",
    cityCode: "NDL",
    cityName: "New Delhi",
    gstNo: "07ABCDE1234F1Z1",
    openingBalance: 12500,
    discountPercent: 3,
    discountAmount: 100,
    ledgerRequired: true,
    active: true,
  },
];

const generateCustomerCode = (customers) => {
  const maxId = customers.reduce((max, c) => Math.max(max, Number(c.customerId) || 0), 0);
  return `CUS${String(maxId + 1).padStart(4, "0")}`;
};

/* =========================================================
   LOOKUP MODAL
   ========================================================= */

function CustomerLookup({ type, onSelect, onClose }) {
  const [search, setSearch] = useState("");
  const source = type === "state" ? STATE_OPTIONS : CITY_OPTIONS;

  const filtered = source.filter((item) =>
    `${item.code} ${item.name}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Select {type === "state" ? "State" : "City"}</h3>
          <button onClick={onClose} className="btn btn-ghost btn-sm btn-square">
            <X size={18} />
          </button>
        </div>
        <div className="mt-4">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Search ${type}...`}
              className="input input-bordered w-full pl-10"
            />
          </div>
          <div className="mt-4 max-h-72 overflow-auto">
            {filtered.map((item) => (
              <button
                key={item.code}
                onClick={() => { onSelect(item); onClose(); }}
                className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left hover:bg-base-200"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-xs text-base-content/60">Code: {item.code}</p>
                </div>
                {type === "city" && (
                  <span className="text-xs text-base-content/40">{item.stateCode}</span>
                )}
              </button>
            ))}
            {!filtered.length && (
              <div className="py-8 text-center text-sm text-base-content/50">No records found</div>
            )}
          </div>
        </div>
      </div>
      <div className="modal-backdrop" onClick={onClose} />
    </div>
  );
}

/* =========================================================
   PAGE
   ========================================================= */

export default function CustomerPage() {
  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS);
  const [form, setForm] = useState({
    ...EMPTY_FORM,
    customerCode: generateCustomerCode(INITIAL_CUSTOMERS),
  });
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [lookup, setLookup] = useState(null);
  const [showDetails, setShowDetails] = useState(null);
  const [errors, setErrors] = useState({});

  const filteredCustomers = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return customers;
    return customers.filter((c) =>
      [c.customerCode, c.customerName, c.mobile, c.email, c.cityName, c.stateName, c.gstNo]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [customers, search]);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.customerName.trim()) nextErrors.customerName = "Customer name is required";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      nextErrors.email = "Enter a valid email";
    if (form.mobile && !/^\d{10}$/.test(form.mobile))
      nextErrors.mobile = "Mobile number must contain 10 digits";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const selectedState = STATE_OPTIONS.find((s) => s.code === form.stateCode);
    const selectedCity = CITY_OPTIONS.find((c) => c.code === form.cityCode);

    const record = {
      ...form,
      customerId: editingId ?? Math.max(0, ...customers.map((c) => c.customerId)) + 1,
      stateName: selectedState?.name || "",
      cityName: selectedCity?.name || "",
      openingBalance: Number(form.openingBalance) || 0,
      discountPercent: Number(form.discountPercent) || 0,
      discountAmount: Number(form.discountAmount) || 0,
    };

    if (editingId) {
      setCustomers((prev) => prev.map((c) => (c.customerId === editingId ? record : c)));
    } else {
      setCustomers((prev) => [...prev, record]);
    }
    resetForm();
  };

  const editCustomer = (customer) => {
    setForm({ ...customer });
    setEditingId(customer.customerId);
    setErrors({});
  };

  const deleteCustomer = (customer) => {
    if (customer.customerId === 1) {
      alert("Walk-in Customer cannot be deleted.");
      return;
    }
    if (!window.confirm(`Delete ${customer.customerName}?`)) return;
    setCustomers((prev) => prev.filter((c) => c.customerId !== customer.customerId));
    if (editingId === customer.customerId) resetForm();
  };

  const resetForm = () => {
    setEditingId(null);
    setErrors({});
    setForm({
      ...EMPTY_FORM,
      customerCode: generateCustomerCode(customers),
    });
  };

  const selectState = (state) => {
    updateField("stateCode", state.code);
    updateField("stateName", state.name);
    updateField("cityCode", "");
    updateField("cityName", "");
    setLookup(null);
  };

  const selectCity = (city) => {
    if (form.stateCode && city.stateCode !== form.stateCode) {
      alert("Selected city does not belong to selected state.");
      return;
    }
    updateField("cityCode", city.code);
    updateField("cityName", city.name);
    setLookup(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
            <Users size={22} className="text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Customer Master</h1>
            <p className="text-sm text-base-content/60">
              Manage customers, billing details and ledger information.
            </p>
          </div>
        </div>
        <button onClick={resetForm} className="btn btn-primary gap-2">
          <Plus size={17} /> New Customer
        </button>
      </div>

      <div className="grid gap-6 xl:grid-cols-[380px_1fr]">
        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm"
        >
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">{editingId ? "Edit Customer" : "Customer Details"}</h2>
              <p className="mt-1 text-xs text-base-content/50">Enter customer master information</p>
            </div>
            <button onClick={resetForm} className="btn btn-ghost btn-sm gap-2">
              <RotateCcw size={15} /> Clear
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Customer Code</label>
              <input value={form.customerCode} disabled className="input input-bordered w-full bg-base-200" />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Customer Name <span className="text-error">*</span>
              </label>
              <input
                value={form.customerName}
                onChange={(e) => updateField("customerName", e.target.value)}
                className={`input input-bordered w-full ${errors.customerName ? "input-error" : ""}`}
                placeholder="Enter customer name"
              />
              {errors.customerName && <p className="mt-1 text-xs text-error">{errors.customerName}</p>}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Mobile</label>
              <input
                value={form.mobile}
                onChange={(e) =>
                  updateField("mobile", e.target.value.replace(/\D/g, "").slice(0, 10))
                }
                className={`input input-bordered w-full ${errors.mobile ? "input-error" : ""}`}
                placeholder="9876543210"
              />
              {errors.mobile && <p className="mt-1 text-xs text-error">{errors.mobile}</p>}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                className={`input input-bordered w-full ${errors.email ? "input-error" : ""}`}
                placeholder="customer@example.com"
              />
              {errors.email && <p className="mt-1 text-xs text-error">{errors.email}</p>}
            </div>

            <button
              type="button"
              onClick={() => setLookup("state")}
              className="flex w-full items-center justify-between rounded-xl border border-base-300 px-4 py-2.5 text-left"
            >
              <div>
                <p className="text-xs text-base-content/50">State</p>
                <p className="mt-1">{form.stateName || "Select state"}</p>
              </div>
              <MapPin size={17} className="text-base-content/40" />
            </button>

            <button
              type="button"
              disabled={!form.stateCode}
              onClick={() => setLookup("city")}
              className="flex w-full items-center justify-between rounded-xl border border-base-300 px-4 py-2.5 text-left disabled:opacity-50"
            >
              <div>
                <p className="text-xs text-base-content/50">City</p>
                <p className="mt-1">{form.cityName || "Select city"}</p>
              </div>
              <MapPin size={17} className="text-base-content/40" />
            </button>

            <div>
              <label className="mb-1 block text-sm font-medium">GST Number</label>
              <input
                value={form.gstNo}
                onChange={(e) => updateField("gstNo", e.target.value.toUpperCase().slice(0, 15))}
                className="input input-bordered w-full"
                placeholder="GSTIN"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-sm font-medium">Opening Balance</label>
                <input
                  type="number"
                  value={form.openingBalance}
                  onChange={(e) => updateField("openingBalance", e.target.value)}
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Discount %</label>
                <input
                  type="number"
                  value={form.discountPercent}
                  onChange={(e) => updateField("discountPercent", e.target.value)}
                  className="input input-bordered w-full"
                  min="0"
                  max="100"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Discount Amount</label>
              <input
                type="number"
                value={form.discountAmount}
                onChange={(e) => updateField("discountAmount", e.target.value)}
                className="input input-bordered w-full"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <label className="flex items-center gap-2 rounded-xl border border-base-300 p-3 text-sm">
                <input
                  type="checkbox"
                  checked={form.ledgerRequired}
                  onChange={(e) => updateField("ledgerRequired", e.target.checked)}
                  className="checkbox checkbox-primary"
                />
                Ledger Required
              </label>
              <label className="flex items-center gap-2 rounded-xl border border-base-300 p-3 text-sm">
                <input
                  type="checkbox"
                  checked={form.active}
                  onChange={(e) => updateField("active", e.target.checked)}
                  className="checkbox checkbox-primary"
                />
                Active
              </label>
            </div>

            <div className="flex gap-3 pt-2">
              <button onClick={handleSubmit} className="btn btn-primary flex-1 gap-2">
                <Save size={17} />
                {editingId ? "Update" : "Save"}
              </button>
              <button onClick={resetForm} className="btn btn-ghost gap-2">
                <X size={17} /> Cancel
              </button>
            </div>
          </div>
        </motion.div>

        {/* Table */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-base-300 bg-base-100 p-4">
            <div className="flex flex-col gap-3 md:flex-row">
              <div className="relative flex-1">
                <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search customers..."
                  className="input input-bordered w-full pl-10"
                />
              </div>
              <div className="flex gap-2">
                <div className="rounded-xl bg-base-200 px-4 py-2 text-sm">
                  Count: <span className="ml-2 font-semibold">{filteredCustomers.length}</span>
                </div>
                <button
                  onClick={() => { setCustomers(INITIAL_CUSTOMERS); setSearch(""); resetForm(); }}
                  className="btn btn-outline gap-2"
                >
                  <RefreshCw size={16} /> Refresh
                </button>
              </div>
            </div>
          </div>

          {/* Responsive Table */}
          <div className="overflow-x-auto rounded-2xl border border-base-300 bg-base-100 shadow-sm">
            {/* Responsive Table */}
            <table className="table w-full">
              <thead>
                <tr>
                  <th className="whitespace-nowrap">Code</th>
                  <th className="whitespace-nowrap">Customer</th>
                  {/* <th>City</th> REMOVED from table */}
                  <th className="whitespace-nowrap">State</th>
                  <th className="whitespace-nowrap">Balance</th>
                  <th className="whitespace-nowrap">Status</th>
                  <th className="text-right whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-12 text-center text-sm text-base-content/50">
                      No customers found.
                    </td>
                  </tr>
                ) : (
                  filteredCustomers.map((customer) => (
                    <motion.tr key={customer.customerId} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <td className="font-mono">{customer.customerCode}</td>
                      <td>
                        <div className="font-medium">{customer.customerName}</div>
                        {customer.email && <div className="text-xs text-base-content/50">{customer.email}</div>}
                      </td>
                      {/* City field removed from table */}
                      <td>{customer.stateName || "-"}</td>
                      <td>₹{Number(customer.openingBalance || 0).toLocaleString("en-IN")}</td>
                      <td>
                        {customer.active ? (
                          <span className="badge badge-success badge-outline">Active</span>
                        ) : (
                          <span className="badge badge-error badge-outline">Inactive</span>
                        )}
                      </td>
                      <td>
                        <div className="flex justify-end gap-2">
                          <button onClick={() => setShowDetails(customer)} className="btn btn-ghost btn-sm btn-square">
                            <Eye size={16} />
                          </button>
                          <button onClick={() => editCustomer(customer)} className="btn btn-ghost btn-sm btn-square">
                            <Edit3 size={16} />
                          </button>
                          <button onClick={() => deleteCustomer(customer)} className="btn btn-ghost btn-sm btn-square text-error">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {/* Mobile Card List */}
          <div className="block md:hidden">
            {filteredCustomers.length === 0 ? (
              <div className="px-4 py-10 text-center text-sm text-base-content/50">No customers found.</div>
            ) : (
              <div className="divide-y divide-base-300">
                {filteredCustomers.map((customer) => (
                  <motion.div
                    key={customer.customerId}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="px-4 py-4 flex flex-col gap-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-semibold">{customer.customerCode}</span>
                      <div className="flex gap-1">
                        <button
                          onClick={() => setShowDetails(customer)}
                          className="btn btn-ghost btn-xs btn-square"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => editCustomer(customer)}
                          className="btn btn-ghost btn-xs btn-square"
                        >
                          <Edit3 size={16} />
                        </button>
                        <button
                          onClick={() => deleteCustomer(customer)}
                          className="btn btn-ghost btn-xs btn-square text-error"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="mt-1 font-medium">{customer.customerName}</div>
                    {customer.email && <div className="text-xs text-base-content/50">{customer.email}</div>}
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs">
                      {/* City field removed from card (mobile), as per table removal (not from Eye) */}
                      <span>
                        <span className="font-medium">State: </span>
                        {customer.stateName || "-"}
                      </span>
                      <span>
                        <span className="font-medium">Bal: </span>
                        ₹{Number(customer.openingBalance || 0).toLocaleString("en-IN")}
                      </span>
                      <span>
                        {customer.active ? (
                          <span className="badge badge-success badge-outline">Active</span>
                        ) : (
                          <span className="badge badge-error badge-outline">Inactive</span>
                        )}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lookup */}
      {lookup && (
        <CustomerLookup
          type={lookup}
          onClose={() => setLookup(null)}
          onSelect={lookup === "state" ? selectState : selectCity}
        />
      )}

      {/* Details Modal */}
      {showDetails && (
        <div className="modal modal-open">
          <div className="modal-box">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Customer Details</h3>
              <button onClick={() => setShowDetails(null)} className="btn btn-ghost btn-sm btn-square">
                <X size={18} />
              </button>
            </div>
            <div className="mt-4 space-y-2">
              {[
                ["Customer Code", showDetails.customerCode],
                ["Customer Name", showDetails.customerName],
                ["Mobile", showDetails.mobile],
                ["Email", showDetails.email],
                ["State", showDetails.stateName],
                ["City", showDetails.cityName],
                ["GST", showDetails.gstNo],
                ["Opening Balance", `₹${Number(showDetails.openingBalance || 0).toLocaleString("en-IN")}`],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between rounded-xl bg-base-200 px-3 py-2">
                  <span className="text-sm text-base-content/60">{label}</span>
                  <span className="font-medium">{value || "-"}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => setShowDetails(null)} />
        </div>
      )}
    </div>
  );
}