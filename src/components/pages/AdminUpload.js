import React, { useState } from 'react';
import axios from 'axios';

export default function AdminUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: ''
  });
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      return alert('Veuillez sélectionner une image.');
    }

    try {
      // 1. Upload de l’image vers le backend → Cloudinary
      const formData = new FormData();
      formData.append('image', selectedFile);

      // eslint-disable-next-line no-template-curly-in-string
      const uploadRes = await axios.post('http://localhost:5000/api/upload/${productId}', formData);
      const imageUrl = uploadRes.data.url;

      // 2. Enregistrement du produit avec l’URL Cloudinary
      const newProduct = {
        ...productData,
        image: imageUrl
      };

      const token = localStorage.getItem('token'); // si tu stockes le token
      await axios.post('http://localhost:5000/api/products', newProduct, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setMessage('✅ Produit ajouté avec succès !');
      setProductData({
        name: '',
        description: '',
        price: '',
        stock: '',
        category: ''
      });
      setSelectedFile(null);

    } catch (error) {
      console.error('Erreur lors de l’upload :', error);
      setMessage("❌ Une erreur s'est produite.");
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: 'auto', padding: '20px' }}>
      <h2>Uploader un nouveau produit</h2>

      <input type="text" name="name" placeholder="Nom" value={productData.name} onChange={handleChange} />
      <input type="text" name="description" placeholder="Description" value={productData.description} onChange={handleChange} />
      <input type="number" name="price" placeholder="Prix" value={productData.price} onChange={handleChange} />
      <input type="number" name="stock" placeholder="Stock" value={productData.stock} onChange={handleChange} />
      <input type="text" name="category" placeholder="Catégorie" value={productData.category} onChange={handleChange} />
      <br />
      <input type="file" onChange={handleFileChange} />
      <br /><br />
      <button onClick={handleUpload}>Enregistrer le produit</button>

      <p>{message}</p>
    </div>
  );
}
