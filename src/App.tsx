import "./App.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "./app/hooks";
import { RootState } from "./app/store";
import {
  fetchFollowsAsync,
  FollowsList,
} from "./features/mangadex/mangadexSlice";

import LoginWithAnilist from "./components/LoginWithAnilist";
import LoginMangadex from "./components/LoginMangadex";
import { updateMangaListAsync } from "./features/anilist/anilistSlice";
import { sleep } from "./utils/sleep";

function App() {
  const [anilistToken, setAnilistToken] = useState("");
  const dispatch = useAppDispatch();
  const mangadexResponse = useSelector(
    (state: RootState) => state.mangadex.response
  ) as any;
  const mangadexFollows = useSelector(
    (state: RootState) => state.mangadex.follows
  );

  useEffect(() => {
    const currentUrl = window.location.hash;
    const params: any = new URLSearchParams(currentUrl.substring(1));
    setAnilistToken(params.get("access_token"));
    console.log(anilistToken);
  }, [anilistToken]);

  const commitMangaUpdates = async (follows: FollowsList) => {
    for (const manga in follows.statuses) {
      dispatch(
        updateMangaListAsync({
          token: anilistToken,
          manga_id: manga,
          manga_status: follows.statuses[manga],
        })
      );
      await sleep(500); //we can do 90 requests per minute from 1 IP, so limiting the amount we send by sleeping
    }
  };

  return (
    <div className="App">
      {!anilistToken && <LoginWithAnilist />}
      {anilistToken && <p>Succesfully logged into AniList!</p>}
      {!mangadexResponse && anilistToken && <LoginMangadex />}
      {mangadexResponse && (
        <button
          onClick={() =>
            dispatch(fetchFollowsAsync(mangadexResponse.token.session))
          }
        >
          Get follows
        </button>
      )}
      {mangadexFollows && (
        <button
          onClick={() => {
            //dispatch(fetchMangaId(id));
            commitMangaUpdates(mangadexFollows);
          }}
        >
          Upload your AniList with Mangadex entries
        </button>
      )}
    </div>
  );
}

export default App;
