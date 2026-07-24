export const PAYMENT_DESTINATIONS_1 = [
  {
    name: "Cabang Dinas Pendidikan Wilayah Bogor ",
    address: "Jl. Karadenan No.7, Cibinong, Kabupaten Bogor, Jawa Barat 16913",
    count: 10,
    total: "Rp 47.750.000",
  },
  {
    name: "Cabang Dinas Pendidikan Wilayah Bandung",
    address:
      "Jl. Pahlawan No. 45, RT.6/RW.1, Kelurahan Neglasari, Kecamatan Cibeunying Kaler, Kota Bandung, Jawa Barat 40123",
    count: 10,
    total: "Rp 47.750.000",
  },
  {
    name: "Cabang Dinas Pendidikan Wilayah Depok",
    address:
      "Jl. Margonda Raya No.55, Kelurahan Pondok Cina, Kecamatan Beji, Kota Depok, Jawa Barat 16424",
    count: 10,
    total: "Rp 47.750.000",
  },
  {
    name: "Cabang Dinas Pendidikan Wilayah Cirebon",
    address:
      "Jl. Dr. Cipto Mangunkusumo No.99, Kelurahan Pekiringan, Kecamatan Kesambi, Kota Cirebon, Jawa Barat 45131",
    count: 10,
    total: "Rp 47.750.000",
  },
  {
    name: "Cabang Dinas Pendidikan Wilayah Sukabumi",
    address: "Jl. Selabintana KM.6 No.398, Kota Sukabumi, Jawa Barat 43113",
    count: 10,
    total: "Rp 47.750.000",
  },
];

export const PAYMENT_PRODUCTS_1 = [
  ["AC Split 1 PK Panasonic"],
  ["AC Split 1 PK Panasonic"],
  ["AC Split 1 PK Panasonic"],
  ["AC Split 1 PK Panasonic"],
  ["AC Split 1 PK Panasonic"],
];

export const PAYMENT_DESTINATIONS_2 = [
  {
    name: "Cabang Dinas Pendidikan Wilayah Bogor ",
    address: "Jl. Karadenan No.7, Cibinong, Kabupaten Bogor, Jawa Barat 16913",
    count: 10,
    total: "Rp 47.750.000",
  },
  {
    name: "Cabang Dinas Pendidikan Wilayah Bandung",
    address:
      "Jl. Pahlawan No. 45, RT.6/RW.1, Kelurahan Neglasari, Kecamatan Cibeunying Kaler, Kota Bandung, Jawa Barat 40123",
    count: 10,
    total: "Rp 47.750.000",
  },
  {
    name: "Cabang Dinas Pendidikan Wilayah Depok",
    address:
      "Jl. Margonda Raya No.55, Kelurahan Pondok Cina, Kecamatan Beji, Kota Depok, Jawa Barat 16424",
    count: 10,
    total: "Rp 47.750.000",
  },
  {
    name: "Cabang Dinas Pendidikan Wilayah Cirebon",
    address:
      "Jl. Dr. Cipto Mangunkusumo No.99, Kelurahan Pekiringan, Kecamatan Kesambi, Kota Cirebon, Jawa Barat 45131",
    count: 10,
    total: "Rp 47.750.000",
  },
  {
    name: "Cabang Dinas Pendidikan Wilayah Sukabumi",
    address: "Jl. Selabintana KM.6 No.398, Kota Sukabumi, Jawa Barat 43113",
    count: 10,
    total: "Rp 47.750.000",
  },
];

export const PAYMENT_PRODUCTS_2 = [
  ["AC Split 1.5 PK Daikin"],
  ["AC Split 1.5 PK Daikin"],
  ["AC Split 1.5 PK Daikin"],
  ["AC Split 1.5 PK Daikin"],
  ["AC Split 1.5 PK Daikin"],
];

export function getPaymentTermsData(providerId) {
  if (String(providerId) === "2") {
    return {
      destinations: PAYMENT_DESTINATIONS_2,
      products: PAYMENT_PRODUCTS_2,
    };
  }

  return {
    destinations: PAYMENT_DESTINATIONS_1,
    products: PAYMENT_PRODUCTS_1,
  };
}
