import {
    Download,
    FileJson,
    X,
  } from "lucide-react";
  
  export default function ProductExportDialog({
    open,
    products,
    onClose,
  }) {
    if (!open) return null;
  
    const downloadJSON = () => {
      const blob = new Blob(
        [JSON.stringify(products, null, 2)],
        {
          type: "application/json",
        }
      );
  
      const url =
        URL.createObjectURL(blob);
  
      const anchor =
        document.createElement("a");
  
      anchor.href = url;
      anchor.download =
        "retailpos-products.json";
  
      anchor.click();
  
      URL.revokeObjectURL(url);
  
      onClose();
    };
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
        <div className="w-full max-w-md rounded-3xl border border-base-300 bg-base-100 p-6 shadow-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold">
                Export Products
              </h2>
  
              <p className="text-xs text-base-content/50">
                Choose an export format.
              </p>
            </div>
  
            <button
              onClick={onClose}
              className="btn btn-ghost btn-sm btn-square"
            >
              <X size={18} />
            </button>
          </div>
  
          <button
            onClick={downloadJSON}
            className="mt-6 flex w-full items-center gap-4 rounded-2xl border border-base-300 p-4 text-left transition hover:border-primary hover:bg-primary/5"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
              <FileJson
                size={21}
                className="text-primary"
              />
            </div>
  
            <div className="flex-1">
              <p className="font-medium">
                JSON
              </p>
  
              <p className="text-xs text-base-content/50">
                Export complete product data.
              </p>
            </div>
  
            <Download size={18} />
          </button>
        </div>
      </div>
    );
  }