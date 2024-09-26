import { Route, Routes } from "react-router-dom";
import Layout from "../layout/Layout";
import Chat from "../pages/chat/Chat";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Chat />} />
      </Route>
    </Routes>
  );
};

export default Router;
