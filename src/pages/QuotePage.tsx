import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PatternFormat } from 'react-number-format';
import { services } from '../data/services';
import { sendQuote } from '../api/quotes';
import type { QuoteForm } from '../types';

const emptyForm: QuoteForm = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  message: '',
};

export default function QuotePage() {
  const { serviceId } = useParams();
  const service = services.find((s) => s.id === Number(serviceId));
  const [form, setForm] = useState<QuoteForm>(emptyForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!service) {
    return (
      <div className="container py-5 text-center">
        <h4>Servicio no encontrado.</h4>
        <Link to="/" className="btn btn-warning mt-3">Volver al inicio</Link>
      </div>
    );
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await sendQuote({
        ...form,
        serviceId: service!.id,
        serviceName: service!.name,
      });
      setSubmitted(true);
    } catch {
      setError('Hubo un problema al enviar tu solicitud. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="container py-5 text-center">
        <div className="mb-3 fs-1">🎨</div>
        <h3 className="fw-bold">¡Gracias, {form.firstName}!</h3>
        <p className="text-secondary">
          Recibimos tu solicitud para <strong>{service.name}</strong>.<br />
          Nos pondremos en contacto contigo a la brevedad.
        </p>
        <Link to="/" className="btn btn-warning mt-3 fw-semibold">Volver al inicio</Link>
      </div>
    );
  }

  return (
    <div className="container py-5" style={{ maxWidth: 640 }}>
      <Link to="/" className="text-decoration-none text-secondary small">← Volver</Link>

      <h2 className="fw-bold mt-3 mb-1">Solicitar Cotización</h2>
      <p className="text-secondary mb-4">Servicio: <strong>{service.name}</strong></p>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
        <div className="row g-3">
          <div className="col-sm-6">
            <label className="form-label fw-semibold">Nombre</label>
            <input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              className="form-control"
              placeholder="Tu nombre"
              required
            />
          </div>
          <div className="col-sm-6">
            <label className="form-label fw-semibold">Apellido</label>
            <input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              className="form-control"
              placeholder="Tu apellido"
              required
            />
          </div>
        </div>

        <div>
          <label className="form-label fw-semibold">Correo electrónico</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="form-control"
            placeholder="tucorreo@email.com"
            required
          />
        </div>

        <div>
          <label className="form-label fw-semibold">Teléfono</label>
          <PatternFormat
            format="+## (###) ###-####"
            value={form.phone}
            onValueChange={(values) => setForm({ ...form, phone: values.value })}
            className="form-control"
            placeholder="+58 (412) 000-0000"
          />
        </div>

        <div>
          <label className="form-label fw-semibold">Cuéntanos sobre tu evento</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            className="form-control"
            rows={5}
            placeholder="Por favor cuéntanos un poco más sobre tu evento: ¿en qué fecha será? ¿para cuántas personas? ¿algún detalle especial que debamos saber?"
            required
          />
        </div>

        <button type="submit" className="btn btn-warning fw-semibold py-2" disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar solicitud'}
        </button>
      </form>
    </div>
  );
}
