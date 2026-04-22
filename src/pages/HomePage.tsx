import { useState, useEffect } from 'react';
import BestSeller from '../components/BestSeller';
import { getServices } from '../api/services';
import { getSettings } from '../api/settings';
import type { Service } from '../types';
import type { Settings } from '../api/settings';

export default function HomePage() {
  const [services, setServices] = useState<Service[]>([]);
  const [settings, setSettings] = useState<Settings>({ heroVideoUrl: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getServices().then(setServices),
      getSettings().then(setSettings),
    ]).finally(() => setLoading(false));
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="hero">
        {settings.heroVideoUrl && (
          <video autoPlay loop muted playsInline
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0, opacity: 0.35 }}>
            <source src={settings.heroVideoUrl} />
          </video>
        )}
        <div className="container text-center position-relative" style={{ zIndex: 1 }}>
          <img src="/logo.jpg" alt="Mar de Arte"
            style={{ width: 110, height: 110, objectFit: 'cover', borderRadius: '50%', border: '3px solid #ffd700', marginBottom: 24, boxShadow: '0 0 20px rgba(255,215,0,0.5), 0 0 50px rgba(255,215,0,0.2)' }} />
          <h1 className="display-2 fw-bold mb-3" style={{ letterSpacing: '-1px' }}>
            <span className="title-ocean">
              Mar de Arte
            </span>
          </h1>
          <p className="lead mb-4 mx-auto" style={{ maxWidth: 560, color: 'rgba(255,255,255,0.92)', fontSize: '1.15rem', textShadow: '0 1px 8px rgba(0,0,0,0.4)' }}>
            EL ARTE ES UN LIENZO DE LA IMAGINACIÓN.<br />
            <span style={{
              background: 'linear-gradient(90deg, #ffd700, #ffec6e, #ffd700)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 700,
              filter: 'drop-shadow(0 1px 6px rgba(255,215,0,0.6))'
            }}>
              ART IS A CANVAS OF IMAGINATION.
            </span>
          </p>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <a href="#servicios" className="btn btn-cta">
              <i className="bi bi-palette me-2"></i>Ver servicios
            </a>
            <a href="#servicios" className="btn btn-cta-outline">
              <i className="bi bi-chat-heart me-2"></i>Cotizar ahora
            </a>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section id="servicios" className="services-section" style={{ position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden="true" style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none',
          backgroundImage: `
            radial-gradient(circle, rgba(30,120,255,0.55) 0%, rgba(30,120,255,0.55) 1.5px, transparent 1.5px),
            radial-gradient(circle, rgba(60,160,255,0.45) 0%, rgba(60,160,255,0.45) 1px,   transparent 1px),
            radial-gradient(circle, rgba(20,100,220,0.60) 0%, rgba(20,100,220,0.60) 2px,   transparent 2px),
            radial-gradient(circle, rgba(80,180,255,0.40) 0%, rgba(80,180,255,0.40) 1px,   transparent 1px)`,
          backgroundSize: '70px 40px, 50px 60px, 90px 30px, 55px 50px',
          backgroundPosition: '8px 10px, 18px 25px, 38px 14px, 50px 36px',
          animation: 'twinkle-stars 3s ease-in-out infinite',
        }} />
        <div className="container-fluid px-4">
          <div className="text-center mb-5">
            <span className="badge mb-2 px-3 py-2"
              style={{ background: 'rgba(201,168,76,0.15)', color: '#8a6a00', fontSize: '0.85rem' }}>
              <i className="bi bi-stars me-1"></i>Lo que ofrecemos
            </span>
            <h2 className="fw-bold fs-1">Nuestros Servicios</h2>
            <p className="text-secondary mx-auto" style={{ maxWidth: 500 }}>
              Cada pieza es única, hecha con amor y dedicación para hacer especial tu momento.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border" style={{ color: '#c9a84c' }}></div>
            </div>
          ) : (
            <div className="row row-cols-1 row-cols-md-2 g-4">
              {services.map(service => (
                <div className="col fade-in-up" key={service.id}>
                  <BestSeller service={service} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="text-center py-5" style={{ background: 'linear-gradient(135deg, #001F5B, #1b6b77)' }}>
        <h3 className="text-white fw-bold mb-2">¿Lista para tu experiencia artística?</h3>
        <p className="mb-4" style={{ color: 'rgba(255,255,255,0.75)' }}>¡Contáctanos!</p>
        <a href="#servicios" className="btn btn-cta">
          <i className="bi bi-brush me-2"></i>Empezar ahora
        </a>
      </section>
    </>
  );
}

