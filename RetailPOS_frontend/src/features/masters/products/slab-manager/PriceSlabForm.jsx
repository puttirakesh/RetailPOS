import { Save } from "lucide-react";

export default function PriceSlabForm({
  form,
  setForm,
  onSave,
}) {
  return (
    <form
      onSubmit={onSave}
      className="grid gap-4 md:grid-cols-2"
    >
      <input
        value={form.name}
        onChange={(e) =>
          setForm({
            ...form,
            name: e.target.value,
          })
        }
        placeholder="Price slab name"
        className="input input-bordered w-full"
      />

      <input
        value={form.description}
        onChange={(e) =>
          setForm({
            ...form,
            description: e.target.value,
          })
        }
        placeholder="Description"
        className="input input-bordered w-full"
      />

      <input
        type="number"
        value={form.fromValue}
        onChange={(e) =>
          setForm({
            ...form,
            fromValue: e.target.value,
          })
        }
        placeholder="From Value"
        className="input input-bordered w-full"
      />

      <input
        type="number"
        value={form.toValue}
        onChange={(e) =>
          setForm({
            ...form,
            toValue: e.target.value,
          })
        }
        placeholder="To Value"
        className="input input-bordered w-full"
      />

      <div className="md:col-span-2">
        <button className="btn btn-primary gap-2">
          <Save size={16} />
          Save Price Slab
        </button>
      </div>
    </form>
  );
}