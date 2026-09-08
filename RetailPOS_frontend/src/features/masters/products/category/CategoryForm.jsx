import { motion } from "framer-motion";
import {
  Check,
  Save,
  RotateCcw,
  X,
  SlidersHorizontal,
} from "lucide-react";

export default function CategoryForm({
  formData,
  setFormData,
  onSave,
  onClear,
  editing,
  groups,
  onOpenMapping,
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
      <div className="mb-6 flex justify-between">
        <div>
          <h2 className="text-lg font-semibold">
            {editing
              ? "Edit Category"
              : "New Category"}
          </h2>

          <p className="mt-1 text-xs text-base-content/50">
            Configure category and group mapping.
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
            Category Code
          </label>

          <input
            name="code"
            value={formData.code}
            onChange={handleChange}
            placeholder="CAT001"
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Category Name
          </label>

          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Shirts"
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Group
          </label>

          <select
            name="groupId"
            value={formData.groupId}
            onChange={(e) => {
              handleChange(e);

              const group = groups.find(
                (item) =>
                  item.id ===
                  Number(e.target.value)
              );

              setFormData((prev) => ({
                ...prev,
                taxInfo:
                  group?.slabRatesRequired
                    ? "Slab Tax"
                    : group?.coreTax || "",
              }));
            }}
            className="select select-bordered w-full"
          >
            <option value="">
              Select Group
            </option>

            {groups.map((group) => (
              <option
                key={group.id}
                value={group.id}
              >
                {group.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Group Tax Info
          </label>

          <input
            value={
              formData.taxInfo || "Select group first"
            }
            readOnly
            className="input input-bordered w-full bg-base-200"
          />
        </div>

        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-base-300 p-3">
          <input
            type="checkbox"
            name="assignAttributes"
            checked={formData.assignAttributes}
            onChange={handleChange}
            className="checkbox checkbox-primary"
          />

          <span className="text-sm font-medium">
            Assign Attributes to Category
          </span>
        </label>

        {formData.assignAttributes && (
          <button
            type="button"
            onClick={onOpenMapping}
            className="btn btn-outline w-full gap-2"
          >
            <SlidersHorizontal size={17} />
            Configure Attributes
          </button>
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
              ? "Update Category"
              : "Save Category"}
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