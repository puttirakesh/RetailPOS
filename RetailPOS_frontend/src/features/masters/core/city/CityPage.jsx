import { useMemo, useState } from "react";
import {
  motion,
} from "framer-motion";

import {
  Plus,
  Search,
  RefreshCw,
  MapPinned,
} from "lucide-react";

import CityForm from "./CityForm";
import CityTable from "./CityTable";

import { cityMock } from "./cityMock";
import { emptyCity } from "./cityConfig";

import { stateMock } from "../state/stateMock";

export default function CityPage() {
  const [cities, setCities] = useState(cityMock);
  const [states] = useState(stateMock);

  const [formData, setFormData] =
    useState(emptyCity);

  const [editing, setEditing] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const filteredCities = useMemo(() => {
    const query =
      search.trim().toLowerCase();

    if (!query) {
      return cities;
    }

    return cities.filter((city) => {
      const state =
        states.find(
          (item) =>
            item.id === Number(city.stateId)
        )?.name || "";

      return [
        city.code,
        city.name,
        state,
      ].some((value) =>
        String(value)
          .toLowerCase()
          .includes(query)
      );
    });
  }, [
    cities,
    search,
    states,
  ]);

  const handleSave = (event) => {
    event.preventDefault();

    if (!formData.code.trim()) {
      alert("City code is required.");
      return;
    }

    if (!formData.name.trim()) {
      alert("City name is required.");
      return;
    }

    if (!formData.stateId) {
      alert("Please select a state.");
      return;
    }

    const duplicate = cities.some(
      (city) =>
        city.code.toLowerCase() ===
          formData.code
            .trim()
            .toLowerCase() &&
        city.id !== formData.id
    );

    if (duplicate) {
      alert("City code already exists.");
      return;
    }

    if (editing) {
      setCities((prev) =>
        prev.map((city) =>
          city.id === formData.id
            ? {
                ...formData,
                code: formData.code
                  .trim()
                  .toUpperCase(),
                name: formData.name.trim(),
                stateId: Number(
                  formData.stateId
                ),
              }
            : city
        )
      );

      alert("City updated successfully.");
    } else {
      setCities((prev) => [
        ...prev,
        {
          ...formData,
          id: Date.now(),
          code: formData.code
            .trim()
            .toUpperCase(),
          name: formData.name.trim(),
          stateId: Number(
            formData.stateId
          ),
        },
      ]);

      alert("City saved successfully.");
    }

    handleClear();
  };

  const handleEdit = (city) => {
    setFormData({
      ...city,
      stateId: String(city.stateId),
    });

    setEditing(true);
  };

  const handleDelete = (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this city?"
      )
    ) {
      return;
    }

    setCities((prev) =>
      prev.filter(
        (city) => city.id !== id
      )
    );
  };

  const handleClear = () => {
    setFormData({
      ...emptyCity,
    });

    setEditing(false);
  };

  const handleRefresh = () => {
    setCities(cityMock);
    setSearch("");
    handleClear();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
            <MapPinned
              size={22}
              className="text-primary"
            />
          </div>

          <div>
            <h1 className="text-2xl font-bold">
              City Master
            </h1>

            <p className="text-sm text-base-content/60">
              Manage city and state relationships.
            </p>
          </div>
        </div>

        <button
          onClick={handleClear}
          className="btn btn-primary gap-2"
        >
          <Plus size={17} />
          New City
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[360px_1fr]">
        <CityForm
          formData={formData}
          setFormData={setFormData}
          onSave={handleSave}
          onClear={handleClear}
          editing={editing}
          states={states}
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
                  placeholder="Search cities..."
                  className="input input-bordered w-full pl-10"
                />
              </div>

              <div className="flex gap-2">
                <div className="rounded-xl bg-base-200 px-4 py-2 text-sm">
                  Count:
                  <span className="ml-2 font-semibold">
                    {filteredCities.length}
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

          <CityTable
            cities={filteredCities}
            states={states}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}
