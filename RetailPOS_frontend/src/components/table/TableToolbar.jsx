import {
    Plus,
    RefreshCw,
    Download,
    Upload,
  } from "lucide-react";
  
  import SearchInput from "../ui/SearchInput";
  
  export default function TableToolbar({
    search,
    onSearch,
    searchPlaceholder = "Search...",
    count,
    onRefresh,
    onAdd,
    addLabel = "Add New",
    onImport,
    onExport,
    children,
  }) {
    return (
      <div className="rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <SearchInput
              value={search}
              onChange={onSearch}
              placeholder={searchPlaceholder}
              className="min-w-0 flex-1"
            />
  
            {count !== undefined && (
              <div className="hidden shrink-0 rounded-xl bg-base-200 px-4 py-2.5 text-sm sm:block">
                <span className="text-base-content/50">
                  Count
                </span>
  
                <span className="ml-2 font-semibold">
                  {count}
                </span>
              </div>
            )}
          </div>
  
          <div className="flex flex-wrap items-center gap-2">
            {children}
  
            {onImport && (
              <button
                type="button"
                onClick={onImport}
                className="btn btn-outline gap-2"
              >
                <Upload size={16} />
                Import
              </button>
            )}
  
            {onExport && (
              <button
                type="button"
                onClick={onExport}
                className="btn btn-outline gap-2"
              >
                <Download size={16} />
                Export
              </button>
            )}
  
            {onRefresh && (
              <button
                type="button"
                onClick={onRefresh}
                className="btn btn-outline btn-square"
                title="Refresh"
              >
                <RefreshCw size={16} />
              </button>
            )}
  
            {onAdd && (
              <button
                type="button"
                onClick={onAdd}
                className="btn btn-primary gap-2"
              >
                <Plus size={16} />
                {addLabel}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }