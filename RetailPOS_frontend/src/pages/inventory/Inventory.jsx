import { useMemo, useState } from "react";
import {
  Boxes,
  Search,
  Package,
  AlertTriangle,
  TrendingDown,
  Warehouse,
} from "lucide-react";

const inventoryMock = [
  {
    id: 1,
    code: "PRD001",
    name: "Formal Shirt Blue",
    category: "Shirts",
    stock: 20,
    reorderLevel: 5,
    value: 19980,
    status: "In Stock",
  },
  {
    id: 2,
    code: "PRD002",
    name: "Premium Jacket",
    category: "Jackets",
    stock: 5,
    reorderLevel: 5,
    value: 17495,
    status: "Low Stock",
  },
  {
    id: 3,
    code: "PRD003",
    name: "Slim Fit Trousers",
    category: "Trousers",
    stock: 14,
    reorderLevel: 4,
    value: 25186,
    status: "In Stock",
  },
  {
    id: 4,
    code: "PRD004",
    name: "Cotton T-Shirt",
    category: "T-Shirts",
    stock: 2,
    reorderLevel: 10,
    value: 1598,
    status: "Critical",
  },
  {
    id: 5,
    code: "PRD005",
    name: "Leather Wallet",
    category: "Accessories",
    stock: 0,
    reorderLevel: 4,
    value: 0,
    status: "Out of Stock",
  },
];

export default function Inventory() {
  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("");

  const filtered = useMemo(() => {
    const query =
      search.trim().toLowerCase();

    return inventoryMock.filter(
      (item) => {
        const searchMatch =
          !query ||
          [
            item.code,
            item.name,
            item.category,
          ].some((field) =>
            String(field)
              .toLowerCase()
              .includes(query)
          );

        const statusMatch =
          !status ||
          item.status === status;

        return (
          searchMatch &&
          statusMatch
        );
      }
    );
  }, [search, status]);

  const totalUnits =
    inventoryMock.reduce(
      (sum, item) =>
        sum + item.stock,
      0
    );

  const totalValue =
    inventoryMock.reduce(
      (sum, item) =>
        sum + item.value,
      0
    );

  const lowStockCount =
    inventoryMock.filter(
      (item) =>
        item.stock <=
        item.reorderLevel
    ).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          Inventory
        </h1>

        <p className="mt-1 text-sm text-base-content/60">
          Monitor stock levels, inventory value and reorder requirements.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-base-300 bg-base-100 p-5">
          <Package
            size={20}
            className="text-primary"
          />

          <p className="mt-4 text-sm text-base-content/50">
            Total Products
          </p>

          <p className="mt-1 text-2xl font-bold">
            {inventoryMock.length}
          </p>
        </div>

        <div className="rounded-2xl border border-base-300 bg-base-100 p-5">
          <Boxes
            size={20}
            className="text-primary"
          />

          <p className="mt-4 text-sm text-base-content/50">
            Total Units
          </p>

          <p className="mt-1 text-2xl font-bold">
            {totalUnits}
          </p>
        </div>

        <div className="rounded-2xl border border-base-300 bg-base-100 p-5">
          <Warehouse
            size={20}
            className="text-primary"
          />

          <p className="mt-4 text-sm text-base-content/50">
            Inventory Value
          </p>

          <p className="mt-1 text-2xl font-bold">
            ₹
            {totalValue.toLocaleString(
              "en-IN"
            )}
          </p>
        </div>

        <div className="rounded-2xl border border-base-300 bg-base-100 p-5">
          <AlertTriangle
            size={20}
            className="text-warning"
          />

          <p className="mt-4 text-sm text-base-content/50">
            Low Stock
          </p>

          <p className="mt-1 text-2xl font-bold">
            {lowStockCount}
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-base-300 bg-base-100 p-4">
        <div className="flex flex-col gap-3 md:flex-row">
          <div className="relative flex-1">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40"
            />

            <input
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search inventory..."
              className="input input-bordered w-full pl-10"
            />
          </div>

          <select
            value={status}
            onChange={(event) =>
              setStatus(
                event.target.value
              )
            }
            className="select select-bordered md:w-48"
          >
            <option value="">
              All Status
            </option>

            <option value="In Stock">
              In Stock
            </option>

            <option value="Low Stock">
              Low Stock
            </option>

            <option value="Critical">
              Critical
            </option>

            <option value="Out of Stock">
              Out of Stock
            </option>
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-base-300 bg-base-100">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Product</th>
                <th>Category</th>
                <th>Stock</th>
                <th>Reorder Level</th>
                <th>Value</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((item) => (
                <tr key={item.id}>
                  <td className="font-mono text-xs">
                    {item.code}
                  </td>

                  <td className="font-medium">
                    {item.name}
                  </td>

                  <td>
                    {item.category}
                  </td>

                  <td className="font-semibold">
                    {item.stock}
                  </td>

                  <td>
                    {item.reorderLevel}
                  </td>

                  <td>
                    ₹
                    {item.value.toLocaleString(
                      "en-IN"
                    )}
                  </td>

                  <td>
                    <span
                      className={`badge badge-outline ${
                        item.status ===
                        "In Stock"
                          ? "badge-success"
                          : item.status ===
                              "Low Stock"
                            ? "badge-warning"
                            : "badge-error"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan="7"
                    className="py-12 text-center text-base-content/50"
                  >
                    No inventory records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center gap-2 rounded-xl border border-warning/20 bg-warning/5 p-4 text-sm">
        <TrendingDown
          size={17}
          className="text-warning"
        />

        <span>
          Low-stock alerts are based on the configured reorder level.
        </span>
      </div>
    </div>
  );
}