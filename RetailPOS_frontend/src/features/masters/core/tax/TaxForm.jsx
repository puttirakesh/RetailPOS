import { motion } from "framer-motion";
import {
  Save,
  Check,
  RotateCcw,
  X,
} from "lucide-react";

export default function TaxForm({
  formData,
  setFormData,
  onSave,
  onClear,
  editing,
  taxTypes,
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
      <div className="mb-6 flex justify-between">
        <div>
          <h2 className="text-lg font-semibold">
            {editing
              ? "Edit Tax"
              : "New Tax"}
          </h2>

          <p className="mt-1 text-xs text-base-content/50">
            Configure a tax rate.
          </p>
        </div>

        <button
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
            Tax Code
          </label>

          <input
            name="code"
            value={formData.code}
            onChange={handleChange}
            placeholder="GST18"
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Tax Name
          </label>

          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="GST 18%"
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Tax Type
          </label>

          <select
            name="taxType"
            value={formData.taxType}
            onChange={handleChange}
            className="select select-bordered w-full"
          >
            {taxTypes.map((type) => (
              <option
                key={type.value}
                value={type.value}
              >
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Tax Rate (%)
          </label>

          <input
            type="number"
            name="rate"
            value={formData.rate}
            onChange={handleChange}
            min="0"
            max="100"
            step="0.01"
            placeholder="18"
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

          <span className="text-sm font-medium">
            Active
          </span>
        </label>

        <div className="flex gap-3">
          <button
            type="submit"
            className="btn btn-primary flex-1 gap-2"
          >
            {editing ? (
              <Check size={17} />
            ) : (
              <Save size={17} />
            )}

            {editing
              ? "Update Tax"
              : "Save Tax"}
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