import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import ConfirmationModal from "../components/ConfirmationModal";
import PaymentTermDetailModal from "../components/PaymentTermDetailModal";
import TerminDropdown from "../components/TerminDropdown";

const termins = [
  { number: 1, locations: 3 },
  { number: 2, locations: 2 },
];

export default function PaymentTermsSummaryPage() {
  const navigate = useNavigate();
  const { competitionId, providerId } = useParams();
  const [terminCount, setTerminCount] = useState(2);
  const [detailTermin, setDetailTermin] = useState(null);
  const [confirmation, setConfirmation] = useState("");

  const providerListPath =
    `/UT-page/competition-detail/${competitionId}/payment-terms`;
  const configurePath = `${providerListPath}/${providerId}`;

  return (
    <div className="payment-terms-page terms-summary-page">
      <Header />
      <main className="payment-terms-content">
        <button
          className="payment-terms-title"
          type="button"
          onClick={() =>
            navigate(
              configurePath,
            )
          }
        >
          <ArrowLeft size={24} strokeWidth={1.7} />
          <span>
            <strong>Atur Termin Pembayaran</strong>
            <small>
              Tentukan jumlah termin dan detail pengiriman untuk setiap termin pembayaran.
            </small>
          </span>
        </button>

        <section className="summary-termin-count">
          <span>
            <strong>Jumlah Termin</strong>
            <small>Pilih jumlah termin pembayaran yang Anda inginkan.</small>
          </span>
          <TerminDropdown value={terminCount} onChange={setTerminCount} />
        </section>

        <div className="summary-terms-title">
          <strong>Termin Pembayaran (4)</strong>
          <button
            type="button"
            onClick={() => setConfirmation("change")}
          >
            Ubah Pengaturan Termin
          </button>
        </div>

        <div className="summary-terms-list">
          {termins.map((termin) => (
            <article className="summary-term-card" key={termin.number}>
              <div className="summary-term-side">
                <span>
                  <strong>Termin {termin.number}</strong>
                  <small>{termin.locations} Lokasi Pengiriman</small>
                </span>
                <button type="button" onClick={() => setDetailTermin(termin)}>
                  Lihat Detail
                </button>
              </div>
              <div className="summary-term-prices">
                <div><span>Harga Produk <small>(35)</small></span><span>Rp54.500.000</span></div>
                <div><span>Harga Layanan Tambahan <small>(5)</small></span><span>Rp1.000.000</span></div>
                <div><span>Ongkos Kirim - Kurir Penyedia <small>(141,2kg)</small></span><span>Rp3.500.000</span></div>
                <div><span>PPN</span><span>Rp1.500.000</span></div>
                <div><span>PPnBM</span><span>Rp1.500.000</span></div>
                <div className="summary-term-total"><strong>Total Pembayaran Termin {termin.number}</strong><strong>Rp58.500.000</strong></div>
              </div>
            </article>
          ))}
        </div>
      </main>

      <footer className="payment-terms-footer configure-terms-footer">
        <button
          className="secondary-footer-button"
          type="button"
          onClick={() => setConfirmation("cancel")}
        >
          Batal
        </button>
        <button
          type="button"
          onClick={() =>
            navigate(`${providerListPath}?configured=${providerId}`)
          }
        >
          Simpan
        </button>
      </footer>

      <PaymentTermDetailModal
        open={Boolean(detailTermin)}
        termin={detailTermin}
        onClose={() => setDetailTermin(null)}
      />

      <ConfirmationModal
        open={confirmation === "change"}
        title="Yakin Ubah Jumlah Termin?"
        description="Setelah klik “Ya, Ubah”, data pengiriman yang sebelumnya disimpan akan dihapus dan perlu diatur ulang."
        cancelLabel="Batal"
        confirmLabel="Ya, Ubah"
        onCancel={() => setConfirmation("")}
        onConfirm={() => navigate(configurePath)}
      />

      <ConfirmationModal
        open={confirmation === "cancel"}
        title="Yakin Keluar dari Halaman?"
        description="Anda akan kembali sebelumnya Jika Anda klik ‘Ya, Keluar’ maka semua pengaturan termin pembayaran yang belum disimpan akan hilang."
        cancelLabel="Kembali"
        confirmLabel="Ya, Keluar"
        onCancel={() => setConfirmation("")}
        onConfirm={() => navigate(providerListPath)}
      />
    </div>
  );
}
