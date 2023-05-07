import { useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { loginAsync } from "../../features/mangadex/mangadexSlice";

export default function LoginMangadex() {
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleUsernameChange = (e: any) => {
    setUsername((e.target as HTMLInputElement).value);
  };
  const handlePasswordChange = (e: any) => {
    setPassword((e.target as HTMLInputElement).value);
  };
  return (
    <div id="mangadexLoginBody">
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
        className="loginMangadex"
        type="submit"
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
