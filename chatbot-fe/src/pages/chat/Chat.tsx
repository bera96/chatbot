import { useEffect, useState } from "react";
import { Box, TextField, IconButton, List, ListItem, Paper, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useAppSelector } from "../../redux/store";
import { useDispatch } from "react-redux";
import { sessionsTypes } from "../../layout/store/type";
import { formatTime } from "../../utils/formatTime";

const Chatbot = () => {
  const [messages, setMessages] = useState<
    Array<{ sender: string; text: string; timeStamp?: string }>
  >([]);
  const [currentQuestion, setCurrentQuestion] = useState<any>();
  const [inputValue, setInputValue] = useState("");
  const [disabled, setDisabled] = useState(false);
  const dispatch = useDispatch();
  const currentSession = useAppSelector((state) => state.sessions.currentSession);
  const botMessages = currentSession?.data?.questions?.map((q) => ({ ...q, sender: "bot" }));
  const userMessages = currentSession?.data?.answers?.map((a) => ({ ...a, sender: "user" }));

  useEffect(() => {
    if (currentSession) {
      const allMessages = [...botMessages, ...userMessages].filter(Boolean);

      const sortedMessages = allMessages.sort((a, b) => {
        const timeA = a.timeStamp ? new Date(a.timeStamp).getTime() : 0;
        const timeB = b.timeStamp ? new Date(b.timeStamp).getTime() : 0;
        return timeA - timeB;
      });

      setMessages(sortedMessages);

      const lastBotMessage = sortedMessages.find((message) => message.sender === "bot");
      if (lastBotMessage) {
        setCurrentQuestion(lastBotMessage);
      }
    }
  }, [currentSession]);

  useEffect(() => {
    if (userMessages.length >= 10) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [userMessages]);
  const handleSendMessage = () => {
    if (!disabled) {
      if (inputValue.trim() === "") return;

      const userMessage = { sender: "user", text: inputValue };
      setMessages((prev) => [...prev, userMessage]);
      dispatch({
        type: sessionsTypes.POST_ANSWER,
        payload: {
          answer: inputValue,
          userId: JSON.parse(localStorage.getItem("user")!)?.user?._id,
          sessionId: currentSession.data._id,
          questionId: currentQuestion._id,
        },
      });
      setInputValue("");
    }
  };
  console.log(messages, "messages");
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100vh",
        backgroundColor: "#e5ddd5",
        margin: "0 auto",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <Paper
        sx={{
          flex: 1,
          padding: 5,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#efeae2",
          overflowY: "auto",
        }}
        elevation={0}
      >
        <List>
          {messages.map((message, index) => (
            <ListItem
              key={index}
              sx={{
                justifyContent: message.sender === "user" ? "flex-end" : "flex-start",
                display: "flex",
              }}
            >
              <Box
                sx={{
                  maxWidth: "75%",
                  display: "flex",
                  flexDirection: "column",
                  padding: "8px 16px",
                  borderRadius: "10px",
                  color: message.sender === "user" ? "#fff" : "#000",
                  backgroundColor: message.sender === "user" ? "#4651d6" : "#fff",
                  alignSelf: message.sender === "user" ? "flex-end" : "flex-start",
                  wordBreak: "break-word",
                  boxShadow: "0 1px 2px rgba(0, 0, 0, 0.15)",
                  position: "relative",
                }}
              >
                <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
                  {message.text}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "4px",
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      fontSize: "10px",
                      color: message.sender === "user" ? "#fff" : "#888",
                      alignSelf: "flex-end",
                    }}
                  >
                    {formatTime(message.timeStamp!)}
                  </Typography>
                </Box>
              </Box>
            </ListItem>
          ))}
        </List>
      </Paper>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "8px",
          backgroundColor: "#f0f0f0",
          borderTop: "1px solid #ccc",
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
          placeholder="Type a message..."
          sx={{
            backgroundColor: "#fff",
            borderRadius: "20px",
            "& fieldset": { border: "none" },
          }}
        />
        <IconButton
          disabled={disabled}
          onClick={handleSendMessage}
          sx={{ marginLeft: 1 }}
          color="primary"
        >
          <SendIcon sx={{ color: "#4651d6" }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Chatbot;
