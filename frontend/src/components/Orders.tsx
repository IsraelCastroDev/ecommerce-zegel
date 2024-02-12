import { BsFillTrashFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import { FaPlusCircle } from "react-icons/fa";

import { get_orders, edit_order, delete_order } from "../api/orders";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Loader from "./Loader";
import { Link } from "react-router-dom";

interface Props {
  results: any;
}

const Orders = ({ results }: Props) => {
  const queryClient = useQueryClient();

  const { data, isError, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: get_orders,
  });

  console.log(results);

  const deleteOrderMutation = useMutation({
    mutationFn: delete_order,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Orden eliminada");
    },
    onError: () => {
      toast.error("Ocurrió un error, intenta de nuevo");
    },
  });

  const editOrderMut = useMutation({
    mutationFn: edit_order,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Ordem entregada!");
    },
    onError: () => {
      toast.error("Error!");
    },
  });

  if (isError) return toast.error("Error!");
  if (isLoading) return <Loader />;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-ls uppercase bg-gray-800 text-white">
          <tr>
            <th scope="col" className="px-4 py-3">
              Orden ID
            </th>
            <th scope="col" className="px-4 py-3">
              Fecha de creación
            </th>
            <th scope="col" className="px-4 py-3">
              Usuario
            </th>
            <th scope="col" className="px-4 py-3">
              Total
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-center flex items-center justify-between"
            >
              Acciones
              <FaPlusCircle size={22} />
            </th>
          </tr>
        </thead>

        {/* {results && results.orders.length > 0 ? (
          <>
            {results &&
              results.orders.map((o: any) => (
                <tbody>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <input
                          onClick={() => editOrderMut.mutate(o.id)}
                          id="checkbox-table-search-1"
                          type="checkbox"
                          checked={o.is_delivered}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="checkbox-table-search-1"
                          className="sr-only"
                        >
                          checkbox
                        </label>
                      </div>
                    </td>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {o.id}
                    </th>

                    <td className="px-6 py-4">{o.created_at.slice(0, 10)}</td>

                    <td className="px-6 py-4">{o.user}</td>

                    <td className="px-6 py-4"></td>

                    <td className="px-6 py-4">$ {o.total_price}</td>

                    <td className="px-6 py-4">
                      <Link to={`/order/${o.id}`}>
                        <BsFillTrashFill />
                      </Link>
                    </td>

                    <td className="px-6 py-4">
                      <Link to={`/order/${o.id}`}>
                        <AiFillEdit />
                      </Link>
                    </td>
                  </tr>
                </tbody>
              ))}
          </>
        ) : ( */}
        <tbody>
          {data &&
            data.map((o: any) => (
              <tr className="border-b text-white">
                {/* <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        onClick={() => editOrderMut.mutate(o.id)}
                        id="checkbox-table-search-1"
                        type="checkbox"
                        checked={o.is_delivered}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="checkbox-table-search-1"
                        className="sr-only"
                      >
                        checkbox
                      </label>
                    </div>
                  </td> */}
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {o.id}
                </th>

                <td className="px-6 py-4">{o.created_at.slice(0, 10)}</td>

                <td className="px-6 py-4">{o.user}</td>

                <td className="px-6 py-4">S/. {o.total_price}</td>

                <td className="px-6 py-4 flex justify-between">
                  <BsFillTrashFill
                    onClick={() => {
                      if (o.id !== undefined) {
                        deleteOrderMutation.mutate(o.id);
                      }
                    }}
                    size={22}
                    className="text-red-300 cursor-pointer"
                  />

                  <Link to={`/order/${o.id}`}>
                    <AiFillEdit />
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
        {/* )} */}
      </table>
    </div>
  );
};

export default Orders;
