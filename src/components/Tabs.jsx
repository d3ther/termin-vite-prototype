const tabs = [
  ['all', 'Semua'],
  ['live', 'Berlangsung'],
  ['done', 'Selesai'],
  ['cancel', 'Dibatalkan'],
];

export default function Tabs({ activeTab, onChange }) {
  return (
    <div className="tabs" role="tablist" aria-label="Status kompetisi">
      {tabs.map(([value, label]) => (
        <button
          key={value}
          className={`tab${activeTab === value ? ' active' : ''}`}
          type="button"
          role="tab"
          aria-selected={activeTab === value}
          onClick={() => onChange(value)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
