import {
    Edit3,
    Trash2,
  } from "lucide-react";
  
  export default function TaxTable({
    taxes,
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
                <th>Name</th>
                <th>Type</th>
                <th>Rate</th>
                <th>Status</th>
                <th className="text-right">
                  Actions
                </th>
              </tr>
            </thead>
  
            <tbody>
              {taxes.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="py-12 text-center text-sm text-base-content/50"
                  >
                    No tax records found.
                  </td>
                </tr>
              ) : (
                taxes.map((tax, index) => (
                  <tr key={tax.id}>
                    <td>{index + 1}</td>
  
                    <td className="font-mono">
                      {tax.code}
                    </td>
  
                    <td className="font-medium">
                      {tax.name}
                    </td>
  
                    <td>{tax.taxType}</td>
  
                    <td>
                      <span className="font-semibold">
                        {tax.rate}%
                      </span>
                    </td>
  
                    <td>
                      {tax.active ? (
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
                          onClick={() => onEdit(tax)}
                          className="btn btn-ghost btn-sm btn-square"
                        >
                          <Edit3 size={16} />
                        </button>
  
                        <button
                          onClick={() =>
                            onDelete(tax.id)
                          }
                          className="btn btn-ghost btn-sm btn-square text-error"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }