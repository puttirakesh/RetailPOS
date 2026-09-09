export function generateId(
    prefix = ""
  ) {
    const random =
      Math.random()
        .toString(36)
        .slice(2, 9);
  
    return `${prefix}${Date.now()}-${random}`;
  }
  
  export function sleep(
    milliseconds = 300
  ) {
    return new Promise((resolve) =>
      setTimeout(
        resolve,
        milliseconds
      )
    );
  }
  
  export function debounce(
    callback,
    delay = 300
  ) {
    let timeoutId;
  
    return (...args) => {
      clearTimeout(timeoutId);
  
      timeoutId = setTimeout(
        () => {
          callback(...args);
        },
        delay
      );
    };
  }
  
  export function throttle(
    callback,
    delay = 300
  ) {
    let waiting = false;
  
    return (...args) => {
      if (waiting) return;
  
      callback(...args);
  
      waiting = true;
  
      setTimeout(() => {
        waiting = false;
      }, delay);
    };
  }
  
  export function deepClone(
    value
  ) {
    if (value === null || value === undefined) {
      return value;
    }
  
    return JSON.parse(
      JSON.stringify(value)
    );
  }
  
  export function isEmpty(value) {
    if (
      value === null ||
      value === undefined
    ) {
      return true;
    }
  
    if (
      typeof value === "string"
    ) {
      return value.trim() === "";
    }
  
    if (Array.isArray(value)) {
      return value.length === 0;
    }
  
    if (
      typeof value === "object"
    ) {
      return (
        Object.keys(value).length === 0
      );
    }
  
    return false;
  }
  
  export function getNestedValue(
    object,
    path,
    fallback = undefined
  ) {
    if (!object || !path) {
      return fallback;
    }
  
    const value = path
      .split(".")
      .reduce(
        (current, key) =>
          current?.[key],
        object
      );
  
    return value === undefined
      ? fallback
      : value;
  }
  
  export function setNestedValue(
    object,
    path,
    value
  ) {
    const keys = path.split(".");
  
    const result = {
      ...object,
    };
  
    let current = result;
  
    keys.forEach(
      (key, index) => {
        if (
          index ===
          keys.length - 1
        ) {
          current[key] = value;
          return;
        }
  
        current[key] = {
          ...(current[key] || {}),
        };
  
        current =
          current[key];
      }
    );
  
    return result;
  }
  
  export function sortBy(
    array,
    key,
    direction = "asc"
  ) {
    return [...array].sort(
      (a, b) => {
        const aValue =
          getNestedValue(
            a,
            key,
            ""
          );
  
        const bValue =
          getNestedValue(
            b,
            key,
            ""
          );
  
        const comparison =
          String(aValue).localeCompare(
            String(bValue),
            undefined,
            {
              numeric: true,
              sensitivity:
                "base",
            }
          );
  
        return direction ===
          "desc"
          ? -comparison
          : comparison;
      }
    );
  }
  
  export function filterBySearch(
    array,
    search,
    fields = []
  ) {
    const query = String(
      search || ""
    )
      .trim()
      .toLowerCase();
  
    if (!query) {
      return array;
    }
  
    return array.filter(
      (item) =>
        fields.some((field) => {
          const value =
            getNestedValue(
              item,
              field,
              ""
            );
  
          return String(value)
            .toLowerCase()
            .includes(query);
        })
    );
  }
  
  export function groupBy(
    array,
    key
  ) {
    return array.reduce(
      (groups, item) => {
        const groupValue =
          getNestedValue(
            item,
            key,
            "undefined"
          );
  
        if (!groups[groupValue]) {
          groups[groupValue] = [];
        }
  
        groups[groupValue].push(
          item
        );
  
        return groups;
      },
      {}
    );
  }
  
  export function uniqueBy(
    array,
    key
  ) {
    const seen =
      new Set();
  
    return array.filter(
      (item) => {
        const value =
          getNestedValue(
            item,
            key
          );
  
        if (seen.has(value)) {
          return false;
        }
  
        seen.add(value);
  
        return true;
      }
    );
  }
  
  export function capitalize(
    value
  ) {
    if (!value) return "";
  
    const text = String(value);
  
    return (
      text.charAt(0).toUpperCase() +
      text.slice(1)
    );
  }
  
  export function slugify(
    value
  ) {
    return String(value || "")
      .toLowerCase()
      .trim()
      .replace(
        /[^a-z0-9]+/g,
        "-"
      )
      .replace(
        /^-+|-+$/g,
        ""
      );
  }
  
  export function downloadBlob(
    blob,
    filename
  ) {
    const url =
      URL.createObjectURL(blob);
  
    const anchor =
      document.createElement("a");
  
    anchor.href = url;
    anchor.download =
      filename;
  
    document.body.appendChild(
      anchor
    );
  
    anchor.click();
  
    anchor.remove();
  
    URL.revokeObjectURL(url);
  }
  
  export function downloadJSON(
    data,
    filename = "data.json"
  ) {
    const blob = new Blob(
      [
        JSON.stringify(
          data,
          null,
          2
        ),
      ],
      {
        type: "application/json",
      }
    );
  
    downloadBlob(
      blob,
      filename
    );
  }
  
  export function parseBoolean(
    value
  ) {
    if (
      typeof value ===
      "boolean"
    ) {
      return value;
    }
  
    if (
      typeof value ===
      "number"
    ) {
      return value !== 0;
    }
  
    const normalized =
      String(value)
        .trim()
        .toLowerCase();
  
    return [
      "true",
      "1",
      "yes",
      "active",
      "enabled",
    ].includes(
      normalized
    );
  }
  
  export function clamp(
    value,
    min,
    max
  ) {
    return Math.min(
      Math.max(
        Number(value) || 0,
        min
      ),
      max
    );
  }