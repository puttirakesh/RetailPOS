import { motion } from "framer-motion";
import { Info } from "lucide-react";

export default function SlabTaxSection({
  formData,
  setFormData,
}) {
  const updateSlab = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      slab: {
        ...prev.slab,
        [field]: value,
      },
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      className="overflow-hidden rounded-2xl border border-primary/20 bg-primary/5 p-4"
    >
      <div className="mb-4 flex items-start gap-3">
        <Info
          size={18}
          className="mt-0.5 text-primary"
        />

        <div>
          <h3 className="text-sm font-semibold">
            Slab Tax Configuration
          </h3>

          <p className="mt-1 text-xs text-base-content/60">
            Configure tax thresholds before and after the specified value.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Before Value
          </label>

          <input
            type="number"
            value={formData.slab.beforeValue}
            onChange={(e) =>
              updateSlab(
                "beforeValue",
                e.target.value
              )
            }
            placeholder="1000"
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Before Tax
          </label>

          <input
            type="text"
            value={formData.slab.beforeTax}
            onChange={(e) =>
              updateSlab(
                "beforeTax",
                e.target.value
              )
            }
            placeholder="12%"
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            After Value
          </label>

          <input
            type="number"
            value={formData.slab.afterValue}
            onChange={(e) =>
              updateSlab(
                "afterValue",
                e.target.value
              )
            }
            placeholder="1000"
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            After Tax
          </label>

          <input
            type="text"
            value={formData.slab.afterTax}
            onChange={(e) =>
              updateSlab(
                "afterTax",
                e.target.value
              )
            }
            placeholder="18%"
            className="input input-bordered w-full"
          />
        </div>
      </div>
    </motion.div>
  );
}