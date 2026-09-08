import {
    FileSpreadsheet,
    Upload,
    X,
  } from "lucide-react";
  
  export default function ProductImportDialog({
    open,
    onClose,
    onImport,
  }) {
    if (!open) return null;
  
    const handleFile = (e) => {
      const file = e.target.files?.[0];
  
      if (!file) return;
  
      onImport(file);
    };
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
        <div className="w-full max-w-lg rounded-3xl border border-base-300 bg-base-100 p-6 shadow-2xl">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="font-semibold">
                Import Products
              </h2>
  
              <p className="text-xs text-base-content/50">
                Upload your product spreadsheet.
              </p>
            </div>
  
            <button
              onClick={onClose}
              className="btn btn-ghost btn-sm btn-square"
            >
              <X size={18} />
            </button>
          </div>
  
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-base-300 p-10 text-center transition hover:border-primary hover:bg-primary/5">
            <FileSpreadsheet
              size={35}
              className="mb-4 text-primary"
            />
  
            <p className="font-medium">
              Choose CSV / Excel File
            </p>
  
            <p className="mt-1 text-xs text-base-content/50">
              Product Code, Name, Category, HSN, Product Type...
            </p>
  
            <input
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleFile}
              className="hidden"
            />
          </label>
        </div>
      </div>
    );
  }