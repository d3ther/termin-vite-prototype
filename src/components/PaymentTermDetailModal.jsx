import { useEffect, useState } from "react";
import { X } from "lucide-react";

const deliveries = [
  {
    name: "Kantor Cabang Bogor",
    address:
      "Jl. Merdeka No. 12, RT.3/RW.2, Kelurahan Sempur, Kecamatan Bogor Tengah, Kota Bogor, Jawa Barat 16129",
  },
  {
    name: "Kantor Cabang Bandung",
    address:
      "Jl. Pahlawan No. 45, RT.6/RW.1, Kelurahan Neglasari, Kecamatan Cibeunying Kaler, Kota Bandung, Jawa Barat 40123",
  },
  {
    name: "SAWANGAN DEPOK",
    address:
      "Jl. Merdeka No. 12, RT.3/RW.2, Kelurahan Sempur, Kecamatan Bogor Tengah, Kota Bogor, Jawa Barat 16129",
  },
];

export default function PaymentTermDetailModal({ open, termin, onClose }) {
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
    window.setTimeout(onClose, 300);
  }

  const visibleDeliveries =
    termin?.number === 2 ? deliveries.slice(0, 2) : deliveries;

  return (
    <div
      className={`summary-modal-backdrop${entered ? " open" : ""}`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) closeModal();
      }}
    >
      <section
        className="term-detail-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="term-detail-modal-title"
      >
        <header>
          <h2 id="term-detail-modal-title">
            Detail Pembayaran Termin {termin?.number}
          </h2>
          <button type="button" aria-label="Tutup modal" onClick={closeModal}>
            <X size={20} strokeWidth={1.7} />
          </button>
        </header>

        <div className="term-detail-table-wrap">
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Lokasi Pengiriman</th>
                <th>Harga Produk</th>
                <th>Harga Layanan Tambahan</th>
                <th>Ongkos Kirim</th>
                <th>Total Harga</th>
              </tr>
            </thead>
            <tbody>
              {visibleDeliveries.map((delivery, index) => (
                <tr key={delivery.name}>
                  <td>{index + 1}</td>
                  <td>
                    <strong>{delivery.name}</strong>
                    <span>{delivery.address}</span>
                  </td>
                  <td>Rp30.000.000<small>(20 Produk)</small></td>
                  <td>Rp30.000.000<small>(20 Layanan)</small></td>
                  <td>Rp30.000.000<small>(1.139 Kg)</small></td>
                  <td>Rp30.000.000<small>(1.139 Kg)</small></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="term-detail-total">
          <strong>Total Pembayaran</strong>
          <span><strong>Rp30.000.000</strong><small>(20 Produk)</small></span>
          <span><strong>Rp30.000.000</strong><small>(20 Produk)</small></span>
          <span><strong>Rp30.000.000</strong><small>(20 Produk)</small></span>
          <span><strong>Rp90.000.000</strong><small>(20 Produk)</small></span>
        </div>
      </section>
    </div>
  );
}
