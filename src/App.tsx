import React, {
  useContext,
  useEffect,
  useState,
  createContext,
  useRef,
} from "react";
import "./App.css";
import List from "./Components/List/Chatlist";
import Chat from "./Components/Chat/Chat";
import Details from "./Components/Details/Details";
import logo from "./assets/img/logo.png";
import { Link, Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import { Button } from "antd";
import { getUser, logout } from "./helpers/helper";
import Chatlist from "./Components/List/Chatlist";

export const LogoComponent = () => {
  return (
    <div className="h-[20px] auto m-5 flex items-center justify-center">
      <img src={logo} className="h-10" alt="logo"></img>
    </div>
  );
};

export const dataContext = createContext({});

function App() {
  const [type, setType] = useState("signIn");
  const [chatId, setChatId]: any = useState(null);
  const [addChatUser, setChatuser]: any = useState(null);

  const handleOnClick = (text: any) => {
    if (text !== type) {
      setType(text);
      return;
    }
  };

  const refreshChat = (userData: number) => {
    setChatId(userData);
  };

  useEffect(() => {
    console.log("loaded");
  }, []);

  const containerClass =
    "appContainer " + (type === "signUp" ? "right-panel-active" : "");

  return (
    <>
      {!getUser() ? (
        <div className="h-[100vh]">
          <div className={containerClass} id="container">
            <Routes>
              {/*  {type == "signIn" ? ( */}
              <Route
                path="/"
                element={<Login changeType={handleOnClick}></Login>}
              ></Route>
              {/*      ) : ( */}
              <Route
                path="/register"
                element={<Register changeType={handleOnClick}></Register>}
              ></Route>
              {/*  )} */}
            </Routes>
            <div className="overlay-container hidden lg:block">
              <div className="overlay">
                <div className="overlay-panel overlay-left">
                  <h1 className="text-[50px]">Welcome Back!</h1>
                  <p className="text-[20px] mt-2">
                    To keep connected with us please login with your personal
                    info :)
                  </p>
                  <Link to="/">
                    <Button
                      className="bg-sbutton w-[100px] border-dullwhite mt-5"
                      type="primary"
                      size="large"
                      id="signIn"
                      onClick={() => handleOnClick("signIn")}
                    >
                      Sign In
                    </Button>
                  </Link>
                </div>
                <div className="overlay-panel overlay-right">
                  <h1 className="text-[50px]">Hello, Friend!</h1>
                  <p className="text-[20px] mt-2">
                    Don't have an account? Click on Sign Up below and get one :)
                  </p>
                  <Link to="/register">
                    <Button
                      className="bg-sbutton w-[100px] border-dullwhite mt-5"
                      type="primary"
                      size="large"
                      id="signUp"
                      onClick={() => handleOnClick("signUp")}
                    >
                      Sign Up
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <Routes>
            <Route
              path="/home"
              element={
                <div className="chatBody">
                  <div className="container flex">
                    <dataContext.Provider
                      value={{ setChatuser, refreshChat, addChatUser }}
                    >
                      <Chatlist />
                      <Chat chatId={chatId} />
                      <Details />
                    </dataContext.Provider>
                  </div>
                </div>
              }
            ></Route>
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
