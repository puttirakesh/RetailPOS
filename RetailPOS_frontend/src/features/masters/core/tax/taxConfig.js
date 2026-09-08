export const taxConfig = {
    title: "Tax Master",
  
    taxTypes: [
      {
        value: "GST",
        label: "GST",
      },
      {
        value: "CGST_SGST",
        label: "CGST + SGST",
      },
      {
        value: "IGST",
        label: "IGST",
      },
    ],
  };
  
  export const emptyTax = {
    id: null,
    code: "",
    name: "",
    taxType: "GST",
    rate: "",
    active: true,
  };