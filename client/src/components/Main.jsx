import React from "react";
import { Container, Typography, TextField, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CommentIcon from "@mui/icons-material/Comment";
import IconButton from "@mui/material/IconButton";

const Main = ({
  msg,
  setMsg,
  msgs,
  socketId,
  roomId,
  setRoomId,
  handleSubmit,
  isGroupChat,
  roomName,
  setRoomName,
  handleJoinGroup
}) => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >

      {/* for group chat */} 
      {isGroupChat && (
        <form onSubmit={handleJoinGroup} style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <h5>Join Room</h5>
          <TextField
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            id="outlined-basic"
            label="Group Name"
            variant="outlined"
          />
          <Button type="submit" variant="contained" color="primary">
            Join Group
          </Button>
        </form>
      )}


      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "80vh",
        }}
      >
        <Typography level="h1" sx={{ marginBottom: "20px" }}>
          Your Id: {socketId}
        </Typography>

        <TextField
          id="outlined-basic"
          label="Send To"
          variant="outlined"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          sx={{ marginBottom: "10px", width: "300px" }}
        />

        <TextField
          id="outlined-basic"
          label="Enter Message"
          variant="outlined"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          sx={{ marginBottom: "10px", width: "300px" }}
        />

        <Button variant="contained" endIcon={<SendIcon />} type="submit">
          Send
        </Button>
      </form>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {msgs.map((value, i) => (
          <ListItem
            key={i}
            disableGutters
            secondaryAction={
              <IconButton aria-label="comment">
                <CommentIcon />
              </IconButton>
            }
          >
            <ListItemText primary={value} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Main;
