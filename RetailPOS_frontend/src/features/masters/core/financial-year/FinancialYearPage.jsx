import { useMemo, useState } from "react";

import {
  Plus,
  Search,
  RefreshCw,
  CalendarRange,
} from "lucide-react";

import FinancialYearForm from "./FinancialYearForm";
import FinancialYearTable from "./FinancialYearTable";

import {
  emptyFinancialYear,
} from "./financialYearConfig";

import {
  financialYearMock,
} from "./financialYearMock";

export default function FinancialYearPage() {
  const [years, setYears] =
    useState(financialYearMock);

  const [formData, setFormData] =
    useState(emptyFinancialYear);

  const [editing, setEditing] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const filteredYears = useMemo(() => {
    const query =
      search.trim().toLowerCase();

    if (!query) {
      return years;
    }

    return years.filter((year) =>
      [
        year.code,
        year.name,
        year.startDate,
        year.endDate,
      ].some((value) =>
        String(value)
          .toLowerCase()
          .includes(query)
      )
    );
  }, [years, search]);

  const handleSave = (event) => {
    event.preventDefault();

    if (!formData.code.trim()) {
      alert(
        "Financial year code is required."
      );

      return;
    }

    if (!formData.name.trim()) {
      alert(
        "Financial year name is required."
      );

      return;
    }

    if (!formData.startDate) {
      alert("Start date is required.");
      return;
    }

    if (!formData.endDate) {
      alert("End date is required.");
      return;
    }

    if (
      new Date(formData.startDate) >=
      new Date(formData.endDate)
    ) {
      alert(
        "End date must be after start date."
      );

      return;
    }

    const duplicate = years.some(
      (year) =>
        year.code.toLowerCase() ===
          formData.code
            .trim()
            .toLowerCase() &&
        year.id !== formData.id
    );

    if (duplicate) {
      alert(
        "Financial year code already exists."
      );

      return;
    }

    if (editing) {
      setYears((prev) =>
        prev.map((year) =>
          year.id === formData.id
            ? {
                ...formData,
                code: formData.code
                  .trim()
                  .toUpperCase(),
                name: formData.name.trim(),
              }
            : year
        )
      );

      alert(
        "Financial year updated successfully."
      );
    } else {
      setYears((prev) => [
        ...prev,
        {
          ...formData,
          id: Date.now(),
          code: formData.code
            .trim()
            .toUpperCase(),
          name: formData.name.trim(),
        },
      ]);

      alert(
        "Financial year saved successfully."
      );
    }

    handleClear();
  };

  const handleEdit = (year) => {
    setFormData({
      ...year,
    });

    setEditing(true);
  };

  const handleDelete = (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this financial year?"
      )
    ) {
      return;
    }

    setYears((prev) =>
      prev.filter(
        (year) => year.id !== id
      )
    );
  };

  const handleClear = () => {
    setFormData({
      ...emptyFinancialYear,
    });

    setEditing(false);
  };

  const handleRefresh = () => {
    setYears(financialYearMock);
    setSearch("");
    handleClear();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
            <CalendarRange
              size={22}
              className="text-primary"
            />
          </div>

          <div>
            <h1 className="text-2xl font-bold">
              Financial Year
            </h1>

            <p className="text-sm text-base-content/60">
              Manage accounting periods.
            </p>
          </div>
        </div>

        <button
          onClick={handleClear}
          className="btn btn-primary gap-2"
        >
          <Plus size={17} />
          New Financial Year
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[360px_1fr]">
        <FinancialYearForm
          formData={formData}
          setFormData={setFormData}
          onSave={handleSave}
          onClear={handleClear}
          editing={editing}
        />

        <div className="space-y-4">
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
                  placeholder="Search financial years..."
                  className="input input-bordered w-full pl-10"
                />
              </div>

              <div className="flex gap-2">
                <div className="rounded-xl bg-base-200 px-4 py-2 text-sm">
                  Count:
                  <span className="ml-2 font-semibold">
                    {filteredYears.length}
                  </span>
                </div>

                <button
                  onClick={handleRefresh}
                  className="btn btn-outline gap-2"
                >
                  <RefreshCw size={16} />
                  Refresh
                </button>
              </div>
            </div>
          </div>

          <FinancialYearTable
            years={filteredYears}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}