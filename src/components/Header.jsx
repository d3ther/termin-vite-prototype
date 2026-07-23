import {
  Bell,
  ChevronDown,
  Mail,
  MapPin,
  Search,
  ShoppingCart,
} from 'lucide-react';

function BadgeIcon({ children }) {
  return (
    <div className="nav-icon">
      {children}
      <span className="notification-badge">2</span>
    </div>
  );
}

export default function Header() {
  return (
    <header>
      <div className="topbar">
        <nav className="toplinks" aria-label="Navigasi utilitas">
          <span>Produk Hukum <ChevronDown size={12} /></span>
          <span>Dashboard PDN</span>
          <span>Pusat Bantuan <ChevronDown size={12} /></span>
          <span>Pengumuman <ChevronDown size={12} /></span>
        </nav>
        <div className="topright">
          <span className="transaction-link">Daftar Transaksi <ChevronDown size={12} /></span>
          <span className="shipping-location">
            <MapPin size={16} /> Dikirim ke <strong>Babelan, Kab. Bekasi</strong>
            <ChevronDown size={12} />
          </span>
        </div>
      </div>

      <div className="mainnav">
        <div className="brand" aria-label="INAPROC Katalog Elektronik">
          <div className="brand-mark">I</div>
          <div className="brand-text"><b>INAPROC</b><small>Katalog Elektronik</small></div>
        </div>

        <button className="category-button" type="button">
          Kategori <ChevronDown size={16} />
        </button>

        <label className="main-search">
          <Search size={20} />
          <input placeholder="Cari produk di sini..." aria-label="Cari produk" />
        </label>

        <div className="rightnav">
          <BadgeIcon><Bell size={24} /></BadgeIcon>
          <BadgeIcon><Mail size={24} /></BadgeIcon>
          <BadgeIcon><ShoppingCart size={24} /></BadgeIcon>
          <div className="separator" />
          <button className="profile" type="button">
            <div className="avatar" aria-hidden="true">👨🏻</div>
            <span className="profile-text"><b>Full Name Here</b><small>PPK</small></span>
            <ChevronDown size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}
