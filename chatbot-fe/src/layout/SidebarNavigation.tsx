import {
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from "react-redux";
import { setLogout } from "../pages/auth/store/slice";
import { useEffect } from "react";
import { sessionsTypes } from "./store/type";
import { useAppSelector } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { clearCurrentSession } from "./store/slice";

const SidebarNavigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessions = useAppSelector((state) => state.sessions.sessions);
  const sortedSessions = [...sessions.data].sort((a, b) => {
    const dateA = new Date(a.endedAt).getTime();
    const dateB = new Date(b.endedAt).getTime();
    return dateB - dateA;
  });
  const currentSession = useAppSelector((state) => state.sessions.currentSession);
  console.log(currentSession, "currentSession");
  const userId = JSON.parse(localStorage.getItem("user")!)?.user._id;
  const onLogout = () => {
    dispatch(setLogout());
    navigate("/register");
  };
  const onNewChatHandler = () => {
    dispatch({
      type: sessionsTypes.POST_SESSION,
      payload: { tenantId: userId, currentSessionId: currentSession?.data?._id },
    });
  };

  const onSelectSession = (sessionId: string) => {
    if (sessionId) {
      dispatch({
        type: sessionsTypes.GET_CURRENT_SESSION,
        payload: { sessionId, tenantId: userId },
      });
    }
  };

  const onSessionDelete = (sessionId: string) => {
    dispatch({
      type: sessionsTypes.DELETE_SESSION,
      payload: { sessionId, tenantId: userId },
    });
  };
  useEffect(() => {
    dispatch({
      type: sessionsTypes.GET_SESSIONS,
      payload: { tenantId: userId },
    });
  }, [userId, currentSession]);

  useEffect(() => {
    if (sessions?.data?.length === 0) {
      dispatch(clearCurrentSession());
    }
  }, [sessions]);

  return (
    <Drawer
      variant="permanent"
      sx={{
        height: "100vh",
        width: 280,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 280,
          bgcolor: "#ffffff",
          color: "white",
          boxSizing: "border-box",
          borderRight: "1px solid #efefef",
        },
      }}
    >
      <Typography sx={{ textAlign: "left", padding: "16px 10px", color: "#333" }} variant="h5">
        ChatBot
      </Typography>
      <Button
        sx={{
          textAlign: "center",
          padding: "12px 0",
          fontWeight: 600,
          background: "#5661f6",
          cursor: "pointer",
          color: "#fff",
          fontSize: "12px",
          width: "200px",
          margin: "0 auto",
          borderRadius: "20px",
          border: "1px solid #fff",
          "&:hover": {
            background: "#4651d6",
          },
        }}
        startIcon={<AddIcon sx={{ color: "#fff" }} />}
        onClick={() => onNewChatHandler()}
      >
        New Chat
      </Button>
      <Divider sx={{ bgcolor: "#efefef", opacity: "0.3", marginTop: "14px" }} />
      <Typography
        sx={{
          textAlign: "center",
          padding: "16px 0",
          color: "#737272",
          fontSize: "14px",
        }}
      >
        Previous Sessions
      </Typography>
      <Divider sx={{ bgcolor: "#efefef", opacity: "0.3" }} />
      <List
        sx={{
          overflowY: "auto",
          flexGrow: 1,
          padding: "8px",
          maxHeight: "calc(100vh - 250px)",
        }}
      >
        {sortedSessions?.map((item) => (
          <ListItem key={item._id} disablePadding>
            <ListItemButton
              sx={{
                "&:hover": {
                  bgcolor: "#efefef",
                },
              }}
              onClick={() => onSelectSession(item._id)}
            >
              <ListItemText
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  color: "#333",
                }}
                primary={item?.answers?.[0]?.text ? item.answers[0].text : "New Chat"}
              />
            </ListItemButton>
            <DeleteIcon
              onClick={() => onSessionDelete(item._id)}
              sx={{ cursor: "pointer", color: "#4651d6" }}
            />
          </ListItem>
        ))}
      </List>
      <Box
        onClick={() => onLogout()}
        sx={{
          display: "flex",
          alignItems: "center",
          marginTop: "1rem",
          marginLeft: "1rem",
          cursor: "pointer",
          color: "#4651d6",
        }}
      >
        <LogoutIcon fontSize="large" />
        <Typography>Logout</Typography>
      </Box>
    </Drawer>
  );
};

export default SidebarNavigation;
