import {
  ChevronRight,
  Home,
} from "lucide-react";

import {
  Link,
  useLocation,
} from "react-router-dom";

const labels = {
  dashboard: "Dashboard",
  masters: "Masters",
  state: "State",
  city: "City",
  branch: "Branch",
  tax: "Tax",
  "financial-year":
    "Financial Year",
  group: "Group",
  category: "Category",
  brand: "Brand",
  mark: "Mark",
  attribute: "Attribute",
  "slab-manager":
    "Slab Manager",
  product: "Product",
  "product-entry":
    "Product Entry",
  customer: "Customer",
  supplier: "Supplier",
  agent: "Agent",
  purchaser: "Purchaser",
  salesperson:
    "Salesperson",
  pos: "Point of Sale",
  inventory: "Inventory",
  reports: "Reports",
  settings: "Settings",
};

export default function Breadcrumbs() {
  const location = useLocation();

  const segments =
    location.pathname
      .split("/")
      .filter(Boolean);

  let currentPath = "";

  return (
    <nav className="flex min-w-0 items-center gap-1.5 overflow-x-auto text-sm">
      <Link
        to="/dashboard"
        className="flex shrink-0 items-center gap-1.5 text-base-content/45 transition-colors hover:text-primary"
      >
        <Home size={14} />
        Home
      </Link>

      {segments.map(
        (segment, index) => {
          currentPath += `/${segment}`;

          const isLast =
            index ===
            segments.length - 1;

          const label =
            labels[segment] ||
            segment
              .replace(
                /-/g,
                " "
              )
              .replace(
                /\b\w/g,
                (char) =>
                  char.toUpperCase()
              );

          return (
            <div
              key={
                `${segment}-${index}`
              }
              className="flex min-w-0 shrink-0 items-center gap-1.5"
            >
              <ChevronRight
                size={14}
                className="text-base-content/25"
              />

              {isLast ? (
                <span className="font-medium text-base-content">
                  {label}
                </span>
              ) : (
                <span className="text-base-content/45">
                  {label}
                </span>
              )}
            </div>
          );
        }
      )}
    </nav>
  );
}