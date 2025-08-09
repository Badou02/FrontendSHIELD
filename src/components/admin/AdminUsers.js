import React, { useEffect, useState, useContext } from 'react';
import API from '../../api';
import { AuthContext } from '../context/AuthContext';
import './Admin.css';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);


  useEffect(() => {
    const fetchUsers = async () => {
  try {
    const res = await API.get('/users', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setUsers(res.data);
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || "Erreur lors du chargement des utilisateurs");
  } finally {
    setLoading(false);
  }
};
fetchUsers();
}, [token]);

  const deleteUser = async (id) => {
    if (!window.confirm("Supprimer cet utilisateur ?")) return;
    try {
      await API.delete(`/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(users.filter(u => u._id !== id));
      alert('Utilisateur supprimé');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Erreur lors de la suppression");
    }
  };

  const toggleRole = async (id, currentRole) => {
    try {
      await API.put(`/users/${id}/role`, 
        { isAdmin: !currentRole }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers(users.map(u => u._id === id ? { ...u, isAdmin: !currentRole } : u));
      alert("Rôle mis à jour !");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Erreur lors de la mise à jour du rôle");
    }
  };

  if (loading) return <p>Chargement des utilisateurs...</p>;

  return (
    <div className="admin-users">
      <h2>👥 Gestion des utilisateurs</h2>
      {users.length === 0 ? (
        <p>Aucun utilisateur trouvé.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Admin</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? "✅" : "❌"}</td>
                <td>
                  <button onClick={() => toggleRole(user._id, user.isAdmin)}>
                    {user.isAdmin ? "Retirer Admin" : "Rendre Admin"}
                  </button>
                  <button onClick={() => deleteUser(user._id)} style={{ marginLeft: '10px', color: 'red' }}>
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminUsers;
