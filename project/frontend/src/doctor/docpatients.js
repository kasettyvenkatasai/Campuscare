import React, { useState, useEffect } from "react";
import "./docpatients.css";
import Ptmain from  './ptmain'
import Cookies from 'js-cookie';
import { useJwt ,decodeToken} from "react-jwt";
import axios from 'axios'
function Docpatients() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [patients,setpatients] =useState([])

  // Toggle Dropdown Visibility
  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  // Update Date and Time
  useEffect(()=>{
    const fetchData = () => {
        const userDetails = Cookies.get('userdetails');
        const token = Cookies.get('Uid1');
        let email 
    
        if (userDetails) {
          const parsedDetails = JSON.parse(userDetails);
          email = parsedDetails.gmail;
        } else if (token) {
          try {
            const decoded = decodeToken(token);
            email = decoded.gmail;
          } catch (error) {
            console.error("Token verification failed:", error);
          }
        }
    
        if (email) {
          axios
            .post('http://localhost:3020/getpatients', { email:email })
            .then((response) => {
              setpatients(response.data.patients);
              console.log(response.data.patients)

            })
            .catch((error) => {
              console.error("Error fetching appointments:", error);
            });
        }
      };
    
      // Fetch immediately
      fetchData();
    
      // Set up polling
      const interval = setInterval(fetchData, 5000); // Poll every 5 seconds
    
      // Cleanup on unmount
      return () => clearInterval(interval);
  },[])
  useEffect(() => {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    setDate(formattedDate);

    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const meridiem = hours >= 12 ? "PM" : "AM";

      hours = hours % 12 || 12;
      const timeString = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2, "0")} ${meridiem}`;
      setTime(timeString);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const inputData = Array.from(formData.entries()).map(([key, value]) => ({ key, value }));
    console.log(inputData);
  };

  return (
    <div>
     
      <div className="DPnonnavbar" style={{ marginLeft: "0px", zIndex: "-10" }}>
        {/* Header Section */}
        <div className="DPhornav">
          <div className="DPsessions" style={{ marginTop: "2%" }}>
            <div className="DPtextpart1">
              <div className="DPtextdiv">
                <p style={{ fontSize: "30px", marginBottom: "0%", color:"snow"}}>Patients List</p>
              </div>
              <div className="DPimgdiv">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-person-lines-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Date and Time Section */}
          <div className="DPdates">
            <div className="DPtext">
              <div className="DPdate" style={{ margin: "0", padding: "0" }}>
                <p id="DPdate" style={{ textAlign: "end", margin: "0",color:"#0A7273",fontSize:"30px" }}>{date} </p>
                <p id="DPtime" style={{ margin: "0",color:"#0A7273" ,fontSize:"30px"}}>{time}</p></div>
              <div className="DPicon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="DPbi bi-calendar-check"
                  viewBox="0 0 16 16"
                >
                  <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0" />
                  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Form Section */}
        {console.log(patients)}
        {patients.map((patient,ind)=><Ptmain det={patient} key={ind}/>)}
        
      </div>
    </div>
  );
}

export default Docpatients;