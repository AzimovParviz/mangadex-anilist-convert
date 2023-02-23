import "./App.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "./app/hooks";
import { RootState } from "./app/store";
import {
  fetchFollowsAsync,
  loginAsync,
} from "./features/mangadex/mangadexSlice";

import LoginWithAnilist from "./components/loginWithAnilist";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [anilistToken, setAnilistToken] = useState("");
  const dispatch = useAppDispatch();
  const mangadexResponse = useSelector(
    (state: RootState) => state.mangadex.response
  ) as any;

  const handleUsernameChange = (e: any) => {
    setUsername((e.target as HTMLInputElement).value);
  };
  const handlePasswordChange = (e: any) => {
    setPassword((e.target as HTMLInputElement).value);
  };

  useEffect(() => {
    const currentUrl = window.location.hash;
    const params: any = new URLSearchParams(currentUrl.substring(1));
    setAnilistToken(params.get("access_token"));
    console.log(anilistToken);
  }, [anilistToken]);

  return (
    <div className="App">
      {!anilistToken && <LoginWithAnilist />}
      {anilistToken && <p>Succesfully logged into AniList!</p>}
      {!mangadexResponse && (
        <div>
          <input
            type="text"
            placeholder="Enter your mangadex username"
            onChange={(e) => handleUsernameChange(e)}
          ></input>
          <input
            type="password"
            placeholder="Enter your mangadex password"
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
      )}
      {mangadexResponse && (
        <button
          onClick={() =>
            dispatch(fetchFollowsAsync(mangadexResponse.token.session))
          }
        >
          Get follows
        </button>
      )}
    </div>
  );
}

export default App;
