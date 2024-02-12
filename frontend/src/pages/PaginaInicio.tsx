import ProductCard from "../components/ProductCard";
import { Product } from "../Interfaces";
import { get_products } from "../api/Products";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useInView } from "react-intersection-observer";
import Loader from "../components/Loader";

const PaginaInicio = () => {
  const { ref, inView } = useInView();

  const {
    data,
    isLoading,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(["product"], get_products, {
    getNextPageParam: (page: any) => page.meta.next,
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  if (isLoading) return <Loader />;
  if (error instanceof Error) return <>{toast.error(error.message)}</>;

  return (
    <>
      {data?.pages.map((page: any) => (
        <>
          <div className="flex justify-center items-center mt-10">
            <div
              key={page.meta.next}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2"
            >
              {page.data.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

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
                {isLoading || isFetchingNextPage ? <Loader /> : null}
              </div>
            )}
        </>
      ))}
    </>
  );
};

export default PaginaInicio;
