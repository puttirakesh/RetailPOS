import { Edit3, Trash2 } from "lucide-react";

export default function GroupTable({
  groups,
  onEdit,
  onDelete,
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm">
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Code</th>
              <th>Group Name</th>
              <th>Tax Mode</th>
              <th>Tax</th>
              <th>Status</th>
              <th className="text-right">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {groups.map((group, index) => (
              <tr key={group.id}>
                <td>{index + 1}</td>

                <td className="font-mono">
                  {group.code}
                </td>

                <td className="font-medium">
                  {group.name}
                </td>

                <td>
                  {group.slabRatesRequired
                    ? "Slab"
                    : "Flat"}
                </td>

                <td>
                  {group.slabRatesRequired
                    ? `${group.slab.beforeTax || "-"} → ${
                        group.slab.afterTax || "-"
                      }`
                    : group.coreTax || "-"}
                </td>

                <td>
                  {group.active ? (
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
                      onClick={() => onEdit(group)}
                      className="btn btn-ghost btn-sm btn-square"
                    >
                      <Edit3 size={16} />
                    </button>

                    <button
                      onClick={() => onDelete(group.id)}
                      className="btn btn-ghost btn-sm btn-square text-error"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {groups.length === 0 && (
              <tr>
                <td
                  colSpan="7"
                  className="py-12 text-center text-base-content/50"
                >
                  No groups found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}