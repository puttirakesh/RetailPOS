import { motion } from "framer-motion";
import {
  Edit3,
  Trash2,
} from "lucide-react";

export default function BranchTable({
  branches,
  states,
  onEdit,
  onDelete,
}) {
  const getStateName = (stateId) =>
    states.find(
      (state) =>
        state.id === Number(stateId)
    )?.name || "Unknown";

  return (
    <div className="overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm">
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Code</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>State</th>
              <th>GST Type</th>
              <th>Status</th>
              <th className="text-right">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {branches.length === 0 ? (
              <tr>
                <td
                  colSpan="8"
                  className="py-12 text-center text-sm text-base-content/50"
                >
                  No branches found.
                </td>
              </tr>
            ) : (
              branches.map(
                (branch, index) => (
                  <motion.tr
                    key={branch.id}
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                    }}
                  >
                    <td>{index + 1}</td>

                    <td className="font-mono">
                      {branch.code}
                    </td>

                    <td className="font-medium">
                      {branch.name}
                    </td>

                    <td>
                      {branch.mobile || "-"}
                    </td>

                    <td>
                      {getStateName(
                        branch.stateId
                      )}
                    </td>

                    <td>
                      {branch.gstType}
                    </td>

                    <td>
                      {branch.active ? (
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
                            onEdit(branch)
                          }
                          className="btn btn-ghost btn-sm btn-square"
                        >
                          <Edit3 size={16} />
                        </button>

                        <button
                          onClick={() =>
                            onDelete(
                              branch.id
                            )
                          }
                          className="btn btn-ghost btn-sm btn-square text-error"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                )
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}