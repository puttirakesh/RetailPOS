export const productMock = [
    {
      id: 1,
      code: "PRD001",
      name: "Formal Shirt Blue",
      hsn: "62052000",
      categoryId: 1,
      groupId: 1,
      taxId: "GST18",
      uom: "PCS",
      productType: "Inventory",
  
      uniqueProduct: false,
      bulkProduct: false,
      autoEAN: true,
      entryWiseEAN: false,
      discountNotApplicable: false,
      manualBarcodeRestriction: false,
      nonInventory: false,
  
      active: true,
    },
  
    {
      id: 2,
      code: "PRD002",
      name: "Premium Jacket",
      hsn: "62033300",
      categoryId: 3,
      groupId: 2,
      taxId: "GST18",
      uom: "PCS",
      productType: "Inventory",
  
      uniqueProduct: true,
      bulkProduct: false,
      autoEAN: false,
      entryWiseEAN: true,
      discountNotApplicable: false,
      manualBarcodeRestriction: true,
      nonInventory: false,
  
      active: true,
    },
  
    {
      id: 3,
      code: "PRD003",
      name: "Gift Wrapping Service",
      hsn: "999799",
      categoryId: 1,
      groupId: 1,
      taxId: "GST18",
      uom: "PCS",
      productType: "Service",
  
      uniqueProduct: false,
      bulkProduct: false,
      autoEAN: false,
      entryWiseEAN: false,
      discountNotApplicable: true,
      manualBarcodeRestriction: false,
      nonInventory: true,
  
      active: true,
    },
  ];