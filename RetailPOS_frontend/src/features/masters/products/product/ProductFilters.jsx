import {
    Filter,
    X,
  } from "lucide-react";
  
  export default function ProductFilters({
    filters,
    setFilters,
    categories,
    groups,
  }) {
    const handleChange = (name, value) => {
      setFilters((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  
    const clearFilters = () => {
      setFilters({
        categoryId: "",
        groupId: "",
        productType: "",
        active: "",
      });
    };
  
    return (
      <div className="rounded-2xl border border-base-300 bg-base-100 p-4">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter size={17} />
            <span className="text-sm font-semibold">
              Filters
            </span>
          </div>
  
          <button
            onClick={clearFilters}
            className="btn btn-ghost btn-xs gap-1"
          >
            <X size={13} />
            Clear
          </button>
        </div>
  
        <div className="grid gap-3 md:grid-cols-4">
          <select
            value={filters.categoryId}
            onChange={(e) =>
              handleChange(
                "categoryId",
                e.target.value
              )
            }
            className="select select-bordered"
          >
            <option value="">
              All Categories
            </option>
  
            {categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            ))}
          </select>
  
          <select
            value={filters.groupId}
            onChange={(e) =>
              handleChange(
                "groupId",
                e.target.value
              )
            }
            className="select select-bordered"
          >
            <option value="">
              All Groups
            </option>
  
            {groups.map((group) => (
              <option
                key={group.id}
                value={group.id}
              >
                {group.name}
              </option>
            ))}
          </select>
  
          <select
            value={filters.productType}
            onChange={(e) =>
              handleChange(
                "productType",
                e.target.value
              )
            }
            className="select select-bordered"
          >
            <option value="">
              All Types
            </option>
  
            <option value="Inventory">
              Inventory
            </option>
  
            <option value="Service">
              Service
            </option>
  
            <option value="NonInventory">
              Non Inventory
            </option>
          </select>
  
          <select
            value={filters.active}
            onChange={(e) =>
              handleChange(
                "active",
                e.target.value
              )
            }
            className="select select-bordered"
          >
            <option value="">
              All Status
            </option>
  
            <option value="true">
              Active
            </option>
  
            <option value="false">
              Inactive
            </option>
          </select>
        </div>
      </div>
    );
  }