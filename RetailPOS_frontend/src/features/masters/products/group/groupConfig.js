export const groupConfig = {
    title: "Group Master",
  
    taxModes: [
      {
        value: "flat",
        label: "Flat Core Tax",
      },
      {
        value: "slab",
        label: "Slab Based Tax",
      },
    ],
  };
  
  export const emptyGroup = {
    id: null,
    code: "",
    name: "",
    slabRatesRequired: false,
    taxMode: "flat",
    coreTax: "",
    slab: {
      beforeValue: "",
      beforeTax: "",
      afterValue: "",
      afterTax: "",
    },
    active: true,
  };