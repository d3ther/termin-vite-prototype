import { useEffect, useState } from "react";

export default function ConfirmationModal({
  open,
  title,
  description,
  cancelLabel,
  confirmLabel,
  onCancel,
  onConfirm,
}) {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (!open) return undefined;

    document.body.style.overflow = "hidden";
    const frame = window.requestAnimationFrame(() => setEntered(true));

    function handleEscape(event) {
      if (event.key === "Escape") closeModal();
    }

    window.addEventListener("keydown", handleEscape);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  function closeModal() {
    setEntered(false);
    window.setTimeout(onCancel, 300);
  }

  return (
    <div
      className={`summary-modal-backdrop${entered ? " open" : ""}`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) closeModal();
      }}
    >
      <section
        className="confirmation-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirmation-modal-title"
      >
        <h2 id="confirmation-modal-title">{title}</h2>
        <p>{description}</p>
        <div className="confirmation-modal-actions">
          <button type="button" onClick={closeModal}>
            {cancelLabel}
          </button>
          <button className="primary" type="button" onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </section>
    </div>
  );
}
