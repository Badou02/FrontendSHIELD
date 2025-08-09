// src/components/admin/AdminMessages.js
import React, { useEffect, useState, useContext } from 'react';
import API from '../../api';
import { AuthContext } from '../context/AuthContext';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await API.get('/api/messages', {
            
          headers: { Authorization: `Bearer ${token}` }
        });
        setMessages(res.data);
      } catch (err) {
        console.error("Erreur lors du chargement des messages:", err);
      }
    };

    fetchMessages();
  }, [token]);

  return (
    <div className="admin-messages">
      <h2>📬 Messages reçus</h2>
      {messages.length === 0 ? (
        <p>Aucun message pour le moment.</p>
      ) : (
        <ul>
          {messages.map((msg) => (
            <li key={msg._id}>
              <strong>{msg.prenom} {msg.nom}</strong> ({msg.email}) :
              <p><strong>Sujet :</strong> {msg.sujet}</p>
              <p>{msg.message}</p>
              <small>Envoyé le {new Date(msg.createdAt).toLocaleString()}</small>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminMessages;
