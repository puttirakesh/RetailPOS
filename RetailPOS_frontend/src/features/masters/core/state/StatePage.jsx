import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  RefreshCw,
  Search,
  Database,
} from "lucide-react";

import StateForm from "./StateForm";
import StateTable from "./StateTable";
import { emptyState } from "./stateConfig";
import { stateMock } from "./stateMock";

export default function StatePage() {
  const [states, setStates] = useState(stateMock);
  const [formData, setFormData] = useState(emptyState);
  const [editing, setEditing] = useState(false);
  const [search, setSearch] = useState("");

  const filteredStates = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return states;
    }

    return states.filter((state) =>
      [
        state.code,
        state.name,
        state.stateType,
      ].some((value) =>
        String(value)
          .toLowerCase()
          .includes(query)
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
        state.code.toLowerCase() ===
          formData.code.trim().toLowerCase() &&
        state.id !== formData.id
    );

    if (duplicate) {
      alert("State code already exists.");
      return;
    }

    if (editing) {
      setStates((prev) =>
        prev.map((state) =>
          state.id === formData.id
            ? {
                ...formData,
                code: formData.code
                  .trim()
                  .toUpperCase(),
                name: formData.name.trim(),
              }
            : state
        )
      );

      alert("State updated successfully.");
    } else {
      const newState = {
        ...formData,
        id: Date.now(),
        code: formData.code
          .trim()
          .toUpperCase(),
        name: formData.name.trim(),
      };

      setStates((prev) => [
        ...prev,
        newState,
      ]);

      alert("State saved successfully.");
    }

    handleClear();
  };

  const handleEdit = (state) => {
    setFormData(state);
    setEditing(true);
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this state?"
    );

    if (!confirmed) {
      return;
    }

    setStates((prev) =>
      prev.filter((state) => state.id !== id)
    );

    if (formData.id === id) {
      handleClear();
    }
  };

  const handleClear = () => {
    setFormData({
      ...emptyState,
    });

    setEditing(false);
  };

  const handleRefresh = () => {
    setStates(stateMock);
    setSearch("");
    handleClear();
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                <Database
                  size={22}
                  className="text-primary"
                />
              </div>

              <div>
                <h1 className="text-2xl font-bold">
                  State Master
                </h1>

                <p className="text-sm text-base-content/60">
                  Manage states used across the system.
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClear}
            className="btn btn-primary gap-2"
          >
            <Plus size={17} />
            New State
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
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Search states..."
                  className="input input-bordered w-full pl-10"
                />
              </div>

              <div className="flex items-center gap-2">
                <div className="rounded-xl bg-base-200 px-4 py-2 text-sm">
                  Count:
                  <span className="ml-2 font-semibold">
                    {filteredStates.length}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleRefresh}
                  className="btn btn-outline gap-2"
                >
                  <RefreshCw size={16} />
                  Refresh
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