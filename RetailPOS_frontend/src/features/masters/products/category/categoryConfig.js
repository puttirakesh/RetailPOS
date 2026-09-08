import { useMemo, useState } from "react";
import {
  Boxes,
  Plus,
  RefreshCw,
  Search,
} from "lucide-react";

import GroupForm from "./GroupForm";
import GroupTable from "./GroupTable";

import { emptyGroup } from "./groupConfig";
import { groupMock } from "./groupMock";

export default function GroupPage() {
  const [groups, setGroups] =
    useState(groupMock);

  const [formData, setFormData] =
    useState(emptyGroup);

  const [editing, setEditing] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const filteredGroups = useMemo(() => {
    const query =
      search.trim().toLowerCase();

    if (!query) return groups;

    return groups.filter((group) =>
      [
        group.code,
        group.name,
        group.coreTax,
      ].some((value) =>
        String(value)
          .toLowerCase()
          .includes(query)
      )
    );
  }, [groups, search]);

  const handleSave = (e) => {
    e.preventDefault();

    if (!formData.code.trim()) {
      alert("Group code is required.");
      return;
    }

    if (!formData.name.trim()) {
      alert("Group name is required.");
      return;
    }

    const duplicate = groups.some(
      (group) =>
        group.code.toLowerCase() ===
          formData.code
            .trim()
            .toLowerCase() &&
        group.id !== formData.id
    );

    if (duplicate) {
      alert("Group code already exists.");
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
      setGroups((prev) =>
        prev.map((group) =>
          group.id === formData.id
            ? payload
            : group
        )
      );

      alert("Group updated successfully.");
    } else {
      setGroups((prev) => [
        ...prev,
        {
          ...payload,
          id: Date.now(),
        },
      ]);

      alert("Group saved successfully.");
    }

    handleClear();
  };

  const handleEdit = (group) => {
    setFormData({
      ...group,
      slab: {
        ...group.slab,
      },
    });

    setEditing(true);
  };

  const handleDelete = (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this group?"
      )
    ) {
      setGroups((prev) =>
        prev.filter((group) => group.id !== id)
      );
    }
  };

  const handleClear = () => {
    setFormData({
      ...emptyGroup,
      slab: {
        ...emptyGroup.slab,
      },
    });

    setEditing(false);
  };

  const handleRefresh = () => {
    setGroups(groupMock);
    setSearch("");
    handleClear();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
            <Boxes
              size={22}
              className="text-primary"
            />
          </div>

          <div>
            <h1 className="text-2xl font-bold">
              Group Master
            </h1>

            <p className="text-sm text-base-content/60">
              Manage product groups and taxation rules.
            </p>
          </div>
        </div>

        <button
          onClick={handleClear}
          className="btn btn-primary gap-2"
        >
          <Plus size={17} />
          New Group
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[400px_1fr]">
        <GroupForm
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
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search groups..."
                  className="input input-bordered w-full pl-10"
                />
              </div>

              <div className="flex gap-2">
                <div className="rounded-xl bg-base-200 px-4 py-2 text-sm">
                  Count:
                  <span className="ml-2 font-semibold">
                    {filteredGroups.length}
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

          <GroupTable
            groups={filteredGroups}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}