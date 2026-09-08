import { useMemo, useState } from "react";
import {
  Plus,
  RefreshCw,
  Search,
  Tag,
} from "lucide-react";

import MarkForm from "./MarkForm";
import MarkTable from "./MarkTable";

import {
  emptyMark,
} from "./markConfig";

import {
  markMock,
} from "./markMock";

export default function MarkPage() {
  const [marks, setMarks] =
    useState(markMock);

  const [formData, setFormData] =
    useState(emptyMark);

  const [editing, setEditing] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const filteredMarks = useMemo(() => {
    const query =
      search.trim().toLowerCase();

    if (!query) return marks;

    return marks.filter((mark) =>
      [
        mark.code,
        mark.name,
      ].some((value) =>
        String(value)
          .toLowerCase()
          .includes(query)
      )
    );
  }, [marks, search]);

  const handleSave = (e) => {
    e.preventDefault();

    if (!formData.code.trim()) {
      alert("Mark code is required.");
      return;
    }

    if (!formData.name.trim()) {
      alert("Mark name is required.");
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
      setMarks((prev) =>
        prev.map((mark) =>
          mark.id === formData.id
            ? payload
            : mark
        )
      );

      alert("Mark updated successfully.");
    } else {
      setMarks((prev) => [
        ...prev,
        {
          ...payload,
          id: Date.now(),
        },
      ]);

      alert("Mark saved successfully.");
    }

    handleClear();
  };

  const handleEdit = (mark) => {
    setFormData(mark);
    setEditing(true);
  };

  const handleDelete = (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this mark?"
      )
    ) {
      setMarks((prev) =>
        prev.filter(
          (mark) => mark.id !== id
        )
      );
    }
  };

  const handleClear = () => {
    setFormData({
      ...emptyMark,
    });

    setEditing(false);
  };

  const handleRefresh = () => {
    setMarks(markMock);
    setSearch("");
    handleClear();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
            <Tag
              size={22}
              className="text-primary"
            />
          </div>

          <div>
            <h1 className="text-2xl font-bold">
              Mark Master
            </h1>

            <p className="text-sm text-base-content/60">
              Manage product marks.
            </p>
          </div>
        </div>

        <button
          onClick={handleClear}
          className="btn btn-primary gap-2"
        >
          <Plus size={17} />
          New Mark
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[360px_1fr]">
        <MarkForm
          formData={formData}
          setFormData={setFormData}
          onSave={handleSave}
          onClear={handleClear}
          editing={editing}
        />

        <div className="space-y-4">
          <div className="rounded-2xl border border-base-300 bg-base-100 p-4">
            <div className="flex gap-3">
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
                  placeholder="Search marks..."
                  className="input input-bordered w-full pl-10"
                />
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

          <MarkTable
            marks={filteredMarks}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}