import {
    Eye,
    Edit3,
    Trash2,
    MoreHorizontal,
  } from "lucide-react";
  
  import Dropdown from "../ui/Dropdown";
  
  export default function TableActions({
    onView,
    onEdit,
    onDelete,
    extraActions = [],
  }) {
    return (
      <div className="flex justify-end items-center gap-1">
        {onView && (
          <button
            type="button"
            onClick={onView}
            className="btn btn-ghost btn-sm btn-square"
            title="View"
          >
            <Eye size={15} />
          </button>
        )}
  
        {onEdit && (
          <button
            type="button"
            onClick={onEdit}
            className="btn btn-ghost btn-sm btn-square"
            title="Edit"
          >
            <Edit3 size={15} />
          </button>
        )}
  
        {onDelete && (
          <button
            type="button"
            onClick={onDelete}
            className="btn btn-ghost btn-sm btn-square text-error"
            title="Delete"
          >
            <Trash2 size={15} />
          </button>
        )}
  
        {extraActions.length > 0 && (
          <Dropdown
            trigger={
              <MoreHorizontal
                size={17}
              />
            }
            items={extraActions}
            onSelect={(item) =>
              item.onClick?.()
            }
          />
        )}
      </div>
    );
  }