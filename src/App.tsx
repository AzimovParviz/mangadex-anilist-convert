import "./App.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "./app/hooks";
import { RootState } from "./app/store";
import {
  fetchFollowsAsync,
  fetchScoresAsync,
} from "./features/mangadex/mangadexSlice";

import LoginWithAnilist from "./components/LoginWithAnilist";
import LoginMangadex from "./components/LoginMangadex";
import { updateMangaListAsync } from "./features/anilist/anilistSlice";
import { sleep } from "./utils/sleep";
import { FollowsList } from "./types";

function App() {
  const [anilistToken, setAnilistToken] = useState("");
  const dispatch = useAppDispatch();
  const mangadexResponse = useSelector(
    (state: RootState) => state.mangadex.response
  ) as any;
  const mangadexFollows = useSelector(
    (state: RootState) => state.mangadex.follows
  );
  const mangadexScores = useSelector(
    (state: RootState) => state.mangadex.scores
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
        fetchScoresAsync({
          token: mangadexResponse.token.session,
          follows: [manga],
        })
      );
      dispatch(
        updateMangaListAsync({
          token: anilistToken,
          manga_id: manga,
          manga_status: follows.statuses[manga],
          scoreRaw: mangadexScores[manga]
            ? mangadexScores[manga]
            : 0,
        })
      );
      await sleep(1500); //we can do 90 requests per minute from 1 IP, so limiting the amount we send by sleeping
    }
  };

  console.log(
    "object keys mangadexFollows: ",
    Object.keys(mangadexFollows.statuses)
  );

  console.log("scores fetched: ", mangadexScores);

  return (
    <div className="App">
      {!anilistToken && <LoginWithAnilist />}
      {anilistToken && <p>Succesfully logged into AniList!</p>}
      {!mangadexResponse && anilistToken && <LoginMangadex />}
      {mangadexResponse && (
        <div>
          <button
            onClick={() =>
              dispatch(fetchFollowsAsync(mangadexResponse.token.session))
            }
          >
            Get follows
          </button>
        </div>
      )}
      {mangadexFollows && (
        <div>
          <button
            onClick={() =>
              dispatch(
                fetchScoresAsync({
                  token: mangadexResponse.token.session,
                  follows: Object.keys(mangadexFollows.statuses).slice(0, 100),
                })
              )
            }
          >
            Get scores (optional)
          </button>
          <button
            onClick={() => {
              //dispatch(fetchMangaId(id));
              commitMangaUpdates(mangadexFollows);
            }}
          >
            Upload your AniList with Mangadex entries (may take a while, do not close the page)
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
