import './App.css'
import { useState } from 'react';
import { io } from 'socket.io-client'
import Chat from './Chat';

const END_POINT_LOCAL = "http://localhost:3001";
const END_POINT = "https://mychat11.onrender.com"

const socket = io.connect(END_POINT);

// emit refers to triggering an event.
socket.emit('connection', 'Hello there from client');

function App() {

  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {

      // emit the join_room and sending data to the server.
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="John..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>

  )
}

export default App;
