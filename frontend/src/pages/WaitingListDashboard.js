import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import WaitingList from "../components/WaitingList";
import WaitingListHistory from "./WaitingListHistory";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import WaitingListDashboardHome from "./WaitingListDashboardHome";

const WaitingListDashboard = () => {
  return (
    <Routes>
      <Route path="/" element={<WaitingListDashboardHome />} />
      <Route path="/history/" element={<WaitingListHistory />} />
    </Routes>
  );
};

export default WaitingListDashboard;
