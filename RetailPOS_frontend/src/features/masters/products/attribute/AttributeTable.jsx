import {
    Edit3,
    Trash2,
  } from "lucide-react";
  
  export default function AttributeTable({
    attributes,
    selectedId,
    onSelect,
    onEdit,
    onDelete,
  }) {
    return (
      <div className="overflow-hidden rounded-2xl border border-base-300 bg-base-100">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Attribute</th>
                <th>Values</th>
                <th>Status</th>
                <th className="text-right">
                  Actions
                </th>
              </tr>
            </thead>
  
            <tbody>
              {attributes.map((attribute) => (
                <tr
                  key={attribute.id}
                  className={
                    selectedId === attribute.id
                      ? "bg-primary/5"
                      : ""
                  }
                >
                  <td>
                    <button
                      onClick={() =>
                        onSelect(attribute.id)
                      }
                      className="font-mono font-medium text-primary"
                    >
                      {attribute.code}
                    </button>
                  </td>
  
                  <td className="font-medium">
                    {attribute.name}
                  </td>
  
                  <td>
                    <span className="badge badge-neutral">
                      {attribute.values.length}
                    </span>
                  </td>
  
                  <td>
                    {attribute.active ? (
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
                          onEdit(attribute)
                        }
                        className="btn btn-ghost btn-sm btn-square"
                      >
                        <Edit3 size={16} />
                      </button>
  
                      <button
                        onClick={() =>
                          onDelete(attribute.id)
                        }
                        className="btn btn-ghost btn-sm btn-square text-error"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }