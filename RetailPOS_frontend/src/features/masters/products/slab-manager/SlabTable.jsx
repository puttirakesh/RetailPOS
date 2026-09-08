import { Save } from "lucide-react";

export default function AgeSlabForm({
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
        placeholder="Age slab name"
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
        value={form.fromDays}
        onChange={(e) =>
          setForm({
            ...form,
            fromDays: e.target.value,
          })
        }
        placeholder="From Days"
        className="input input-bordered w-full"
      />

      <input
        type="number"
        value={form.toDays}
        onChange={(e) =>
          setForm({
            ...form,
            toDays: e.target.value,
          })
        }
        placeholder="To Days"
        className="input input-bordered w-full"
      />

      <div className="md:col-span-2">
        <button className="btn btn-primary gap-2">
          <Save size={16} />
          Save Age Slab
        </button>
      </div>
    </form>
  );
}