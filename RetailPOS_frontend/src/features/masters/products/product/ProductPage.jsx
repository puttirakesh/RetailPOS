import { useMemo, useState } from "react";
import {
  Download,
  Import,
  Package,
  Plus,
  RefreshCw,
  Search,
} from "lucide-react";

import ProductForm from "./ProductForm";
import ProductTable from "./ProductTable";
import ProductDetails from "./ProductDetails";
import ProductImportDialog from "./ProductImportDialog";
import ProductExportDialog from "./ProductExportDialog";
import ProductFilters from "./ProductFilters";

import {
  emptyProduct,
} from "./productConfig";

import {
  productMock,
} from "./productMock";

import {
  categoryMock,
} from "../category/categoryMock";

import {
  groupMock,
} from "../group/groupMock";

export default function ProductPage() {
  const [products, setProducts] =
    useState(productMock);

  const [formData, setFormData] =
    useState(emptyProduct);

  const [editing, setEditing] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [filters, setFilters] =
    useState({
      categoryId: "",
      groupId: "",
      productType: "",
      active: "",
    });

  const [selectedProduct, setSelectedProduct] =
    useState(null);

  const [importOpen, setImportOpen] =
    useState(false);

  const [exportOpen, setExportOpen] =
    useState(false);

  const filteredProducts = useMemo(() => {
    const query =
      search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        !query ||
        [
          product.code,
          product.name,
          product.hsn,
        ].some((value) =>
          String(value)
            .toLowerCase()
            .includes(query)
        );

      const matchesCategory =
        !filters.categoryId ||
        product.categoryId ===
          Number(
            filters.categoryId
          );

      const matchesGroup =
        !filters.groupId ||
        product.groupId ===
          Number(filters.groupId);

      const matchesType =
        !filters.productType ||
        product.productType ===
          filters.productType;

      const matchesStatus =
        !filters.active ||
        String(product.active) ===
          filters.active;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesGroup &&
        matchesType &&
        matchesStatus
      );
    });
  }, [
    products,
    search,
    filters,
  ]);

  const handleSave = (e) => {
    e.preventDefault();

    if (!formData.code.trim()) {
      alert("Product code is required.");
      return;
    }

    if (!formData.name.trim()) {
      alert("Product name is required.");
      return;
    }

    if (!formData.categoryId) {
      alert("Category is required.");
      return;
    }

    if (!formData.hsn.trim()) {
      alert("HSN is required.");
      return;
    }

    const duplicateCode = products.some(
      (product) =>
        product.code.toLowerCase() ===
          formData.code
            .trim()
            .toLowerCase() &&
        product.id !== formData.id
    );

    if (duplicateCode) {
      alert(
        "Product code already exists."
      );

      return;
    }

    const payload = {
      ...formData,
      code: formData.code
        .trim()
        .toUpperCase(),
      name: formData.name.trim(),
      hsn: formData.hsn.trim(),
      categoryId: Number(
        formData.categoryId
      ),
      groupId: Number(
        formData.groupId
      ),
    };

    if (editing) {
      setProducts((prev) =>
        prev.map((product) =>
          product.id === formData.id
            ? payload
            : product
        )
      );

      alert(
        "Product updated successfully."
      );
    } else {
      setProducts((prev) => [
        ...prev,
        {
          ...payload,
          id: Date.now(),
        },
      ]);

      alert(
        "Product saved successfully."
      );
    }

    handleClear();
  };

  const handleEdit = (product) => {
    setFormData({
      ...product,
      categoryId: String(
        product.categoryId
      ),
      groupId: String(
        product.groupId
      ),
    });

    setEditing(true);
  };

  const handleDelete = (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this product?"
      )
    ) {
      setProducts((prev) =>
        prev.filter(
          (product) => product.id !== id
        )
      );
    }
  };

  const handleClear = () => {
    setFormData({
      ...emptyProduct,
    });

    setEditing(false);
  };

  const handleRefresh = () => {
    setProducts(productMock);
    setSearch("");

    setFilters({
      categoryId: "",
      groupId: "",
      productType: "",
      active: "",
    });

    handleClear();
  };

  const handleImport = (file) => {
    console.log(
      "Selected import file:",
      file
    );

    alert(
      `${file.name} selected. Actual CSV/Excel parsing will be connected in the backend/import service phase.`
    );

    setImportOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
            <Package
              size={22}
              className="text-primary"
            />
          </div>

          <div>
            <h1 className="text-2xl font-bold">
              Product Master
            </h1>

            <p className="text-sm text-base-content/60">
              Manage products, classifications and product behaviour.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() =>
              setImportOpen(true)
            }
            className="btn btn-outline gap-2"
          >
            <Import size={16} />
            Import
          </button>

          <button
            onClick={() =>
              setExportOpen(true)
            }
            className="btn btn-outline gap-2"
          >
            <Download size={16} />
            Export
          </button>

          <button
            onClick={handleClear}
            className="btn btn-primary gap-2"
          >
            <Plus size={17} />
            New Product
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[440px_1fr]">
        <ProductForm
          formData={formData}
          setFormData={setFormData}
          onSave={handleSave}
          onClear={handleClear}
          editing={editing}
          categories={categoryMock}
          groups={groupMock}
        />

        <div className="space-y-4">
          <div className="rounded-2xl border border-base-300 bg-base-100 p-4">
            <div className="mb-3 flex gap-2">
              <div className="relative flex-1">
                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40"
                />

                <input
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search by code, name or HSN..."
                  className="input input-bordered w-full pl-10"
                />
              </div>

              <button
                onClick={handleRefresh}
                className="btn btn-outline btn-square"
              >
                <RefreshCw size={17} />
              </button>
            </div>

            <ProductFilters
              filters={filters}
              setFilters={setFilters}
              categories={categoryMock}
              groups={groupMock}
            />
          </div>

          <div className="rounded-xl bg-base-200 px-4 py-2 text-sm inline-flex">
            Products:
            <span className="ml-2 font-semibold">
              {filteredProducts.length}
            </span>
          </div>

          <ProductTable
            products={filteredProducts}
            categories={categoryMock}
            groups={groupMock}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={setSelectedProduct}
          />
        </div>
      </div>

      <ProductDetails
        product={selectedProduct}
        categories={categoryMock}
        groups={groupMock}
        onClose={() =>
          setSelectedProduct(null)
        }
      />

      <ProductImportDialog
        open={importOpen}
        onClose={() =>
          setImportOpen(false)
        }
        onImport={handleImport}
      />

      <ProductExportDialog
        open={exportOpen}
        products={products}
        onClose={() =>
          setExportOpen(false)
        }
      />
    </div>
  );
}