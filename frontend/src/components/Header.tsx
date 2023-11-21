import { Link } from "react-router-dom";
import Search from "../assets/Search";
import Carrito from "../assets/Carrito";

const Header = () => {
  return (
    <nav className="nav">
      <div className="logo">
        <Link to="/">logo</Link>
      </div>
      <div className="buscador">
        <input type="text" placeholder="Buscar en Zegel Secrets" />
        <Search />
      </div>
      <div className="seccion-inicio">
        <div className="login">
          <Link to="login">Inicia Sesión</Link>
        </div>
        <div className="carrito">
          <Carrito />
        </div>
      </div>
    </nav>
  );
};

export default Header;
