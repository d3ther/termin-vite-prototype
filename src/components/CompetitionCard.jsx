import { Ellipsis, Hammer } from 'lucide-react';

export default function CompetitionCard({ competition, onDetail, onAction, onMore }) {
  return (
    <article className="card">
      <div className="card-head">
        <span className="card-id">#MK003610</span>
        <span className="dot" />
        {competition.extra && (
          <>
            <span className="extra-label"><Hammer size={14} />{competition.extra}</span>
            <span className="dot" />
          </>
        )}
        <span className={`chip ${competition.tone}`}>{competition.status}</span>
        <span className="dot" />
        <span className="date-label">Tanggal Penawaran :</span>
        <span className="date-value">01 Okt 2024 - 01 Des 2024</span>
      </div>

      <div className="card-body">
        <div className="card-title">{competition.title}</div>
        <div className="competition-grid">
          <div className="column">
            <span className="value">{competition.primary[0]}</span>
            <span>{competition.primary[1]}</span>
            <span className="label">{competition.primary[2]}</span>
          </div>
          <div className="column">
            <span className="label">Jumlah Penawar</span>
            <span className="value">{competition.offerCount}</span>
          </div>
          <div className="column">
            <span className="label">{competition.offerTypeLabel ?? 'Jenis Penawaran'}</span>
            <span className="value">{competition.offerType}</span>
          </div>
          <div className="column amount">
            <span className="label">Total HPS Kompetisi</span>
            <span className="amount-value">{competition.amount}</span>
          </div>
        </div>
      </div>

      <div className="card-foot">
        <button className="link-button" type="button" onClick={() => onDetail(competition)}>Lihat Detail</button>
        {competition.cta && (
          <button className="primary-button" type="button" onClick={() => onAction(competition.cta)}>
            {competition.cta}
          </button>
        )}
        <button className="more-button" type="button" aria-label="Menu lainnya" onClick={onMore}>
          <Ellipsis size={20} />
        </button>
      </div>
    </article>
  );
}
