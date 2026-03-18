// src/components/admin/AdminProducts.js
import React, { useEffect, useState, useContext } from "react";
import API from "../../api.js";
import { AuthContext } from "../context/AuthContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
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
  const [previewUrls, setPreviewUrls] = useState([]);

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

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setForm({ ...form, files });
    const urls = files.map((f) => URL.createObjectURL(f));
    setPreviewUrls(urls);
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
      } else {
        const res = await API.post("/products", productData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        savedProduct = res.data;
      }

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
      }

      setForm({ name: "", price: "", description: "", stock: "", category: "", files: [] });
      setPreviewUrls([]);
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
    setPreviewUrls([]);
    setEditingProductId(product._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancel = () => {
    setForm({ name: "", price: "", description: "", stock: "", category: "", files: [] });
    setPreviewUrls([]);
    setEditingProductId(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Supprimer ce produit ?")) {
      try {
        await API.delete(`/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
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
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div className="ap-wrapper">
      {/* ── FORM PANEL ── */}
      <section className="ap-form-panel">
        <h2 className="ap-form-title">
          {editingProductId ? "✏️ Modifier le produit" : "➕ Nouveau produit"}
        </h2>

        <div className="ap-form-grid">
          <div className="ap-field ap-field--full">
            <label>Nom du produit</label>
            <input
              type="text"
              placeholder="Ex : Tétine MF +3 (2X1)"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div className="ap-field">
            <label>Prix (FCFA)</label>
            <input
              type="number"
              placeholder="Ex : 15000"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
          </div>

          <div className="ap-field">
            <label>Stock</label>
            <input
              type="number"
              placeholder="Ex : 50"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
            />
          </div>

          <div className="ap-field ap-field--full">
            <label>Catégorie</label>
            <input
              type="text"
              placeholder="Ex : Vêtements, Accessoires…"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />
          </div>

          <div className="ap-field ap-field--full">
            <label>Description</label>
            <textarea
              rows={4}
              placeholder="Décrivez le produit…"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>

          <div className="ap-field ap-field--full">
            <label>Images</label>
            <label className="ap-file-label">
              <span>📁 Choisir des images</span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
              />
            </label>
            {previewUrls.length > 0 && (
              <div className="ap-preview-strip">
                {previewUrls.map((url, i) => (
                  <img key={i} src={url} alt={`preview-${i}`} className="ap-preview-thumb" />
                ))}
              </div>
            )}
          </div>
        </div>

        {uploading && (
          <div className="ap-uploading">
            <span className="ap-spinner" /> Upload en cours…
          </div>
        )}

        <div className="ap-form-actions">
          {editingProductId && (
            <button className="ap-btn ap-btn--ghost" onClick={handleCancel}>
              Annuler
            </button>
          )}
          <button className="ap-btn ap-btn--primary" onClick={handleSave}>
            {editingProductId ? "Mettre à jour" : "Ajouter le produit"}
          </button>
        </div>
      </section>

      {/* ── PRODUCT GRID ── */}
      <section className="ap-list-panel">
        <h2 className="ap-list-title">
          Produits <span className="ap-count">{products.length}</span>
        </h2>

        {products.length === 0 ? (
          <p className="ap-empty">Aucun produit pour l'instant.</p>
        ) : (
          <div className="ap-grid">
            {products.map((p) => (
              <div key={p._id} className="ap-card">
                {/* Image zone */}
                <div className="ap-card-media">
                  {p.images && p.images.length > 1 ? (
                    <Slider {...sliderSettings}>
                      {p.images.map((img, idx) => (
                        <div key={idx} className="ap-slide">
                          <img
                            src={
                              img.startsWith("http")
                                ? img
                                : `${process.env.REACT_APP_API_URL}/uploads/${img}`
                            }
                            alt={`${p.name}-${idx}`}
                          />
                        </div>
                      ))}
                    </Slider>
                  ) : p.images && p.images.length === 1 ? (
                    <img
                      src={
                        p.images[0].startsWith("http")
                          ? p.images[0]
                          : `${process.env.REACT_APP_API_URL}/uploads/${p.images[0]}`
                      }
                      alt={p.name}
                      className="ap-single-img"
                    />
                  ) : (
                    <div className="ap-no-img">Aucune image</div>
                  )}
                </div>

                {/* Info zone */}
                <div className="ap-card-body">
                  <div className="ap-card-header">
                    <h3 className="ap-card-name">{p.name}</h3>
                    <span className="ap-card-price">{Number(p.price).toLocaleString()} FCFA</span>
                  </div>

                  {p.description && (
                    <p className="ap-card-desc">{p.description}</p>
                  )}

                  <div className="ap-card-meta">
                    {p.category && (
                      <span className="ap-badge">{p.category}</span>
                    )}
                    <span className="ap-stock">
                      Stock : <strong>{p.stock ?? "—"}</strong>
                    </span>
                  </div>

                  <div className="ap-card-actions">
                    <button
                      className="ap-btn ap-btn--edit"
                      onClick={() => handleEdit(p)}
                    >
                      Modifier
                    </button>
                    <button
                      className="ap-btn ap-btn--delete"
                      onClick={() => handleDelete(p._id)}
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}