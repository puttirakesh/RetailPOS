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
  Truck,
  MapPin,
  Building2,
  Eye,
} from "lucide-react";

/* =========================================================
   MASTER DATA
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
  { code: "NDL", name: "New Delhi", stateCode: "DL" },
  { code: "GGN", name: "Gurugram", stateCode: "HR" },
  { code: "NOI", name: "Noida", stateCode: "UP" },
];

const AGENT_OPTIONS = [
  { id: 1, name: "Direct / No Agent", mobile: "", city: "Ludhiana" },
  { id: 2, name: "Raj Sales Agency", mobile: "9876501234", city: "Ludhiana" },
  { id: 3, name: "Punjab Distribution", mobile: "9812309876", city: "Jalandhar" },
];

const GST_TYPES = ["Unregistered", "Regular", "Composition"];

const EMPTY_FORM = {
  supplierId: "",
  supplierCode: "",
  supplierName: "",
  mobile: "",
  address: "",
  stateCode: "",
  stateName: "",
  cityCode: "",
  cityName: "",
  gstNo: "",
  agentId: "",
  agentName: "",
  gstType: "Regular",
  openingBalance: 0,
  ledgerRequired: true,
  active: true,
};

const INITIAL_SUPPLIERS = [
  {
    supplierId: 1,
    supplierCode: "SUP0001",
    supplierName: "ABC Distributors",
    mobile: "9876543210",
    address: "Industrial Area, Ludhiana",
    stateCode: "PB",
    stateName: "Punjab",
    cityCode: "LDH",
    cityName: "Ludhiana",
    gstNo: "03ABCDE1234F1Z5",
    agentId: 2,
    agentName: "Raj Sales Agency",
    gstType: "Regular",
    openingBalance: 25000,
    ledgerRequired: true,
    active: true,
  },
  {
    supplierId: 2,
    supplierCode: "SUP0002",
    supplierName: "Delhi Wholesale Mart",
    mobile: "9812345678",
    address: "Azadpur Market",
    stateCode: "DL",
    stateName: "Delhi",
    cityCode: "NDL",
    cityName: "New Delhi",
    gstNo: "07ABCDE1234F1Z1",
    agentId: 1,
    agentName: "Direct / No Agent",
    gstType: "Regular",
    openingBalance: 15000,
    ledgerRequired: true,
    active: true,
  },
];

const generateSupplierCode = (items) => {
  const maxId = items.reduce((max, item) => Math.max(max, Number(item.supplierId) || 0), 0);
  return `SUP${String(maxId + 1).padStart(4, "0")}`;
};

/* =========================================================
   LOOKUP MODAL
   ========================================================= */

