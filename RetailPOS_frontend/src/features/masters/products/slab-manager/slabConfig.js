import { useMemo, useState } from "react";
import {
  RefreshCw,
  Search,
  SlidersHorizontal,
} from "lucide-react";

import AttributeForm from "./AttributeForm";
import AttributeTable from "./AttributeTable";
import AttributeValuePanel from "./AttributeValuePanel";

import {
  emptyAttribute,
} from "./attributeConfig";

import {
  attributeMock,
} from "./attributeMock";

export default function AttributePage() {
  const [attributes, setAttributes] =
    useState(attributeMock);

  const [formData, setFormData] =
    useState(emptyAttribute);

  const [editing, setEditing] =
    useState(false);

  const [selectedId, setSelectedId] =
    useState(attributeMock[0]?.id);

  const [search, setSearch] =
    useState("");

  const selectedAttribute =
    attributes.find(
      (attribute) =>
        attribute.id === selectedId
    );

  const filteredAttributes =
    useMemo(() => {
      const query =
        search.trim().toLowerCase();

      if (!query) return attributes;

      return attributes.filter(
        (attribute) =>
          attribute.code
            .toLowerCase()
            .includes(query) ||
          attribute.name
            .toLowerCase()
            .includes(query)
      );
    }, [attributes, search]);

  const handleSave = (e) => {
    e.preventDefault();

    if (!formData.code.trim()) {
      alert(
        "Attribute code is required."
      );
      return;
    }

    if (!formData.name.trim()) {
      alert(
        "Attribute name is required."
      );
      return;
    }

    const payload = {
      ...formData,
      code: formData.code
        .trim()
        .toUpperCase(),
      name: formData.name.trim(),
    };

    if (editing) {
      setAttributes((prev) =>
        prev.map((attribute) =>
          attribute.id === formData.id
            ? {
                ...attribute,
                ...payload,
              }
            : attribute
        )
      );

      alert(
        "Attribute updated successfully."
      );
    } else {
      const newAttribute = {
        ...payload,
        id: Date.now(),
        values: [],
      };

      setAttributes((prev) => [
        ...prev,
        newAttribute,
      ]);

      setSelectedId(newAttribute.id);

      alert(
        "Attribute saved successfully."
      );
    }

    handleClear();
  };

  const handleEdit = (attribute) => {
    setFormData({
      id: attribute.id,
      code: attribute.code,
      name: attribute.name,
      active: attribute.active,
    });

    setEditing(true);
  };

  const handleDelete = (id) => {
    if (
      window.confirm(
        "Delete this attribute?"
      )
    ) {
      const remaining =
        attributes.filter(
          (attribute) =>
            attribute.id !== id
        );

      setAttributes(remaining);

      if (selectedId === id) {
        setSelectedId(
          remaining[0]?.id || null
        );
      }
    }
  };

  const handleClear = () => {
    setFormData({
      ...emptyAttribute,
    });

    setEditing(false);
  };

  const updateValues = (values) => {
    setAttributes((prev) =>
      prev.map((attribute) =>
        attribute.id === selectedId
          ? {
              ...attribute,
              values,
            }
          : attribute
      )
    );
  };

  const handleRefresh = () => {
    setAttributes(attributeMock);
    setSelectedId(
      attributeMock[0]?.id
    );
    setSearch("");
    handleClear();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
          <SlidersHorizontal
            size={22}
            className="text-primary"
          />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            Attribute Master
          </h1>

          <p className="text-sm text-base-content/60">
            Manage attributes and their allowed values.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[360px_1fr]">
        <AttributeForm
          formData={formData}
          setFormData={setFormData}
          onSave={handleSave}
          onClear={handleClear}
          editing={editing}
        />

        <div className="space-y-4">
          <div className="rounded-2xl border border-base-300 bg-base-100 p-4">
            <div className="flex gap-2">
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
                  placeholder="Search attributes..."
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
          </div>

          <AttributeTable
            attributes={filteredAttributes}
            selectedId={selectedId}
            onSelect={setSelectedId}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          <AttributeValuePanel
            attribute={selectedAttribute}
            onUpdateValues={updateValues}
          />
        </div>
      </div>
    </div>
  );
}