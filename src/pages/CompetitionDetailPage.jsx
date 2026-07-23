import { useState } from "react";
import { ArrowLeft, ChevronDown, ChevronUp, Info } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import DetailSection, { DetailRow } from "../components/DetailSection";
import Layout from "../components/Layout";
import ProductDetailModal from "../components/ProductDetailModal";
import Toast from "../components/Toast";
import CompetitionDetailPlaceholder from "./CompetitionDetailPlaceholder";

const evaluationCompetitionId = "MK003610-3";

const productRows = [
  ["Kategori", "Elektronik > Alat Pendingin Udara > Air Conditioner"],
  ["KBLI", "46599"],
  ["Jenis Produk", "Barang"],
  ["Merk", "Sharp"],
  ["Kapasitas", "3PK"],
  ["Kecepatan", "550 watt"],
  ["Jumlah", "20"],
  ["Satuan", "Unit"],
];

function EvaluationCompetitionDetail() {
  const navigate = useNavigate();
  const [openShipment, setOpenShipment] = useState(1);
  const [productsVisible, setProductsVisible] = useState(true);
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [toast, setToast] = useState("");

  function showToast(message) {
    setToast(message);
    window.setTimeout(() => setToast(""), 1600);
  }

  async function copyCompetitionNumber() {
    try {
      await navigator.clipboard.writeText("#MK003610");
      showToast("Nomor kompetisi disalin");
    } catch {
      showToast("Nomor kompetisi: #MK003610");
    }
  }

  return (
    <Layout>
      <div className="detail-workspace">
        <div className="detail-main">
          <button
            className="detail-title"
            type="button"
            onClick={() => navigate("/UT-page/competition-list")}
          >
            <ArrowLeft size={20} strokeWidth={1.7} />
            <span>Detail Kompetisi</span>
          </button>

          <section className="competition-summary">
            <div className="competition-summary-status">
              <span className="chip orange">Pengaturan Termin Pembayaran</span>
            </div>
            <div className="competition-summary-list">
              <div className="summary-row">
                <span>Judul Kompetisi</span>
                <strong>Pembangunan Ruang Komputer Kantor LKPP</strong>
              </div>
              <div className="summary-row">
                <span>Kualifikasi Penyedia</span>
                <div className="summary-chips">
                  <span>UMK - Mikro, Kecil</span>
                  <span>Non-UMK - Menengah, Besar</span>
                </div>
              </div>
              <div className="summary-row">
                <span>Jenis Penawaran</span>
                <strong>Itemized (Bisa Menawar Satuan)</strong>
              </div>
              <div className="summary-row">
                <span>Nomor Kompetisi</span>
                <div className="summary-copy">
                  <strong>#MK003610</strong>
                  <button type="button" onClick={copyCompetitionNumber}>
                    Salin
                  </button>
                </div>
              </div>
              <div className="summary-row">
                <span>Tanggal Dibuat</span>
                <strong>1 Januari 2026 11:02:45</strong>
              </div>
              <div className="summary-row">
                <span>Instansi</span>
                <strong>Dinas Pendidikan Daerah Kabupaten Bandung</strong>
              </div>
            </div>
          </section>

          <DetailSection title="Jadwal" className="schedule-section">
            <div className="schedule-grid">
              <div>
                <span>Penawaran Mulai</span>
                <p>
                  Selasa, 17 Januari 2026
                  <br />
                  09:00 WIB
                </p>
              </div>
              <div>
                <span>Penawaran Selesai</span>
                <p>
                  Rabu, 30 Februari 2026
                  <br />
                  21:00 WIB
                </p>
              </div>
            </div>
          </DetailSection>

          <DetailSection
            title="Alamat Pengiriman (5)"
            className="shipments-section"
          >
            <div className="shipment-list">
              {[1, 2, 3].map((shipment) => {
                const expanded = openShipment === shipment;
                return (
                  <article
                    className={`shipment-card${expanded ? " expanded" : ""}`}
                    key={shipment}
                  >
                    <div className="shipment-head">
                      <strong>Pengiriman {shipment}</strong>
                      <button
                        type="button"
                        onClick={() =>
                          setOpenShipment(expanded ? null : shipment)
                        }
                      >
                        {expanded ? "Sembunyikan" : "Tampilkan"}
                        {expanded ? (
                          <ChevronUp size={20} />
                        ) : (
                          <ChevronDown size={20} />
                        )}
                      </button>
                    </div>
                    <div
                      className="shipment-body-shell"
                      aria-hidden={!expanded}
                    >
                      <div className="shipment-body">
                        <DetailRow label="Nama Penerima">
                          <strong>Namora</strong>{" "}
                          <span className="muted-inline">(08211111111)</span>
                        </DetailRow>
                        <DetailRow label="Alamat Pengiriman">
                          <strong>Kantor Cabang Bandung</strong>
                          <span>
                            Jl. Merdeka No. 12, RT.3/RW.2, Kelurahan Sempur,
                            Kecamatan Bogor Tengah, Kota Bogor, Jawa Barat 16129
                          </span>
                          <span className="address-note">
                            <b>
                              <Info size={16} /> Catatan Alamat Pengiriman
                            </b>
                            Kirim ke Jl. Holis Regency No.37A, pastikan tiba
                            sebelum pukul 15.00. Hubungi penerima jika ada
                            kendala.
                          </span>
                        </DetailRow>
                        <DetailRow label="Penyelesaian Pekerjaan" strong>
                          Senin, 28 Februari 2026
                        </DetailRow>
                        <DetailRow label="Total Kuantitas Produk">
                          <strong>72</strong>
                          <button
                            className="inline-link"
                            type="button"
                            onClick={() => setProductModalOpen(true)}
                          >
                            Lihat Detail Produk
                          </button>
                        </DetailRow>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </DetailSection>

          <DetailSection
            title="Detail Produk"
            className="products-section"
            action={
              <button
                className="section-toggle"
                type="button"
                onClick={() => setProductsVisible(!productsVisible)}
              >
                {productsVisible ? "Sembunyikan" : "Tampilkan"}{" "}
                {productsVisible ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </button>
            }
          >
            {productsVisible && (
              <>
                <div className="product-totals">
                  <div>
                    <span>Jumlah Produk</span>
                    <strong>2 Produk</strong>
                  </div>
                  <div>
                    <span>Total HPS Kompetisi</span>
                    <strong>Rp120.000.000</strong>
                  </div>
                </div>
                <article className="product-card">
                  <h3>Produk 2</h3>
                  <div className="product-fields">
                    {productRows.map(([label, value]) => (
                      <DetailRow label={label} key={label}>
                        {value}
                      </DetailRow>
                    ))}
                    <DetailRow
                      label={
                        <>
                          HPS Produk<small>(Termasuk Pajak)</small>
                        </>
                      }
                      strong
                    >
                      Rp10.000.000
                    </DetailRow>
                    <DetailRow
                      label={
                        <>
                          Total HPS Produk<small>(Termasuk Pajak)</small>
                        </>
                      }
                      strong
                    >
                      Rp200.000.000
                    </DetailRow>
                  </div>
                </article>
              </>
            )}
          </DetailSection>

          <DetailSection
            title="Rencana Umum Pengadaan (RUP)"
            className="rup-section"
          >
            <article className="rup-card">
              <div className="rup-code">
                <span>Kode RUP :</span>
                <strong>35463007</strong>
                <span className="info-chip">Barang</span>
              </div>
              <div className="rup-fields">
                <DetailRow label="Nama Paket">
                  Belanja Pemeliharaan Komputer-Komputer Unit-Personal Computer
                </DetailRow>
                <DetailRow label="Total HPS">Rp100.000.000</DetailRow>
                <DetailRow label="Metode">E-purchasing</DetailRow>
                <DetailRow label="Kode Anggaran">
                  1.01.02.2.01.02.5.2.03.01.01.0010,
                  1.01.02.2.01.02.5.2.03.01.01.0011
                </DetailRow>
              </div>
              <div className="rup-meta">
                <div>
                  <span>Tahun Anggaran</span>
                  <strong>2022</strong>
                </div>
                <div>
                  <span>Sumber Dana</span>
                  <strong>APBD, APBN</strong>
                </div>
                <div>
                  <span>Lokasi</span>
                  <strong>Bandung, Babakan Ciparai (Kab.)</strong>
                </div>
                <div>
                  <span>Instansi</span>
                  <strong>Dinas Pendidikan Daerah Kabupaten Bandung</strong>
                </div>
                <div>
                  <span>Kode Satuan Kerja</span>
                  <strong>123456</strong>
                </div>
                <div>
                  <span>Satuan Kerja</span>
                  <strong>Badan Pendapatan Daerah</strong>
                </div>
              </div>
            </article>
          </DetailSection>
        </div>

        <aside className="detail-actions" aria-label="Aksi kompetisi">
          <button
            className="primary-button"
            type="button"
            onClick={() =>
              navigate(
                `/UT-page/competition-detail/${evaluationCompetitionId}/payment-terms`,
              )
            }
          >
            Atur Termin Pembayaran
          </button>
          <button
            type="button"
            onClick={() => showToast("Hasil evaluasi dibuka")}
          >
            Lihat Hasil Evaluasi
          </button>
          <button
            type="button"
            onClick={() => showToast("Riwayat perubahan dibuka")}
          >
            Lihat Riwayat Perubahan
          </button>
          <button type="button" onClick={() => showToast("Bantuan dibuka")}>
            Bantuan
          </button>
        </aside>
      </div>
      <ProductDetailModal
        open={productModalOpen}
        onClose={() => setProductModalOpen(false)}
      />
      <Toast message={toast} />
    </Layout>
  );
}

export default function CompetitionDetailPage() {
  const { competitionId } = useParams();

  if (competitionId !== evaluationCompetitionId) {
    return <CompetitionDetailPlaceholder />;
  }

  return <EvaluationCompetitionDetail />;
}
