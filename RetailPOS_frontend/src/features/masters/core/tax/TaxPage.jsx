import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  RefreshCw,
  ReceiptText,
  Save,
  Check,
  RotateCcw,
  X,
  Edit3,
  Trash2,
} from "lucide-react";

// ----------------------------------------------------------------------
// Config & Mock Data
// ----------------------------------------------------------------------

const taxConfig = {
  title: "Tax Master",
  taxTypes: [
    { value: "GST", label: "GST" },
    { value: "CGST_SGST", label: "CGST + SGST" },
    { value: "IGST", label: "IGST" },
  ],
};

const emptyTax = {
  id: null,
  code: "",
  name: "",
  taxType: "GST",
  rate: "",
  active: true,
};

const taxMock = [
  { id: 1, code: "GST5", name: "GST 5%", taxType: "GST", rate: 5, active: true },
  { id: 2, code: "GST12", name: "GST 12%", taxType: "GST", rate: 12, active: true },
  { id: 3, code: "GST18", name: "GST 18%", taxType: "GST", rate: 18, active: true },
  { id: 4, code: "GST28", name: "GST 28%", taxType: "GST", rate: 28, active: false },
];

// ----------------------------------------------------------------------
// TaxForm Component
// ----------------------------------------------------------------------

function TaxForm({ formData, setFormData, onSave, onClear, editing, taxTypes }) {
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -15 }}
      animate={{ opacity: 1, x: 0 }}
      className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm"
    >
      <div className="mb-6 flex justify-between">
        <div>
          <h2 className="text-lg font-semibold">{editing ? "Edit Tax" : "New Tax"}</h2>
          <p className="mt-1 text-xs text-base-content/50">Configure a tax rate.</p>
        </div>
        <button onClick={onClear} className="btn btn-ghost btn-sm gap-2">
          <RotateCcw size={15} /> Clear
        </button>
      </div>

      <form onSubmit={onSave} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium">Tax Code</label>
          <input
            name="code"
            value={formData.code}
            onChange={handleChange}
            placeholder="GST18"
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Tax Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="GST 18%"
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Tax Type</label>
          <select
            name="taxType"
            value={formData.taxType}
            onChange={handleChange}
            className="select select-bordered w-full"
          >
            {taxTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Tax Rate (%)</label>
          <input
            type="number"
            name="rate"
            value={formData.rate}
            onChange={handleChange}
            min="0"
            max="100"
            step="0.01"
            placeholder="18"
            className="input input-bordered w-full"
          />
        </div>

        <label className="flex items-center gap-3 rounded-xl border border-base-300 p-3">
          <input
            type="checkbox"
            name="active"
            checked={formData.active}
            onChange={handleChange}
            className="checkbox checkbox-primary"
          />
          <span className="text-sm font-medium">Active</span>
        </label>

        <div className="flex gap-3">
          <button type="submit" className="btn btn-primary flex-1 gap-2">
            {editing ? <Check size={17} /> : <Save size={17} />}
            {editing ? "Update Tax" : "Save Tax"}
          </button>
          <button type="button" onClick={onClear} className="btn btn-ghost gap-2">
            <X size={17} /> Cancel
          </button>
        </div>
      </form>
    </motion.div>
  );
}

// ----------------------------------------------------------------------
// TaxTable Component
// ----------------------------------------------------------------------

