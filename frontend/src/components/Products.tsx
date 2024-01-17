import { BsFillTrashFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import { FaPlusCircle } from "react-icons/fa";

import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

import { delete_product, get_products } from "../api/Products";
import {
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { Product } from "../Interfaces";

const Products = () => {
  const { ref, inView } = useInView();

  const {
    data,
    isLoading,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(["products"], get_products, {
    getNextPageParam: (page: any) => page.meta.next,
  });

  useEffect(() => { 
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  const queryClient = useQueryClient();

  const deleteProdMutation = useMutation({
    mutationFn: delete_product,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Producto elminado");
    },
    onError: () => {
      toast.error("Ocurrió un error, intenta de nuevo");
    },
  });

  if (isLoading) return <p>Cargando...</p>;
  if (error instanceof Error) return <>{toast.error(error.message)}</>;
  if (deleteProdMutation.isLoading) return <p>Cargando...</p>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-ls uppercase bg-gray-800 text-white">
          <tr>
            <th scope="col" className="px-4 py-3">
              Producto ID
            </th>
            <th scope="col" className="px-4 py-3">
              Name
            </th>
            <th scope="col" className="px-4 py-3">
              Precio
            </th>
            <th scope="col" className="px-4 py-3">
              Stock
            </th>
            <th scope="col" className="px-4 py-3">
              Categoría
            </th>
            <th scope="col" className="px-4 py-3">
              Imagen
            </th>
            <th scope="col" className="px-4 py-3 text-center flex items-center justify-between">
              Acciones
              <Link to="agregar-producto">
                <FaPlusCircle size={22} />
              </Link>
            </th>
          </tr>
        </thead>

        <tbody>
          {data?.pages.map((page: any) => (
            <>
              {page.data.map((product: Product) => (
                <tr className="border-b text-white">
                  <th
                    scope="row"
                    className="px-4 py-3 font-medium whitespace-nowrap"
                  >
                    {product.id}
                  </th>
                  <td className="px-4 py-3">{product.name}</td>
                  <td className="px-4 py-3">{product.price}</td>
                  <td className="px-4 py-3">{product.count_in_stock}</td>
                  <td className="px-4 py-3">{product.category}</td>
                  <td className="px-4 py-3">{product.image}</td>
                  <td className="px-4 py-3 flex items-center justify-center gap-4">
                    <BsFillTrashFill
                      onClick={() => {
                        if (product.id !== undefined) {
                          deleteProdMutation.mutate(product.id);
                        }
                      }}
                      size={22}
                      className="text-red-300 cursor-pointer"
                    />
                    <Link to={`editar-producto/${product.id}`}>
                      <AiFillEdit
                        size={22}
                        className="text-green-300 cursor-pointer"
                      />
                    </Link>
                  </td>
                </tr>
              ))}

              {!isLoading && data?.pages.length === 0 && (
                <p className="text-xl text-slate-800 dark:text-slate-200">
                  No more results
                </p>
              )}
              {!isLoading &&
                data?.pages?.length !== undefined &&
                data.pages.length > 0 &&
                hasNextPage && (
                  <div ref={ref}>
                    {isLoading || isFetchingNextPage ? (
                      <p>Cargando...</p>
                    ) : null}
                  </div>
                )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
