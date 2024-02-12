import { useCartStore } from "../store/cart";
import CarritoListaProductos from "../components/CarritoListaProductos";
import { useState } from "react";
import FormPago from "../components/FormPago";

const CarritoPage = () => {
  const cart = useCartStore((state) => state.cart);
  const total_price = useCartStore((state) => state.totalPrice);
  const [mostrarForm, setMostrarForm] = useState<boolean>(false);

  const handleContinuarClick = () => {
    setMostrarForm(true);
  };

  return (
    <>
      {mostrarForm ? (
        <FormPago cart={cart} total_price={total_price} />
      ) : (
        <section className="flex px-10 gap-2 rounded-md mt-10">
          <div className="w-3/5">
            <div className="bg-slate-300 px-4 py-2 flex items-center gap-4">
              <h2 className="text-2xl font-bold text-slate-800">
                Carro de Compras
              </h2>
            </div>
            <CarritoListaProductos cart={cart} />
          </div>
          <div className="w-2/5 bg-slate-300 px-4 py-2">
            <h2 className="text-2xl font-bold text-slate-800">Resumen</h2>
            <div className="mt-5 flex flex-col gap-3">
              <div className="flex justify-between">
                <p className="text-lg text-slate-700 font-semibold">
                  Subtotal:{" "}
                </p>
                <span className="">S/. {total_price} </span>
              </div>
              <hr />
              <div className="flex justify-between">
                <p className="text-lg text-slate-900 font-semibold">
                  Total a Pagar:{" "}
                </p>
                <span className="text-slate-900 font-extrabold">
                  S/. {total_price}{" "}
                </span>
              </div>
              <div className="flex justify-center items-center mt-10 mb-10">
                <button
                  onClick={handleContinuarClick}
                  className="bg-slate-800 w-full rounded-sm text-white font-semibold py-2 tracking-widest hover:bg-slate-900 transition-colors duration-700 ease-in-out"
                >
                  Continuar
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default CarritoPage;
