import {
    Edit3,
    Trash2,
    Eye,
  } from "lucide-react";
  
  export default function ProductTable({
    products,
    categories,
    groups,
    onEdit,
    onDelete,
    onView,
  }) {
    const getCategory = (id) =>
      categories.find(
        (item) => item.id === Number(id)
      )?.name || "-";
  
    const getGroup = (id) =>
      groups.find(
        (item) => item.id === Number(id)
      )?.name || "-";
  
    return (
      <div className="overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Code</th>
                <th>Product</th>
                <th>Category</th>
                <th>Group</th>
                <th>Tax</th>
                <th>Type</th>
                <th>Status</th>
                <th className="text-right">
                  Actions
                </th>
              </tr>
            </thead>
  
            <tbody>
              {products.map(
                (product, index) => (
                  <tr key={product.id}>
                    <td>{index + 1}</td>
  
                    <td className="font-mono">
                      {product.code}
                    </td>
  
                    <td className="font-medium">
                      {product.name}
                    </td>
  
                    <td>
                      {getCategory(
                        product.categoryId
                      )}
                    </td>
  
                    <td>
                      {getGroup(
                        product.groupId
                      )}
                    </td>
  
                    <td>
                      {product.taxId}
                    </td>
  
                    <td>
                      <span className="badge badge-ghost">
                        {product.productType}
                      </span>
                    </td>
  
                    <td>
                      {product.active ? (
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
                            onView(product)
                          }
                          className="btn btn-ghost btn-sm btn-square"
                        >
                          <Eye size={16} />
                        </button>
  
                        <button
                          onClick={() =>
                            onEdit(product)
                          }
                          className="btn btn-ghost btn-sm btn-square"
                        >
                          <Edit3 size={16} />
                        </button>
  
                        <button
                          onClick={() =>
                            onDelete(product.id)
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
  
              {products.length === 0 && (
                <tr>
                  <td
                    colSpan="9"
                    className="py-12 text-center text-base-content/50"
                  >
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }