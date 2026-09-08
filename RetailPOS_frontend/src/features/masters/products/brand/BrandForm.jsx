import { motion } from "framer-motion";
import {
  Save,
  Check,
  RotateCcw,
  X,
} from "lucide-react";

export default function BrandForm({
  formData,
  setFormData,
  onSave,
  onClear,
  editing,
}) {
  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

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
      initial={{ opacity: 0, x: -15 }}
      animate={{ opacity: 1, x: 0 }}
      className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm"
    >
      <div className="mb-6 flex justify-between">
        <div>
          <h2 className="text-lg font-semibold">
            {editing ? "Edit Brand" : "New Brand"}
          </h2>

          <p className="mt-1 text-xs text-base-content/50">
            Manage brand information and margins.
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

      <form onSubmit={onSave} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Brand Code
          </label>

          <input
            name="code"
            value={formData.code}
            onChange={handleChange}
            placeholder="BRD001"
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Brand Name
          </label>

          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Brand name"
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Margin (%)
          </label>

          <input
            type="number"
            name="margin"
            value={formData.margin}
            onChange={handleChange}
            min="0"
            max="100"
            step="0.01"
            placeholder="12"
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
              ? "Update Brand"
              : "Save Brand"}
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