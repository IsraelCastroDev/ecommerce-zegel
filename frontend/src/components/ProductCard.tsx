import { Link } from "react-router-dom";
import { Product } from "../Interfaces";

import { useCartStore } from "../store/cart";

import FlechaDerecha from "./FlechaDerecha";
import StarPoints from "./StarPoints";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div>
      <div className="max-w-sm border-gray-200 rounded-lg shadow bg-slate-800">
        <Link to={`/product/${product.name}`}>
          <img
            className="rounded-t-lg"
            src={`${import.meta.env.VITE_BACKEND_URL}${product.image}`}
            alt=""
          />
        </Link>
        <div className="p-5 ">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {product.name}
          </h5>
          <div className="flex justify-between">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-slate-200">
              S/. {product.price}
            </h5>
            <div className="flex items-center">
              <StarPoints />
              <StarPoints />
              <StarPoints />
              <StarPoints />
              <StarPoints />
              <span className="ml-1 text-gray-500 dark:text-gray-400">
                {product.rating === null ? "0.0" : product.rating}
              </span>
            </div>
          </div>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {product.description}
          </p>

          <div className="flex justify-between">
            <button
              onClick={() => addToCart(product)}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Agregar
              <FlechaDerecha />
            </button>

            <Link
              to={`/product/${product.name}`}
              className="inline-flex items-center
        px-3 py-2 text-sm font-medium text-center text-white 
        bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 
        focus:outline-none focus:ring-blue-300 dark:bg-blue-600 
        dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Ver producto
              <FlechaDerecha />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
