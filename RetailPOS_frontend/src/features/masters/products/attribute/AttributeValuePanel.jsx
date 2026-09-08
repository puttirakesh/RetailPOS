import { useState } from "react";
import {
  Check,
  Edit3,
  Plus,
  Save,
  Trash2,
  X,
} from "lucide-react";

export default function AttributeValuePanel({
  attribute,
  onUpdateValues,
}) {
  const [editingId, setEditingId] =
    useState(null);

  const [form, setForm] = useState({
    code: "",
    name: "",
    active: true,
  });

  if (!attribute) {
    return (
      <div className="flex h-full min-h-[300px] items-center justify-center rounded-2xl border border-dashed border-base-300">
        <div className="text-center text-base-content/50">
          Select an attribute to manage its values.
        </div>
      </div>
    );
  }

  const clearForm = () => {
    setForm({
      code: "",
      name: "",
      active: true,
    });

    setEditingId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.code.trim()) {
      alert("Value code is required.");
      return;
    }

    if (!form.name.trim()) {
      alert("Value name is required.");
      return;
    }

    const duplicate = attribute.values.some(
      (value) =>
        value.code.toLowerCase() ===
          form.code
            .trim()
            .toLowerCase() &&
        value.id !== editingId
    );

    if (duplicate) {
      alert("Value code already exists.");
      return;
    }

    let values;

    if (editingId) {
      values = attribute.values.map(
        (value) =>
          value.id === editingId
            ? {
                ...value,
                ...form,
              }
            : value
      );
    } else {
      values = [
        ...attribute.values,
        {
          ...form,
          id: Date.now(),
        },
      ];
    }

    onUpdateValues(values);
    clearForm();
  };

  const editValue = (value) => {
    setEditingId(value.id);

    setForm({
      code: value.code,
      name: value.name,
      active: value.active,
    });
  };

  const deleteValue = (id) => {
    if (
      window.confirm(
        "Delete this attribute value?"
      )
    ) {
      onUpdateValues(
        attribute.values.filter(
          (value) => value.id !== id
        )
      );
    }
  };

  return (
    <div className="space-y-5 rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">
            Attribute Values
          </h2>

          <p className="text-xs text-base-content/50">
            {attribute.name} •{" "}
            {attribute.values.length} values
          </p>
        </div>

        <button
          onClick={clearForm}
          className="btn btn-ghost btn-sm gap-2"
        >
          <Plus size={15} />
          New Value
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl bg-base-200/60 p-4"
      >
        <div className="grid gap-3 md:grid-cols-2">
          <input
            value={form.code}
            onChange={(e) =>
              setForm({
                ...form,
                code: e.target.value,
              })
            }
            placeholder="Value code"
            className="input input-bordered w-full"
          />

          <input
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
            placeholder="Value name"
            className="input input-bordered w-full"
          />
        </div>

        <div className="mt-3 flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.active}
              onChange={(e) =>
                setForm({
                  ...form,
                  active: e.target.checked,
                })
              }
              className="checkbox checkbox-primary checkbox-sm"
            />

            Active
          </label>

          <div className="flex gap-2">
            {editingId && (
              <button
                type="button"
                onClick={clearForm}
                className="btn btn-ghost btn-sm"
              >
                <X size={15} />
              </button>
            )}

            <button
              type="submit"
              className="btn btn-primary btn-sm gap-2"
            >
              {editingId ? (
                <Check size={15} />
              ) : (
                <Save size={15} />
              )}

              {editingId
                ? "Update"
                : "Add Value"}
            </button>
          </div>
        </div>
      </form>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Code</th>
              <th>Value</th>
              <th>Status</th>
              <th className="text-right">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {attribute.values.map(
              (value) => (
                <tr key={value.id}>
                  <td>{value.id}</td>

                  <td className="font-mono">
                    {value.code}
                  </td>

                  <td className="font-medium">
                    {value.name}
                  </td>

                  <td>
                    {value.active ? (
                      <span className="badge badge-success badge-outline">
                        Active
                      </span>
                    ) : (
                      <span className="badge badge-error badge-outline">
                        Inactive
                      </span>
                    )}
                  </td>

                  <td>
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() =>
                          editValue(value)
                        }
                        className="btn btn-ghost btn-sm btn-square"
                      >
                        <Edit3 size={15} />
                      </button>

                      <button
                        onClick={() =>
                          deleteValue(
                            value.id
                          )
                        }
                        className="btn btn-ghost btn-sm btn-square text-error"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}