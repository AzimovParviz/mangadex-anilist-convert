import { useState } from "react";
import { useSelector } from "react-redux";
import "./App.css";
import { useAppDispatch } from "./app/hooks";
import { RootState } from "./app/store";
import {
  fetchFollowsAsync,
  loginAsync,
} from "./features/mangadex/mangadexSlice";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const mangadexResponse = useSelector((state: RootState) => state.mangadex.response) as any;

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
      {mangadexResponse && (
        <button onClick={() => dispatch(fetchFollowsAsync(mangadexResponse.token.session))}>
          Get follows
        </button>
      )}
    </div>
  );
}

export default App;
