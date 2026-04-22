import { Link } from 'react-router-dom';
import type { Service } from '../types';

const serviceStyles: Record<number, { icon: string; color: string; bg: string }> = {
  1: { icon: 'bi-brush-fill',   color: '#c9a84c', bg: 'rgba(201,168,76,0.12)' },
  2: { icon: 'bi-pencil-fill',  color: '#1b9aaa', bg: 'rgba(27,154,170,0.12)' },
  3: { icon: 'bi-bag-fill',     color: '#e07a5f', bg: 'rgba(224,122,95,0.12)' },
  4: { icon: 'bi-gem',          color: '#9b72cf', bg: 'rgba(155,114,207,0.12)' },
};

const defaultStyle = { icon: 'bi-palette-fill', color: '#c9a84c', bg: 'rgba(201,168,76,0.12)' };

interface Props {
  service: Service;
}

export default function BestSeller({ service }: Props) {
      const style = serviceStyles[service.id] ?? defaultStyle;
        const carouselId = `carousel-${service.id}`;

  return (
    <div className={`card h-100 ${service.isMain ? 'border-warning border-2' : ''}`}>
        <div className="accent-bar" style={{ background: style.color }} />


      {service.images.length > 1 ? (
        <div id={carouselId} className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            {service.images.map((img, idx) => (
              <div className={`carousel-item ${idx === 0 ? 'active' : ''}`} key={idx}>
                <img src={img} className="d-block w-100" alt={service.name}
                  style={{ height: 280, objectFit: 'contain', background: '#f8f8f8' }} />
              </div>
            ))}
          </div>
          <button className="carousel-control-prev" type="button"
            data-bs-target={`#${carouselId}`} data-bs-slide="prev">
            <span className="carousel-control-prev-icon"></span>
          </button>
          <button className="carousel-control-next" type="button"
            data-bs-target={`#${carouselId}`} data-bs-slide="next">
            <span className="carousel-control-next-icon"></span>
          </button>
        </div>
      ) : service.images.length === 1 ? (
        <img src={service.images[0]} className="card-img-top" alt={service.name}
          style={{ height: 280, objectFit: 'contain', background: '#f8f8f8' }} />
      ) : (
        <div className="d-flex align-items-center justify-content-center"
          style={{ height: 200, background: style.bg }}>
          <i className={`bi ${style.icon}`} style={{ fontSize: '3rem', color: style.color, opacity: 0.5 }}></i>
        </div>
      )}

      <div className="card-body d-flex flex-column p-4">
        <div className="d-flex align-items-center gap-3 mb-3">
          <div className="service-icon" style={{ background: style.bg }}>
            <i className={`bi ${style.icon}`} style={{ color: style.color }}></i>
          </div>
          <div>
            {service.isMain && (
              <span className="badge mb-1 d-block" style={{ background: style.bg, color: style.color, width: 'fit-content' }}>
                ⭐ Servicio Principal
              </span>
            )}
            <h5 className="card-title mb-0 fw-bold">{service.name}</h5>
          </div>
        </div>
        <p className="card-text text-secondary flex-grow-1">{service.description}</p>
        <Link to={`/cotizar/${service.id}`} className="btn mt-3 fw-semibold"
          style={{ background: style.color, color: '#fff', borderRadius: 50 }}>
          <i className="bi bi-send me-2"></i>Cotizar ahora
        </Link>
      </div>
    </div>
  );
}