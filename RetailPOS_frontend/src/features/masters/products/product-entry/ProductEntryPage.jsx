import { useMemo, useState } from "react";
import {
  Barcode,
  Edit3,
  PackageCheck,
  Search,
  Trash2,
} from "lucide-react";

import ProductEntryForm from "./ProductEntryForm";
import ProductEntryDetails from "./ProductEntryDetails";

import {
  emptyProductEntry,
} from "./productEntryConfig";

import {
  productEntryMock,
} from "./productEntryMock";

import {
  productMock,
} from "../product/productMock";

export default function ProductEntryPage() {
  const [entries, setEntries] =
    useState(productEntryMock);

  const [formData, setFormData] =
    useState({
      ...emptyProductEntry,
      entryDate:
        new Date()
          .toISOString()
          .split("T")[0],
    });

  const [selectedEntry, setSelectedEntry] =
    useState(null);

  const [search, setSearch] =
    useState("");

  const filteredEntries = useMemo(() => {
    const query =
      search.trim().toLowerCase();

    if (!query) return entries;

    return entries.filter((entry) =>
      [
        entry.productCode,
        entry.productName,
        entry.ean,
        entry.serialNumber,
      ].some((value) =>
        String(value)
          .toLowerCase()
          .includes(query)
      )
    );
  }, [entries, search]);

  const handleSave = (e) => {
    e.preventDefault();

    if (!formData.productId) {
      alert("Please select a product.");
      return;
    }

    if (!formData.entryDate) {
      alert("Entry date is required.");
      return;
    }

    const payload = {
      ...formData,
      id: Date.now(),
      productId: Number(
        formData.productId
      ),
      quantity: Number(
        formData.quantity
      ),
      purchaseRate: Number(
        formData.purchaseRate
      ),
      sellingRate: Number(
        formData.sellingRate
      ),
    };

    setEntries((prev) => [
      ...prev,
      payload,
    ]);

    setFormData({
      ...emptyProductEntry,
      entryDate:
        new Date()
          .toISOString()
          .split("T")[0],
    });

    alert(
      "Product entry saved successfully."
    );
  };

  const handleDelete = (id) => {
    if (
      window.confirm(
        "Delete this product entry?"
      )
    ) {
      setEntries((prev) =>
        prev.filter(
          (entry) => entry.id !== id
        )
      );

      if (
        selectedEntry?.id === id
      ) {
        setSelectedEntry(null);
      }
    }
  };

  const handleEdit = (entry) => {
    setFormData({
      ...entry,
      productId: String(
        entry.productId
      ),
      quantity: String(
        entry.quantity
      ),
      purchaseRate: String(
        entry.purchaseRate
      ),
      sellingRate: String(
        entry.sellingRate
      ),
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
          <PackageCheck
            size={22}
            className="text-primary"
          />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            Product Entry
          </h1>

          <p className="text-sm text-base-content/60">
            Create and manage product inventory entries.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[440px_1fr]">
        <ProductEntryForm
          formData={formData}
          setFormData={setFormData}
          products={productMock}
          onSave={handleSave}
        />

        <div className="space-y-4">
          <div className="rounded-2xl border border-base-300 bg-base-100 p-4">
            <div className="relative">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40"
              />

              <input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search product entries..."
                className="input input-bordered w-full pl-10"
              />
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-base-300 bg-base-100">
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Product</th>
                    <th>EAN</th>
                    <th>Qty</th>
                    <th>Sell Rate</th>
                    <th>Date</th>
                    <th className="text-right">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredEntries.map(
                    (entry, index) => (
                      <tr
                        key={entry.id}
                        className={
                          selectedEntry?.id ===
                          entry.id
                            ? "bg-primary/5"
                            : ""
                        }
                      >
                        <td>
                          {index + 1}
                        </td>

                        <td>
                          <button
                            onClick={() =>
                              setSelectedEntry(
                                entry
                              )
                            }
                            className="flex items-center gap-2 font-medium text-primary"
                          >
                            <Barcode
                              size={15}
                            />

                            {
                              entry.productName
                            }
                          </button>
                        </td>

                        <td className="font-mono text-xs">
                          {entry.ean}
                        </td>

                        <td>
                          {entry.quantity}
                        </td>

                        <td>
                          ₹
                          {
                            entry.sellingRate
                          }
                        </td>

                        <td>
                          {entry.entryDate}
                        </td>

                        <td>
                          <div className="flex justify-end gap-1">
                            <button
                              onClick={() =>
                                handleEdit(
                                  entry
                                )
                              }
                              className="btn btn-ghost btn-sm btn-square"
                            >
                              <Edit3
                                size={15}
                              />
                            </button>

                            <button
                              onClick={() =>
                                handleDelete(
                                  entry.id
                                )
                              }
                              className="btn btn-ghost btn-sm btn-square text-error"
                            >
                              <Trash2
                                size={15}
                              />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  )}

                  {filteredEntries.length ===
                    0 && (
                    <tr>
                      <td
                        colSpan="7"
                        className="py-12 text-center text-base-content/50"
                      >
                        No entries found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <ProductEntryDetails
            entry={selectedEntry}
          />
        </div>
      </div>
    </div>
  );
}