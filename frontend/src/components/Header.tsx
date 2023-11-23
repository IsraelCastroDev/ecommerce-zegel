import { Link } from "react-router-dom";
import Search from "../assets/Search";
import Carrito from "../assets/Carrito";
import { useAuthStore } from "../store/auth";

const Header = () => {
  const { isAuth } = useAuthStore();

  return (
    <nav className="nav">
      <div className="logo">
        <Link to="/" className="link-logo">
          logo
        </Link>
      </div>
      <div className="buscador">
        <input type="text" placeholder="Buscar en Zegel Secrets" />
        <Search />
      </div>
      <div className="seccion-inicio">
        <div className="login">
          {isAuth ? (
            <h1>Bienvenido</h1>
          ) : (
            <>
              <Link to="login" className="nav-link">
                Inicia Sesión
              </Link>
              <p>o</p>
              <Link to="registro" className="nav-link">
                Regístrate
              </Link>
            </>
          )}
        </div>
        <div className="carrito">
          <Link to="carrito">
            <Carrito />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
