import { Save } from "lucide-react";

export default function ProductEntryForm({
  formData,
  setFormData,
  products,
  onSave,
}) {
  const handleProductChange = (e) => {
    const productId = e.target.value;

    const product = products.find(
      (item) =>
        item.id === Number(productId)
    );

    setFormData((prev) => ({
      ...prev,
      productId,
      productCode:
        product?.code || "",
      productName:
        product?.name || "",
    }));
  };

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form
      onSubmit={onSave}
      className="space-y-5 rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm"
    >
      <div>
        <h2 className="text-lg font-semibold">
          Product Entry
        </h2>

        <p className="mt-1 text-xs text-base-content/50">
          Create inventory entry for a product.
        </p>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Product
        </label>

        <select
          value={formData.productId}
          onChange={handleProductChange}
          className="select select-bordered w-full"
        >
          <option value="">
            Select Product
          </option>

          {products.map((product) => (
            <option
              key={product.id}
              value={product.id}
            >
              {product.code} -{" "}
              {product.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <input
          value={formData.productCode}
          readOnly
          placeholder="Product Code"
          className="input input-bordered w-full bg-base-200"
        />

        <input
          value={formData.productName}
          readOnly
          placeholder="Product Name"
          className="input input-bordered w-full bg-base-200"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">
            EAN / Barcode
          </label>

          <input
            name="ean"
            value={formData.ean}
            onChange={handleChange}
            placeholder="8901234560012"
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Serial Number
          </label>

          <input
            name="serialNumber"
            value={formData.serialNumber}
            onChange={handleChange}
            placeholder="Optional"
            className="input input-bordered w-full"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Purchase Rate
          </label>

          <input
            type="number"
            name="purchaseRate"
            value={formData.purchaseRate}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Selling Rate
          </label>

          <input
            type="number"
            name="sellingRate"
            value={formData.sellingRate}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Quantity
          </label>

          <input
            type="number"
            min="1"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Entry Date
        </label>

        <input
          type="date"
          name="entryDate"
          value={formData.entryDate}
          onChange={handleChange}
          className="input input-bordered w-full"
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary gap-2"
      >
        <Save size={17} />
        Save Entry
      </button>
    </form>
  );
}