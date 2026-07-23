import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CompetitionCard from "../components/CompetitionCard";
import Filters from "../components/Filters";
import Layout from "../components/Layout";
import Tabs from "../components/Tabs";
import Toast from "../components/Toast";
import { competitions } from "../data/competitions";

export default function CompetitionListPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState("");

  const visibleCompetitions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return competitions.filter((competition) => {
      const stateMatches =
        activeTab === "all" || competition.state === activeTab;
      const queryMatches =
        !normalizedQuery ||
        competition.title.toLowerCase().includes(normalizedQuery) ||
        competition.id.toLowerCase().includes(normalizedQuery);
      return stateMatches && queryMatches;
    });
  }, [activeTab, query]);

  function showToast(message) {
    setToast(message);
    window.clearTimeout(showToast.timeout);
    showToast.timeout = window.setTimeout(() => setToast(""), 1600);
  }

  function handleDetail(competition) {
    navigate(`/UT-page/competition-detail/${competition.id}`);
  }

  function handleReset() {
    setActiveTab("all");
    setQuery("");
  }

  return (
    <Layout>
      <section className="content">
        <h1 className="page-title">Kompetisi Saya</h1>
        <Tabs activeTab={activeTab} onChange={setActiveTab} />
        <Filters query={query} onQueryChange={setQuery} onReset={handleReset} />

        <div className="cards">
          {visibleCompetitions.map((competition) => (
            <CompetitionCard
              key={competition.id}
              competition={competition}
              onDetail={handleDetail}
              onAction={showToast}
              onMore={() => showToast("Menu lainnya dibuka")}
            />
          ))}
        </div>

        <div className="pagination" aria-label="Pagination">
          <button className="page-button disabled" type="button" disabled>
            <ChevronLeft size={18} />
          </button>
          <button className="page-button active" type="button">
            1
          </button>
          <button className="page-button" type="button">
            <ChevronRight size={18} />
          </button>
        </div>
      </section>
      <Toast message={toast} />
    </Layout>
  );
}
