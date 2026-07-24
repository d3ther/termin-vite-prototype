import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import {
  PRODUCT_DETAIL_FIELDS,
  PRODUCT_DETAILS,
} from "../data/productDetails";

export default function ProductDetailAccordionModal({ open, onClose }) {
  const [active, setActive] = useState(0);
  const [entered, setEntered] = useState(false);
  const transitionTimers = useRef([]);

  useEffect(() => {
    if (!open) return undefined;

    setActive(0);
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

  return (
    <div
      className={`product-detail-backdrop${entered ? " open" : ""}`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) requestClose();
      }}
    >
      <section
        className="product-detail-modal product-accordion-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-accordion-title"
      >
        <header className="product-detail-modal-head">
          <h2 id="product-accordion-title">Detail Produk</h2>
          <button type="button" aria-label="Tutup modal" onClick={requestClose}>
            <X size={20} strokeWidth={1.7} />
          </button>
        </header>

        <div className="product-detail-location">
          <strong>Pengiriman 1</strong>
          <strong>Kantor Cabang Bandung</strong>
          <span>Dinda Mareta Putri (6281234567890)</span>
          <span>
            Jl. Holis Regency No.37A, Kelurahan Sukahaji, Kecamatan Babakan
            Ciparay, Kota Bandung, Jawa Barat 40221.
          </span>
          <small>Catatan:</small>
          <span>
            Kirim ke Jl. Merdeka No. 12, Bogor, harap tiba sebelum jam 10 pagi.
            Hubungi penerima untuk konfirmasi.
          </span>
        </div>

        <div className="product-accordion-modal-body">
          <p>
            Pilih kategori produk untuk melihat detail. Hanya satu kategori
            dapat dibuka dalam satu waktu.
          </p>

          <div className="product-accordion-list">
            {PRODUCT_DETAILS.map((product, index) => {
              const expanded = active === index;

              return (
                <article
                  className={`product-accordion-card${expanded ? " expanded" : ""}`}
                  key={product.path}
                >
                  <button
                    className="product-accordion-trigger"
                    type="button"
                    aria-expanded={expanded}
                    onClick={() => setActive(index)}
                  >
                    <span className="product-accordion-category">
                      <small>Kategori Produk</small>
                      <strong>{product.path}</strong>
                    </span>
                    <span className="product-accordion-quantity">
                      <small>Produk Diatur</small>
                      <strong>{product.configured}</strong>
                    </span>
                    <span className="product-accordion-chevron">
                      {expanded ? (
                        <ChevronUp size={20} />
                      ) : (
                        <ChevronDown size={20} />
                      )}
                    </span>
                  </button>

                  <div
                    className="product-accordion-body-shell"
                    aria-hidden={!expanded}
                  >
                    <div className="product-accordion-body">
                      <dl>
                        <div>
                          <dt>Kategori</dt>
                          <dd>{product.path}</dd>
                        </div>
                        {PRODUCT_DETAIL_FIELDS.map(([label, key]) => (
                          <div key={key}>
                            <dt>
                              {label}
                              {(key === "hps" || key === "total") && (
                                <small>(Termasuk Pajak)</small>
                              )}
                            </dt>
                            <dd
                              className={
                                key === "hps" || key === "total"
                                  ? "price"
                                  : ""
                              }
                            >
                              {product[key]}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <footer className="product-detail-modal-foot">
          <button type="button" onClick={requestClose}>
            Tutup
          </button>
        </footer>
      </section>
    </div>
  );
}
