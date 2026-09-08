import { motion } from "framer-motion";
import {
  Edit3,
  Trash2,
} from "lucide-react";

export default function CityTable({
  cities,
  states,
  onEdit,
  onDelete,
}) {
  const stateName = (stateId) => {
    return (
      states.find(
        (state) => state.id === Number(stateId)
      )?.name || "Unknown"
    );
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm">
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Code</th>
              <th>City Name</th>
              <th>State</th>
              <th>Status</th>
              <th className="text-right">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {cities.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="py-12 text-center text-sm text-base-content/50"
                >
                  No cities found.
                </td>
              </tr>
            ) : (
              cities.map((city, index) => (
                <motion.tr
                  key={city.id}
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                >
                  <td>{index + 1}</td>

                  <td className="font-mono text-sm">
                    {city.code}
                  </td>

                  <td className="font-medium">
                    {city.name}
                  </td>

                  <td>
                    {stateName(city.stateId)}
                  </td>

                  <td>
                    {city.active ? (
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
                        onClick={() => onEdit(city)}
                        className="btn btn-ghost btn-sm btn-square"
                      >
                        <Edit3 size={16} />
                      </button>

                      <button
                        onClick={() =>
                          onDelete(city.id)
                        }
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