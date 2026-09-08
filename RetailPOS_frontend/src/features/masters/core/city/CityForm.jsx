import { motion } from "framer-motion";
import {
  RotateCcw,
  Save,
  Check,
  X,
} from "lucide-react";

export default function CityForm({
  formData,
  setFormData,
  onSave,
  onClear,
  editing,
  states,
}) {
  const handleChange = (event) => {
    const { name, value, type, checked } =
      event.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: -15,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm"
    >
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">
            {editing ? "Edit City" : "New City"}
          </h2>

          <p className="mt-1 text-xs text-base-content/50">
            Select the state associated with this city.
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
            City Code
          </label>

          <input
            name="code"
            value={formData.code}
            onChange={handleChange}
            placeholder="e.g. LDH"
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            City Name
          </label>

          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Ludhiana"
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            State
          </label>

          <select
            name="stateId"
            value={formData.stateId}
            onChange={handleChange}
            className="select select-bordered w-full"
          >
            <option value="">
              Select State
            </option>

            {states.map((state) => (
              <option
                key={state.id}
                value={state.id}
              >
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

            {editing ? "Update City" : "Save City"}
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