import { useAuthStore } from "../store/auth";
import { Token } from "../Interfaces";
import jwtDecode from "jwt-decode";
// import { avatar } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import {
  // isError,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { edit_user } from "../api/users";
import toast from "react-hot-toast";
import Loader from "../components/Loader";

import { my_orders } from "../api/orders";

import DatosPerfil from "../components/Profile/DatosPerfil";
import CambiarContrasena from "../components/Profile/CambiarContrasena";
import OrdenesPerfil from "../components/Profile/OrdenesPerfil";
import AsideProfile from "../components/Profile/AsideProfile";

const UserProfile = () => {
  const [stateName, setStateName] = useState<string>("");
  const [stateLast, setStateLast] = useState<string>("");

  const [seccion, setSeccion] = useState<number>(0);

  const token: string = useAuthStore.getState().access;
  const tokenDecoded: Token = jwtDecode(token);
  // const id = tokenDecoded.id;

  const email = tokenDecoded.email;
  const name = tokenDecoded.name;
  const last_name = tokenDecoded.last_name;

  // const { data: user } = useQuery({
  //   queryKey: ["usuarios", id],
  //   queryFn: () => get_solo_user(id),
  // });

  useEffect(() => {
    if (token) {
      setStateName(name);
      setStateLast(last_name);
    }
  }, [token]);

  const queryClient = useQueryClient();

  const editProfileMut = useMutation({
    mutationFn: edit_user,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["usuarios"] });
      toast.success("Perfil editado!");
    },
    onError: () => {
      toast.error("Error!");
    },
  });

  const { data, isError, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: my_orders,
  });

  console.log(data);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    editProfileMut.mutate({
      name: stateName,
      last_name: stateLast,
      email: email,
    });
  };

  // if (user === undefined) return <p>No user here!</p>;

  if (isError) return toast.error("Error!");
  if (isLoading) return <Loader />;

  const handleOnclickSeccion = (num: number) => {
    setSeccion(num);
  };

  return (
    <section className="flex justify-between flex-col md:flex-row p-5">
      <AsideProfile
        stateName={stateName}
        handleOnclickSeccion={handleOnclickSeccion}
      />

      <section className="flex w-full sm:3/4 flex-col gap-5 text-slate-800 mt-10 md:px-10 lg:w-full lg:px-20  mb-5">
        {seccion === 0 && (
          <DatosPerfil
            handleSubmit={handleSubmit}
            stateName={stateName}
            stateLast={stateLast}
            setStateName={setStateName}
            setStateLast={setStateLast}
            email={email}
          />
        )}
        {seccion === 1 && <CambiarContrasena />}
        {seccion === 2 && <OrdenesPerfil data={data} />}
      </section>
    </section>
  );
};

export default UserProfile;