function TaxTable({ taxes, onEdit, onDelete }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-base-300 bg-base-100">
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Code</th>
              <th>Name</th>
              <th>Type</th>
              <th>Rate</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {taxes.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-12 text-center text-sm text-base-content/50">
                  No tax records found.
                </td>
              </tr>
            ) : (
              taxes.map((tax, index) => (
                <tr key={tax.id}>
                  <td>{index + 1}</td>
                  <td className="font-mono">{tax.code}</td>
                  <td className="font-medium">{tax.name}</td>
                  <td>{tax.taxType}</td>
                  <td>
                    <span className="font-semibold">{tax.rate}%</span>
                  </td>
                  <td>
                    {tax.active ? (
                      <span className="badge badge-success badge-outline">Active</span>
                    ) : (
                      <span className="badge badge-error badge-outline">Inactive</span>
                    )}
                  </td>
                  <td>
                    <div className="flex justify-end gap-2">
                      <button onClick={() => onEdit(tax)} className="btn btn-ghost btn-sm btn-square">
                        <Edit3 size={16} />
                      </button>
                      <button onClick={() => onDelete(tax.id)} className="btn btn-ghost btn-sm btn-square text-error">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// TaxPage (Main Component)
// ----------------------------------------------------------------------

export default function TaxPage() {
  const [taxes, setTaxes] = useState(taxMock);
  const [formData, setFormData] = useState(emptyTax);
  const [editing, setEditing] = useState(false);
  const [search, setSearch] = useState("");

  const filteredTaxes = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return taxes;

    return taxes.filter((tax) =>
      [tax.code, tax.name, tax.taxType, tax.rate].some((value) =>
        String(value).toLowerCase().includes(query)
      )
    );
  }, [taxes, search]);

  const handleSave = (event) => {
    event.preventDefault();

    if (!formData.code.trim()) {
      alert("Tax code is required.");
      return;
    }
    if (!formData.name.trim()) {
      alert("Tax name is required.");
      return;
    }
    if (formData.rate === "" || Number(formData.rate) < 0) {
      alert("Enter a valid tax rate.");
      return;
    }

    const duplicate = taxes.some(
      (tax) =>
        tax.code.toLowerCase() === formData.code.trim().toLowerCase() &&
        tax.id !== formData.id
    );
    if (duplicate) {
      alert("Tax code already exists.");
      return;
    }

    const payload = {
      ...formData,
      code: formData.code.trim().toUpperCase(),
      name: formData.name.trim(),
      rate: Number(formData.rate),
    };

    if (editing) {
      setTaxes((prev) => prev.map((tax) => (tax.id === formData.id ? payload : tax)));
      alert("Tax updated successfully.");
    } else {
      setTaxes((prev) => [...prev, { ...payload, id: Date.now() }]);
      alert("Tax saved successfully.");
    }
    handleClear();
  };

  const handleEdit = (tax) => {
    setFormData({ ...tax, rate: String(tax.rate) });
    setEditing(true);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this tax?")) return;
    setTaxes((prev) => prev.filter((tax) => tax.id !== id));
  };

  const handleClear = () => {
    setFormData({ ...emptyTax });
    setEditing(false);
  };

  const handleRefresh = () => {
    setTaxes(taxMock);
    setSearch("");
    handleClear();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
            <ReceiptText size={22} className="text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Tax Master</h1>
            <p className="text-sm text-base-content/60">Manage tax definitions and rates.</p>
          </div>
        </div>
        <button onClick={handleClear} className="btn btn-primary gap-2">
          <Plus size={17} /> New Tax
        </button>
      </div>

      {/* Form + Table Grid */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[360px_1fr]">
        <TaxForm
          formData={formData}
          setFormData={setFormData}
          onSave={handleSave}
          onClear={handleClear}
          editing={editing}
          taxTypes={taxConfig.taxTypes}
        />

        <div className="space-y-4">
          {/* Search & Refresh */}
          <div className="rounded-2xl border border-base-300 bg-base-100 p-4">
            <div className="flex flex-col gap-3 md:flex-row">
              <div className="relative flex-1">
                <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search tax..."
                  className="input input-bordered w-full pl-10"
                />
              </div>
              <div className="flex gap-2">
                <div className="rounded-xl bg-base-200 px-4 py-2 text-sm">
                  Count: <span className="ml-2 font-semibold">{filteredTaxes.length}</span>
                </div>
                <button onClick={handleRefresh} className="btn btn-outline gap-2">
                  <RefreshCw size={16} /> Refresh
                </button>
              </div>
            </div>
          </div>

          <TaxTable
            taxes={filteredTaxes}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}