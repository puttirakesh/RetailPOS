import { useMemo, useState } from "react";
import {
  CalendarRange,
  Layers3,
  Plus,
  Search,
  Trash2,
} from "lucide-react";

import AgeSlabForm from "./AgeSlabForm";
import PriceSlabForm from "./PriceSlabForm";
import SlabTable from "./SlabTable";

import {
  emptyAgeSlab,
  emptyPriceSlab,
} from "./slabConfig";

import {
  ageSlabMock,
  priceSlabMock,
} from "./slabMock";

export default function SlabManagerPage() {
  const [mode, setMode] =
    useState("age");

  const [ageSlabs, setAgeSlabs] =
    useState(ageSlabMock);

  const [priceSlabs, setPriceSlabs] =
    useState(priceSlabMock);

  const [ageForm, setAgeForm] =
    useState(emptyAgeSlab);

  const [priceForm, setPriceForm] =
    useState(emptyPriceSlab);

  const [search, setSearch] =
    useState("");

  const rows =
    mode === "age"
      ? ageSlabs
      : priceSlabs;

  const filteredRows = useMemo(() => {
    const query =
      search.trim().toLowerCase();

    if (!query) return rows;

    return rows.filter((row) =>
      [
        row.name,
        row.description,
      ].some((value) =>
        String(value)
          .toLowerCase()
          .includes(query)
      )
    );
  }, [rows, search]);

  const saveAge = (e) => {
    e.preventDefault();

    if (!ageForm.name.trim()) {
      alert("Age slab name is required.");
      return;
    }

    setAgeSlabs((prev) => [
      ...prev,
      {
        ...ageForm,
        id: Date.now(),
        fromDays: Number(
          ageForm.fromDays
        ),
        toDays: Number(
          ageForm.toDays
        ),
      },
    ]);

    setAgeForm(emptyAgeSlab);

    alert("Age slab saved successfully.");
  };

  const savePrice = (e) => {
    e.preventDefault();

    if (!priceForm.name.trim()) {
      alert(
        "Price slab name is required."
      );
      return;
    }

    setPriceSlabs((prev) => [
      ...prev,
      {
        ...priceForm,
        id: Date.now(),
        fromValue: Number(
          priceForm.fromValue
        ),
        toValue: Number(
          priceForm.toValue
        ),
      },
    ]);

    setPriceForm(emptyPriceSlab);

    alert(
      "Price slab saved successfully."
    );
  };

  const deleteRow = (id) => {
    if (
      !window.confirm(
        "Delete this slab?"
      )
    ) {
      return;
    }

    if (mode === "age") {
      setAgeSlabs((prev) =>
        prev.filter(
          (row) => row.id !== id
        )
      );
    } else {
      setPriceSlabs((prev) =>
        prev.filter(
          (row) => row.id !== id
        )
      );
    }
  };

  const editRow = (row) => {
    if (mode === "age") {
      setAgeForm({
        ...row,
        fromDays: String(
          row.fromDays
        ),
        toDays: String(
          row.toDays
        ),
      });

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      setPriceForm({
        ...row,
        fromValue: String(
          row.fromValue
        ),
        toValue: String(
          row.toValue
        ),
      });

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
          <Layers3
            size={22}
            className="text-primary"
          />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            Slab Manager
          </h1>

          <p className="text-sm text-base-content/60">
            Configure age-based and price-based slabs.
          </p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <button
          onClick={() => setMode("age")}
          className={`rounded-2xl border p-4 text-left transition ${
            mode === "age"
              ? "border-primary bg-primary/10"
              : "border-base-300 bg-base-100"
          }`}
        >
          <CalendarRange
            size={21}
            className="mb-2 text-primary"
          />

          <div className="font-semibold">
            Age Slab
          </div>

          <div className="mt-1 text-xs text-base-content/50">
            Configure stock age ranges.
          </div>
        </button>

        <button
          onClick={() => setMode("price")}
          className={`rounded-2xl border p-4 text-left transition ${
            mode === "price"
              ? "border-primary bg-primary/10"
              : "border-base-300 bg-base-100"
          }`}
        >
          <Layers3
            size={21}
            className="mb-2 text-primary"
          />

          <div className="font-semibold">
            Price Slab
          </div>

          <div className="mt-1 text-xs text-base-content/50">
            Configure price ranges.
          </div>
        </button>
      </div>

      <div className="rounded-2xl border border-base-300 bg-base-100 p-5">
        <div className="mb-5">
          <h2 className="text-lg font-semibold">
            {mode === "age"
              ? "Age Slab Configuration"
              : "Price Slab Configuration"}
          </h2>
        </div>

        {mode === "age" ? (
          <AgeSlabForm
            form={ageForm}
            setForm={setAgeForm}
            onSave={saveAge}
          />
        ) : (
          <PriceSlabForm
            form={priceForm}
            setForm={setPriceForm}
            onSave={savePrice}
          />
        )}
      </div>

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
              placeholder={`Search ${mode} slabs...`}
              className="input input-bordered w-full pl-10"
            />
          </div>
        </div>

        <SlabTable
          mode={mode}
          rows={filteredRows}
          onEdit={editRow}
          onDelete={deleteRow}
        />
      </div>
    </div>
  );
}