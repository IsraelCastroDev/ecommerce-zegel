import { BrowserRouter, Route, Routes } from "react-router-dom";

import { RutaPrivada, AdminRutaPrivada } from "./components/RutaPrivada";

import Layout from "./components/Layout";
import PaginaInicio from "./pages/PaginaInicio";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminPage from "./pages/AdminPage";
import AgregarProducto from "./pages/AgregarProducto";
import EditProduct from "./pages/EditProduct";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<PaginaInicio />} />
          <Route path="login" element={<Login />} />
          <Route path="registro" element={<Register />} />

          <Route element={<RutaPrivada />}></Route>

          <Route path="admin" element={<AdminRutaPrivada />}>
            <Route index element={<AdminPage />} />
            <Route path="agregar-producto" element={<AgregarProducto />} />
            <Route path="editar-producto/:id" element={<EditProduct />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
