import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

import { useState } from "react";
import { create_order } from "../api/orders";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cart";

const FormPago = ({ cart, total_price }) => {
  const removeAll = useCartStore((state) => state.removeAll);

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
  return (
    <div className="p-6 mt-10 space-y-4 md:space-y-6 sm:p-0 flex flex-col justify-center items-center">
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
  );
};

export default FormPago;
