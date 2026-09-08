import { motion } from "framer-motion";
import {
  Edit3,
  Trash2,
} from "lucide-react";

export default function StateTable({
  states,
  onEdit,
  onDelete,
}) {
  const getStateType = (type) => {
    return type === "1"
      ? "Local State"
      : "Other State";
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm">
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Code</th>
              <th>State Name</th>
              <th>State Type</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {states.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="py-12 text-center text-sm text-base-content/50"
                >
                  No states found.
                </td>
              </tr>
            ) : (
              states.map((state, index) => (
                <motion.tr
                  key={state.id}
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                >
                  <td>{index + 1}</td>

                  <td>
                    <span className="font-mono text-sm">
                      {state.code}
                    </span>
                  </td>

                  <td className="font-medium">
                    {state.name}
                  </td>

                  <td>
                    {getStateType(state.stateType)}
                  </td>

                  <td>
                    {state.active ? (
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
                        type="button"
                        onClick={() => onEdit(state)}
                        className="btn btn-ghost btn-sm btn-square"
                      >
                        <Edit3 size={16} />
                      </button>

                      <button
                        type="button"
                        onClick={() => onDelete(state.id)}
                        className="btn btn-ghost btn-sm btn-square text-error"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}