function SupplierLookup({ type, items, onSelect, onClose }) {
  const [search, setSearch] = useState("");
  const filtered = items.filter((item) =>
    [item.code, item.name, item.mobile, item.city]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Select {type}</h3>
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
                key={item.code ?? item.id}
                onClick={() => { onSelect(item); onClose(); }}
                className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left hover:bg-base-200"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-xs text-base-content/60">{item.code || `ID: ${item.id}`}</p>
                </div>
                {item.mobile && <span className="text-xs text-base-content/40">{item.mobile}</span>}
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
   TAX SCOPE INDICATOR
   ========================================================= */

function TaxScopeIndicator({ stateType }) {
  if (!stateType) return null;
  const local = stateType === 1;
  return (
    <div
      className={`rounded-xl border p-4 ${local ? "border-success/20 bg-success/10" : "border-primary/20 bg-primary/10"}`}
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-base-content/60">Tax Scope</p>
      <p className="mt-1 text-sm font-semibold">
        {local ? "Local — CGST + SGST" : "Interstate — IGST"}
      </p>
      <p className="mt-1 text-xs text-base-content/50">Determined by supplier state type.</p>
    </div>
  );
}

/* =========================================================
   PAGE
   ========================================================= */

export default function SupplierPage() {
  const [suppliers, setSuppliers] = useState(INITIAL_SUPPLIERS);
  const [form, setForm] = useState({
    ...EMPTY_FORM,
    supplierCode: generateSupplierCode(INITIAL_SUPPLIERS),
  });
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [lookup, setLookup] = useState(null);
  const [details, setDetails] = useState(null);

  const selectedState = STATE_OPTIONS.find((s) => s.code === form.stateCode);

  const filtered = useMemo(() => {
    const query = search.toLowerCase();
    if (!query) return suppliers;
    return suppliers.filter((s) =>
      [s.supplierCode, s.supplierName, s.mobile, s.cityName, s.stateName, s.agentName, s.gstNo]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [suppliers, search]);

  const updateField = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const validate = () => {
    if (!form.supplierName.trim()) {
      alert("Supplier name is required.");
      return false;
    }
    if (form.mobile && !/^\d{10}$/.test(form.mobile)) {
      alert("Enter a valid 10 digit mobile number.");
      return false;
    }
    if (form.gstNo && !/^[0-9A-Z]{15}$/.test(form.gstNo)) {
      alert("GST number must contain 15 characters.");
      return false;
    }
    return true;
  };

  const save = () => {
    if (!validate()) return;

    const state = STATE_OPTIONS.find((s) => s.code === form.stateCode);
    const city = CITY_OPTIONS.find((c) => c.code === form.cityCode);
    const agent = AGENT_OPTIONS.find((a) => a.id === Number(form.agentId));

    const record = {
      ...form,
      supplierId: editingId ?? Math.max(0, ...suppliers.map((x) => x.supplierId)) + 1,
      stateName: state?.name || "",
      cityName: city?.name || "",
      agentName: agent?.name || "",
      openingBalance: Number(form.openingBalance) || 0,
    };

    if (editingId) {
      setSuppliers((prev) => prev.map((item) => (item.supplierId === editingId ? record : item)));
    } else {
      setSuppliers((prev) => [...prev, record]);
    }
    reset();
  };

  const edit = (supplier) => {
    setEditingId(supplier.supplierId);
    setForm({ ...supplier });
  };

  const remove = (supplier) => {
    if (supplier.supplierId === 1) {
      alert("Default supplier cannot be deleted.");
      return;
    }
    if (!window.confirm(`Delete ${supplier.supplierName}?`)) return;
    setSuppliers((prev) => prev.filter((item) => item.supplierId !== supplier.supplierId));
  };

  const reset = () => {
    setEditingId(null);
    setForm({
      ...EMPTY_FORM,
      supplierCode: generateSupplierCode(suppliers),
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
            <Truck size={22} className="text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Supplier Master</h1>
            <p className="text-sm text-base-content/60">Manage suppliers, tax scope, agents and ledger details.</p>
          </div>
        </div>
        <button onClick={reset} className="btn btn-primary gap-2">
          <Plus size={17} /> New Supplier
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
              <h2 className="text-lg font-semibold">{editingId ? "Edit Supplier" : "Supplier Details"}</h2>
              <p className="mt-1 text-xs text-base-content/50">Maintain supplier master information.</p>
            </div>
            <button onClick={reset} className="btn btn-ghost btn-sm gap-2">
              <RotateCcw size={15} /> Clear
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Supplier Code</label>
              <input value={form.supplierCode} disabled className="input input-bordered w-full bg-base-200" />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Supplier Name</label>
              <input
                value={form.supplierName}
                onChange={(e) => updateField("supplierName", e.target.value)}
                className="input input-bordered w-full"
                placeholder="Enter supplier name"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Mobile</label>
              <input
                value={form.mobile}
                onChange={(e) =>
                  updateField("mobile", e.target.value.replace(/\D/g, "").slice(0, 10))
                }
                className="input input-bordered w-full"
                placeholder="9876543210"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Address</label>
              <textarea
                value={form.address}
                onChange={(e) => updateField("address", e.target.value)}
                rows={3}
                className="textarea textarea-bordered w-full"
                placeholder="Enter address"
              />
            </div>

            <button
              type="button"
              onClick={() => setLookup("state")}
              className="flex w-full items-center justify-between rounded-xl border border-base-300 px-4 py-2.5 text-left"
            >
              <div>
                <p className="text-xs text-base-content/50">State</p>
                <p className="mt-1">{form.stateName || "Select State"}</p>
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
                <p className="mt-1">{form.cityName || "Select City"}</p>
              </div>
              <MapPin size={17} className="text-base-content/40" />
            </button>

            <button
              type="button"
              onClick={() => setLookup("agent")}
              className="flex w-full items-center justify-between rounded-xl border border-base-300 px-4 py-2.5 text-left"
            >
              <div>
                <p className="text-xs text-base-content/50">Agent</p>
                <p className="mt-1">{form.agentName || "Select Agent"}</p>
              </div>
              <Building2 size={17} className="text-base-content/40" />
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

            <div>
              <label className="mb-1 block text-sm font-medium">GST Type</label>
              <select
                value={form.gstType}
                onChange={(e) => updateField("gstType", e.target.value)}
                className="select select-bordered w-full"
              >
                {GST_TYPES.map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Opening Balance</label>
              <input
                type="number"
                value={form.openingBalance}
                onChange={(e) => updateField("openingBalance", e.target.value)}
                className="input input-bordered w-full"
              />
            </div>

            <TaxScopeIndicator stateType={selectedState?.stateType} />

            <div className="grid grid-cols-2 gap-3">
              <label className="flex items-center gap-2 rounded-xl border border-base-300 p-3 text-sm">
                <input
                  type="checkbox"
                  checked={form.ledgerRequired}
                  onChange={(e) => updateField("ledgerRequired", e.target.checked)}
                  className="checkbox checkbox-primary"
                />
                Ledger
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
              <button onClick={save} className="btn btn-primary flex-1 gap-2">
                <Save size={17} />
                {editingId ? "Update" : "Save"}
              </button>
              <button onClick={reset} className="btn btn-ghost gap-2">
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
                  placeholder="Search suppliers..."
                  className="input input-bordered w-full pl-10"
                />
              </div>
              <div className="flex gap-2">
                <div className="rounded-xl bg-base-200 px-4 py-2 text-sm">
                  Count: <span className="ml-2 font-semibold">{filtered.length}</span>
                </div>
                <button
                  onClick={() => { setSuppliers(INITIAL_SUPPLIERS); setSearch(""); reset(); }}
                  className="btn btn-outline gap-2"
                >
                  <RefreshCw size={16} /> Refresh
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm">
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Supplier</th>
                    {/* <th>Mobile</th> */}
                    <th>City</th>
                    <th>Agent</th>
                    {/* <th>GST Type</th> */}
                    <th>Status</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="py-12 text-center text-sm text-base-content/50">
                        No suppliers found.
                      </td>
                    </tr>
                  ) : (
                    filtered.map((supplier) => (
                      <motion.tr key={supplier.supplierId} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <td className="font-mono">{supplier.supplierCode}</td>
                        <td className="font-medium">{supplier.supplierName}</td>
                        {/* <td>{supplier.mobile || "-"}</td> */}
                        <td>{supplier.cityName || "-"}</td>
                        <td>{supplier.agentName || "-"}</td>
                        {/* <td>{supplier.gstType}</td> */}
                        <td>
                          {supplier.active ? (
                            <span className="badge badge-success badge-outline">Active</span>
                          ) : (
                            <span className="badge badge-error badge-outline">Inactive</span>
                          )}
                        </td>
                        <td>
                          <div className="flex justify-end gap-2">
                            <button onClick={() => setDetails(supplier)} className="btn btn-ghost btn-sm btn-square">
                              <Eye size={16} />
                            </button>
                            <button onClick={() => edit(supplier)} className="btn btn-ghost btn-sm btn-square">
                              <Edit3 size={16} />
                            </button>
                            <button onClick={() => remove(supplier)} className="btn btn-ghost btn-sm btn-square text-error">
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
          </div>
        </div>
      </div>

      {/* Lookups */}
      {lookup === "state" && (
        <SupplierLookup
          type="State"
          items={STATE_OPTIONS.map((s) => ({ code: s.code, name: s.name }))}
          onClose={() => setLookup(null)}
          onSelect={(state) => {
            updateField("stateCode", state.code);
            updateField("stateName", state.name);
            updateField("cityCode", "");
            updateField("cityName", "");
            setLookup(null);
          }}
        />
      )}

      {lookup === "city" && (
        <SupplierLookup
          type="City"
          items={CITY_OPTIONS.filter(
            (city) => !form.stateCode || city.stateCode === form.stateCode
          ).map((city) => ({ code: city.code, name: city.name }))}
          onClose={() => setLookup(null)}
          onSelect={(city) => {
            updateField("cityCode", city.code);
            updateField("cityName", city.name);
            setLookup(null);
          }}
        />
      )}

      {lookup === "agent" && (
        <SupplierLookup
          type="Agent"
          items={AGENT_OPTIONS.map((a) => ({ id: a.id, name: a.name, mobile: a.mobile }))}
          onClose={() => setLookup(null)}
          onSelect={(agent) => {
            updateField("agentId", agent.id);
            updateField("agentName", agent.name);
            setLookup(null);
          }}
        />
      )}

      {/* Details Modal */}
      {details && (
        <div className="modal modal-open">
          <div className="modal-box">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Supplier Details</h3>
              <button onClick={() => setDetails(null)} className="btn btn-ghost btn-sm btn-square">
                <X size={18} />
              </button>
            </div>
            <div className="mt-4 space-y-2">
              {[
                ["Code", details.supplierCode],
                ["Supplier", details.supplierName],
                ["Mobile", details.mobile],
                ["Address", details.address],
                ["State", details.stateName],
                ["City", details.cityName],
                ["GST", details.gstNo],
                ["Agent", details.agentName],
                ["GST Type", details.gstType],
                ["Opening Balance", `₹${Number(details.openingBalance || 0).toLocaleString("en-IN")}`],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between rounded-xl bg-base-200 px-3 py-2">
                  <span className="text-sm text-base-content/60">{label}</span>
                  <span className="font-medium">{value || "-"}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => setDetails(null)} />
        </div>
      )}
    </div>
  );
}