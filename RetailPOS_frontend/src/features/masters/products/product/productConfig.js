export const productTypes = [
    "Inventory",
    "Service",
    "NonInventory",
  ];
  
  export const uomOptions = [
    "PCS",
    "BOX",
    "KG",
    "GRAM",
    "LTR",
    "MTR",
  ];
  
  export const emptyProduct = {
    id: null,
    code: "",
    name: "",
    hsn: "",
    categoryId: "",
    groupId: "",
    taxId: "",
    uom: "PCS",
    productType: "Inventory",
  
    uniqueProduct: false,
    bulkProduct: false,
    autoEAN: false,
    entryWiseEAN: false,
    discountNotApplicable: false,
    manualBarcodeRestriction: false,
    nonInventory: false,
  
    active: true,
  };