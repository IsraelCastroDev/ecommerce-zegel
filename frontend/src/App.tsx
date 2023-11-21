import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import PaginaInicio from "./pages/PaginaInicio";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<PaginaInicio />} />
          <Route path="login" element={<Login />} />
          <Route path="registro" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
