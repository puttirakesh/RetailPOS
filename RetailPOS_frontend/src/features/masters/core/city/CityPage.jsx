import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  RefreshCw,
  MapPinned,
  RotateCcw,
  Save,
  Check,
  X,
  Edit3,
  Trash2,
} from "lucide-react";

// ----------------------------------------------------------------------
// Config & Mock Data
// ----------------------------------------------------------------------

const cityConfig = {
  title: "City Master",
  description: "Manage cities and their state relationships.",
  fields: [
    { name: "code", label: "City Code", type: "text", required: true },
    { name: "name", label: "City Name", type: "text", required: true },
    { name: "stateId", label: "State", type: "select", required: true },
    { name: "active", label: "Active", type: "checkbox" },
  ],
};

const emptyCity = {
  id: null,
  code: "",
  name: "",
  stateId: "",
  active: true,
};

const cityMock = [
  { id: 1, code: "LDH", name: "Ludhiana", stateId: 1, active: true },
  { id: 2, code: "ASR", name: "Amritsar", stateId: 1, active: true },
  { id: 3, code: "CHD", name: "Chandigarh", stateId: 2, active: true },
  { id: 4, code: "GGN", name: "Gurugram", stateId: 3, active: true },
  { id: 5, code: "LKO", name: "Lucknow", stateId: 4, active: true },
];

// Mock states (replace with actual data source)
const stateMock = [
  { id: 1, name: "Punjab" },
  { id: 2, name: "Delhi" },
  { id: 3, name: "Haryana" },
  { id: 4, name: "Uttar Pradesh" },
];

// ----------------------------------------------------------------------
// CityForm Component
// ----------------------------------------------------------------------

function CityForm({ formData, setFormData, onSave, onClear, editing, states }) {
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
          <h2 className="text-lg font-semibold">{editing ? "Edit City" : "New City"}</h2>
          <p className="mt-1 text-xs text-base-content/50">Select the state associated with this city.</p>
        </div>
        <button type="button" onClick={onClear} className="btn btn-ghost btn-sm gap-2">
          <RotateCcw size={15} /> Clear
        </button>
      </div>

      <form onSubmit={onSave} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium">City Code</label>
          <input
            name="code"
            value={formData.code}
            onChange={handleChange}
            placeholder="e.g. LDH"
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">City Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Ludhiana"
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">State</label>
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
            {editing ? "Update City" : "Save City"}
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
// CityTable Component
// ----------------------------------------------------------------------

function CityTable({ cities, states, onEdit, onDelete }) {
  const stateName = (stateId) => {
    return states.find((state) => state.id === Number(stateId))?.name || "Unknown";
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm">
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Code</th>
              <th>City Name</th>
              <th>State</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cities.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-12 text-center text-sm text-base-content/50">
                  No cities found.
                </td>
              </tr>
            ) : (
              cities.map((city, index) => (
                <motion.tr key={city.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <td>{index + 1}</td>
                  <td className="font-mono text-sm">{city.code}</td>
                  <td className="font-medium">{city.name}</td>
                  <td>{stateName(city.stateId)}</td>
                  <td>
                    {city.active ? (
                      <span className="badge badge-success badge-outline">Active</span>
                    ) : (
                      <span className="badge badge-error badge-outline">Inactive</span>
                    )}
                  </td>
                  <td>
                    <div className="flex justify-end gap-2">
                      <button onClick={() => onEdit(city)} className="btn btn-ghost btn-sm btn-square">
                        <Edit3 size={16} />
                      </button>
                      <button onClick={() => onDelete(city.id)} className="btn btn-ghost btn-sm btn-square text-error">
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
// CityPage (Main Component)
// ----------------------------------------------------------------------

export default function CityPage() {
  const [cities, setCities] = useState(cityMock);
  const [states] = useState(stateMock);
  const [formData, setFormData] = useState(emptyCity);
  const [editing, setEditing] = useState(false);
  const [search, setSearch] = useState("");

  const filteredCities = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return cities;

    return cities.filter((city) => {
      const state = states.find((item) => item.id === Number(city.stateId))?.name || "";
      return [city.code, city.name, state].some((value) =>
        String(value).toLowerCase().includes(query)
      );
    });
  }, [cities, search, states]);

  const handleSave = (event) => {
    event.preventDefault();

    if (!formData.code.trim()) {
      alert("City code is required.");
      return;
    }
    if (!formData.name.trim()) {
      alert("City name is required.");
      return;
    }
    if (!formData.stateId) {
      alert("Please select a state.");
      return;
    }

    const duplicate = cities.some(
      (city) =>
        city.code.toLowerCase() === formData.code.trim().toLowerCase() &&
        city.id !== formData.id
    );
    if (duplicate) {
      alert("City code already exists.");
      return;
    }

    const payload = {
      ...formData,
      code: formData.code.trim().toUpperCase(),
      name: formData.name.trim(),
      stateId: Number(formData.stateId),
    };

    if (editing) {
      setCities((prev) => prev.map((city) => (city.id === formData.id ? payload : city)));
      alert("City updated successfully.");
    } else {
      setCities((prev) => [...prev, { ...payload, id: Date.now() }]);
      alert("City saved successfully.");
    }
    handleClear();
  };

  const handleEdit = (city) => {
    setFormData({ ...city, stateId: String(city.stateId) });
    setEditing(true);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this city?")) return;
    setCities((prev) => prev.filter((city) => city.id !== id));
  };

  const handleClear = () => {
    setFormData({ ...emptyCity });
    setEditing(false);
  };

  const handleRefresh = () => {
    setCities(cityMock);
    setSearch("");
    handleClear();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
            <MapPinned size={22} className="text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">City Master</h1>
            <p className="text-sm text-base-content/60">Manage city and state relationships.</p>
          </div>
        </div>
        <button onClick={handleClear} className="btn btn-primary gap-2">
          <Plus size={17} /> New City
        </button>
      </div>

      {/* Form + Table Grid */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[360px_1fr]">
        <CityForm
          formData={formData}
          setFormData={setFormData}
          onSave={handleSave}
          onClear={handleClear}
          editing={editing}
          states={states}
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
                  placeholder="Search cities..."
                  className="input input-bordered w-full pl-10"
                />
              </div>
              <div className="flex gap-2">
                <div className="rounded-xl bg-base-200 px-4 py-2 text-sm">
                  Count: <span className="ml-2 font-semibold">{filteredCities.length}</span>
                </div>
                <button onClick={handleRefresh} className="btn btn-outline gap-2">
                  <RefreshCw size={16} /> Refresh
                </button>
              </div>
            </div>
          </div>

          <CityTable
            cities={filteredCities}
            states={states}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}