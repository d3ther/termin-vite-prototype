import { useState } from "react";
import PaymentAllocationAccordionModal from "../components/PaymentAllocationAccordionModal";
import { getPaymentTermsData } from "../data/paymentTerms";

export default function PaymentAllocationAccordionTestPage() {
  const [modalOpen, setModalOpen] = useState(true);
  const { destinations, products } = getPaymentTermsData(1);

  return (
    <main className="allocation-accordion-test-page">
      <section>
        <span>Usability Test Alternative</span>
        <h1>Accordion — Pengaturan Termin</h1>
        <p>
          Gunakan tombol berikut untuk membuka kembali pengaturan termin dengan
          interaksi accordion.
        </p>
        <button type="button" onClick={() => setModalOpen(true)}>
          Buka Modal Accordion
        </button>
      </section>

      <PaymentAllocationAccordionModal
        open={modalOpen}
        terminCount={2}
        destinations={destinations}
        products={products}
        onClose={() => setModalOpen(false)}
      />
    </main>
  );
}
