import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Home = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");

  const generateUid = (e) => {
    e.preventDefault();
    setRoomId(uuid());
    toast.success("Created a new room.");
  };

  const joinRoom = () => {
    if (!roomId || !username) {
      toast.error("Room ID and Username required.");
      return;
    }
    navigate(`/editor/${roomId}`, {
      state: {
        username,
      },
    });
  };

  const handleEnterPressed = (e) => {

    if (e.code === "Enter") {
      joinRoom();
    }
  };

  return (
    <div className="flex flex-col h-screen justify-center">
      <div className="flex justify-center">
        <div className="bg-gray-800 px-10 pt-10 rounded-md max-w-[400px] ">
          <div className="logo-container">
            <img
              width={120}
              height={100}
              src="/wecode_logo.png"
              alt="logo-we.code"
              className=" text-black mb-4 logo"
            />
          </div>
          <p className="mt-6 text-xl">Paste invitation Room ID</p>
          <Input
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            onKeyUp={handleEnterPressed}
            type="text"
            placeholder="Room ID"
          />
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyUp={handleEnterPressed}
            type="text"
            placeholder="Username"
          />
          <div className="flex justify-end">
            <Button
              cn="text-white bg-purple-900"
              type="button"
              buttonName="Join Room"
              onClick={joinRoom}
            />
          </div>
          <div className="flex justify-center my-6">
            <p className="text-xs">
              If you don't have an invite, then create a{" "}
              <a
                href=""
                onClick={generateUid}
                className="text-base text-purple-600 no-underline cursor-pointer hover:text-purple-800"
              >
                new room
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
