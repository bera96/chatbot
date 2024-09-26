import { Box } from "@mui/material";
import SidebarNavigation from "./SidebarNavigation";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Layout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")!);
    console.log(user, "user");
    if (!user) {
      navigate("/register");
    }
  }, []);
  return (
    <Box sx={{ display: "flex", backgroundColor: "#424242" }}>
      <Box>
        <SidebarNavigation />
      </Box>
      <Box sx={{ width: "100%", height: "100vh" }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
