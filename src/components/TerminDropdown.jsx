import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export const TERMIN_OPTIONS = [2, 3];

export default function TerminDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (!dropdownRef.current?.contains(event.target)) {
        setOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  function selectOption(option) {
    onChange(option);
    setOpen(false);
  }

  return (
    <div className={`termin-dropdown${open ? " open" : ""}`} ref={dropdownRef}>
      <button
        className={`termin-select${value ? " has-value" : ""}`}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <span>{value ? `${value} Termin` : "Pilih jumlah termin"}</span>
        {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      {open && (
        <div className="termin-menu" role="listbox" aria-label="Jumlah termin">
          {TERMIN_OPTIONS.map((option) => (
            <button
              className={`termin-option${value === option ? " selected" : ""}`}
              type="button"
              role="option"
              aria-selected={value === option}
              key={option}
              onClick={() => selectOption(option)}
            >
              {option} Termin
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
