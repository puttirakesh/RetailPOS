import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  RefreshCw,
  Building2,
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

const branchConfig = {
  title: "Branch Master",
  gstTypes: ["Unregistered", "Regular", "Composition"],
};

const emptyBranch = {
  id: null,
  code: "",
  name: "",
  mobile: "",
  email: "",
  gstNo: "",
  address: "",
  stateId: "",
  gstType: "Regular",
  costCode: "",
  active: true,
};

const branchMock = [
  {
    id: 1,
    code: "BR001",
    name: "Main Branch",
    mobile: "9876543210",
    email: "main@retailpos.com",
    gstNo: "03ABCDE1234F1Z5",
    address: "Ludhiana Main Market",
    stateId: 1,
    gstType: "Regular",
    costCode: "CC001",
    active: true,
  },
  {
    id: 2,
    code: "BR002",
    name: "City Branch",
    mobile: "9876501234",
    email: "city@retailpos.com",
    gstNo: "07ABCDE1234F1Z5",
    address: "Delhi City Centre",
    stateId: 2,
    gstType: "Regular",
    costCode: "CC002",
    active: true,
  },
];

const stateMock = [
  { id: 1, name: "Punjab" },
  { id: 2, name: "Delhi" },
  { id: 3, name: "Maharashtra" },
];

// ----------------------------------------------------------------------
// BranchForm Component
// ----------------------------------------------------------------------

function BranchForm({ formData, setFormData, onSave, onClear, editing, states, gstTypes }) {
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
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">{editing ? "Edit Branch" : "New Branch"}</h2>
          <p className="mt-1 text-xs text-base-content/50">Enter branch information.</p>
        </div>
        <button onClick={onClear} className="btn btn-ghost btn-sm gap-2">
          <RotateCcw size={15} /> Clear
        </button>
      </div>

      <form onSubmit={onSave} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-sm font-medium">Branch Code</label>
            <input
              name="code"
              value={formData.code}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="BR001"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Cost Code</label>
            <input
              name="costCode"
              value={formData.costCode}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="CC001"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Branch Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Main Branch"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-sm font-medium">Mobile</label>
            <input
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="9876543210"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="branch@example.com"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">GST No</label>
          <input
            name="gstNo"
            value={formData.gstNo}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="GST Number"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
            rows="3"
            placeholder="Branch address"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-sm font-medium">State</label>
            <select
              name="stateId"
              value={formData.stateId}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state.id} value={state.id}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">GST Type</label>
            <select
              name="gstType"
              value={formData.gstType}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              {gstTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
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

        <div className="flex gap-3 pt-3">
          <button type="submit" className="btn btn-primary flex-1 gap-2">
            {editing ? <Check size={17} /> : <Save size={17} />}
            {editing ? "Update Branch" : "Save Branch"}
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
// BranchTable Component
// ----------------------------------------------------------------------

function BranchTable({ branches, states, onEdit, onDelete }) {
  const getStateName = (stateId) =>
    states.find((state) => state.id === Number(stateId))?.name || "Unknown";

  return (
    <div className="overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm">
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Code</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>State</th>
              <th>GST Type</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {branches.length === 0 ? (
              <tr>
                <td colSpan="8" className="py-12 text-center text-sm text-base-content/50">
                  No branches found.
                </td>
              </tr>
            ) : (
              branches.map((branch, index) => (
                <motion.tr key={branch.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <td>{index + 1}</td>
                  <td className="font-mono">{branch.code}</td>
                  <td className="font-medium">{branch.name}</td>
                  <td>{branch.mobile || "-"}</td>
                  <td>{getStateName(branch.stateId)}</td>
                  <td>{branch.gstType}</td>
                  <td>
                    {branch.active ? (
                      <span className="badge badge-success badge-outline">Active</span>
                    ) : (
                      <span className="badge badge-error badge-outline">Inactive</span>
                    )}
                  </td>
                  <td>
                    <div className="flex justify-end gap-2">
                      <button onClick={() => onEdit(branch)} className="btn btn-ghost btn-sm btn-square">
                        <Edit3 size={16} />
                      </button>
                      <button onClick={() => onDelete(branch.id)} className="btn btn-ghost btn-sm btn-square text-error">
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
  );
}

// ----------------------------------------------------------------------
// BranchPage (Main Component)
// ----------------------------------------------------------------------

export default function BranchPage() {
  const [branches, setBranches] = useState(branchMock);
  const [states] = useState(stateMock);
  const [formData, setFormData] = useState(emptyBranch);
  const [editing, setEditing] = useState(false);
  const [search, setSearch] = useState("");

  const filteredBranches = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return branches;

    return branches.filter((branch) => {
      const state = states.find((item) => item.id === Number(branch.stateId))?.name || "";
      return [branch.code, branch.name, branch.mobile, branch.email, branch.gstNo, state, branch.gstType].some((value) =>
        String(value).toLowerCase().includes(query)
      );
    });
  }, [branches, states, search]);

  const handleSave = (event) => {
    event.preventDefault();

    if (!formData.code.trim()) {
      alert("Branch code is required.");
      return;
    }
    if (!formData.name.trim()) {
      alert("Branch name is required.");
      return;
    }
    if (!formData.stateId) {
      alert("Please select a state.");
      return;
    }

    const duplicate = branches.some(
      (branch) =>
        branch.code.toLowerCase() === formData.code.trim().toLowerCase() &&
        branch.id !== formData.id
    );
    if (duplicate) {
      alert("Branch code already exists.");
      return;
    }

    const payload = {
      ...formData,
      code: formData.code.trim().toUpperCase(),
      name: formData.name.trim(),
      stateId: Number(formData.stateId),
    };

    if (editing) {
      setBranches((prev) => prev.map((branch) => (branch.id === formData.id ? payload : branch)));
      alert("Branch updated successfully.");
    } else {
      setBranches((prev) => [...prev, { ...payload, id: Date.now() }]);
      alert("Branch saved successfully.");
    }
    handleClear();
  };

  const handleEdit = (branch) => {
    setFormData({ ...branch, stateId: String(branch.stateId) });
    setEditing(true);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this branch?")) return;
    setBranches((prev) => prev.filter((branch) => branch.id !== id));
  };

  const handleClear = () => {
    setFormData({ ...emptyBranch });
    setEditing(false);
  };

  const handleRefresh = () => {
    setBranches(branchMock);
    setSearch("");
    handleClear();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
            <Building2 size={22} className="text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Branch Master</h1>
            <p className="text-sm text-base-content/60">Manage retail branches and GST configuration.</p>
          </div>
        </div>
        <button onClick={handleClear} className="btn btn-primary gap-2">
          <Plus size={17} /> New Branch
        </button>
      </div>

      {/* Form + Table Grid - changed left column to 360px to match other pages */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[360px_1fr]">
        <BranchForm
          formData={formData}
          setFormData={setFormData}
          onSave={handleSave}
          onClear={handleClear}
          editing={editing}
          states={states}
          gstTypes={branchConfig.gstTypes}
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
                  placeholder="Search branches..."
                  className="input input-bordered w-full pl-10"
                />
              </div>
              <div className="flex gap-2">
                <div className="rounded-xl bg-base-200 px-4 py-2 text-sm">
                  Count: <span className="ml-2 font-semibold">{filteredBranches.length}</span>
                </div>
                <button onClick={handleRefresh} className="btn btn-outline gap-2">
                  <RefreshCw size={16} /> Refresh
                </button>
              </div>
            </div>
          </div>

          <BranchTable
            branches={filteredBranches}
            states={states}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}