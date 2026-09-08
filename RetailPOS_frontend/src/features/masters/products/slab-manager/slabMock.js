export const ageSlabMock = [
    {
      id: 1,
      name: "0-30 Days",
      description: "Fresh stock",
      fromDays: 0,
      toDays: 30,
      active: true,
    },
    {
      id: 2,
      name: "31-60 Days",
      description: "Aging stock",
      fromDays: 31,
      toDays: 60,
      active: true,
    },
    {
      id: 3,
      name: "61-90 Days",
      description: "Slow moving stock",
      fromDays: 61,
      toDays: 90,
      active: true,
    },
  ];
  
  export const priceSlabMock = [
    {
      id: 1,
      name: "Low Range",
      description: "Products below 500",
      fromValue: 0,
      toValue: 500,
      active: true,
    },
    {
      id: 2,
      name: "Medium Range",
      description: "Products 500-1000",
      fromValue: 501,
      toValue: 1000,
      active: true,
    },
  ];