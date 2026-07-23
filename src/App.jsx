import { Navigate, Route, Routes } from 'react-router-dom';
import CompetitionListPage from './pages/CompetitionListPage';
import CompetitionDetailPlaceholder from './pages/CompetitionDetailPlaceholder';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/UT-page/competition-list" replace />} />
      <Route path="/UT-page/competition-list" element={<CompetitionListPage />} />
      <Route path="/UT-page/competition-detail/:competitionId" element={<CompetitionDetailPlaceholder />} />
      <Route path="*" element={<Navigate to="/UT-page/competition-list" replace />} />
    </Routes>
  );
}
