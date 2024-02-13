import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { get_solo_order } from "../api/orders";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import { formatDate } from "../helpers";

const Order = () => {
  const { id } = useParams();

  const { data, isError, isLoading } = useQuery({
    queryKey: ["order"],
    queryFn: () => get_solo_order(Number(id)),
  });

  console.log(data, "data");

  if (isError) return toast.error("Ocurrió un error");
  if (isLoading) return <Loader />;

  const { order_items } = data;

  return (
    <section className="px-3 py-2 text-md font-semibold">
      <div className="mb-5 mt-10">
        <p className="text-3xl text-center text-slate-900 font-semibold">
          ID de la orden: {id}
        </p>
      </div>
      {data.length === 0 ? (
        <p className="text-3xl text-slate-900 font-semibold">
          No hay productos
        </p>
      ) : (
        <article
          className="border-2 border-slate-900 bg-slate-300
                    rounded-md p-3 sm:p-5
                    w-full sm:w-2/3 md:w-1/2 mx-auto"
        >
          {order_items.map((item: any) => (
            <div
              key={item.id}
              className="flex flex-col border-b-2 border-slate-800"
            >
              <div className="flex items-center justify-between gap-3 border-b-2">
                <p className="text-slate-800">Nombre de Producto:</p>
                <p className="text-slate-600">{item.product}</p>
              </div>
              <div className="flex items-center justify-between gap-3 border-b-2">
                <p className="text-slate-800">Precio:</p>
                <p className="text-slate-600">{item.price}</p>
              </div>
              <div className="flex items-center justify-between gap-3">
                <p className="text-slate-800">Cantidad:</p>
                <p className="text-slate-600">{item.quantity}</p>
              </div>
            </div>
          ))}

          <div className="mt-5">
            <div className="flex items-center justify-between">
              <p className="text-slate-800">Cantidad de productos:</p>
              <p className="text-slate-700 font-bold">
                {data.order_items.length}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-md text-slate-800">Fecha de compra:</p>
              <p className="text-slate-700 font-bold">
                {formatDate(data.created_at).split(" ")[0]}
              </p>{" "}
            </div>

            <div className="flex items-center justify-between font-black">
              <p className="text-md text-slate-800">Total pagado:</p>
              <p className="text-slate-700 font-bold">{data.total_price}</p>
            </div>
          </div>
        </article>
      )}
    </section>
  );
};

export default Order;
