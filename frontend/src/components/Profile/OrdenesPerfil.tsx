import { formatDate } from "../../helpers";

import { Link } from "react-router-dom";

const OrdenesPerfil = ({ data }) => {
  console.log(data);

  return (
    <table className="w-full text-sm text-left">
      <thead className="text-xs uppercase text-white bg-slate-800">
        <tr>
          <th scope="col" className="px-4 py-3">
            ID compra
          </th>
          <th scope="col" className="px-4 py-3">
            FECHA Y HORA
          </th>
          <th scope="col" className="px-4 py-3">
            precio total
          </th>
          <th scope="col" className="px-4 py-3"></th>
        </tr>
      </thead>

      <tbody>
        {data.lenght === 0 ? (
          <p className="text-3xl text-slate-900 uppercase">
            Aún no haz realizado compras
          </p>
        ) : (
          data.map((order: any) => (
            <tr className="border border-slate-800">
              <th
                scope="row"
                className="px-4 py-3 font-medium text-black whitespace-nowrap"
              >
                {order.id}
              </th>
              <th
                scope="row"
                className="px-4 py-3 font-medium text-black whitespace-nowrap"
              >
                {formatDate(order.created_at)}
              </th>
              <th
                scope="row"
                className="px-4 py-3 font-medium text-black whitespace-nowrap"
              >
                S/. {order.total_price}
              </th>
              <td className="px-4 py-3">
                <Link
                  to={`/orders/order/${order.id}/`}
                  className="p-2 cursor-pointer font-semibold underline"
                >
                  Ver detalles
                </Link>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default OrdenesPerfil;
