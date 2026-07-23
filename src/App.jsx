import { Navigate, Route, Routes } from 'react-router-dom';
import CompetitionListPage from './pages/CompetitionListPage';
import CompetitionDetailPage from './pages/CompetitionDetailPage';
import PaymentTermsPage from './pages/PaymentTermsPage';
import ConfigurePaymentTermsPage from './pages/ConfigurePaymentTermsPage';
import PaymentTermsSummaryPage from './pages/PaymentTermsSummaryPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/UT-page/competition-list" replace />} />
      <Route path="/UT-page/competition-list" element={<CompetitionListPage />} />
      <Route path="/UT-page/competition-detail/:competitionId" element={<CompetitionDetailPage />} />
      <Route path="/UT-page/competition-detail/:competitionId/payment-terms" element={<PaymentTermsPage />} />
      <Route path="/UT-page/competition-detail/:competitionId/payment-terms/:providerId" element={<ConfigurePaymentTermsPage />} />
      <Route path="/UT-page/competition-detail/:competitionId/payment-terms/:providerId/summary" element={<PaymentTermsSummaryPage />} />
      <Route path="*" element={<Navigate to="/UT-page/competition-list" replace />} />
    </Routes>
  );
}
