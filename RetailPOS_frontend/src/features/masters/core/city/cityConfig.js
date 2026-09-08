export const cityConfig = {
    title: "City Master",
    description: "Manage cities and their state relationships.",
  
    fields: [
      {
        name: "code",
        label: "City Code",
        type: "text",
        required: true,
      },
      {
        name: "name",
        label: "City Name",
        type: "text",
        required: true,
      },
      {
        name: "stateId",
        label: "State",
        type: "select",
        required: true,
      },
      {
        name: "active",
        label: "Active",
        type: "checkbox",
      },
    ],
  };
  
  export const emptyCity = {
    id: null,
    code: "",
    name: "",
    stateId: "",
    active: true,
  };