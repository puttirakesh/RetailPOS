import {
  ChevronRight,
  Home,
} from "lucide-react";

import {
  Link,
  useLocation,
} from "react-router-dom";

import { breadcrumbMap } from "../../routes/routeUtils";

export default function Breadcrumbs() {
  const location = useLocation();

  const items =
    breadcrumbMap[
      location.pathname
    ] || [];

  return (
    <div className="flex items-center gap-2 text-sm">
      <Link
        to="/dashboard"
        className="flex items-center gap-1 text-base-content/50 transition-colors hover:text-primary"
      >
        <Home size={15} />
        Home
      </Link>

      {items.map(
        (item, index) => {
          const isLast =
            index ===
            items.length - 1;

          return (
            <div
              key={`${item}-${index}`}
              className="flex items-center gap-2"
            >
              <ChevronRight
                size={14}
                className="text-base-content/30"
              />

              <span
                className={
                  isLast
                    ? "font-medium text-base-content"
                    : "text-base-content/50"
                }
              >
                {item}
              </span>
            </div>
          );
        }
      )}
    </div>
  );
}