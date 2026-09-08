import { Edit3, Trash2 } from "lucide-react";

export default function MarkTable({
  marks,
  onEdit,
  onDelete,
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-base-300 bg-base-100">
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Code</th>
              <th>Mark Name</th>
              <th>Status</th>
              <th className="text-right">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {marks.map((mark, index) => (
              <tr key={mark.id}>
                <td>{index + 1}</td>

                <td className="font-mono">
                  {mark.code}
                </td>

                <td className="font-medium">
                  {mark.name}
                </td>

                <td>
                  {mark.active ? (
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
                      onClick={() => onEdit(mark)}
                      className="btn btn-ghost btn-sm btn-square"
                    >
                      <Edit3 size={16} />
                    </button>

                    <button
                      onClick={() =>
                        onDelete(mark.id)
                      }
                      className="btn btn-ghost btn-sm btn-square text-error"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {marks.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="py-12 text-center text-base-content/50"
                >
                  No marks found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}