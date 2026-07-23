import { ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout';

export default function CompetitionDetailPlaceholder() {
  const navigate = useNavigate();
  const { competitionId } = useParams();

  return (
    <Layout>
      <section className="content detail-placeholder">
        <button className="back-button" type="button" onClick={() => navigate('/UT-page/competition-list')}>
          <ArrowLeft size={18} /> Kembali ke Kompetisi Saya
        </button>
        <div className="placeholder-card">
          <p className="placeholder-eyebrow">Route siap digunakan</p>
          <h1>Detail Kompetisi</h1>
          <p>Halaman ini menjadi target routing untuk kompetisi <strong>{competitionId}</strong>.</p>
          <p>Ketika Figma detail diberikan, komponen placeholder ini dapat diganti tanpa mengubah halaman daftar atau struktur routing.</p>
        </div>
      </section>
    </Layout>
  );
}
