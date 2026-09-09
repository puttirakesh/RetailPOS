import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  RefreshCw,
  CalendarRange,
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

const financialYearConfig = {
  title: "Financial Year",
  fields: [
    { name: "code", label: "Financial Year Code", type: "text" },
    { name: "name", label: "Financial Year", type: "text" },
  ],
};

const emptyFinancialYear = {
  id: null,
  code: "",
  name: "",
  startDate: "",
  endDate: "",
  active: true,
};

const financialYearMock = [
  {
    id: 1,
    code: "FY25-26",
    name: "2025-2026",
    startDate: "2025-04-01",
    endDate: "2026-03-31",
    active: false,
  },
  {
    id: 2,
    code: "FY26-27",
    name: "2026-2027",
    startDate: "2026-04-01",
    endDate: "2027-03-31",
    active: true,
  },
];

// ----------------------------------------------------------------------
// FinancialYearForm Component
// ----------------------------------------------------------------------

function FinancialYearForm({ formData, setFormData, onSave, onClear, editing }) {
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
          <h2 className="text-lg font-semibold">
            {editing ? "Edit Financial Year" : "New Financial Year"}
          </h2>
          <p className="mt-1 text-xs text-base-content/50">Define the accounting period.</p>
        </div>
        <button onClick={onClear} className="btn btn-ghost btn-sm gap-2">
          <RotateCcw size={15} /> Clear
        </button>
      </div>

      <form onSubmit={onSave} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium">Financial Year Code</label>
          <input
            name="code"
            value={formData.code}
            onChange={handleChange}
            placeholder="FY26-27"
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Financial Year</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="2026-2027"
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">End Date</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
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
            {editing ? "Update" : "Save"}
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
// FinancialYearTable Component
// ----------------------------------------------------------------------

function FinancialYearTable({ years, onEdit, onDelete }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-base-300 bg-base-100">
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Code</th>
              <th>Financial Year</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {years.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-12 text-center text-sm text-base-content/50">
                  No financial years found.
                </td>
              </tr>
            ) : (
              years.map((year, index) => (
                <tr key={year.id}>
                  <td>{index + 1}</td>
                  <td className="font-mono">{year.code}</td>
                  <td className="font-medium">{year.name}</td>
                  {/* Added whitespace-nowrap to keep dates on one line */}
                  <td className="whitespace-nowrap">{year.startDate}</td>
                  <td className="whitespace-nowrap">{year.endDate}</td>
                  <td>
                    {year.active ? (
                      <span className="badge badge-success badge-outline">Active</span>
                    ) : (
                      <span className="badge badge-error badge-outline">Inactive</span>
                    )}
                  </td>
                  <td>
                    <div className="flex justify-end gap-2">
                      <button onClick={() => onEdit(year)} className="btn btn-ghost btn-sm btn-square">
                        <Edit3 size={16} />
                      </button>
                      <button onClick={() => onDelete(year.id)} className="btn btn-ghost btn-sm btn-square text-error">
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
// FinancialYearPage (Main Component)
// ----------------------------------------------------------------------

export default function FinancialYearPage() {
  const [years, setYears] = useState(financialYearMock);
  const [formData, setFormData] = useState(emptyFinancialYear);
  const [editing, setEditing] = useState(false);
  const [search, setSearch] = useState("");

  const filteredYears = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return years;

    return years.filter((year) =>
      [year.code, year.name, year.startDate, year.endDate].some((value) =>
        String(value).toLowerCase().includes(query)
      )
    );
  }, [years, search]);

  const handleSave = (event) => {
    event.preventDefault();

    if (!formData.code.trim()) {
      alert("Financial year code is required.");
      return;
    }
    if (!formData.name.trim()) {
      alert("Financial year name is required.");
      return;
    }
    if (!formData.startDate) {
      alert("Start date is required.");
      return;
    }
    if (!formData.endDate) {
      alert("End date is required.");
      return;
    }
    if (new Date(formData.startDate) >= new Date(formData.endDate)) {
      alert("End date must be after start date.");
      return;
    }

    const duplicate = years.some(
      (year) =>
        year.code.toLowerCase() === formData.code.trim().toLowerCase() &&
        year.id !== formData.id
    );
    if (duplicate) {
      alert("Financial year code already exists.");
      return;
    }

    const payload = {
      ...formData,
      code: formData.code.trim().toUpperCase(),
      name: formData.name.trim(),
    };

    if (editing) {
      setYears((prev) => prev.map((year) => (year.id === formData.id ? payload : year)));
      alert("Financial year updated successfully.");
    } else {
      setYears((prev) => [...prev, { ...payload, id: Date.now() }]);
      alert("Financial year saved successfully.");
    }
    handleClear();
  };

  const handleEdit = (year) => {
    setFormData({ ...year });
    setEditing(true);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this financial year?")) return;
    setYears((prev) => prev.filter((year) => year.id !== id));
  };

  const handleClear = () => {
    setFormData({ ...emptyFinancialYear });
    setEditing(false);
  };

  const handleRefresh = () => {
    setYears(financialYearMock);
    setSearch("");
    handleClear();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
            <CalendarRange size={22} className="text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Financial Year</h1>
            <p className="text-sm text-base-content/60">Manage accounting periods.</p>
          </div>
        </div>
        <button onClick={handleClear} className="btn btn-primary gap-2">
          <Plus size={17} /> New Financial Year
        </button>
      </div>

      {/* Form + Table Grid - increased right column to 1.5fr for better date fit */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[360px_1.5fr]">
        <FinancialYearForm
          formData={formData}
          setFormData={setFormData}
          onSave={handleSave}
          onClear={handleClear}
          editing={editing}
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
                  placeholder="Search financial years..."
                  className="input input-bordered w-full pl-10"
                />
              </div>
              <div className="flex gap-2">
                <div className="rounded-xl bg-base-200 px-4 py-2 text-sm">
                  Count: <span className="ml-2 font-semibold">{filteredYears.length}</span>
                </div>
                <button onClick={handleRefresh} className="btn btn-outline gap-2">
                  <RefreshCw size={16} /> Refresh
                </button>
              </div>
            </div>
          </div>

          <FinancialYearTable
            years={filteredYears}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}