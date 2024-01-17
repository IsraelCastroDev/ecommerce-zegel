import { BsFillTrashFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import { FaPlusCircle } from "react-icons/fa";

import { delete_user, get_users } from "../api/users";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
useMutation;

import { User } from "../Interfaces";

import toast from "react-hot-toast";
import Loader from "./Loader";

const Users = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["usuarios"],
    queryFn: get_users,
  });

  const queryClient = useQueryClient();

  const deleteUserMut = useMutation({
    mutationFn: delete_user,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["usuarios"] });
      toast.success("Usuario elminado");
    },
    onError: () => {
      toast.error("Ocurrió un error, intenta de nuevo");
    },
  });

  if (isError) return toast.error("Error");
  if (isLoading) return <Loader />;
  if (deleteUserMut.isLoading) return <Loader />;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-4 py-3">
              Usuario ID
            </th>
            <th scope="col" className="px-4 py-3">
              Email
            </th>
            <th scope="col" className="px-4 py-3">
              Nombre
            </th>
            <th scope="col" className="px-4 py-3">
              Apellido
            </th>
            <th
              scope="col"
              className="px-4 py-3 flex items-center justify-center gap-4"
            >
              Actions
              <FaPlusCircle size={22} />
            </th>
          </tr>
        </thead>

        <tbody>
          {data.map((user: User) => (
            <tr className="border-b dark:border-gray-700">
              <th
                scope="row"
                className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {user.id}
              </th>
              <td className="px-4 py-3">{user.email}</td>
              <td className="px-4 py-3">{user.name}</td>
              <td className="px-4 py-3">{user.last_name}d</td>
              <td className="px-4 py-3 flex items-center justify-center gap-4">
                <BsFillTrashFill
                  onClick={() => deleteUserMut.mutate(user.id)}
                  size={22}
                  className="text-red-300 cursor-pointer"
                />
                <AiFillEdit
                  size={22}
                  className="text-green-300 cursor-pointer"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
