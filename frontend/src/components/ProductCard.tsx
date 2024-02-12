import { Link } from "react-router-dom";
import { Product } from "../Interfaces";

import { useCartStore } from "../store/cart";

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
            className="rounded-t-lg block w-full"
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

          <div className="flex justify-center items-center mt-10">
            <button
              onClick={() => addToCart(product)}
              className="inline-flex justify-center items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-800 rounded-lg hover:bg-blue-900 w-full"
            >
              Agregar al carrito
              {/* <FlechaDerecha /> */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
