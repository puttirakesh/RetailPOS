import ConfirmDialog from "./ConfirmDialog";

export default function DeleteDialog({
  open,
  title = "Delete Record",
  itemName,
  onConfirm,
  onCancel,
  loading = false,
}) {
  const message = itemName
    ? `Are you sure you want to delete "${itemName}"? This action cannot be undone.`
    : "Are you sure you want to delete this record? This action cannot be undone.";

  return (
    <ConfirmDialog
      open={open}
      title={title}
      message={message}
      confirmLabel="Delete"
      cancelLabel="Cancel"
      variant="danger"
      onConfirm={onConfirm}
      onCancel={onCancel}
      loading={loading}
    />
  );
}