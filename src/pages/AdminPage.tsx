import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getServices, createService, deleteService, uploadImage, deleteImage } from '../api/services';
import { getQuotes } from '../api/quotes';
import { getSettings, uploadHeroVideo, deleteHeroVideo } from '../api/settings';
import type { Service, Quote } from '../types';
import type { Settings } from '../api/settings';

export default function AdminPage() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<'services' | 'quotes'>('services');
  const [services, setServices] = useState<Service[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [settings, setSettings] = useState<Settings>({ heroVideoUrl: null });
  const [newService, setNewService] = useState({ name: '', description: '', isMain: false });
  const [msg, setMsg] = useState({ text: '', type: '' });
  const fileRefs = useRef<Record<number, HTMLInputElement | null>>({});
  const videoRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    getServices().then(setServices);
    getQuotes().then(setQuotes);
    getSettings().then(setSettings);
  }, []);

  function showMsg(text: string, type = 'success') {
    setMsg({ text, type });
    setTimeout(() => setMsg({ text: '', type: '' }), 3000);
  }

  async function handleAddService(e: React.FormEvent) {
    e.preventDefault();
    try {
      const created = await createService(newService, token!);
      setServices([...services, created]);
      setNewService({ name: '', description: '', isMain: false });
      showMsg('Servicio agregado correctamente.');
    } catch {
      showMsg('Error al agregar el servicio.', 'danger');
    }
  }

  async function handleUpload(serviceId: number, file: File) {
    try {
      const updated = await uploadImage(serviceId, file, token!);
      setServices(services.map(s => s.id === serviceId ? updated : s));
      showMsg('Imagen subida correctamente.');
    } catch {
      showMsg('Error al subir la imagen.', 'danger');
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('¿Eliminar este servicio?')) return;
    await deleteService(id, token!);
    setServices(services.filter(s => s.id !== id));
  }

  async function handleDeleteImage(serviceId: number, index: number) {
    if (!confirm('¿Eliminar esta imagen?')) return;
    try {
      const updated = await deleteImage(serviceId, index, token!);
      setServices(services.map(s => s.id === serviceId ? updated : s));
      showMsg('Imagen eliminada.');
    } catch {
      showMsg('Error al eliminar la imagen.', 'danger');
    }
  }

  async function handleVideoUpload(file: File) {
    try {
      const updated = await uploadHeroVideo(file, token!);
      setSettings(updated);
      showMsg('Video de portada actualizado.');
    } catch {
      showMsg('Error al subir el video.', 'danger');
    }
  }

  async function handleDeleteVideo() {
    if (!confirm('¿Eliminar el video de portada?')) return;
    try {
      const updated = await deleteHeroVideo(token!);
      setSettings(updated);
      showMsg('Video eliminado.');
    } catch {
      showMsg('Error al eliminar el video.', 'danger');
    }
  }

  async function handleLogout() {
    await logout();
    navigate('/');
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0">Panel de Administración</h2>
        <button onClick={handleLogout} className="btn btn-outline-secondary btn-sm">Cerrar sesión</button>
      </div>

      {msg.text && <div className={`alert alert-${msg.type}`}>{msg.text}</div>}

      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button className={`nav-link ${tab === 'services' ? 'active' : ''}`} onClick={() => setTab('services')}>
            Servicios
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${tab === 'quotes' ? 'active' : ''}`} onClick={() => setTab('quotes')}>
            Cotizaciones <span className="badge bg-warning text-dark ms-1">{quotes.length}</span>
          </button>
        </li>
      </ul>

      {tab === 'services' && (
        <>
          {/* Video hero */}
          <div className="card p-4 mb-4">
            <h5 className="fw-bold mb-1">Video de portada</h5>
            <p className="text-secondary small mb-3">Este video se muestra como fondo en la página principal.</p>
            {settings.heroVideoUrl && (
              <video src={settings.heroVideoUrl} controls
                style={{ width: '100%', maxHeight: 200, borderRadius: 8, marginBottom: 12 }} />
            )}
            <input type="file" accept="video/*" className="d-none"
              ref={videoRef}
              onChange={e => { const f = e.target.files?.[0]; if (f) handleVideoUpload(f); }} />
            <div className="d-flex gap-2">
              <button className="btn btn-outline-secondary btn-sm"
                onClick={() => videoRef.current?.click()}>
                <i className="bi bi-camera-video me-2"></i>
                {settings.heroVideoUrl ? 'Cambiar video' : 'Subir video'}
              </button>
              {settings.heroVideoUrl && (
                <button className="btn btn-outline-danger btn-sm" onClick={handleDeleteVideo}>
                  <i className="bi bi-trash me-1"></i>Eliminar video
                </button>
              )}
            </div>
          </div>

          {/* Agregar servicio */}
          <div className="card p-4 mb-4">
            <h5 className="fw-bold mb-3">Agregar nuevo servicio</h5>
            <form onSubmit={handleAddService} className="d-flex flex-column gap-3">
              <input className="form-control" placeholder="Nombre del servicio"
                value={newService.name}
                onChange={e => setNewService({ ...newService, name: e.target.value })} required />
              <textarea className="form-control" placeholder="Descripción" rows={3}
                value={newService.description}
                onChange={e => setNewService({ ...newService, description: e.target.value })} required />
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="isMain"
                  checked={newService.isMain}
                  onChange={e => setNewService({ ...newService, isMain: e.target.checked })} />
                <label className="form-check-label" htmlFor="isMain">Marcar como servicio principal</label>
              </div>
              <button type="submit" className="btn btn-warning fw-semibold align-self-start">
                Agregar servicio
              </button>
            </form>
          </div>

          {/* Lista de servicios */}
          <div className="row g-3">
            {services.map(service => (
              <div className="col-md-6" key={service.id}>
                <div className="card p-3 h-100">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                      {service.isMain && <span className="badge bg-warning text-dark me-2">Principal</span>}
                      <strong>{service.name}</strong>
                    </div>
                    <button onClick={() => handleDelete(service.id)} className="btn btn-outline-danger btn-sm">
                      Eliminar servicio
                    </button>
                  </div>
                  <p className="text-secondary small mb-3">{service.description}</p>

                  {/* Galería de imágenes con botón eliminar */}
                  {service.images.length > 0 && (
                    <div className="d-flex flex-wrap gap-2 mb-3">
                      {service.images.map((img, i) => (
                        <div key={i} style={{ position: 'relative' }}>
                          <img src={img} alt={`img-${i}`}
                            style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 6 }} />
                          <button
                            onClick={() => handleDeleteImage(service.id, i)}
                            style={{ position: 'absolute', top: 2, right: 2, width: 20, height: 20, padding: 0, lineHeight: 1, fontSize: 11 }}
                            className="btn btn-danger rounded-circle">
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <input type="file" accept="image/*" className="d-none"
                    ref={el => { fileRefs.current[service.id] = el; }}
                    onChange={e => { const f = e.target.files?.[0]; if (f) handleUpload(service.id, f); }} />
                  <button className="btn btn-outline-secondary btn-sm align-self-start"
                    onClick={() => fileRefs.current[service.id]?.click()}>
                    <i className="bi bi-image me-2"></i>+ Subir imagen
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {tab === 'quotes' && (
        <div className="d-flex flex-column gap-3">
          {quotes.length === 0 && <p className="text-secondary">No hay cotizaciones aún.</p>}
          {quotes.map(q => (
            <div className="card p-3" key={q.id}>
              <div className="d-flex justify-content-between">
                <strong>{q.firstName} {q.lastName}</strong>
                <small className="text-secondary">{new Date(q.createdAt).toLocaleDateString()}</small>
              </div>
              <div className="text-secondary small mb-1">{q.email} · {q.phone}</div>
              <div className="badge bg-warning text-dark align-self-start mb-2">{q.serviceName}</div>
              <p className="mb-0 small">{q.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
