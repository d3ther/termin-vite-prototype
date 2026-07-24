import { useState } from "react";
import { ArrowLeft, ChevronDown, ChevronUp, Info } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import DetailSection, { DetailRow } from "../components/DetailSection";
import Layout from "../components/Layout";
import ProductDetailModal from "../components/ProductDetailModal";
import Toast from "../components/Toast";
import CompetitionDetailPlaceholder from "./CompetitionDetailPlaceholder";

const evaluationCompetitionId = "MK004215";

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

const competitionDetails = {
  id: "MK004215",
  title:
    "Pengadaan AC Split Beserta Jasa Instalasi UPT Dinas Pendidikan Wilayah Jawa Barat",
  qualification: ["UMK - Kecil", "Non-UMK - Menengah", "Besar"],
  offerType: "Itemized (Bisa Menawar Satuan)",
  number: "#MK004215",
  createdDate: "1 Juli 2026 09:15:00",
  institution: "Dinas Pendidikan Provinsi Jawa Barat",
  penawaranStart: "Senin, 06 Juli 2026 09:00 WIB",
  penawaranEnd: "Jumat, 10 Juli 2026 21:00 WIB",
};

const shipmentDetails = [
  {
    number: 1,
    recipientName: "Fauzan Ramadhan",
    phone: "0813-1111-2222",
    locationName: "Cabang Dinas Pendidikan Wilayah Bogor",
    address:
      "Jl. Merdeka No. 12, RT.3/RW.2, Kelurahan Sempur, Kecamatan Bogor Tengah, Kota Bogor, Jawa Barat 16129",
    note: "Kirim ke gudang belakang, konfirmasi ke satpam sebelum pukul 15.00",
    completionDate: "Jumat, 21 Agustus 2026",
    productQuantity: 18,
  },
  {
    number: 2,
    recipientName: "Siti Amalia",
    phone: "0812-2222-3333",
    locationName: "Cabang Dinas Pendidikan Wilayah Bandung",
    address:
      "Jl. Soekarno Hatta No. 45, Kelurahan Kebon Lega, Kecamatan Bojongloa Kidul, Kota Bandung, Jawa Barat 40235",
    note: "Barang diterima di resepsionis lantai 1",
    completionDate: "Senin, 24 Agustus 2026",
    productQuantity: 18,
  },
  {
    number: 3,
    recipientName: "Rizky Pratama",
    phone: "0857-3333-4444",
    locationName: "Cabang Dinas Pendidikan Wilayah Depok",
    address:
      "Jl. Raya Sawangan No. 88, Kelurahan Sawangan Baru, Kecamatan Sawangan, Kota Depok, Jawa Barat 16511",
    note: "Konfirmasi ke petugas keamanan H-1 sebelum pengiriman",
    completionDate: "Rabu, 26 Agustus 2026",
    productQuantity: 18,
  },
  {
    number: 4,
    recipientName: "Dewi Anggraini",
    phone: "0821-4444-5555",
    locationName: "Cabang Dinas Pendidikan Wilayah Cirebon",
    address:
      "Jl. Siliwangi No. 22, Kelurahan Kesenden, Kecamatan Kejaksan, Kota Cirebon, Jawa Barat 45123",
    note: "Pengiriman maksimal pukul 14.00, hubungi penerima jika telat",
    completionDate: "Jumat, 28 Agustus 2026",
    productQuantity: 18,
  },
  {
    number: 5,
    recipientName: "Ahmad Fauzi",
    phone: "0878-5555-6666",
    locationName: "Cabang Dinas Pendidikan Wilayah Sukabumi",
    address:
      "Jl. Ahmad Yani No. 78, Kelurahan Gunungparang, Kecamatan Cikole, Kota Sukabumi, Jawa Barat 43113",
    note: "Hubungi penerima 30 menit sebelum tiba",
    completionDate: "Senin, 31 Agustus 2026",
    productQuantity: 18,
  },
];

const productDetails = [
  {
    Kategori: "Elektronik > Alat Pendingin Udara > Air Conditioner",
    KBLI: "43221 / 43222 / 43223",
    TipeKategori: "Barang",
    Merk: "Panasonic",
    Kapasitas: "1 PK",
    Daya: "650 watt",
    Jumlah: 50,
    Satuan: "Unit",
    HPSProduk: "Rp4.200.000",
    TotalHPSProduk: "Rp210.000.000",
  },
  {
    Kategori: "Elektronik > Alat Pendingin Udara > Air Conditioner",
    KBLI: "43221 / 43222 / 43223",
    TipeKategori: "Barang",
    Merk: "Daikin",
    Kapasitas: "1.5 PK",
    Daya: "900 watt",
    Jumlah: 40,
    Satuan: "Unit",
    HPSProduk: "Rp5.300.000",
    TotalHPSProduk: "Rp212.000.000",
  },
];

