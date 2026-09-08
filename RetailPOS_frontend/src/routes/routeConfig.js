import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Database,
  MapPinned,
  Building2,
  ReceiptText,
  CalendarRange,
  Boxes,
  Tags,
  Tag,
  SlidersHorizontal,
  Barcode,
  Users,
  Truck,
  UserRoundCog,
  UserRound,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  Settings,
} from "lucide-react";



export const navigation = [
  {
    label: "Overview",

    items: [
      {
        path: "/dashboard",
        label: "Dashboard",
        icon: LayoutDashboard,
      },
    ],
  },

  {
    label: "Operations",

    items: [
      {
        path: "/pos",
        label: "Point of Sale",
        icon: ShoppingCart,
      },

      {
        path: "/inventory",
        label: "Inventory",
        icon: Package,
      },
    ],
  },

  {
    label: "Masters",

    items: [
      {
        label: "Core Masters",
        icon: Database,

        children: [
          {
            path: "/masters/state",
            label: "State",
            icon: MapPinned,
          },

          {
            path: "/masters/city",
            label: "City",
            icon: MapPinned,
          },

          {
            path: "/masters/branch",
            label: "Branch",
            icon: Building2,
          },

          {
            path: "/masters/tax",
            label: "Tax",
            icon: ReceiptText,
          },

          {
            path: "/masters/financial-year",
            label: "Financial Year",
            icon: CalendarRange,
          },
        ],
      },

      {
        label: "Product Masters",
        icon: Boxes,

        children: [
          {
            path: "/masters/group",
            label: "Group",
            icon: Tags,
          },

          {
            path: "/masters/category",
            label: "Category",
            icon: Tag,
          },

          {
            path: "/masters/brand",
            label: "Brand",
            icon: Tags,
          },

          {
            path: "/masters/mark",
            label: "Mark",
            icon: Tag,
          },

          {
            path: "/masters/attribute",
            label: "Attribute",
            icon: SlidersHorizontal,
          },

          {
            path: "/masters/slab-manager",
            label: "Slab Manager",
            icon: Barcode,
          },

          {
            path: "/masters/product",
            label: "Product",
            icon: Package,
          },

          {
            path: "/masters/product-entry",
            label: "Product Entry",
            icon: Barcode,
          },
        ],
      },

      {
        label: "Party Masters",
        icon: Users,

        children: [
          {
            path: "/masters/customer",
            label: "Customer",
            icon: UserRound,
          },

          {
            path: "/masters/supplier",
            label: "Supplier",
            icon: Truck,
          },

          {
            path: "/masters/agent",
            label: "Agent",
            icon: UserRoundCog,
          },

          {
            path: "/masters/purchaser",
            label: "Purchaser",
            icon: BriefcaseBusiness,
          },

          {
            path: "/masters/salesperson",
            label: "Salesperson",
            icon: UserRound,
          },
        ],
      },
    ],
  },

  {
    label: "Analytics",

    items: [
      {
        path: "/reports",
        label: "Reports",
        icon: ChartNoAxesCombined,
      },
    ],
  },

  {
    label: "System",

    items: [
      {
        path: "/settings",
        label: "Settings",
        icon: Settings,
      },
    ],
  },
];