import React, { useEffect, useState, useContext } from 'react';
import API from '../../api';
import { AuthContext } from '../context/AuthContext';
import './Admin.css'; // Si tu veux styliser

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await API.get('/orders', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrders(res.data);
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.message || "Erreur lors du chargement des commandes");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  if (loading) return <p>Chargement des commandes...</p>;

  return (
    <div className="admin-orders">
      <h2>📦 Liste des Commandes</h2>
      {orders.length === 0 ? (
        <p>Aucune commande trouvée.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Numéro</th>
              <th>Client</th>
              <th>Montant Total</th>
              <th>Status</th>
              <th>Date</th>
              <th>Produits</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, idx) => (
              <tr key={order._id}>
                <td>{idx + 1}</td>
                <td>{order.user?.name} <br /> {order.user?.email}</td>
                <td>{order.totalAmount} FCFA</td>
                <td>{order.status}</td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
                <td>
                  <ul>
                    {order.items.map((item, i) => (
                      <li key={i}>
                        {item.product?.name} x{item.quantity} - {item.price} FCFA
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminOrders;
