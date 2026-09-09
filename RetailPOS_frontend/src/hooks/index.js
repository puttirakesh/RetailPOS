import { useCallback, useEffect, useMemo, useRef, useState } from "react";

/* =========================================================
   useModal
   ========================================================= */

export function useModal(initialOpen = false) {
  const [isOpen, setIsOpen] = useState(initialOpen);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return {
    isOpen,
    open,
    close,
    toggle,
  };
}


/* =========================================================
   useDebounce
   ========================================================= */

export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}


/* =========================================================
   useSearch
   ========================================================= */

export function useSearch(items = [], searchFields = []) {
  const [query, setQuery] = useState("");

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return items;
    }

    return items.filter((item) => {
      return searchFields.some((field) => {
        const value = item?.[field];

        if (value === null || value === undefined) {
          return false;
        }

        return String(value)
          .toLowerCase()
          .includes(normalizedQuery);
      });
    });
  }, [items, query, searchFields]);

  const clearSearch = useCallback(() => {
    setQuery("");
  }, []);

  return {
    query,
    setQuery,
    filteredItems,
    clearSearch,
    resultCount: filteredItems.length,
  };
}


/* =========================================================
   usePagination
   ========================================================= */

export function usePagination(
  totalItems = 0,
  initialPage = 1,
  initialPageSize = 10
) {
  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const totalPages = Math.max(
    1,
    Math.ceil(totalItems / pageSize)
  );

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const nextPage = useCallback(() => {
    setPage((currentPage) =>
      Math.min(currentPage + 1, totalPages)
    );
  }, [totalPages]);

  const previousPage = useCallback(() => {
    setPage((currentPage) =>
      Math.max(currentPage - 1, 1)
    );
  }, []);

  const goToPage = useCallback(
    (targetPage) => {
      const nextPageNumber = Number(targetPage);

      if (
        Number.isNaN(nextPageNumber) ||
        nextPageNumber < 1
      ) {
        return;
      }

      setPage(
        Math.min(Math.max(nextPageNumber, 1), totalPages)
      );
    },
    [totalPages]
  );

  const changePageSize = useCallback((newPageSize) => {
    const size = Number(newPageSize);

    if (Number.isNaN(size) || size <= 0) {
      return;
    }

    setPageSize(size);
    setPage(1);
  }, []);

  const startIndex =
    totalItems === 0 ? 0 : (page - 1) * pageSize + 1;

  const endIndex = Math.min(
    page * pageSize,
    totalItems
  );

  return {
    page,
    pageSize,
    totalPages,
    startIndex,
    endIndex,
    nextPage,
    previousPage,
    goToPage,
    setPage,
    changePageSize,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };
}


/* =========================================================
   useMasterForm
   ========================================================= */

export function useMasterForm(initialValues = {}, options = {}) {
  const {
    onSubmit,
    onReset,
    validate,
  } = options;

  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const initialValuesRef = useRef(initialValues);

  const handleChange = useCallback((eventOrField, value) => {
    if (
      eventOrField &&
      typeof eventOrField === "object" &&
      eventOrField.target
    ) {
      const {
        name,
        value: targetValue,
        checked,
        type,
      } = eventOrField.target;

      const nextValue =
        type === "checkbox"
          ? checked
          : targetValue;

      setFormData((prev) => ({
        ...prev,
        [name]: nextValue,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [eventOrField]: value,
      }));
    }

    setIsDirty(true);

    if (
      typeof eventOrField === "object" &&
      eventOrField?.target?.name
    ) {
      const fieldName = eventOrField.target.name;

      setErrors((prev) => {
        if (!prev[fieldName]) {
          return prev;
        }

        const nextErrors = { ...prev };
        delete nextErrors[fieldName];

        return nextErrors;
      });
    }
  }, []);

  const setFieldValue = useCallback((field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    setIsDirty(true);
  }, []);

  const getFieldValue = useCallback(
    (field) => formData[field],
    [formData]
  );

  const setFieldError = useCallback((field, message) => {
    setErrors((prev) => ({
      ...prev,
      [field]: message,
    }));
  }, []);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const resetForm = useCallback(
    (values = initialValuesRef.current) => {
      setFormData(values);
      setErrors({});
      setIsDirty(false);

      if (typeof onReset === "function") {
        onReset(values);
      }
    },
    [onReset]
  );

  const handleSubmit = useCallback(
    async (event) => {
      event?.preventDefault();

      let validationErrors = {};

      if (typeof validate === "function") {
        validationErrors =
          validate(formData) || {};
      }

      setErrors(validationErrors);

      if (Object.keys(validationErrors).length > 0) {
        return false;
      }

      try {
        setIsSubmitting(true);

        if (typeof onSubmit === "function") {
          await onSubmit(formData);
        }

        setIsDirty(false);

        return true;
      } catch (error) {
        console.error(
          "Form submission failed:",
          error
        );

        return false;
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, onSubmit, validate]
  );

  const hasErrors = Object.keys(errors).length > 0;

  return {
    formData,
    setFormData,
    errors,
    isSubmitting,
    isDirty,
    hasErrors,

    handleChange,
    setFieldValue,
    getFieldValue,

    setFieldError,
    clearErrors,

    handleSubmit,
    resetForm,
  };
}


/* =========================================================
   useKeyboardShortcuts
   ========================================================= */

export function useKeyboardShortcuts(shortcuts = {}, enabled = true) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const handleKeyDown = (event) => {
      const key = event.key.toLowerCase();

      Object.entries(shortcuts).forEach(
        ([shortcut, callback]) => {
          const keys = shortcut
            .toLowerCase()
            .split("+")
            .map((item) => item.trim());

          const keyName = keys[keys.length - 1];

          const requiresCtrl = keys.includes("ctrl");
          const requiresShift = keys.includes("shift");
          const requiresAlt = keys.includes("alt");
          const requiresMeta = keys.includes("meta");

          const ctrlMatches =
            requiresCtrl === event.ctrlKey;

          const shiftMatches =
            requiresShift === event.shiftKey;

          const altMatches =
            requiresAlt === event.altKey;

          const metaMatches =
            requiresMeta === event.metaKey;

          if (
            key === keyName &&
            ctrlMatches &&
            shiftMatches &&
            altMatches &&
            metaMatches
          ) {
            event.preventDefault();

            if (typeof callback === "function") {
              callback(event);
            }
          }
        }
      );
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [shortcuts, enabled]);
}


/* =========================================================
   useMediaQuery
   ========================================================= */

export function useMediaQuery(query) {
  const getMatches = () => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.matchMedia(query).matches;
  };

  const [matches, setMatches] = useState(getMatches);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      !window.matchMedia
    ) {
      return;
    }

    const mediaQuery = window.matchMedia(query);

    const handleChange = (event) => {
      setMatches(event.matches);
    };

    setMatches(mediaQuery.matches);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener(
        "change",
        handleChange
      );

      return () => {
        mediaQuery.removeEventListener(
          "change",
          handleChange
        );
      };
    }

    mediaQuery.addListener(handleChange);

    return () => {
      mediaQuery.removeListener(handleChange);
    };
  }, [query]);

  return matches;
}