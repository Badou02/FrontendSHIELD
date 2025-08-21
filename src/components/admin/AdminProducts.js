// src/components/admin/AdminProducts.js
import React, { useEffect, useState, useContext } from "react";
import API from "../../api.js";
import { AuthContext } from "../context/AuthContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick-theme.css";
import "./AdminProducts.css"; 

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    stock: "",
    category: "",
    files: [],
  });
  const [editingProductId, setEditingProductId] = useState(null);
  const [uploading, setUploading] = useState(false);

  const { token } = useContext(AuthContext);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Erreur lors du chargement des produits", err);
    }
  };

  const handleSave = async () => {
    try {
      if (!form.name || !form.price) {
        alert("Nom et prix requis");
        return;
      }

      const productData = {
        name: form.name,
        price: form.price,
        description: form.description,
        stock: form.stock,
        category: form.category,
      };

      let savedProduct;

      if (editingProductId) {
        const res = await API.put(`/products/${editingProductId}`, productData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        savedProduct = res.data;
        alert("Produit mis à jour");
      } else {
        const res = await API.post("/products", productData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        savedProduct = res.data;
        alert("Produit ajouté");
      }

      // Upload des images si sélectionnées
      if (form.files.length > 0 && savedProduct?._id) {
        const formData = new FormData();
        for (let i = 0; i < form.files.length; i++) {
          formData.append("images", form.files[i]);
        }

        setUploading(true);
        await API.post(`/upload/${savedProduct._id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        setUploading(false);
        alert("Images uploadées avec succès");
      }

      // Réinitialiser le formulaire
      setForm({
        name: "",
        price: "",
        description: "",
        stock: "",
        category: "",
        files: [],
      });
      setEditingProductId(null);
      fetchProducts();
    } catch (err) {
      console.error("Erreur lors de la sauvegarde :", err);
      alert(err.response?.data?.message || "Erreur lors de l'enregistrement");
      setUploading(false);
    }
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name || "",
      price: product.price || "",
      description: product.description || "",
      stock: product.stock || "",
      category: product.category || "",
      files: [],
    });
    setEditingProductId(product._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Supprimer ce produit ?")) {
      try {
        await API.delete(`/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Produit supprimé");
        fetchProducts();
      } catch (err) {
        console.error(err);
        alert("Erreur lors de la suppression");
      }
    }
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="admin-products">
      <h2>Gérer les Produits</h2>

      <input
        type="text"
        placeholder="Nom"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        type="number"
        placeholder="Prix"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />

      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <input
        type="number"
        placeholder="Stock"
        value={form.stock}
        onChange={(e) => setForm({ ...form, stock: e.target.value })}
      />

      <input
        type="text"
        placeholder="Catégorie"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      />

      <input
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => setForm({ ...form, files: Array.from(e.target.files) })}
      />

      {uploading && <p>Envoi des images en cours...</p>}

      <button onClick={handleSave}>
        {editingProductId ? "Mettre à jour" : "Ajouter"}
      </button>

      <ul>
        {products.map((p) => (
          <li key={p._id}>
            <strong>{p.name}</strong> - {p.price} FCFA
            {p.images && p.images.length > 0 ? (
              <div style={{ width: "200px", margin: "10px auto" }}>
                <Slider {...sliderSettings}>
                  {p.images.map((img, idx) => (
                    <div key={idx}>
                      <img
                         src={img.startsWith("http") ? img : `${process.env.REACT_APP_API_URL}/uploads/${img}`}
                         alt={`${p.name}-${idx}`}
                         style={{ width: "100%", borderRadius: "8px" }}
                      />
                    </div>
                  ))}
                </Slider>
              </div>
            ) : (
              <p>Aucune image</p>
            )}
            <p>{p.description}</p>
            <p>
              Stock : {p.stock} | Catégorie : {p.category}
            </p>
            <button onClick={() => handleEdit(p)}>Modifier</button>
            <button onClick={() => handleDelete(p._id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
