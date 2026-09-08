import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Check,
  X,
  SlidersHorizontal,
} from "lucide-react";

export default function AttributeMappingDialog({
  open,
  category,
  attributes,
  onClose,
  onSave,
}) {
  const [selected, setSelected] =
    useState([]);

  useEffect(() => {
    if (category) {
      setSelected(
        category.attributeIds || []
      );
    }
  }, [category]);

  if (!open) return null;

  const toggleAttribute = (id) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter(
            (item) => item !== id
          )
        : [...prev, id]
    );
  };

  const handleSave = () => {
    onSave(selected);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.95,
          y: 20,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        className="w-full max-w-2xl rounded-3xl border border-base-300 bg-base-100 shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-base-300 p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <SlidersHorizontal
                size={19}
                className="text-primary"
              />
            </div>

            <div>
              <h2 className="font-semibold">
                Attribute Mapping
              </h2>

              <p className="text-xs text-base-content/50">
                {category?.name}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="btn btn-ghost btn-sm btn-square"
          >
            <X size={18} />
          </button>
        </div>

        <div className="max-h-[55vh] overflow-y-auto p-6">
          <div className="grid gap-3 md:grid-cols-2">
            {attributes.map((attribute) => {
              const active =
                selected.includes(
                  attribute.id
                );

              return (
                <button
                  key={attribute.id}
                  type="button"
                  onClick={() =>
                    toggleAttribute(
                      attribute.id
                    )
                  }
                  className={`rounded-2xl border p-4 text-left transition ${
                    active
                      ? "border-primary bg-primary/10"
                      : "border-base-300 hover:border-primary/40"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">
                      {attribute.name}
                    </span>

                    {active && (
                      <Check
                        size={18}
                        className="text-primary"
                      />
                    )}
                  </div>

                  <p className="mt-1 text-xs text-base-content/50">
                    {attribute.code}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-base-300 p-6">
          <button
            onClick={onClose}
            className="btn btn-ghost"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="btn btn-primary"
          >
            Save Mapping
          </button>
        </div>
      </motion.div>
    </div>
  );
}