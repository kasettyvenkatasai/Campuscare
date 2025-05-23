
import React, { useEffect, useState } from "react";
import "./vernav.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { decodeToken } from "react-jwt";

function Vernavstud() {
  const [gmail, setgmail] = useState("");
  const [college, setclg] = useState("");
  const [activeLink, setActiveLink] = useState("/studenthome"); // Set the default active link here.

  useEffect(() => {
    const userDetails = Cookies.get("userdetails");
    const token = Cookies.get("Uid2");

    console.log(userDetails);
    console.log(token);

    if (userDetails) {
      const parsedDetails = JSON.parse(userDetails);
      console.log(parsedDetails.gmail);
      setgmail(parsedDetails.gmail);
      setclg(parsedDetails.college);
    } else if (token) {
      try {
        const decoded = decodeToken(token);
        console.log(decoded);
        setgmail(decoded.gmail);
        setclg(decoded.clg);
      } catch (error) {
        console.error("Token verification failed:", error);
      }
    } else {
      console.log("No user details or token found");
    }
  }, []);

  const navigate = useNavigate();

  function logout() {
    Cookies.remove("userdetails");
    Cookies.remove("Uid2");
    window.location.href = "/";
  }

  // Function to handle active link
  const handleActiveLink = (path) => {
    setActiveLink(path);
  };

  return (
    <div>
      <div className="Svernav">
        <div className="Slogo">
          <div className="Suserdetail">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="Sbi bi-person-heart"
              viewBox="0 0 16 16"
            >
              <path d="M9 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h10s1 0 1-1-1-4-6-4-6 3-6 4m13.5-8.09c1.387-1.425 4.855 1.07 0 4.277-4.854-3.207-1.387-5.702 0-4.276Z" />
            </svg>
            <div className="Stextpart" style={{ margin: "0", padding: "0" }}>
              <p style={{ margin: "0" }}>{gmail.split("@")[0]}</p>
              <p id="Semai" style={{ margin: "0" }}>{gmail}</p>
            </div>
          </div>
          <button onClick={logout} id="Slogout">
            log out
          </button>
        </div>
        <div className="Snavbar">
          <ul className="Sul" style={{ paddingLeft: "0" }}>
            <li className="Sele"  style={{  borderRight:  activeLink === "/studenthome" ? "5px solid snow" : "none", }}  >
              <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="Sbi bi-house" viewBox="0 0 16 16" >
                <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
              </svg>
              <Link  to="/studenthome"  id="Shome"  onClick={() => handleActiveLink("/studenthome")} > Home </Link>
            </li>
            <li className="Sele" style={{ borderRight: activeLink === "/studentappointment" ? "5px solid snow" : "none", }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16" height="16" fill="currentColor" className="Sbi bi-clipboard2-plus" viewBox="0 0 16 16" >
                <path d="M9.5 0a.5.5 0 0 1 .5.5.5.5 0 0 0 .5.5.5.5 0 0 1 .5.5V2a.5.5 0 0 1-.5.5h-5A.5.5 0 0 1 5 2v-.5a.5.5 0 0 1 .5-.5.5.5 0 0 0 .5-.5.5.5 0 0 1 .5-.5z" />
                <path d="M3 2.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 0 0-1h-.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1H12a.5.5 0 0 0 0 1h.5a.5.5 0 0 1 .5.5v12a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5z" />
                <path d="M8.5 6.5a.5.5 0 0 0-1 0V8H6a.5.5 0 0 0 0 1h1.5v1.5a.5.5 0 0 0 1 0V9H10a.5.5 0 0 0 0-1H8.5z" />
              </svg>
              <Link to="/studentappointment" id="Sappointment" onClick={() => handleActiveLink("/studentappointment")} >Book Appointment </Link>
            </li>
            <li className="Sele" style={{ borderRight: activeLink === "/studentschedule" ? "5px solid snow" : "none", }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="Sbi bi-clipboard2-pulse" viewBox="0 0 16 16">
                        <path d="M9.5 0a.5.5 0 0 1 .5.5.5.5 0 0 0 .5.5.5.5 0 0 1 .5.5V2a.5.5 0 0 1-.5.5h-5A.5.5 0 0 1 5 2v-.5a.5.5 0 0 1 .5-.5.5.5 0 0 0 .5-.5.5.5 0 0 1 .5-.5z"/>
                        <path d="M3 2.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 0 0-1h-.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1H12a.5.5 0 0 0 0 1h.5a.5.5 0 0 1 .5.5v12a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5z"/>
                        <path d="M9.979 5.356a.5.5 0 0 0-.968.04L7.92 10.49l-.94-3.135a.5.5 0 0 0-.926-.08L4.69 10H4.5a.5.5 0 0 0 0 1H5a.5.5 0 0 0 .447-.276l.936-1.873 1.138 3.793a.5.5 0 0 0 .968-.04L9.58 7.51l.94 3.135A.5.5 0 0 0 11 11h.5a.5.5 0 0 0 0-1h-.128z"/>
                      </svg>
                    <Link to="/studentschedule" id="Sschedule" onClick={() => handleActiveLink("/studentschedule")}>History</Link>
                </li>
                <li className="Sele" style={{ borderRight: activeLink === "/studentbooking" ? "5px solid snow" : "none", }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="Sbi bi-bookmark" viewBox="0 0 16 16">
                        <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z"/>
                      </svg>
                    <Link to="/studentbooking" id="Sbookings" onClick={() => handleActiveLink("/studentbooking")}>upcoming sessions</Link>
                </li>
                <li className="Sele" style={{ borderRight: activeLink === "/leave" ? "5px solid snow" : "none", }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar-minus" viewBox="0 0 16 16">
  <path d="M5.5 9.5A.5.5 0 0 1 6 9h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5"/>
  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
</svg>
                    <Link to="/leave" id="Ssettings"onClick={() => handleActiveLink("/leave")}>Leaves</Link>
                </li>  
                                <li className="Sele" style={{  borderRight:  activeLink === "/Stundetchat" ? "5px solid snow" : "none", }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-left-text" viewBox="0 0 16 16">
                  <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                  <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6m0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5"/>
                  </svg>
                                    <Link to="/Stundetchat" id="Schat" onClick={() => handleActiveLink("/Stundetchat")}>Chat</Link>
                                </li>
                <li className="Sele" style={{ borderRight: activeLink === "/studentsetting" ? "5px solid snow" : "none", }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="Sbi bi-gear" viewBox="0 0 16 16">
                        <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0"/>
                        <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z"/>
                      </svg>
                    <Link to="/studentsetting" id="Ssettings"onClick={() => handleActiveLink("/studentsetting")}>Settings</Link>
                </li>  

            
          </ul>
        </div>
        <div className="Siiit">
          <div className="Suserdetail">
            <div
              className="Stextpart"
              style={{ display: "flex", alignItems: "center" }}
            >
              <p style={{ paddingLeft: "1px" }}>{college.toUpperCase()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Vernavstud