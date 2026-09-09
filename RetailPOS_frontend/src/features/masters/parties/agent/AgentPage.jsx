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
  UserRoundCheck,
  MapPin,
} from "lucide-react";

/* =========================================================
   CONFIG + MOCK
   ========================================================= */

const CITY_OPTIONS = [
  { code: "LDH", name: "Ludhiana" },
  { code: "JAL", name: "Jalandhar" },
  { code: "AMR", name: "Amritsar" },
  { code: "NDL", name: "New Delhi" },
];

const INITIAL_AGENTS = [
  {
    agentId: 1,
    agentName: "Direct / No Agent",
    address: "",
    mobile: "",
    cityCode: "LDH",
    cityName: "Ludhiana",
  },
  {
    agentId: 2,
    agentName: "Raj Sales Agency",
    address: "Industrial Area",
    mobile: "9876501234",
    cityCode: "LDH",
    cityName: "Ludhiana",
  },
  {
    agentId: 3,
    agentName: "Punjab Distribution",
    address: "Model Town",
    mobile: "9812309876",
    cityCode: "JAL",
    cityName: "Jalandhar",
  },
];

const EMPTY_FORM = {
  agentId: "",
  agentName: "",
  address: "",
  mobile: "",
  cityCode: "",
  cityName: "",
};

/* =========================================================
   LOOKUP MODAL (DaisyUI style)
   ========================================================= */

function AgentLookup({ onSelect, onClose }) {
  const [search, setSearch] = useState("");

  const filtered = CITY_OPTIONS.filter(
    (city) =>
      `${city.code} ${city.name}`
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-md">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Select City</h3>
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
              placeholder="Search city..."
              className="input input-bordered w-full pl-10"
            />
          </div>
          <div className="mt-4 max-h-72 overflow-auto">
            {filtered.map((city) => (
              <button
                key={city.code}
                onClick={() => { onSelect(city); onClose(); }}
                className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left hover:bg-base-200"
              >
                <div>
                  <p className="font-medium">{city.name}</p>
                  <p className="text-xs text-base-content/60">{city.code}</p>
                </div>
              </button>
            ))}
            {!filtered.length && (
              <div className="py-8 text-center text-sm text-base-content/50">No cities found</div>
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

export default function AgentPage() {
  const [agents, setAgents] = useState(INITIAL_AGENTS);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [lookup, setLookup] = useState(false);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return agents;
    return agents.filter((agent) =>
      [agent.agentId, agent.agentName, agent.mobile, agent.address, agent.cityName]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [agents, search]);

  const updateField = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const reset = () => {
    setEditingId(null);
    setForm({ ...EMPTY_FORM });
  };

  const save = () => {
    if (!form.agentName.trim()) {
      alert("Agent name is required.");
      return;
    }
    if (form.mobile && !/^\d{10}$/.test(form.mobile)) {
      alert("Enter a valid 10 digit mobile number.");
      return;
    }

    const record = {
      ...form,
      agentId: editingId ?? Math.max(0, ...agents.map((x) => x.agentId)) + 1,
    };

    if (editingId) {
      setAgents((prev) => prev.map((item) => (item.agentId === editingId ? record : item)));
    } else {
      setAgents((prev) => [...prev, record]);
    }
    reset();
  };

  const edit = (agent) => {
    setEditingId(agent.agentId);
    setForm({ ...agent });
  };

  const remove = (agent) => {
    if (agent.agentId === 1) {
      alert("Agent ID 1 is protected and cannot be deleted.");
      return;
    }
    // Simulate linked check
    if (agent.agentId === 2) {
      alert("This agent is linked to one or more suppliers and cannot be deleted.");
      return;
    }
    if (!window.confirm(`Delete ${agent.agentName}?`)) return;
    setAgents((prev) => prev.filter((item) => item.agentId !== agent.agentId));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
            <UserRoundCheck size={22} className="text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Agent Master</h1>
            <p className="text-sm text-base-content/60">Manage sales and supplier agents.</p>
          </div>
        </div>
        <button onClick={reset} className="btn btn-primary gap-2">
          <Plus size={17} /> New Agent
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
              <h2 className="text-lg font-semibold">{editingId ? "Edit Agent" : "Agent Details"}</h2>
              <p className="mt-1 text-xs text-base-content/50">Create and maintain agent records.</p>
            </div>
            <button onClick={reset} className="btn btn-ghost btn-sm gap-2">
              <RotateCcw size={15} /> Clear
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Agent ID</label>
              <input
                value={editingId || "Auto Generated"}
                disabled
                className="input input-bordered w-full bg-base-200"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Agent Name</label>
              <input
                value={form.agentName}
                onChange={(e) => updateField("agentName", e.target.value)}
                className="input input-bordered w-full"
                placeholder="Enter agent name"
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
                rows={4}
                className="textarea textarea-bordered w-full"
                placeholder="Enter address"
              />
            </div>

            <button
              type="button"
              onClick={() => setLookup(true)}
              className="flex w-full items-center justify-between rounded-xl border border-base-300 px-4 py-2.5 text-left"
            >
              <div>
                <p className="text-xs text-base-content/50">City</p>
                <p className="mt-1">{form.cityName || "Select City"}</p>
              </div>
              <MapPin size={17} className="text-base-content/40" />
            </button>

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
                  placeholder="Search agents..."
                  className="input input-bordered w-full pl-10"
                />
              </div>
              <div className="flex gap-2">
                <div className="rounded-xl bg-base-200 px-4 py-2 text-sm">
                  Count: <span className="ml-2 font-semibold">{filtered.length}</span>
                </div>
                <button onClick={() => { setAgents(INITIAL_AGENTS); setSearch(""); reset(); }} className="btn btn-outline gap-2">
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
                    <th>Agent Name</th>
                    <th>Mobile</th>
                    <th>City</th>
                    <th>Address</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="py-12 text-center text-sm text-base-content/50">
                        No agents found.
                      </td>
                    </tr>
                  ) : (
                    filtered.map((agent, index) => (
                      <motion.tr key={agent.agentId} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <td>{index + 1}</td>
                        <td className="font-medium">{agent.agentName}</td>
                        <td>{agent.mobile || "-"}</td>
                        <td>{agent.cityName || "-"}</td>
                        <td>{agent.address || "-"}</td>
                        <td>
                          <div className="flex justify-end gap-2">
                            <button onClick={() => edit(agent)} className="btn btn-ghost btn-sm btn-square">
                              <Edit3 size={16} />
                            </button>
                            <button onClick={() => remove(agent)} className="btn btn-ghost btn-sm btn-square text-error">
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

      {lookup && (
        <AgentLookup
          onClose={() => setLookup(false)}
          onSelect={(city) => {
            updateField("cityCode", city.code);
            updateField("cityName", city.name);
          }}
        />
      )}
    </div>
  );
}