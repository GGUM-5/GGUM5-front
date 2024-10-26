import React, { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import RoomBox from "../components/RoomBox";
import ScheduleModal from "../components/ScheduleModal";
import axiosInstance from "../axiosConfig";
import "../css/pages/v2.css";

const V2 = () => {
  const [selectedRoom, setSelectedRoom] = useState(null); // Data for selected room
  const [highlightedRooms, setHighlightedRooms] = useState([]); // Highlighted room list

  // Fetch highlighted rooms on page load
  useEffect(() => {
    const fetchHighlightedRooms = async () => {
      try {
        const response = await axiosInstance.post("/api/classroom", {
          buildingName: 'V', // Building name
          floor: 2,          // Floor level
          day: '월',         // Example day, update as necessary
          hour: 13,          // Example hour, update as necessary
        });
        setHighlightedRooms(response.data.classrooms);
      } catch (error) {
        console.error("Error fetching highlighted rooms:", error);
      }
    };

    fetchHighlightedRooms();
  }, []);

  // Fetch room schedule when a room is clicked
  const handleRoomClick = async (room) => {
    try {
      const response = await axiosInstance.post("/api/roomSchedule", {
        buildingName: 'V',
        classroomNumber: room.substring(1), // Extract the numeric part
        day: '월',                           // Example day
        hour: 11,                            // Example hour
      });
      setSelectedRoom(response.data); // Store fetched schedule in state
    } catch (error) {
      console.error("Error fetching room schedule:", error);
    }
  };

  const closeModal = () => {
    setSelectedRoom(null);
  };

  return (
    <>
      <Navbar title="빈강의실" />
      <div className="v1_container">
        <div className="border-marker marker-nicols marker-bottom-center-nicols">니콜스관</div>
        <div className="border-marker marker-red marker-center-right"></div>

        {/* Left column */}
        <div className="room-column room-column-left">
          <RoomBox
            text="V212"
            onClick={() => handleRoomClick("V212")}
            className={highlightedRooms.includes(parseInt("212")) ? "room-box-highlight" : ""}
          />
          <div style={{ marginInline: "50px" }}></div>
          <div style={{ marginInline: "50px" }}></div>
          <RoomBox
            text="V213"
            onClick={() => handleRoomClick("V213")}
            className={highlightedRooms.includes(parseInt("213")) ? "room-box-highlight" : ""}
          />
        </div>

        {/* Centered text */}
        <div className="centered-text">
          <span>비</span>
          <span>루</span>
          <span>투</span>
          <span>스</span>
          <span>2</span>
          <span>층</span>
        </div>

        {/* Right column */}
        <div className="room-column room-column-right">
          <RoomBox
            text="V212"
            onClick={() => handleRoomClick("V212")}
            className={highlightedRooms.includes(parseInt("212")) ? "room-box-highlight" : ""}
          />
          <RoomBox
            text="V112"
            onClick={() => handleRoomClick("V112")}
            className={highlightedRooms.includes(parseInt("112")) ? "room-box-highlight" : ""}
          />
        </div>
      </div>

      {/* Exit and stairs labels */}
      <div className="label-container">
        <div className="label label-exit"></div>
        <span className="label-text">입출구</span>
        <div className="label label-stairs" style={{ marginLeft: "20px" }}></div>
        <span className="label-text">계단</span>
      </div>

      <div style={{ marginBottom: "30px" }}></div>

      {selectedRoom && <ScheduleModal schedule={selectedRoom} onClose={closeModal} />}
    </>
  );
};

export default V2;
