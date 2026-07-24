import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { PAYMENT_DESTINATIONS } from "../data/paymentTerms";
import { TERMIN_OPTIONS } from "./TerminDropdown";

const products = [
  [
    "AC Split 1 PK Panasonic",
    "AC Split 1.5 PK Daikin",
    "AC Split 1 PK Panasonic",
    "AC Split 1.5 PK Daikin",
    "AC Split 1 PK Panasonic",
    "AC Cassette 2 PK Daikin",
    "Bracket Outdoor Heavy Duty",
  ],
  [
    "AC Split 1 PK Sharp",
    "AC Split 2 PK Daikin",
    "Pipa Tembaga 5 Meter",
    "Bracket Outdoor",
    "Kabel AC Premium",
    "AC Split 1.5 PK Panasonic",
  ],
  [
    "AC Split 1 PK LG",
    "AC Split 1 PK Panasonic",
    "Bracket Outdoor",
    "Pipa Tembaga 3 Meter",
    "Remote AC Universal",
    "Kabel AC Premium",
  ],
];

export default function PaymentAllocationModal({
  open,
  onClose,
  onSuccess,
  terminCount,
  initialSelections = [],
}) {
  const [active, setActive] = useState(0);
  const [selections, setSelections] = useState(["", "", ""]);
  const [submitted, setSubmitted] = useState(false);
  const [fieldErrors, setFieldErrors] = useState([false, false, false]);
  const [bannerMessage, setBannerMessage] = useState("");
  const [transition, setTransition] = useState(null);
  const [modalHeight, setModalHeight] = useState(600);
  const [entered, setEntered] = useState(false);
  const modalRef = useRef(null);
  const contentRef = useRef(null);
  const panelRefs = useRef([]);
  const selectRefs = useRef([]);
  const transitionTimers = useRef([]);
  const maxTerminCount = Math.max(...TERMIN_OPTIONS);
  const availableTerminCount = Math.min(
    terminCount ?? TERMIN_OPTIONS[0],
    maxTerminCount,
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

    setSubmitted(false);
    setFieldErrors([false, false, false]);
    setBannerMessage("");
    setSelections(
      PAYMENT_DESTINATIONS.map((_, index) => {
        const selection = initialSelections[index] ?? "";
        return (
        availableTermins.some((termin) => termin.value === selection)
          ? selection
          : ""
        );
      }),
    );
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
  }, [open, onClose]);

  useEffect(
    () => () => transitionTimers.current.forEach(window.clearTimeout),
    [],
  );

  useLayoutEffect(() => {
    if (!open) return undefined;

    function resizeModal() {
      const panel = panelRefs.current[active];
      if (!panel) return;

      const chromeHeight = 69 + 73 + (bannerMessage ? 82 : 0);
      const desiredHeight = chromeHeight + panel.scrollHeight;
      const viewportLimit = Math.max(600, window.innerHeight - 56);
      setModalHeight(
        Math.min(800, viewportLimit, Math.max(600, desiredHeight)),
      );
    }

    const frame = window.requestAnimationFrame(resizeModal);
    window.addEventListener("resize", resizeModal);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resizeModal);
    };
  }, [active, bannerMessage, open, selections]);

  if (!open) return null;

  function switchTab(next) {
    if (next === active || transition) return;

    contentRef.current?.scrollTo({ top: 0, left: 0 });

    const direction = next > active ? "down" : "up";
    const from = active;
    setTransition({ from, to: next, direction, entered: false });
    setActive(next);

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setTransition((current) =>
          current ? { ...current, entered: true } : current,
        );
      });
    });

    transitionTimers.current.push(
      window.setTimeout(() => setTransition(null), 620),
    );
  }

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

    if (!submitted) return;
    setFieldErrors((current) =>
      current.map((error, itemIndex) => (itemIndex === index ? !value : error)),
    );
  }

  function submitTermin() {
    setSubmitted(true);
    const invalidIndex = selections.findIndex((selection) => !selection);

    if (invalidIndex >= 0) {
      setFieldErrors(selections.map((selection) => !selection));
      setBannerMessage(
        `Anda belum melakukan pengaturan untuk: ${PAYMENT_DESTINATIONS[invalidIndex].name}.`,
      );
      switchTab(invalidIndex);
      window.setTimeout(() => selectRefs.current[invalidIndex]?.focus(), 650);
      return;
    }

    const selectedTerminTypes = new Set(selections);
    const missingTermin = availableTermins.find(
      (termin) => !selectedTerminTypes.has(termin.value),
    );
    if (missingTermin) {
      setFieldErrors([false, false, false]);
      setBannerMessage(
        `Anda belum melakukan pengaturan untuk: ${missingTermin.label}.`,
      );
      return;
    }

    setFieldErrors([false, false, false]);
    setBannerMessage("");
    onSuccess({
      terminCount: availableTerminCount,
      allocations: selections,
    });
  }

  function panelClass(index) {
    if (!transition) return index === active ? "active" : "";
    if (index === transition.from) {
      return transition.direction === "down" ? "exit-down" : "exit-up";
    }
    if (index === transition.to) {
      if (transition.entered) return "active";
      return transition.direction === "down" ? "from-bottom" : "from-top";
    }
    return "";
  }

  return (
    <div
      className={`allocation-backdrop${entered ? " open" : ""}`}
      aria-hidden="false"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) requestClose();
      }}
    >
      <section
        className="allocation-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="allocation-modal-title"
        ref={modalRef}
        style={{ height: `${modalHeight}px` }}
      >
        <header className="allocation-header">
          <h2 id="allocation-modal-title">Detail Pesanan Per Pengiriman</h2>
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

        <div className="allocation-main">
          <aside className="allocation-tabs" aria-label="Lokasi pengiriman">
            {PAYMENT_DESTINATIONS.map((destination, index) => (
              <button
                className={`allocation-tab${active === index ? " active" : ""}${fieldErrors[index] ? " error" : ""}`}
                type="button"
                aria-selected={active === index}
                key={destination.name}
                onClick={() => switchTab(index)}
              >
                {destination.name}
              </button>
            ))}
          </aside>

          <section className="allocation-content" ref={contentRef}>
            {PAYMENT_DESTINATIONS.map((destination, index) => (
              <article
                className={`allocation-panel ${panelClass(index)}`}
                key={destination.name}
                ref={(element) => {
                  panelRefs.current[index] = element;
                }}
              >
                <div className="allocation-summary">
                  <div>
                    <strong>{destination.name}</strong>
                    <p>{destination.address}</p>
                  </div>
                  <label className="allocation-termin-field">
                    <select
                      className={fieldErrors[index] ? "error" : ""}
                      value={selections[index]}
                      ref={(element) => {
                        selectRefs.current[index] = element;
                      }}
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
                    <span className={fieldErrors[index] ? "show" : ""}>
                      ⚠ Termin harus dipilih
                    </span>
                  </label>
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
                      {products[index].map((product, rowIndex) => (
                        <tr key={`${product}-${rowIndex}`}>
                          <td>{product}</td>
                          <td>{rowIndex % 2 ? 5 : 10} unit</td>
                          <td>Instalasi AC × {rowIndex % 2 ? 5 : 10}</td>
                          <td>Rp 500.000</td>
                          <td>Rp 500.000</td>
                          <td>
                            {rowIndex % 2 ? "Rp 52.500.000" : "Rp 55.500.000"}
                          </td>
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
                    <span>Total Harga Produk ({destination.count} Produk)</span>
                    <strong>Rp 55.500.000</strong>
                  </div>
                  <div>
                    <span>Total Layanan Tambahan</span>
                    <strong>Rp 7.500.000</strong>
                  </div>
                  <div>
                    <span>Total Ongkos Kirim</span>
                    <strong>Rp 1.000.000</strong>
                  </div>
                  <div>
                    <span>Total Pesanan</span>
                    <strong>{destination.total}</strong>
                  </div>
                </div>
              </article>
            ))}
          </section>
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
