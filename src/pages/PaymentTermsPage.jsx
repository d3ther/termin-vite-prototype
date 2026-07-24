import { useState } from "react";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Toast from "../components/Toast";
import { getSavedPaymentTermsForCompetition } from "../utils/paymentTermsStorage";

const providers = [
  {
    id: 1,
    name: "PT. Pesona Alam Nusantara",
    productCount: "20",
    deliveryCount: "2 Lokasi",
  },
  {
    id: 2,
    name: "PT. Berkah Cahaya Langit Abadi",
    productCount: "10",
    deliveryCount: "2 Lokasi",
  },
];

export default function PaymentTermsPage() {
  const navigate = useNavigate();
  const { competitionId } = useParams();
  const [toast, setToast] = useState("");
  const configuredProviders =
    getSavedPaymentTermsForCompetition(competitionId);

  function showToast(message) {
    setToast(message);
    window.setTimeout(() => setToast(""), 1600);
  }

  return (
    <div className="payment-terms-page">
      <Header />

      <main className="payment-terms-content">
        <button
          className="payment-terms-title"
          type="button"
          onClick={() =>
            navigate(`/UT-page/competition-detail/${competitionId}`)
          }
        >
          <ArrowLeft size={24} strokeWidth={1.7} />
          <span>
            <strong>Daftar Penyedia Pemenang</strong>
            <small>
              Silakan pilih penyedia yang ingin Anda atur termin pembayaran.
            </small>
          </span>
        </button>

        <div className="provider-list">
          {providers.map((provider) => {
            const savedPaymentTerms = configuredProviders[provider.id];
            const isConfigured = Boolean(savedPaymentTerms);

            return (
            <article
              className={`provider-card${isConfigured ? " configured" : ""}`}
              key={provider.id}
            >
              <div className="provider-card-head">
                <strong>Penyedia {provider.id}</strong>
                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      `/UT-page/competition-detail/${competitionId}/payment-terms/${provider.id}`,
                    )
                  }
                >
                  {isConfigured
                    ? "Ubah Termin Pembayaran"
                    : "Atur Termin Pembayaran"}{" "}
                  <ChevronRight size={20} />
                </button>
              </div>
              <div className="provider-card-body">
                <div>
                  <span>Nama Penyedia</span>
                  <strong>{provider.name}</strong>
                </div>
                <div>
                  <span>Jumlah Produk</span>
                  <strong>{provider.productCount}</strong>
                </div>
                <div>
                  <span>Jumlah Pengiriman</span>
                  <strong>
                    {isConfigured
                      ? `${savedPaymentTerms.allocations.filter(Boolean).length} Lokasi`
                      : provider.deliveryCount}
                  </strong>
                </div>
                {isConfigured && (
                  <div>
                    <span>Jumlah Termin</span>
                    <strong>{savedPaymentTerms.terminCount}</strong>
                  </div>
                )}
              </div>
            </article>
            );
          })}
        </div>
      </main>

      <footer className="payment-terms-footer">
        <button
          type="button"
          onClick={() => showToast("Pengaturan termin pembayaran disimpan")}
        >
          Simpan
        </button>
      </footer>
      <Toast message={toast} />
    </div>
  );
}
