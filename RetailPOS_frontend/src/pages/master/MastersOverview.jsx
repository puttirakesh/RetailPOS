import {
  motion,
} from "framer-motion";

import {
  ArrowRight,
  Boxes,
  Database,
  Users,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

const sections = [
  {
    title: "Core Masters",
    description:
      "States, cities, branches, taxes and financial years.",
    icon: Database,
    path: "/masters/state",
  },
  {
    title: "Product Masters",
    description:
      "Groups, categories, brands, attributes, slabs and products.",
    icon: Boxes,
    path: "/masters/group",
  },
  {
    title: "Party Masters",
    description:
      "Customers, suppliers, agents, purchasers and salespersons.",
    icon: Users,
    path: "/masters/customer",
  },
];

export default function MastersOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          Masters
        </h1>

        <p className="mt-1 text-sm text-base-content/60">
          Manage the core data used throughout RetailPOS.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {sections.map(
          (section, index) => {
            const Icon = section.icon;

            return (
              <motion.div
                key={section.title}
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.08,
                }}
              >
                <Link
                  to={section.path}
                  className="group block rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Icon
                      size={22}
                      className="text-primary"
                    />
                  </div>

                  <h2 className="text-lg font-semibold">
                    {section.title}
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-base-content/60">
                    {section.description}
                  </p>

                  <div className="mt-5 flex items-center gap-2 text-sm font-medium text-primary">
                    Open module

                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </div>
                </Link>
              </motion.div>
            );
          }
        )}
      </div>
    </div>
  );
}