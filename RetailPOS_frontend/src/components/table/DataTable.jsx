import { motion } from "framer-motion";

import EmptyState from "../common/EmptyState";
import TableSkeleton from "./TableSkeleton";

export default function DataTable({
  columns = [],
  data = [],
  loading = false,
  emptyTitle = "No records found",
  emptyMessage = "There are no records to display.",
  onRowClick,
  rowKey = "id",
  compact = false,
}) {
  if (loading) {
    return (
      <TableSkeleton
        columns={columns.length}
        rows={6}
      />
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm">
      <div className="w-full overflow-x-auto">
        {data.length === 0 ? (
          <EmptyState
            title={emptyTitle}
            message={emptyMessage}
          />
        ) : (
          <table className="table w-full">
            <thead>
              <tr>
                {columns.map(
                  (column) => (
                    <th
                      key={column.key}
                      className={[
                        compact
                          ? "py-3"
                          : "py-4",
                        column.headerClassName ||
                          "",
                      ].join(" ")}
                    >
                      {column.header}
                    </th>
                  )
                )}
              </tr>
            </thead>

            <tbody>
              {data.map(
                (row, rowIndex) => (
                  <motion.tr
                    key={
                      row[rowKey] ??
                      rowIndex
                    }
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                    }}
                    transition={{
                      delay:
                        rowIndex *
                        0.025,
                    }}
                    onClick={() =>
                      onRowClick?.(
                        row
                      )
                    }
                    className={
                      onRowClick
                        ? "cursor-pointer transition-colors hover:bg-primary/5"
                        : ""
                    }
                  >
                    {columns.map(
                      (column) => (
                        <td
                          key={
                            column.key
                          }
                          className={
                            column.cellClassName ||
                            ""
                          }
                        >
                          {column.render
                            ? column.render(
                                row,
                                rowIndex
                              )
                            : row[
                                column.key
                              ] ??
                              "-"}
                        </td>
                      )
                    )}
                  </motion.tr>
                )
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}