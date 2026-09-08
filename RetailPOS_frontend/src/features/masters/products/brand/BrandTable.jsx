import { Edit3, Trash2 } from "lucide-react";

export default function BrandTable({
  brands,
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
              <th>Brand</th>
              <th>Margin</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {brands.map((brand, index) => (
              <tr key={brand.id}>
                <td>{index + 1}</td>

                <td className="font-mono">
                  {brand.code}
                </td>

                <td className="font-medium">
                  {brand.name}
                </td>

                <td>{brand.margin}%</td>

                <td>
                  {brand.active ? (
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
                      onClick={() => onEdit(brand)}
                      className="btn btn-ghost btn-sm btn-square"
                    >
                      <Edit3 size={16} />
                    </button>

                    <button
                      onClick={() =>
                        onDelete(brand.id)
                      }
                      className="btn btn-ghost btn-sm btn-square text-error"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {brands.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="py-12 text-center text-base-content/50"
                >
                  No brands found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}