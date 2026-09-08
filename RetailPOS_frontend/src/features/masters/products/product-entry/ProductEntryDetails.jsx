export default function ProductEntryDetails({
    entry,
  }) {
    if (!entry) {
      return (
        <div className="rounded-2xl border border-dashed border-base-300 p-10 text-center text-sm text-base-content/50">
          Select a product entry to see details.
        </div>
      );
    }
  
    return (
      <div className="rounded-2xl border border-base-300 bg-base-100 p-5">
        <h2 className="text-lg font-semibold">
          Entry Details
        </h2>
  
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {[
            [
              "Product",
              entry.productName,
            ],
            [
              "EAN",
              entry.ean,
            ],
            [
              "Serial",
              entry.serialNumber || "-",
            ],
            [
              "Purchase Rate",
              `₹${entry.purchaseRate}`,
            ],
            [
              "Selling Rate",
              `₹${entry.sellingRate}`,
            ],
            [
              "Quantity",
              entry.quantity,
            ],
            [
              "Entry Date",
              entry.entryDate,
            ],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-xl bg-base-200/60 p-4"
            >
              <p className="text-xs text-base-content/50">
                {label}
              </p>
  
              <p className="mt-1 font-medium">
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }