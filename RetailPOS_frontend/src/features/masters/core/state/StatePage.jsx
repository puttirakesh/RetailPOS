import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  RefreshCw,
  Search,
  Database,
  Check,
  RotateCcw,
  Save,
  X,
  Edit3,
  Trash2,
} from "lucide-react";

// ----------------------------------------------------------------------
// Config & Mock Data
// ----------------------------------------------------------------------

const stateConfig = {
  title: "State Master",
  description: "Manage states used across customers, suppliers, branches and cities.",
  searchableFields: ["code", "name", "stateType"],
  fields: [
    { name: "code", label: "State Code", type: "text", placeholder: "Enter state code", required: true },
    { name: "name", label: "State Name", type: "text", placeholder: "Enter state name", required: true },
    {
      name: "stateType",
      label: "State Type",
      type: "select",
      required: true,
      options: [
        { value: "1", label: "Local State" },
        { value: "2", label: "Other State" },
      ],
    },
    { name: "active", label: "Active", type: "checkbox" },
  ],
  columns: [
    { key: "code", label: "Code" },
    { key: "name", label: "State Name" },
    { key: "stateType", label: "State Type" },
    { key: "active", label: "Status" },
  ],
};

const emptyState = {
  id: null,
  code: "",
  name: "",
  stateType: "1",
  active: true,
};

const stateMock = [
  { id: 1, code: "PB", name: "Punjab", stateType: "1", active: true },
  { id: 2, code: "DL", name: "Delhi", stateType: "2", active: true },
  { id: 3, code: "HR", name: "Haryana", stateType: "2", active: true },
  { id: 4, code: "UP", name: "Uttar Pradesh", stateType: "2", active: true },
  { id: 5, code: "MH", name: "Maharashtra", stateType: "2", active: false },
];

// ----------------------------------------------------------------------
// StateForm Component
// ----------------------------------------------------------------------

function StateForm({ formData, setFormData, onSave, onClear, editing }) {
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
          <h2 className="text-lg font-semibold">
            {editing ? "Edit State" : "New State"}
          </h2>
          <p className="mt-1 text-xs text-base-content/50">Enter state information below.</p>
        </div>
        <button type="button" onClick={onClear} className="btn btn-ghost btn-sm gap-2">
          <RotateCcw size={15} /> Clear
        </button>
      </div>

      <form onSubmit={onSave} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium">State Code</label>
          <input
            type="text"
            name="code"
            value={formData.code}
            onChange={handleChange}
            placeholder="e.g. PB"
            className="input input-bordered w-full"
            maxLength={10}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">State Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Punjab"
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">State Type</label>
          <select
            name="stateType"
            value={formData.stateType}
            onChange={handleChange}
            className="select select-bordered w-full"
          >
            <option value="1">Local State</option>
            <option value="2">Other State</option>
          </select>
        </div>

        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-base-300 p-3">
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
            {editing ? "Update State" : "Save State"}
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
// StateTable Component
// ----------------------------------------------------------------------

function StateTable({ states, onEdit, onDelete }) {
  const getStateType = (type) => (type === "1" ? "Local State" : "Other State");

  return (
    <div className="overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm">
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Code</th>
              <th>State Name</th>
              <th>State Type</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {states.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-12 text-center text-sm text-base-content/50">
                  No states found.
                </td>
              </tr>
            ) : (
              states.map((state, index) => (
                <motion.tr key={state.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <td>{index + 1}</td>
                  <td>
                    <span className="font-mono text-sm">{state.code}</span>
                  </td>
                  <td className="font-medium">{state.name}</td>
                  <td>{getStateType(state.stateType)}</td>
                  <td>
                    {state.active ? (
                      <span className="badge badge-success badge-outline">Active</span>
                    ) : (
                      <span className="badge badge-error badge-outline">Inactive</span>
                    )}
                  </td>
                  <td>
                    <div className="flex justify-end gap-2">
                      <button type="button" onClick={() => onEdit(state)} className="btn btn-ghost btn-sm btn-square">
                        <Edit3 size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(state.id)}
                        className="btn btn-ghost btn-sm btn-square text-error"
                      >
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
// StatePage (Main Component)
// ----------------------------------------------------------------------

export default function StatePage() {
  const [states, setStates] = useState(stateMock);
  const [formData, setFormData] = useState(emptyState);
  const [editing, setEditing] = useState(false);
  const [search, setSearch] = useState("");

  const filteredStates = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return states;

    return states.filter((state) =>
      [state.code, state.name, state.stateType].some((value) =>
        String(value).toLowerCase().includes(query)
      )
    );
  }, [states, search]);

  const handleSave = (event) => {
    event.preventDefault();

    if (!formData.code.trim()) {
      alert("State code is required.");
      return;
    }
    if (!formData.name.trim()) {
      alert("State name is required.");
      return;
    }

    const duplicate = states.some(
      (state) =>
        state.code.toLowerCase() === formData.code.trim().toLowerCase() &&
        state.id !== formData.id
    );
    if (duplicate) {
      alert("State code already exists.");
      return;
    }

    const payload = {
      ...formData,
      code: formData.code.trim().toUpperCase(),
      name: formData.name.trim(),
    };

    if (editing) {
      setStates((prev) => prev.map((state) => (state.id === formData.id ? payload : state)));
      alert("State updated successfully.");
    } else {
      setStates((prev) => [...prev, { ...payload, id: Date.now() }]);
      alert("State saved successfully.");
    }
    handleClear();
  };

  const handleEdit = (state) => {
    setFormData(state);
    setEditing(true);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this state?")) return;
    setStates((prev) => prev.filter((state) => state.id !== id));
    if (formData.id === id) handleClear();
  };

  const handleClear = () => {
    setFormData({ ...emptyState });
    setEditing(false);
  };

  const handleRefresh = () => {
    setStates(stateMock);
    setSearch("");
    handleClear();
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                <Database size={22} className="text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">State Master</h1>
                <p className="text-sm text-base-content/60">Manage states used across the system.</p>
              </div>
            </div>
          </div>
          <button type="button" onClick={handleClear} className="btn btn-primary gap-2">
            <Plus size={17} /> New State
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[360px_1fr]">
        <StateForm
          formData={formData}
          setFormData={setFormData}
          onSave={handleSave}
          onClear={handleClear}
          editing={editing}
        />

        <div className="space-y-4">
          <div className="rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm">
            <div className="flex flex-col gap-3 md:flex-row md:items-center">
              <div className="relative flex-1">
                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40"
                />
                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search states..."
                  className="input input-bordered w-full pl-10"
                />
              </div>
              <div className="flex items-center gap-2">
                <div className="rounded-xl bg-base-200 px-4 py-2 text-sm">
                  Count: <span className="ml-2 font-semibold">{filteredStates.length}</span>
                </div>
                <button type="button" onClick={handleRefresh} className="btn btn-outline gap-2">
                  <RefreshCw size={16} /> Refresh
                </button>
              </div>
            </div>
          </div>

          <StateTable
            states={filteredStates}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}