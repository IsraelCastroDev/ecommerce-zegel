import { Link } from "react-router-dom";
import Search from "../assets/Search";
import Carrito from "../assets/Carrito";
import { useAuthStore } from "../store/auth";
import jwt_decode from "jwt-decode";
import { useCartStore } from "../store/cart";
import { Token } from "../Interfaces";

import SubMenuUser from "./SubMenuUser";

const Header = () => {
  const token: string = useAuthStore.getState().access;
  const { isAuth } = useAuthStore();
  const cart = useCartStore((state) => state.cart);

  let is_admin = false;

  if (isAuth) {
    const tokenDecoded: Token = jwt_decode(token);
    is_admin = tokenDecoded.is_staff;
  }

  function logOutFun() {
    useAuthStore.getState().logout();
    window.location.href = "/login";
  }

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <nav className="flex items-center w-full justify-between px-8 py-4 bg-slate-800 text-white sticky top-0 z-50">
      <div className="">
        <Link
          to="/"
          className="bold text-[1.6rem] underline underline-offset-4 tracking-wide hover:text-slate-300 transition-colors duration-300 ease-linear"
        >
          Zegel Secret's
        </Link>
      </div>
      <div className="flex w-[500px] bg-slate-600 justify-between p-2 rounded-sm">
        <input
          type="text"
          className="bg-transparent w-full outline-none"
          placeholder="Buscar en Zegel Secrets"
        />
        <div className="cursor-pointer">
          <Search />
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <div className="font-bold border-x-2 px-4 text-center">
          {isAuth ? (
            <>
              <SubMenuUser logoutFunction={logOutFun} isAdmin={is_admin} />
            </>
          ) : (
            <>
              <p>!Hola¡</p>
              <Link
                to="login"
                className="underline hover:text-slate-400 transition-colors duration-500 ease-in-out"
              >
                Inicia Sesión
              </Link>
            </>
          )}
        </div>
        <div className="flex justify-center items-center gap-2">
          <Link to="carrito" className="">
            <Carrito />
          </Link>
          <span className="text-white font-extrabold text-[20px]">
            {cart.length}
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Header;
