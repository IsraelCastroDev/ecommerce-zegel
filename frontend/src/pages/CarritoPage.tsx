import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

import { useCartStore } from "../store/cart";
import { useMutation } from "@tanstack/react-query";
import { create_order } from "../api/orders";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

const CarritoPage = () => {
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeAll = useCartStore((state) => state.removeAll);

  const cart = useCartStore((state) => state.cart);
  const total_price = useCartStore((state) => state.totalPrice);
  const [address, setAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [postalCode, setPostalCode] = useState<string>("");

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const createOrderMutation = useMutation({
    mutationFn: create_order,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Compra realizada exitosamente 🙂");
      // vaciar carrito
      removeAll();
      navigate("/");
    },
    onError: () => {
      toast.error("Ocurrió un error, intenta de nuevo");
      navigate("/");
    },
  });

  const createOrder = (data, actions: any) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: total_price,
          },
        },
      ],
      application_context: {
        shipping_preference: "NO_SHIPPING",
      },
    });
  };

  const onApprove = (data, actions: any) => {
    return actions.order.capture(handleSubmit());
  };

  const handleSubmit = () => {
    createOrderMutation.mutate({
      order_items: cart,
      total_price: total_price,
      address: address,
      city: city,
      postal_code: postalCode,
    });
    close();
  };

  return (
    <>
      <section className="flex px-10 gap-2 rounded-md">
        <div className="w-3/5">
          <div className="bg-slate-300 px-4 py-2 flex items-center gap-4">
            <h2 className="text-2xl font-bold text-slate-800">
              Carro de Compras
            </h2>
          </div>
          <div className="mt-5">
            {cart.map((product) => (
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
            ))}
          </div>
        </div>
        <div className="w-2/5 bg-slate-300 px-4 py-2">
          <h2 className="text-2xl font-bold text-slate-800">Resumen</h2>
          {/* <p>
            Cantidad: <span></span>{" "}
          </p> */}
          <div className="mt-5 flex flex-col gap-3">
            <div className="flex justify-between">
              <p className="text-lg text-slate-700 font-semibold">Subtotal: </p>
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
          </div>
        </div>
      </section>

      <div className="p-6 space-y-4 md:space-y-6 sm:p-0 flex flex-col justify-center items-center">
        <h1 className="text-xl text-center leading-tight tracking-tight text-slate-900 font-bold">
          Dirección de envío
        </h1>
        <form
          className="space-y-4 lg:w-[600px] md:space-y-6 sm:w-full"
          onSubmit={handleSubmit}
        >
          <div>
            <label className="block mb-2 text-sm text-slate-800 font-bold">
              Dirección
            </label>
            <input
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              type="text"
              className="sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="Ej. Av. 123"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-slate-800 font-bold">
              Ciudad
            </label>
            <input
              onChange={(e) => setCity(e.target.value)}
              value={city}
              type="text"
              className="sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="Ej. Chiclayo"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-slate-800 font-bold">
              Código Postal
            </label>
            <input
              onChange={(e) => setPostalCode(e.target.value)}
              value={postalCode}
              type="text"
              className="sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="Ej. 14202"
            />
          </div>

          <PayPalScriptProvider
            options={{
              clientId:
                "AYpIT2lgUJ3VqblbZvAbmC9l-yi9U5426B26ua3hlI2fX5-M3MrV-gpDhFqwASzXnCh87aGdWnrYW065",
              currency: "USD",
            }}
          >
            <PayPalButtons
              createOrder={(data, actions) => createOrder(data, actions)}
              onApprove={(data, actions) => onApprove(data, actions)}
              style={{ layout: "horizontal" }}
            />
          </PayPalScriptProvider>
        </form>
      </div>
    </>
  );
};

export default CarritoPage;
