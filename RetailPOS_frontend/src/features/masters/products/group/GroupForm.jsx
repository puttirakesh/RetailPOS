import { motion } from "framer-motion";
import {
  Check,
  RotateCcw,
  Save,
  X,
} from "lucide-react";

import SlabTaxSection from "./SlabTaxSection";

export default function GroupForm({
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
            {editing
              ? "Edit Group"
              : "New Group"}
          </h2>

          <p className="mt-1 text-xs text-base-content/50">
            Configure group and tax behavior.
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
            Group Code
          </label>

          <input
            name="code"
            value={formData.code}
            onChange={handleChange}
            placeholder="GRP001"
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Group Name
          </label>

          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="General Goods"
            className="input input-bordered w-full"
          />
        </div>

        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-base-300 p-3">
          <input
            type="checkbox"
            name="slabRatesRequired"
            checked={formData.slabRatesRequired}
            onChange={handleChange}
            className="checkbox checkbox-primary"
          />

          <div>
            <p className="text-sm font-medium">
              Slab Rates System Required
            </p>

            <p className="text-xs text-base-content/50">
              Use slab-based taxation for this group.
            </p>
          </div>
        </label>

        {!formData.slabRatesRequired && (
          <div>
            <label className="mb-2 block text-sm font-medium">
              Core Tax
            </label>

            <input
              name="coreTax"
              value={formData.coreTax}
              onChange={handleChange}
              placeholder="18%"
              className="input input-bordered w-full"
            />
          </div>
        )}

        {formData.slabRatesRequired && (
          <SlabTaxSection
            formData={formData}
            setFormData={setFormData}
          />
        )}

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
              ? "Update Group"
              : "Save Group"}
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