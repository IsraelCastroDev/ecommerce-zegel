import { HiMiniPencilSquare } from "react-icons/hi2";
import { MdOutlineShoppingCart } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";

interface AsideProfileProps {
  stateName: string;
  handleOnclickSeccion: (num: number) => void;
}

const AsideProfile = (data: AsideProfileProps) => {
  return (
    <aside className="h-[70vh] w-full md:w-1/4 shadow-[4px_4px_18px_-3px_rgba(82,82,82,0.68)] border border-r-gray-300">
      <div className="mt-6">
        <h1 className="text-center text-slate-800 font-semibold text-xl">
          ¡Hola {data.stateName}!
        </h1>
        <div className="flex justify-center mt-3">
          <div className="flex justify-center items-center border border-slate-800 rounded-full h-16 w-16 bg-slate-800 text-white">
            <h2 className="font-bold tracking-widest text-2xl uppercase">
              {data.stateName.charAt(0)}
              {data.stateName.charAt(0)}
            </h2>
          </div>
        </div>
      </div>

      <article className="flex flex-col text-left gap-2 mt-6">
        <div
          className="flex items-center gap-2
          hover:bg-slate-500 hover:text-white pl-3 h-10 transition-colors duration-150 ease-in-out"
        >
          <HiMiniPencilSquare size={30} />
          <button
            onClick={() => data.handleOnclickSeccion(0)}
            className="w-full h-full text-left font-semibold"
          >
            Mis datos
          </button>
        </div>
        <div
          className="flex items-center gap-2
          hover:bg-slate-500 hover:text-white pl-3 h-10 transition-colors duration-150 ease-in-out"
        >
          <MdOutlineShoppingCart size={30} />
          <button
            onClick={() => data.handleOnclickSeccion(2)}
            className="w-full h-full text-left font-semibold"
          >
            Mis compras
          </button>
        </div>
      </article>
    </aside>
  );
};

export default AsideProfile;
