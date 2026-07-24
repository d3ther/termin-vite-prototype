import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import ConfirmationModal from "../components/ConfirmationModal";
import PaymentAllocationModal from "../components/PaymentAllocationModal";
import PaymentTermDetailModal from "../components/PaymentTermDetailModal";
import TerminDropdown from "../components/TerminDropdown";
import { PAYMENT_DESTINATIONS } from "../data/paymentTerms";
import {
  commitPaymentTerms,
  discardPaymentTermsDraft,
  getProviderPaymentTerms,
  savePaymentTermsDraft,
} from "../utils/paymentTermsStorage";

export default function PaymentTermsSummaryPage() {
  const navigate = useNavigate();
  const { competitionId, providerId } = useParams();
  const providerPaymentTerms = getProviderPaymentTerms(
    competitionId,
    providerId,
  );
  const configuration = providerPaymentTerms.draft ??
    providerPaymentTerms.saved ?? {
      terminCount: 2,
      allocations: ["termin-1", "termin-1", "termin-2"],
    };
  const [terminCount, setTerminCount] = useState(configuration.terminCount);
  const [pendingTerminCount, setPendingTerminCount] = useState(null);
  const [detailTermin, setDetailTermin] = useState(null);
  const [allocationModalOpen, setAllocationModalOpen] = useState(false);
  const [confirmation, setConfirmation] = useState("");

  const providerListPath =
    `/UT-page/competition-detail/${competitionId}/payment-terms`;
  const configurePath = `${providerListPath}/${providerId}`;
  const termins = Array.from({ length: terminCount }, (_, index) => {
    const number = index + 1;
    const deliveries = PAYMENT_DESTINATIONS.filter(
      (_, destinationIndex) =>
        configuration.allocations[destinationIndex] === `termin-${number}`,
    );

    return {
      number,
      locations: deliveries.length,
      deliveries,
    };
  });

  function requestTerminChange(nextTerminCount) {
    if (nextTerminCount === configuration.terminCount) {
      setTerminCount(nextTerminCount);
      return;
    }

    setTerminCount(nextTerminCount);
    setPendingTerminCount(nextTerminCount);
    setConfirmation("change");
  }

  function cancelTerminChange() {
    setTerminCount(configuration.terminCount);
    setPendingTerminCount(null);
    setConfirmation("");
  }

  function confirmTerminChange() {
    const nextTerminCount = pendingTerminCount ?? terminCount;
    savePaymentTermsDraft(competitionId, providerId, {
      terminCount: nextTerminCount,
      allocations: PAYMENT_DESTINATIONS.map(() => ""),
    });
    navigate(configurePath);
  }

  function cancelChanges() {
    discardPaymentTermsDraft(competitionId, providerId);
    navigate(providerListPath);
  }

  function saveConfiguration() {
    if (terminCount !== configuration.terminCount) {
      setConfirmation("change");
      return;
    }

    commitPaymentTerms(competitionId, providerId);
    navigate(providerListPath);
  }

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
          <TerminDropdown
            value={terminCount}
            onChange={requestTerminChange}
          />
        </section>

        <div className="summary-terms-title">
          <strong>Termin Pembayaran ({terminCount})</strong>
          <button
            type="button"
            onClick={() => setAllocationModalOpen(true)}
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
          onClick={saveConfiguration}
        >
          Simpan
        </button>
      </footer>

      <PaymentTermDetailModal
        open={Boolean(detailTermin)}
        termin={detailTermin}
        onClose={() => setDetailTermin(null)}
      />

      <PaymentAllocationModal
        open={allocationModalOpen}
        terminCount={configuration.terminCount}
        initialSelections={configuration.allocations}
        onClose={() => setAllocationModalOpen(false)}
        onSuccess={(updatedConfiguration) => {
          savePaymentTermsDraft(
            competitionId,
            providerId,
            updatedConfiguration,
          );
          setAllocationModalOpen(false);
        }}
      />

      <ConfirmationModal
        open={confirmation === "change"}
        title="Yakin Ubah Jumlah Termin?"
        description="Setelah klik “Ya, Ubah”, data pengiriman yang sebelumnya disimpan akan dihapus dan perlu diatur ulang."
        cancelLabel="Batal"
        confirmLabel="Ya, Ubah"
        onCancel={cancelTerminChange}
        onConfirm={confirmTerminChange}
      />

      <ConfirmationModal
        open={confirmation === "cancel"}
        title="Yakin Keluar dari Halaman?"
        description="Anda akan kembali sebelumnya Jika Anda klik ‘Ya, Keluar’ maka semua pengaturan termin pembayaran yang belum disimpan akan hilang."
        cancelLabel="Kembali"
        confirmLabel="Ya, Keluar"
        onCancel={() => setConfirmation("")}
        onConfirm={cancelChanges}
      />
    </div>
  );
}
