import {
    Edit3,
    Trash2,
  } from "lucide-react";
  
  export default function FinancialYearTable({
    years,
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
                <th>Financial Year</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                <th className="text-right">
                  Actions
                </th>
              </tr>
            </thead>
  
            <tbody>
              {years.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="py-12 text-center text-sm text-base-content/50"
                  >
                    No financial years found.
                  </td>
                </tr>
              ) : (
                years.map((year, index) => (
                  <tr key={year.id}>
                    <td>{index + 1}</td>
  
                    <td className="font-mono">
                      {year.code}
                    </td>
  
                    <td className="font-medium">
                      {year.name}
                    </td>
  
                    <td>
                      {year.startDate}
                    </td>
  
                    <td>
                      {year.endDate}
                    </td>
  
                    <td>
                      {year.active ? (
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
                            onEdit(year)
                          }
                          className="btn btn-ghost btn-sm btn-square"
                        >
                          <Edit3 size={16} />
                        </button>
  
                        <button
                          onClick={() =>
                            onDelete(year.id)
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