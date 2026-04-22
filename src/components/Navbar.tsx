import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { isAdmin } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-4 d-flex align-items-center gap-2" to="/">
          <img src="/logo.jpg" alt="Mar de Arte" style={{ height: 40, width: 40, objectFit: 'cover', borderRadius: '50%' }} />
          <span className="title-ocean">
            Mar de Arte
          </span>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link className="nav-link" to="/">Inicio</Link></li>
            <li className="nav-item"><a className="nav-link" href="#servicios">Servicios</a></li>
            {isAdmin && (
              <li className="nav-item"><Link className="nav-link fw-semibold text-warning" to="/admin">Admin</Link></li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
