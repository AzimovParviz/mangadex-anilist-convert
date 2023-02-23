import { useState } from "react";
import "./App.css";
import { useAppDispatch } from "./app/hooks";
import { loginAsync } from "./features/mangadexLogin/mangadexLoginSlice";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();

  const handleUsernameChange = (e: any) => {
    setUsername((e.target as HTMLInputElement).value);
  };
  const handlePasswordChange = (e: any) => {
    setPassword((e.target as HTMLInputElement).value);
  };
  return (
    <div className="App">
      <input
        type="text"
        placeholder="enter your mangadex username"
        onChange={(e) => handleUsernameChange(e)}
      ></input>
      <input
        type="password"
        placeholder="enter your mangadex password"
        onChange={(e) => handlePasswordChange(e)}
      ></input>
      <button
        onClick={() =>
          dispatch(
            loginAsync({
              username: username,
              password: password,
            })
          )
        }
      >
        Login to Mangadex
      </button>
    </div>
  );
}

export default App;
