export default function TableSkeleton({
    columns = 6,
    rows = 6,
  }) {
    return (
      <div className="overflow-hidden rounded-2xl border border-base-300 bg-base-100">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                {Array.from({
                  length: columns,
                }).map(
                  (_, index) => (
                    <th key={index}>
                      <div className="h-4 w-20 animate-pulse rounded bg-base-300" />
                    </th>
                  )
                )}
              </tr>
            </thead>
  
            <tbody>
              {Array.from({
                length: rows,
              }).map(
                (_, rowIndex) => (
                  <tr key={rowIndex}>
                    {Array.from({
                      length: columns,
                    }).map(
                      (_, columnIndex) => (
                        <td
                          key={
                            columnIndex
                          }
                        >
                          <div
                            className={[
                              "h-4 animate-pulse rounded bg-base-200",
                              columnIndex ===
                              0
                                ? "w-10"
                                : columnIndex ===
                                    1
                                  ? "w-28"
                                  : "w-24",
                            ].join(" ")}
                          />
                        </td>
                      )
                    )}
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }