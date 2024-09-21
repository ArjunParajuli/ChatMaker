import { useEffect, useState, useMemo } from "react";
import { io } from "socket.io-client";
import Main from "./components/Main";
import { Button, Container, Typography } from "@mui/material";

function App() {
  const [msg, setMsg] = useState("");
  const [socketId, setSocketId] = useState("");
  const [roomId, setRoomId] = useState("");
  const [msgs, setMsgs] = useState([]);
  const [isGroupChat, setIsGroupChat] = useState(0);
  const [roomName, setRoomName] = useState("");

  const socket = useMemo(() => {
    return io("http://localhost:4000/");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", { msg, roomId });
  };

  const handleJoinGroup = (e) => {
    e.preventDefault();
    socket.emit("join-room", roomName);
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected user: ", socket.id);
      setSocketId(socket.id);
    });

    socket.on("received-msg", (msg) =>
      console.log("Message for ", socket.id, msg)
    );

    socket.on("dm", (msg) => {
      setMsgs((prev) => [...prev, msg]);
    });

    return () => {
      socket.disconnect(socket);
    };
  }, []);

  

  return (
    <>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Typography level="h1" sx={{ marginBottom: "20px", fontSize: "2rem" }}>
          Welcome to ChatMaker
        </Typography>

        <Button
          variant="contained"
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
          onClick={() => setIsGroupChat((prev) => !prev)}
        >
          {!isGroupChat ? "Enter Group Chat" : "Exit Group Chat"}
        </Button>
        
          <Main
            msg={msg}
            setMsg={setMsg}
            msgs={msgs}
            socketId={socketId}
            roomId={roomId}
            setRoomId={setRoomId}
            handleSubmit={handleSubmit}
            isGroupChat={isGroupChat}
            roomName={roomName}
            setRoomName={setRoomName}
            handleJoinGroup={handleJoinGroup}
          />
      
      </Container>
    </>
  );
}

export default App;
