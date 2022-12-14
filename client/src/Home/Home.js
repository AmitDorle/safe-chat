import React from "react";
import axios from "axios";
import Message from "../Message/Message";
import { useState, useEffect } from "react";
import "./Home.css";

function Home() {
  const [messages, setMessages] = useState([]);
  const [currentUser, setcurrentUser] = useState([]);
  const [text, setText] = useState("");
  const [toEmail, setToEmail] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setcurrentUser(user);
    } else {
    }
    async function fetchData() {
      const response = await axios.get("/messages");
      console.log(response.data);
      setMessages(response.data);
    }
    fetchData();
  }, []);

  function logout() {
    localStorage.clear();
    window.location = "/Login";
  }

  async function sendMessage() {
    await axios.post("/send", {
      to: toEmail,
      from: currentUser.email,
      text: text,
    });
    window.location.reload();
    setText("");
  }
  return (
    <div>
      <div className="Dashboard-container" >
        <div>
          <h2 className="Greeting">Hello {currentUser.fullName} ✌️</h2>
        </div>
        <div>
          <button onClick={logout} className="logout-button">
            LogOut
          </button>
        </div>
      </div>
      <div className="chat-container">
        {messages.map((message) => {
          const type =
            currentUser.email === message.from ? "outgoing" : "incoming";
          return (
            <Message
              to={message.to}
              from={message.from}
              text={message.text}
              type={type}
            />
          );
        })}
      </div>
      <div className="message-typing-box">
        {/* <input
          type="text"
          placeholder="To Email"
          className="txt-box"
          onChange={(e) => {
            setToEmail(e.target.value);
          }}
        /> */}
        <input
          type="text" 
          placeholder="Enter Text"
          className="txt-box"
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <button onClick={sendMessage} className="Send-Button">
          <img className="send-img"
            src={process.env.PUBLIC_URL + "send.png"}
          ></img> 
        </button>
      </div>
    </div>
  );
}

export default Home;