function EvaluationCompetitionDetail() {
  const navigate = useNavigate();
  const [openShipment, setOpenShipment] = useState(1);
  const [productsVisible, setProductsVisible] = useState(true);
  const [productModalShipment, setProductModalShipment] = useState(null);
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
                <strong>{competitionDetails.title}</strong>
              </div>
              <div className="summary-row">
                <span>Kualifikasi Penyedia</span>
                <div className="summary-chips">
                  {competitionDetails.qualification.map((q) => (
                    <span key={q} className="chip">
                      {q}
                    </span>
                  ))}
                </div>
              </div>
              <div className="summary-row">
                <span>Jenis Penawaran</span>
                <strong>{competitionDetails.offerType}</strong>
              </div>
              <div className="summary-row">
                <span>Nomor Kompetisi</span>
                <div className="summary-copy">
                  <strong>{competitionDetails.number}</strong>
                  <button type="button" onClick={copyCompetitionNumber}>
                    Salin
                  </button>
                </div>
              </div>
              <div className="summary-row">
                <span>Tanggal Dibuat</span>
                <strong>{competitionDetails.createdDate}</strong>
              </div>
              <div className="summary-row">
                <span>Instansi</span>
                <strong>{competitionDetails.institution}</strong>
              </div>
            </div>
          </section>

          <DetailSection title="Jadwal" className="schedule-section">
            <div className="schedule-grid">
              <div>
                <span>Penawaran Mulai</span>
                <p>{competitionDetails.penawaranStart}</p>
              </div>
              <div>
                <span>Penawaran Selesai</span>
                <p>{competitionDetails.penawaranEnd}</p>
              </div>
            </div>
          </DetailSection>

          <DetailSection
            title="Alamat Pengiriman (5)"
            className="shipments-section"
          >
            <div className="shipment-list">
              {shipmentDetails.map((shipment) => {
                const expanded = openShipment === shipment.number;
                return (
                  <article
                    className={`shipment-card${expanded ? " expanded" : ""}`}
                    key={shipment.number}
                  >
                    <div className="shipment-head">
                      <strong>Pengiriman {shipment.number}</strong>
                      <button
                        type="button"
                        onClick={() =>
                          setOpenShipment(expanded ? null : shipment.number)
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
                          <strong>{shipment.recipientName}</strong>{" "}
                          <span className="muted-inline">
                            ({shipment.phone})
                          </span>
                        </DetailRow>
                        <DetailRow label="Alamat Pengiriman">
                          <strong>{shipment.locationName}</strong>
                          <span>{shipment.address}</span>
                          <span className="address-note">
                            <b>
                              <Info size={16} /> Catatan Alamat Pengiriman
                            </b>
                            {shipment.note}
                          </span>
                        </DetailRow>
                        <DetailRow label="Penyelesaian Pekerjaan" strong>
                          {shipment.completionDate}
                        </DetailRow>
                        <DetailRow label="Total Kuantitas Produk">
                          <strong>{shipment.productQuantity}</strong>
                          <button
                            className="inline-link"
                            type="button"
                            onClick={() => setProductModalShipment(shipment)}
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
                {productDetails.map((product, index) => (
                  <article className="product-card" key={index}>
                    <h3>Produk {index + 1}</h3>
                    <div className="product-fields">
                      <DetailRow label={"Kategori"} key={"Kategori"}>
                        {product.Kategori}
                      </DetailRow>
                      <DetailRow label={"KBLI"} key={"KBLI"}>
                        {product.KBLI}
                      </DetailRow>
                      <DetailRow label={"Tipe Kategori"} key={"Tipe Kategori"}>
                        {product.TipeKategori}
                      </DetailRow>
                      <DetailRow label={"Merk"} key={"Merk"}>
                        {product.Merk}
                      </DetailRow>
                      <DetailRow label={"Kapasitas"} key={"Kapasitas"}>
                        {product.Kapasitas}
                      </DetailRow>
                      <DetailRow label={"Daya"} key={"Daya"}>
                        {product.Daya}
                      </DetailRow>
                      <DetailRow label={"Jumlah"} key={"Jumlah"}>
                        {product.Jumlah}
                      </DetailRow>
                      <DetailRow label={"Satuan"} key={"Satuan"}>
                        {product.Satuan}
                      </DetailRow>
                      <DetailRow
                        label={
                          <>
                            HPS Produk
                            <small>(Termasuk Pajak)</small>
                          </>
                        }
                        key={"HPS Product"}
                      >
                        {product.HPSProduk}
                      </DetailRow>
                      <DetailRow
                        label={
                          <>
                            Total HPS Product
                            <small>(Termasuk Pajak)</small>
                          </>
                        }
                        key={"Total HPS Product (Termasuk Pajak)"}
                      >
                        {product.TotalHPSProduk}
                      </DetailRow>
                    </div>
                  </article>
                ))}
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
                <strong>32105577</strong>
                <span className="info-chip">Barang</span>
              </div>
              <div className="rup-fields">
                <DetailRow label="Nama Paket">
                  Belanja Modal Peralatan dan Mesin - Pengadaan Air Conditioner
                  (AC) Split
                </DetailRow>
                <DetailRow label="Total HPS">Rp422.000.000</DetailRow>
                <DetailRow label="Metode">E-purchasing</DetailRow>
                <DetailRow label="Kode Anggaran">
                  1.01.0100.02.03.5.2.03.02.01.0021,
                  1.01.0100.02.03.5.2.03.02.01.0022,
                  1.01.0100.02.03.5.2.03.02.01.0023,
                  1.01.0100.02.03.5.2.03.02.01.0024
                </DetailRow>
              </div>
              <div className="rup-meta">
                <div>
                  <span>Tahun Anggaran</span>
                  <strong>2026</strong>
                </div>
                <div>
                  <span>Sumber Dana</span>
                  <strong>APBD</strong>
                </div>
                <div>
                  <span>Lokasi</span>
                  <strong>
                    Bogor, Bandung, Depok, Cirebon, Sukabumi (Jawa Barat)
                  </strong>
                </div>
                <div>
                  <span>Instansi</span>
                  <strong>Dinas Pendidikan Provinsi Jawa Barat</strong>
                </div>
                <div>
                  <span>Kode Satuan Kerja</span>
                  <strong>456789</strong>
                </div>
                <div>
                  <span>Satuan Kerja</span>
                  <strong>
                    Sekretariat Dinas Pendidikan Provinsi Jawa Barat
                  </strong>
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
        open={Boolean(productModalShipment)}
        shipment={productModalShipment}
        onClose={() => setProductModalShipment(null)}
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
