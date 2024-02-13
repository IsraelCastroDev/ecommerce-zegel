interface DatosProps {
  handleSubmit: (event: React.FormEvent) => void;
  stateName: string;
  stateLast: string;
  setStateName: (value: string) => void;
  setStateLast: (value: string) => void;
  email: string;
}

const Datos: React.FC<DatosProps> = ({
  handleSubmit,
  stateName,
  stateLast,
  setStateName,
  setStateLast,
  email,
}) => {
  return (
    <>
      <div>
        <h2 className="text-2xl font-semibold">Perfil</h2>
        <p className="mt-4">Aquí encontrarás tus datos personales</p>
      </div>

      <div className="border border-slate-800 px-6 py-5 rounded-md">
        <h2 className="text-2xl">Mis datos personales</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative mt-5 border border-slate-800 rounded-[4px]">
              <input
                type="text"
                name="name"
                id="name"
                value={stateName}
                onChange={(e) => setStateName(e.target.value)}
                className="outline-none bg-transparent h-10 w-full px-6"
                required
              />
              <label
                htmlFor="name"
                className="absolute text-sm top-[-12px] left-[15px] translate-y-[-50] pointer-events-none bg-slate-200 px-2"
              >
                Nombre *
              </label>
            </div>

            <div className="relative mt-5 border border-slate-800 rounded-[4px]">
              <input
                type="text"
                name="last_name"
                id="last_name"
                value={stateLast}
                onChange={(e) => setStateLast(e.target.value)}
                className="outline-none bg-transparent h-10 w-full px-6"
                required
              />
              <label
                htmlFor="last_name"
                className="absolute text-sm top-[-12px] left-[15px] translate-y-[-50] pointer-events-none bg-slate-200 px-2"
              >
                Apellido *
              </label>
            </div>

            <div className="relative mt-5 border border-slate-800 rounded-[4px]">
              <input
                type="text"
                name="email"
                id="email"
                value={email}
                className="outline-none h-10 px-6 bg-gray-300 w-full"
                disabled
                readOnly
              />
              <label
                htmlFor="email"
                className="absolute text-sm top-[-12px] left-[15px] translate-y-[-50] pointer-events-none bg-slate-200 opacity-90 px-2"
              >
                Email *
              </label>
            </div>
          </div>

          <div className="flex justify-center items-center mt-10">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-green-700 transition-colors duration-500 ease-in-out"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Datos;
