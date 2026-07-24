import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

const products = [
  {
    path: "Peralatan Elektronik > Alat Pendingin Udara > Air Conditioner > AC Daikin 2PK",
    quantity: 100,
    configured: 50,
    kbli: "43221 / 43222 / 43223",
    type: "Barang",
    brand: "Daikin",
    capacity: "2 PK",
    speed: "550 watt",
    unit: "Unit",
    hps: "Rp10.000.000",
    total: "Rp500.000.000",
  },
  {
    path: "Komponen Struktur > Struktur Atas Jembatan > Jembatan Rangka Baja Permanen > Jembatan Rangka Baja Kelas A Bentang 40 m",
    quantity: 100,
    configured: 30,
    kbli: "42101 / 42912",
    type: "Barang",
    brand: "Nusantara Steel",
    capacity: "Bentang 40 m",
    speed: "—",
    unit: "Cm",
    hps: "Rp1.850.000.000",
    total: "Rp55.500.000.000",
  },
  {
    path: "Peralatan Kantor > Mesin Cetak dan Pemindai > Multifunction Printer > Canon imageRUNNER ADVANCE DX C3926i",
    quantity: 50,
    configured: 20,
    kbli: "46591",
    type: "Barang",
    brand: "Canon",
    capacity: "26 ppm",
    speed: "26 lembar/menit",
    unit: "Unit",
    hps: "Rp72.500.000",
    total: "Rp1.450.000.000",
  },
  {
    path: "Jasa Teknologi Informasi > Pengembangan Perangkat Lunak > Sistem Informasi Pemerintahan > Pengembangan Dashboard Monitoring",
    quantity: 12,
    configured: 8,
    kbli: "62019",
    type: "Jasa",
    brand: "—",
    capacity: "12 Modul",
    speed: "—",
    unit: "Kegiatan",
    hps: "Rp125.000.000",
    total: "Rp1.000.000.000",
  },
  {
    path: "Peralatan Medis > Peralatan Diagnostik > Ultrasonografi > USG 4D Premium",
    quantity: 20,
    configured: 12,
    kbli: "32509",
    type: "Barang",
    brand: "GE Healthcare",
    capacity: "4D",
    speed: "Real-time",
    unit: "Unit",
    hps: "Rp680.000.000",
    total: "Rp8.160.000.000",
  },
  {
    path: "Furniture > Meja Kerja > Meja Kerja Eksekutif > Meja Direktur Kayu Solid 180 cm",
    quantity: 80,
    configured: 45,
    kbli: "31001",
    type: "Barang",
    brand: "Karya Furnindo",
    capacity: "180 cm",
    speed: "—",
    unit: "Unit",
    hps: "Rp7.500.000",
    total: "Rp337.500.000",
  },
];

const detailFields = [
  ["Jumlah", "quantity"],
  ["Produk Diatur", "configured"],
  ["KBLI", "kbli"],
  ["Tipe Kategori", "type"],
  ["Merk", "brand"],
  ["Kapasitas", "capacity"],
  ["Kecepatan", "speed"],
  ["Satuan", "unit"],
  ["HPS Produk", "hps"],
  ["Total HPS Produk", "total"],
];

export default function ProductDetailModal({ open, onClose }) {
  const [active, setActive] = useState(0);
  const [transition, setTransition] = useState(null);
  const [entered, setEntered] = useState(false);
  const detailRef = useRef(null);
  const transitionTimers = useRef([]);

  useEffect(() => {
    if (!open) return undefined;

    setActive(0);
    setTransition(null);
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

  function switchProduct(next) {
    if (next === active || transition) return;

    detailRef.current?.scrollTo({ top: 0, left: 0 });
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
      className={`product-detail-backdrop${entered ? " open" : ""}`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) requestClose();
      }}
    >
      <section
        className="product-detail-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-detail-title"
      >
        <header className="product-detail-modal-head">
          <h2 id="product-detail-title">Detail Produk</h2>
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

        <div className="product-detail-modal-body">
          <p>
            Pilih produk di sisi kiri. Detail lengkap akan ditampilkan tanpa
            memperpanjang daftar.
          </p>

          <div className="product-split-panel">
            <aside className="product-split-list" aria-label="Daftar produk">
              {products.map((product, index) => (
                <button
                  className={`allocation-tab product-split-item${active === index ? " active" : ""}`}
                  type="button"
                  aria-selected={active === index}
                  key={product.path}
                  onClick={() => switchProduct(index)}
                >
                  <span>{product.path}</span>
                </button>
              ))}
            </aside>

            <section className="product-split-detail" ref={detailRef}>
              {products.map((product, index) => (
                <article
                  className={`product-split-detail-panel ${panelClass(index)}`}
                  key={product.path}
                >
                  <h3>Detail produk terpilih</h3>
                  <div className="product-split-category">
                    <span>Kategori</span>
                    <strong>{product.path}</strong>
                  </div>
                  <dl>
                    {detailFields.map(([label, key]) => (
                      <div key={key}>
                        <dt>
                          {label}
                          {(key === "hps" || key === "total") && (
                            <small>(Termasuk Pajak)</small>
                          )}
                        </dt>
                        <dd
                          className={
                            key === "hps" || key === "total" ? "price" : ""
                          }
                        >
                          {product[key]}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </article>
              ))}
            </section>
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
