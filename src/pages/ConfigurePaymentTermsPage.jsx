import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import PaymentAllocationModal from "../components/PaymentAllocationModal";
import TerminDropdown from "../components/TerminDropdown";

export default function ConfigurePaymentTermsPage() {
  const navigate = useNavigate();
  const { competitionId, providerId } = useParams();
  const [terminCount, setTerminCount] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="payment-terms-page configure-terms-page">
      <Header />

      <main className="payment-terms-content">
        <button
          className="payment-terms-title"
          type="button"
          onClick={() =>
            navigate(`/UT-page/competition-detail/${competitionId}/payment-terms`)
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

        <section className="termin-settings-card">
          <div className="termin-settings-copy">
            <strong>Jumlah Termin</strong>
            <span>Pilih jumlah termin pembayaran yang Anda inginkan.</span>
          </div>
          <div className="termin-settings-control">
            <TerminDropdown value={terminCount} onChange={setTerminCount} />
            {terminCount && (
              <button
                className="configure-termin-button"
                type="button"
                onClick={() => setModalOpen(true)}
              >
                Atur Termin Pembayaran
              </button>
            )}
          </div>
        </section>
      </main>

      <footer className="payment-terms-footer configure-terms-footer">
        <button
          className="secondary-footer-button"
          type="button"
          onClick={() =>
            navigate(`/UT-page/competition-detail/${competitionId}/payment-terms`)
          }
        >
          Batal
        </button>
        <button type="button" disabled>
          Simpan
        </button>
      </footer>
      <PaymentAllocationModal
        open={modalOpen}
        terminCount={terminCount}
        onClose={() => setModalOpen(false)}
        onSuccess={() =>
          navigate(
            `/UT-page/competition-detail/${competitionId}/payment-terms/${providerId}/summary`,
          )
        }
      />
    </div>
  );
}
