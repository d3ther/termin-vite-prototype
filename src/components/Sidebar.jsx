import {
  Award,
  CheckSquare,
  ChevronUp,
  MessageSquare,
  Package,
  Repeat2,
} from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="menu"><Repeat2 size={20} />Negosiasi</div>
      <div className="menu"><Award size={20} />Kompetisi <ChevronUp className="menu-chevron" size={20} /></div>
      <div className="submenu">Tambah Kompetisi</div>
      <div className="submenu">Draf Kompetisi</div>
      <div className="submenu active">Kompetisi Saya</div>
      <div className="menu"><CheckSquare size={20} />Persetujuan PPK</div>
      <div className="menu"><Package size={20} />Pesanan</div>
      <div className="menu"><MessageSquare size={20} />Chat</div>
    </aside>
  );
}
