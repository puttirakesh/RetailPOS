import { motion } from "framer-motion";
import {
  Save,
  Check,
  RotateCcw,
  X,
} from "lucide-react";

export default function BranchForm({
  formData,
  setFormData,
  onSave,
  onClear,
  editing,
  states,
  gstTypes,
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
      initial={{ opacity: 0, x: -15 }}
      animate={{ opacity: 1, x: 0 }}
      className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm"
    >
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">
            {editing
              ? "Edit Branch"
              : "New Branch"}
          </h2>

          <p className="mt-1 text-xs text-base-content/50">
            Enter branch information.
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
        className="space-y-4"
      >
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-sm font-medium">
              Branch Code
            </label>

            <input
              name="code"
              value={formData.code}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="BR001"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Cost Code
            </label>

            <input
              name="costCode"
              value={formData.costCode}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="CC001"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Branch Name
          </label>

          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Main Branch"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-sm font-medium">
              Mobile
            </label>

            <input
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="9876543210"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="branch@example.com"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            GST No
          </label>

          <input
            name="gstNo"
            value={formData.gstNo}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="GST Number"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Address
          </label>

          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
            rows="3"
            placeholder="Branch address"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-sm font-medium">
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

          <div>
            <label className="mb-1 block text-sm font-medium">
              GST Type
            </label>

            <select
              name="gstType"
              value={formData.gstType}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              {gstTypes.map((type) => (
                <option
                  key={type}
                  value={type}
                >
                  {type}
                </option>
              ))}
            </select>
          </div>
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

            {editing
              ? "Update Branch"
              : "Save Branch"}
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