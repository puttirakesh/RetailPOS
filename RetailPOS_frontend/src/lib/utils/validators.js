export function required(
    value,
    fieldName = "This field"
  ) {
    if (
      value === null ||
      value === undefined ||
      String(value).trim() === ""
    ) {
      return `${fieldName} is required.`;
    }
  
    return "";
  }
  
  export function minLength(
    value,
    min,
    fieldName = "This field"
  ) {
    if (
      value &&
      String(value).length < min
    ) {
      return `${fieldName} must be at least ${min} characters.`;
    }
  
    return "";
  }
  
  export function maxLength(
    value,
    max,
    fieldName = "This field"
  ) {
    if (
      value &&
      String(value).length > max
    ) {
      return `${fieldName} must not exceed ${max} characters.`;
    }
  
    return "";
  }
  
  export function isEmail(value) {
    if (!value) return true;
  
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      String(value).trim()
    );
  }
  
  export function isPhone(value) {
    if (!value) return true;
  
    return /^[6-9]\d{9}$/.test(
      String(value).trim()
    );
  }
  
  export function isGSTIN(value) {
    if (!value) return true;
  
    return /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/.test(
      String(value)
        .trim()
        .toUpperCase()
    );
  }
  
  export function isNumber(value) {
    if (
      value === "" ||
      value === null ||
      value === undefined
    ) {
      return false;
    }
  
    return Number.isFinite(
      Number(value)
    );
  }
  
  export function isPositiveNumber(
    value
  ) {
    return (
      isNumber(value) &&
      Number(value) > 0
    );
  }
  
  export function isNonNegativeNumber(
    value
  ) {
    return (
      isNumber(value) &&
      Number(value) >= 0
    );
  }
  
  export function isInteger(value) {
    return (
      isNumber(value) &&
      Number.isInteger(
        Number(value)
      )
    );
  }
  
  export function validateRequiredFields(
    data,
    fields
  ) {
    const errors = {};
  
    fields.forEach((field) => {
      const error = required(
        data[field.name],
        field.label
      );
  
      if (error) {
        errors[field.name] =
          error;
      }
    });
  
    return errors;
  }
  
  export function isValidDate(
    value
  ) {
    if (!value) return false;
  
    const date = new Date(value);
  
    return !Number.isNaN(
      date.getTime()
    );
  }
  
  export function isDateRangeValid(
    startDate,
    endDate
  ) {
    if (
      !isValidDate(startDate) ||
      !isValidDate(endDate)
    ) {
      return false;
    }
  
    return (
      new Date(startDate) <=
      new Date(endDate)
    );
  }