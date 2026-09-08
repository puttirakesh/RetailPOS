import { motion } from "framer-motion";
import {
  Check,
  RotateCcw,
  Save,
  X,
} from "lucide-react";

export default function StateForm({
  formData,
  setFormData,
  onSave,
  onClear,
  editing,
}) {
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

          <p className="mt-1 text-xs text-base-content/50">
            Enter state information below.
          </p>
        </div>

        <button
          type="button"
          onClick={onClear}
          className="btn btn-ghost btn-sm gap-2"
        >
          <RotateCcw size={15} />
          Clear
        </button>
      </div>

      <form
        onSubmit={onSave}
        className="space-y-5"
      >
        <div>
          <label className="mb-2 block text-sm font-medium">
            State Code
          </label>

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
          <label className="mb-2 block text-sm font-medium">
            State Name
          </label>

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
          <label className="mb-2 block text-sm font-medium">
            State Type
          </label>

          <select
            name="stateType"
            value={formData.stateType}
            onChange={handleChange}
            className="select select-bordered w-full"
          >
            <option value="1">
              Local State
            </option>

            <option value="2">
              Other State
            </option>
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

          <span className="text-sm font-medium">
            Active
          </span>
        </label>

        <div className="flex gap-3 pt-3">
          <button
            type="submit"
            className="btn btn-primary flex-1 gap-2"
          >
            {editing ? (
              <Check size={17} />
            ) : (
              <Save size={17} />
            )}

            {editing ? "Update State" : "Save State"}
          </button>

          <button
            type="button"
            onClick={onClear}
            className="btn btn-ghost gap-2"
          >
            <X size={17} />
            Cancel
          </button>
        </div>
      </form>
    </motion.div>
  );
}