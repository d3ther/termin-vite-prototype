import { ChevronDown, Search } from 'lucide-react';

export default function Filters({ query, onQueryChange, onReset }) {
  return (
    <div className="filters">
      <label className="filter-field">
        <Search size={20} />
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Cari judul kompetisi / ID kompetisi"
        />
      </label>
      <button className="dropdown" type="button">Urutkan <ChevronDown size={16} /></button>
      <button className="dropdown" type="button">Semua Status <ChevronDown size={16} /></button>
      <button className="reset" type="button" onClick={onReset}>Reset</button>
    </div>
  );
}
