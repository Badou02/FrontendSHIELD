import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <h2>🛠️ Admin</h2>
        <ul>
          <li>
            <Link to="/admin/products">🛍️ Produits</Link>
          </li>
          <li>
            <Link to="/admin/orders">📦 Commandes</Link>
          </li>
          <li>
            <Link to="/admin/users">👤 Utilisateurs</Link>
          </li>
          <li>
            <Link to="/admin/messages">📬 Messages</Link>
          </li>
          <li>
  <Link to="/admin/upload">⬆️ Uploader Images</Link>
</li>

        </ul>
      </aside>
      
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
