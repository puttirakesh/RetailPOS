import { motion } from "framer-motion";
import {
  Check,
  Save,
  RotateCcw,
  X,
} from "lucide-react";

export default function ProductForm({
  formData,
  setFormData,
  onSave,
  onClear,
  editing,
  categories,
  groups,
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
              ? "Edit Product"
              : "New Product"}
          </h2>

          <p className="mt-1 text-xs text-base-content/50">
            Configure product master information.
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
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Product Code
            </label>

            <input
              name="code"
              value={formData.code}
              onChange={handleChange}
              placeholder="PRD001"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Product Name
            </label>

            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Product name"
              className="input input-bordered w-full"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">
              HSN
            </label>

            <input
              name="hsn"
              value={formData.hsn}
              onChange={handleChange}
              placeholder="62052000"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              UOM
            </label>

            <select
              name="uom"
              value={formData.uom}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option>PCS</option>
              <option>BOX</option>
              <option>KG</option>
              <option>GRAM</option>
              <option>LTR</option>
              <option>MTR</option>
            </select>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Category
            </label>

            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={(e) => {
                handleChange(e);

                const category =
                  categories.find(
                    (item) =>
                      item.id ===
                      Number(
                        e.target.value
                      )
                  );

                if (category) {
                  setFormData((prev) => ({
                    ...prev,
                    groupId:
                      category.groupId,
                  }));
                }
              }}
              className="select select-bordered w-full"
            >
              <option value="">
                Select Category
              </option>

              {categories.map(
                (category) => (
                  <option
                    key={category.id}
                    value={category.id}
                  >
                    {category.name}
                  </option>
                )
              )}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Group
            </label>

            <select
              name="groupId"
              value={formData.groupId}
              onChange={handleChange}
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
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Tax
          </label>

          <select
            name="taxId"
            value={formData.taxId}
            onChange={handleChange}
            className="select select-bordered w-full"
          >
            <option value="">
              Select Tax
            </option>

            <option value="GST5">
              GST 5%
            </option>

            <option value="GST12">
              GST 12%
            </option>

            <option value="GST18">
              GST 18%
            </option>

            <option value="GST28">
              GST 28%
            </option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Product Type
          </label>

          <select
            name="productType"
            value={formData.productType}
            onChange={handleChange}
            className="select select-bordered w-full"
          >
            <option>
              Inventory
            </option>

            <option>
              Service
            </option>

            <option>
              NonInventory
            </option>
          </select>
        </div>

        <div className="rounded-2xl border border-base-300 bg-base-200/40 p-4">
          <h3 className="mb-4 text-sm font-semibold">
            Product Behaviour
          </h3>

          <div className="grid gap-3 md:grid-cols-2">
            {[
              [
                "uniqueProduct",
                "Unique Product",
              ],
              [
                "bulkProduct",
                "Bulk Product",
              ],
              [
                "autoEAN",
                "Auto EAN",
              ],
              [
                "entryWiseEAN",
                "Entry-wise EAN",
              ],
              [
                "discountNotApplicable",
                "Discount Not Applicable",
              ],
              [
                "manualBarcodeRestriction",
                "Manual Barcode Restriction",
              ],
              [
                "nonInventory",
                "Non Inventory",
              ],
            ].map(
              ([name, label]) => (
                <label
                  key={name}
                  className="flex cursor-pointer items-center gap-3 rounded-xl border border-base-300 bg-base-100 p-3"
                >
                  <input
                    type="checkbox"
                    name={name}
                    checked={formData[name]}
                    onChange={handleChange}
                    className="checkbox checkbox-primary checkbox-sm"
                  />

                  <span className="text-sm">
                    {label}
                  </span>
                </label>
              )
            )}
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
              ? "Update Product"
              : "Save Product"}
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