import { useQuery } from "@tanstack/react-query";
import Loader from "../components/Loader";
import { get_solo } from "../api/Products";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import FlechaDerecha from "../components/FlechaDerecha";

const ProductPage = () => {
  const { slug } = useParams();

  const { data, isError, isLoading } = useQuery({
    queryKey: ["products", slug],
    queryFn: () => get_solo(slug || ""),
  });

  if (isError) return toast.error("Error");
  if (isLoading) return <Loader />;

  return (
    <div className="">
      <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
        <div className="font-light sm:text-lg">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-slate-800">
            {data.name}
            <span className="text-green-700 ml-4">${data.price}</span>
          </h2>
          <p className="mb-4 font-bold">{data.description}</p>
          <a
            href="#"
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-slate-800  rounded-lg hover:bg-slate-900 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            Agregar al carrito de compras
            <FlechaDerecha />
          </a>
        </div>

        <img
          className="w-full"
          src={`${import.meta.env.VITE_BACKEND_URL}${data.image}`}
          alt="office content 1"
        />
      </div>
    </div>
  );
};

export default ProductPage;
