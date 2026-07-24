import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { TERMIN_OPTIONS } from "./TerminDropdown";

export default function PaymentAllocationAccordionModal({
  open,
  onClose,
  destinations,
  products,
  terminCount = 2,
}) {
  const [active, setActive] = useState(0);
  const [entered, setEntered] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selections, setSelections] = useState([]);
  const [bannerMessage, setBannerMessage] = useState("");
  const transitionTimers = useRef([]);
  const availableTerminCount = Math.min(
    terminCount,
    Math.max(...TERMIN_OPTIONS),
  );
  const availableTermins = Array.from(
    { length: availableTerminCount },
    (_, index) => ({
      value: `termin-${index + 1}`,
      label: `Termin ${index + 1}`,
    }),
  );

  useEffect(() => {
    if (!open) return undefined;

    setActive(0);
    setSubmitted(false);
    setSelections(destinations.map(() => ""));
    setBannerMessage("");
    document.body.style.overflow = "hidden";
    const entryFrame = window.requestAnimationFrame(() => setEntered(true));

    function handleEscape(event) {
      if (event.key === "Escape") requestClose();
    }

    window.addEventListener("keydown", handleEscape);
    return () => {
      window.cancelAnimationFrame(entryFrame);
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(
    () => () => transitionTimers.current.forEach(window.clearTimeout),
    [],
  );

  if (!open) return null;

  function requestClose() {
    setEntered(false);
    transitionTimers.current.push(window.setTimeout(onClose, 300));
  }

  function updateSelection(index, value) {
    setSelections((current) =>
      current.map((selection, itemIndex) =>
        itemIndex === index ? value : selection,
      ),
    );
    if (value) setBannerMessage("");
  }

  function submitTermin() {
    setSubmitted(true);
    const invalidIndex = selections.findIndex((selection) => !selection);

    if (invalidIndex >= 0) {
      setActive(invalidIndex);
      setBannerMessage(
        `Anda belum melakukan pengaturan untuk: ${destinations[invalidIndex].name}.`,
      );
      return;
    }

    const selectedTerminTypes = new Set(selections);
    const missingTermin = availableTermins.find(
      (termin) => !selectedTerminTypes.has(termin.value),
    );

    if (missingTermin) {
      setBannerMessage(
        `Anda belum melakukan pengaturan untuk: ${missingTermin.label}.`,
      );
      return;
    }

    requestClose();
  }

  return (
    <div
      className={`allocation-backdrop${entered ? " open" : ""}`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) requestClose();
      }}
    >
      <section
        className="allocation-modal allocation-accordion-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="allocation-accordion-title"
      >
        <header className="allocation-header">
          <h2 id="allocation-accordion-title">
            Detail Pesanan Per Pengiriman
          </h2>
        </header>

        <div
          className={`allocation-validation${bannerMessage ? " show" : ""}`}
          role="alert"
        >
          <span className="allocation-validation-icon">×</span>
          <span className="allocation-validation-copy">
            <strong>Terdapat Termin yang Belum Diatur</strong>
            <span>{bannerMessage}</span>
          </span>
          <button
            type="button"
            aria-label="Tutup notifikasi"
            onClick={() => setBannerMessage("")}
          >
            ×
          </button>
        </div>

        <div className="allocation-accordion-list">
          {destinations.map((destination, index) => {
            const expanded = active === index;
            const hasError = submitted && !selections[index];
            const selectedTermin = availableTermins.find(
              (termin) => termin.value === selections[index],
            );

            return (
              <article
                className={`allocation-accordion-card${expanded ? " expanded" : ""}${hasError ? " error" : ""}`}
                key={destination.name}
              >
                <button
                  className="allocation-accordion-trigger"
                  type="button"
                  aria-expanded={expanded}
                  onClick={() => setActive(expanded ? -1 : index)}
                >
                  <span className="allocation-accordion-location">
                    <strong>{destination.name}</strong>
                    <small>{destination.address}</small>
                  </span>
                  <span
                    className={`allocation-accordion-status${selectedTermin ? " selected" : ""}${hasError ? " error" : ""}`}
                  >
                    <small>Pengaturan Termin</small>
                    <strong>
                      {selectedTermin?.label ??
                        (hasError ? "Wajib dipilih" : "Belum diatur")}
                    </strong>
                  </span>
                  <span className="allocation-accordion-chevron">
                    {expanded ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </span>
                </button>

                <div
                  className="allocation-accordion-body-shell"
                  aria-hidden={!expanded}
                >
                  <div className="allocation-accordion-body">
                    <div className="allocation-accordion-control">
                      <label htmlFor={`accordion-termin-${index}`}>
                        Pilih termin untuk lokasi pengiriman ini
                      </label>
                      <select
                        id={`accordion-termin-${index}`}
                        className={hasError ? "error" : ""}
                        value={selections[index] ?? ""}
                        onChange={(event) =>
                          updateSelection(index, event.target.value)
                        }
                      >
                        <option value="">Pilih termin</option>
                        {availableTermins.map((termin) => (
                          <option value={termin.value} key={termin.value}>
                            {termin.label}
                          </option>
                        ))}
                      </select>
                      <span className={hasError ? "show" : ""}>
                        Termin harus dipilih
                      </span>
                    </div>

                    <div className="allocation-table-wrap">
                      <table>
                        <thead>
                          <tr>
                            <th>Produk</th>
                            <th>Jumlah</th>
                            <th>Layanan Tambahan</th>
                            <th>Service Price</th>
                            <th>Pengiriman</th>
                            <th>Subtotal</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(products[index] ?? []).map((product, rowIndex) => (
                            <tr key={`${product}-${rowIndex}`}>
                              <td>{product}</td>
                              <td>10 unit</td>
                              <td>Instalasi AC × 10</td>
                              <td>Rp 5.000.000</td>
                              <td>Rp 750.000</td>
                              <td>{destination.total}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="allocation-total">
                      <div>
                        <strong>Total</strong>
                        <strong>Jumlah</strong>
                      </div>
                      <div>
                        <span>
                          Total Harga Produk ({destination.count} Produk)
                        </span>
                        <strong>Rp 42.000.000</strong>
                      </div>
                      <div>
                        <span>Total Layanan Tambahan</span>
                        <strong>Rp 5.000.000</strong>
                      </div>
                      <div>
                        <span>Total Ongkos Kirim</span>
                        <strong>Rp 750.000</strong>
                      </div>
                      <div>
                        <span>Total Pesanan</span>
                        <strong>{destination.total}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <footer className="allocation-footer">
          <button type="button" onClick={requestClose}>
            Kembali
          </button>
          <button className="primary" type="button" onClick={submitTermin}>
            Atur
          </button>
        </footer>
      </section>
    </div>
  );
}
