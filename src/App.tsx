import UserList from "./users/UserList";

export default function App() {
  return (
    <div className="app">
      <header className="topbar">
        <div className="topbar-brand">
          <div className="icon">U</div>
          User Management
        </div>
        <div className="topbar-user">
          <span>admin@mycode.ro</span>
          <div className="topbar-avatar">AD</div>
        </div>
      </header>

      <aside className="sidebar">
        <nav className="sidebar-section">
          <div className="sidebar-label">Principal</div>
          <ul className="sidebar-nav">
            <li>
              <a href="#" className="active">
                <span className="nav-icon">&#9633;</span> Utilizatori
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="main">
        <UserList />
      </main>
    </div>
  );
}
