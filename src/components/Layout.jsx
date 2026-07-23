import Header from './Header';
import Sidebar from './Sidebar';

export default function Layout({ children }) {
  return (
    <div className="app-shell">
      <Header />
      <main className="page-layout">
        <Sidebar />
        {children}
      </main>
    </div>
  );
}
