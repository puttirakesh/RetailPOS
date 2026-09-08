export const stateConfig = {
    title: "State Master",
    description: "Manage states used across customers, suppliers, branches and cities.",
  
    searchableFields: [
      "code",
      "name",
      "stateType",
    ],
  
    fields: [
      {
        name: "code",
        label: "State Code",
        type: "text",
        placeholder: "Enter state code",
        required: true,
      },
      {
        name: "name",
        label: "State Name",
        type: "text",
        placeholder: "Enter state name",
        required: true,
      },
      {
        name: "stateType",
        label: "State Type",
        type: "select",
        required: true,
        options: [
          {
            value: "1",
            label: "Local State",
          },
          {
            value: "2",
            label: "Other State",
          },
        ],
      },
      {
        name: "active",
        label: "Active",
        type: "checkbox",
      },
    ],
  
    columns: [
      {
        key: "code",
        label: "Code",
      },
      {
        key: "name",
        label: "State Name",
      },
      {
        key: "stateType",
        label: "State Type",
      },
      {
        key: "active",
        label: "Status",
      },
    ],
  };
  
  export const emptyState = {
    id: null,
    code: "",
    name: "",
    stateType: "1",
    active: true,
  };