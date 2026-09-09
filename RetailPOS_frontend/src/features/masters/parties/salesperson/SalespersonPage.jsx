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
  BriefcaseBusiness,
} from "lucide-react";

/* =========================================================
   CONFIG
   ========================================================= */

const EMPTY_FORM = {
  salespersonId: "",
  salespersonCode: "",
  salespersonName: "",
  mobile: "",
  email: "",
  commissionPercent: 0,
  active: true,
};

const INITIAL_SALESPERSONS = [
  {
    salespersonId: 1,
    salespersonCode: "SAL0001",
    salespersonName: "Default Salesperson",
    mobile: "9999999999",
    email: "",
    commissionPercent: 0,
    active: true,
  },
  {
    salespersonId: 2,
    salespersonCode: "SAL0002",
    salespersonName: "Raj Kumar",
    mobile: "9876543210",
    email: "raj@example.com",
    commissionPercent: 2.5,
    active: true,
  },
  {
    salespersonId: 3,
    salespersonCode: "SAL0003",
    salespersonName: "Aman Sharma",
    mobile: "9812345678",
    email: "aman@example.com",
    commissionPercent: 3,
    active: false,
  },
];

const generateCode = (items) => {
  const maxId = items.reduce((max, item) => Math.max(max, Number(item.salespersonId) || 0), 0);
  return `SAL${String(maxId + 1).padStart(4, "0")}`;
};

/* =========================================================
   PAGE
   ========================================================= */

export default function SalespersonPage() {
  const [salespersons, setSalespersons] = useState(INITIAL_SALESPERSONS);
  const [form, setForm] = useState({
    ...EMPTY_FORM,
    salespersonCode: generateCode(INITIAL_SALESPERSONS),
  });
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return salespersons;
    return salespersons.filter((item) =>
      [item.salespersonCode, item.salespersonName, item.mobile, item.email]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [salespersons, search]);

  const updateField = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const reset = () => {
    setEditingId(null);
    setForm({ ...EMPTY_FORM, salespersonCode: generateCode(salespersons) });
  };

  const save = () => {
    if (!form.salespersonName.trim()) {
      alert("Salesperson name is required.");
      return;
    }
    if (form.mobile && !/^\d{10}$/.test(form.mobile)) {
      alert("Enter a valid 10 digit mobile number.");
      return;
    }
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      alert("Enter a valid email.");
      return;
    }
    const commission = Number(form.commissionPercent);
    if (commission < 0 || commission > 100) {
      alert("Commission must be between 0 and 100.");
      return;
    }

    const duplicateCode = salespersons.some(
      (item) =>
        item.salespersonCode.toLowerCase() === form.salespersonCode.trim().toLowerCase() &&
        item.salespersonId !== editingId
    );
    if (duplicateCode) {
      alert("Salesperson code already exists.");
      return;
    }

    const record = {
      ...form,
      salespersonId: editingId ?? Math.max(0, ...salespersons.map((x) => x.salespersonId)) + 1,
      commissionPercent: commission,
    };

    if (editingId) {
      setSalespersons((prev) => prev.map((item) => (item.salespersonId === editingId ? record : item)));
    } else {
      setSalespersons((prev) => [...prev, record]);
    }
    reset();
  };

  const edit = (item) => {
    setEditingId(item.salespersonId);
    setForm({ ...item });
  };

  const remove = (item) => {
    if (item.salespersonId === 1) {
      alert("Default salesperson cannot be deleted.");
      return;
    }
    if (!window.confirm(`Delete ${item.salespersonName}?`)) return;
    setSalespersons((prev) => prev.filter((row) => row.salespersonId !== item.salespersonId));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
            <BriefcaseBusiness size={22} className="text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Salesperson Master</h1>
            <p className="text-sm text-base-content/60">Manage salesperson profiles and commission settings.</p>
          </div>
        </div>
        <button onClick={reset} className="btn btn-primary gap-2">
          <Plus size={17} /> New Salesperson
        </button>
      </div>

      <div className="grid gap-6 xl:grid-cols-[360px_1fr]">
        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm"
        >
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">{editingId ? "Edit Salesperson" : "Salesperson Details"}</h2>
              <p className="mt-1 text-xs text-base-content/50">Maintain salesperson master information.</p>
            </div>
            <button onClick={reset} className="btn btn-ghost btn-sm gap-2">
              <RotateCcw size={15} /> Clear
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Salesperson Code</label>
              <input
                value={form.salespersonCode}
                onChange={(e) => updateField("salespersonCode", e.target.value.toUpperCase())}
                className="input input-bordered w-full"
                placeholder="SAL0004"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Salesperson Name</label>
              <input
                value={form.salespersonName}
                onChange={(e) => updateField("salespersonName", e.target.value)}
                className="input input-bordered w-full"
                placeholder="Enter name"
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
              <label className="mb-1 block text-sm font-medium">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                className="input input-bordered w-full"
                placeholder="sales@example.com"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Commission %</label>
              <input
                type="number"
                value={form.commissionPercent}
                onChange={(e) => updateField("commissionPercent", e.target.value)}
                className="input input-bordered w-full"
                min="0"
                max="100"
                step="0.1"
              />
            </div>

            <label className="flex items-center gap-2 rounded-xl border border-base-300 p-3 text-sm">
              <input
                type="checkbox"
                checked={form.active}
                onChange={(e) => updateField("active", e.target.checked)}
                className="checkbox checkbox-primary"
              />
              Active
            </label>

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
                  placeholder="Search salespersons..."
                  className="input input-bordered w-full pl-10"
                />
              </div>
              <div className="flex gap-2">
                <div className="rounded-xl bg-base-200 px-4 py-2 text-sm">
                  Count: <span className="ml-2 font-semibold">{filtered.length}</span>
                </div>
                <button
                  onClick={() => { setSalespersons(INITIAL_SALESPERSONS); setSearch(""); reset(); }}
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
                    <th>#</th>
                    <th>Code</th>
                    <th>Name</th>
                    <th>Mobile</th>
                    <th>Commission</th>
                    <th>Status</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="py-12 text-center text-sm text-base-content/50">
                        No salespersons found.
                      </td>
                    </tr>
                  ) : (
                    filtered.map((item, index) => (
                      <motion.tr key={item.salespersonId} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <td>{index + 1}</td>
                        <td className="font-mono">{item.salespersonCode}</td>
                        <td className="font-medium">{item.salespersonName}</td>
                        <td>{item.mobile || "-"}</td>
                        <td>{item.commissionPercent}%</td>
                        <td>
                          {item.active ? (
                            <span className="badge badge-success badge-outline">Active</span>
                          ) : (
                            <span className="badge badge-error badge-outline">Inactive</span>
                          )}
                        </td>
                        <td>
                          <div className="flex justify-end gap-2">
                            <button onClick={() => edit(item)} className="btn btn-ghost btn-sm btn-square">
                              <Edit3 size={16} />
                            </button>
                            <button onClick={() => remove(item)} className="btn btn-ghost btn-sm btn-square text-error">
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
    </div>
  );
}