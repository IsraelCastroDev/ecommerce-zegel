import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

import { MdAdminPanelSettings } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { RiLogoutBoxRFill } from "react-icons/ri";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

interface SubMenuUserProps {
  logoutFunction: () => void;
  isAdmin: boolean;
}

const SubMenuUser: React.FC<SubMenuUserProps> = ({
  logoutFunction,
  isAdmin,
}) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex items-center w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm">
          <img
            className="h-8 w-8 rounded-full"
            src="https://www.pngmart.com/files/21/Account-User-PNG.png"
            alt=""
          />
          Bienvenido
          <ChevronDownIcon
            className="-mr-1 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-[-48px] z-[1000] mt-[19px] w-56 origin-top-right rounded-md bg-slate-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="#"
                  className={classNames(
                    active ? "bg-slate-700" : "",
                    "flex items-center gap-1 px-4 py-2 text-sm text-white"
                  )}
                >
                  <FaUser size={30} />
                  Mi Cuenta
                </Link>
              )}
            </Menu.Item>
            {isAdmin && isAdmin && (
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="admin/"
                    className={classNames(
                      active ? "bg-slate-700" : "",
                      "flex items-center gap-1 px-4 py-2 text-sm text-white"
                    )}
                  >
                    <MdAdminPanelSettings size={30} />
                    Panel de Administrador{" "}
                  </Link>
                )}
              </Menu.Item>
            )}
            <form method="POST" action="#">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={logoutFunction}
                    type="submit"
                    className={classNames(
                      active ? "bg-slate-700" : "",
                      "flex items-center gap-1 px-4 py-2 text-sm text-white w-full text-left"
                    )}
                  >
                    <RiLogoutBoxRFill size={30} />
                    Salir
                  </button>
                )}
              </Menu.Item>
            </form>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default SubMenuUser;
