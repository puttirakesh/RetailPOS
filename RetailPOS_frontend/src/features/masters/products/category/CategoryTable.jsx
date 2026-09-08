import {
    Edit3,
    Trash2,
    SlidersHorizontal,
  } from "lucide-react";
  
  export default function CategoryTable({
    categories,
    groups,
    onEdit,
    onDelete,
    onMapping,
  }) {
    const getGroupName = (id) =>
      groups.find(
        (group) =>
          group.id === Number(id)
      )?.name || "-";
  
    return (
      <div className="overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Code</th>
                <th>Category</th>
                <th>Group</th>
                <th>Tax</th>
                <th>Attributes</th>
                <th>Status</th>
                <th className="text-right">
                  Actions
                </th>
              </tr>
            </thead>
  
            <tbody>
              {categories.map(
                (category, index) => (
                  <tr key={category.id}>
                    <td>{index + 1}</td>
  
                    <td className="font-mono">
                      {category.code}
                    </td>
  
                    <td className="font-medium">
                      {category.name}
                    </td>
  
                    <td>
                      {getGroupName(
                        category.groupId
                      )}
                    </td>
  
                    <td>{category.taxInfo}</td>
  
                    <td>
                      {category.assignAttributes ? (
                        <span className="badge badge-info badge-outline">
                          {
                            category
                              .attributeIds
                              .length
                          }{" "}
                          mapped
                        </span>
                      ) : (
                        "-"
                      )}
                    </td>
  
                    <td>
                      {category.active ? (
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
                      <div className="flex justify-end gap-1">
                        <button
                          onClick={() =>
                            onMapping(category)
                          }
                          className="btn btn-ghost btn-sm btn-square"
                        >
                          <SlidersHorizontal size={16} />
                        </button>
  
                        <button
                          onClick={() =>
                            onEdit(category)
                          }
                          className="btn btn-ghost btn-sm btn-square"
                        >
                          <Edit3 size={16} />
                        </button>
  
                        <button
                          onClick={() =>
                            onDelete(
                              category.id
                            )
                          }
                          className="btn btn-ghost btn-sm btn-square text-error"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              )}
  
              {categories.length === 0 && (
                <tr>
                  <td
                    colSpan="8"
                    className="py-12 text-center text-base-content/50"
                  >
                    No categories found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }