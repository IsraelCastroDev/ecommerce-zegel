import { useCartStore } from "../store/cart";

import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

const CarritoListaProductos = ({ cart }) => {
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="mt-5">
      {cart.length > 0 ? (
        cart.map((product) => (
          <div className="flex justify-between gap-6 mb-4 border border-slate-500 rounded-sm p-2">
            <div className="w-1/5 flex gap-2">
              <div className="flex flex-col items-center justify-center">
                <button
                  onClick={() => addToCart(product)}
                  className="inline-flex items-center p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100"
                  type="button"
                >
                  <IoIosArrowUp />
                  <span className="sr-only">Quantity button</span>
                </button>
                <div>
                  {product.quantity}
                  <input
                    type="number"
                    id="first_product"
                    className="hidden bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 px-2.5 py-1-600-gray-400blue-500r-blue-500"
                    placeholder="1"
                    required
                  />
                </div>
                <button
                  onClick={() => removeFromCart(product)}
                  className="inline-flex items-center p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100"
                  type="button"
                >
                  <IoIosArrowDown />
                  <span className="sr-only">Quantity button</span>
                </button>
              </div>
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}${product.image}`}
                alt={product.name}
                className="w-3/4 h-auto block"
              />
            </div>
            <div className="w-3/4 flex">
              <div className="w-1/2">
                <h2>{product.name}</h2>
                <h2>{product.category}</h2>
                <p>{product.description}</p>
              </div>
              <div className="w-1/2 flex justify-center items-center">
                <p>
                  Precio: <span>S/. {product.price}</span>
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-3xl text-center text-slate-800 font-semibold">
          No hay productos en el carrito
        </p>
      )}
      {/*
       */}
    </div>
  );
};

export default CarritoListaProductos;
