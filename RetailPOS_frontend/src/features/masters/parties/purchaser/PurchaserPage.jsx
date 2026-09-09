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
  UserCheck,
} from "lucide-react";

/* =========================================================
   CONFIG
   ========================================================= */

const EMPTY_FORM = {
  purchaserId: "",
  purchaserCode: "",
  purchaserName: "",
  active: true,
};

const INITIAL_PURCHASERS = [
  { purchaserId: 1, purchaserCode: "PUR0001", purchaserName: "Default Purchaser", active: true },
  { purchaserId: 2, purchaserCode: "PUR0002", purchaserName: "Main Purchase Team", active: true },
  { purchaserId: 3, purchaserCode: "PUR0003", purchaserName: "North Region Purchase", active: false },
];

const generateCode = (items) => {
  const maxId = items.reduce((max, item) => Math.max(max, Number(item.purchaserId) || 0), 0);
  return `PUR${String(maxId + 1).padStart(4, "0")}`;
};

/* =========================================================
   PAGE
   ========================================================= */

export default function PurchaserPage() {
  const [purchasers, setPurchasers] = useState(INITIAL_PURCHASERS);
  const [form, setForm] = useState({
    ...EMPTY_FORM,
    purchaserCode: generateCode(INITIAL_PURCHASERS),
  });
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return purchasers;
    return purchasers.filter((item) =>
      [item.purchaserCode, item.purchaserName, item.active ? "active" : "inactive"]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [purchasers, search]);

  const updateField = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const reset = () => {
    setEditingId(null);
    setForm({ ...EMPTY_FORM, purchaserCode: generateCode(purchasers) });
  };

  const save = () => {
    if (!form.purchaserCode.trim()) {
      alert("Purchaser code is required.");
      return;
    }
    if (!form.purchaserName.trim()) {
      alert("Purchaser name is required.");
      return;
    }
    const duplicate = purchasers.some(
      (item) =>
        item.purchaserCode.toLowerCase() === form.purchaserCode.trim().toLowerCase() &&
        item.purchaserId !== editingId
    );
    if (duplicate) {
      alert("Purchaser code already exists.");
      return;
    }

    const record = {
      ...form,
      purchaserId: editingId ?? Math.max(0, ...purchasers.map((x) => x.purchaserId)) + 1,
    };

    if (editingId) {
      setPurchasers((prev) => prev.map((item) => (item.purchaserId === editingId ? record : item)));
    } else {
      setPurchasers((prev) => [...prev, record]);
    }
    reset();
  };

  const edit = (item) => {
    setEditingId(item.purchaserId);
    setForm({ ...item });
  };

  const remove = (item) => {
    if (item.purchaserId === 1) {
      alert("Purchaser ID 1 is protected and cannot be deleted.");
      return;
    }
    if (!window.confirm(`Delete ${item.purchaserName}?`)) return;
    setPurchasers((prev) => prev.filter((row) => row.purchaserId !== item.purchaserId));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
            <UserCheck size={22} className="text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Purchaser Master</h1>
            <p className="text-sm text-base-content/60">Manage purchase team members and purchaser codes.</p>
          </div>
        </div>
        <button onClick={reset} className="btn btn-primary gap-2">
          <Plus size={17} /> New Purchaser
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
              <h2 className="text-lg font-semibold">{editingId ? "Edit Purchaser" : "Purchaser Details"}</h2>
              <p className="mt-1 text-xs text-base-content/50">Maintain purchaser master information.</p>
            </div>
            <button onClick={reset} className="btn btn-ghost btn-sm gap-2">
              <RotateCcw size={15} /> Clear
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Purchaser ID</label>
              <input
                value={editingId || "Auto Generated"}
                disabled
                className="input input-bordered w-full bg-base-200"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Purchaser Code</label>
              <input
                value={form.purchaserCode}
                onChange={(e) => updateField("purchaserCode", e.target.value.toUpperCase())}
                className="input input-bordered w-full"
                placeholder="PUR0004"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Purchaser Name</label>
              <input
                value={form.purchaserName}
                onChange={(e) => updateField("purchaserName", e.target.value)}
                className="input input-bordered w-full"
                placeholder="Enter name"
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
                  placeholder="Search purchasers..."
                  className="input input-bordered w-full pl-10"
                />
              </div>
              <div className="flex gap-2">
                <div className="rounded-xl bg-base-200 px-4 py-2 text-sm">
                  Count: <span className="ml-2 font-semibold">{filtered.length}</span>
                </div>
                <button
                  onClick={() => { setPurchasers(INITIAL_PURCHASERS); setSearch(""); reset(); }}
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
                    <th>Status</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="py-12 text-center text-sm text-base-content/50">
                        No purchasers found.
                      </td>
                    </tr>
                  ) : (
                    filtered.map((item, index) => (
                      <motion.tr key={item.purchaserId} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <td>{index + 1}</td>
                        <td className="font-mono">{item.purchaserCode}</td>
                        <td className="font-medium">{item.purchaserName}</td>
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