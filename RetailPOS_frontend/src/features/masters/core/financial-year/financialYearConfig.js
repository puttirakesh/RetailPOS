export const financialYearConfig = {
    title: "Financial Year",
  
    fields: [
      {
        name: "code",
        label: "Financial Year Code",
        type: "text",
      },
      {
        name: "name",
        label: "Financial Year",
        type: "text",
      },
    ],
  };
  
  export const emptyFinancialYear = {
    id: null,
    code: "",
    name: "",
    startDate: "",
    endDate: "",
    active: true,
  };