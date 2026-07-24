import { useState } from "react";
import ProductDetailAccordionModal from "../components/ProductDetailAccordionModal";

export default function ProductDetailAccordionTestPage() {
  const [modalOpen, setModalOpen] = useState(true);

  return (
    <main className="product-accordion-test-page">
      <section>
        <span>Usability Test Alternative</span>
        <h1>Accordion — Detail Produk</h1>
        <p>
          Gunakan tombol berikut untuk membuka kembali prototipe Detail Produk
          dengan interaksi accordion.
        </p>
        <button type="button" onClick={() => setModalOpen(true)}>
          Buka Modal Accordion
        </button>
      </section>

      <ProductDetailAccordionModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </main>
  );
}
