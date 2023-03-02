import "./App.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "./app/hooks";
import { RootState } from "./app/store";
import {
  fetchFollowsAsync,
  fetchMangaId,
} from "./features/mangadex/mangadexSlice";

import LoginWithAnilist from "./components/LoginWithAnilist";
import LoginMangadex from "./components/LoginMangadex";
import { updateMangaListAsync } from "./features/anilist/anilistSlice";

function App() {
  const [anilistToken, setAnilistToken] = useState("");
  const dispatch = useAppDispatch();
  const mangadexResponse = useSelector(
    (state: RootState) => state.mangadex.response
  ) as any;
  const mangadexFollows = useSelector(
    (state: RootState) => state.mangadex.follows
  );
  const selectedMangadexId = useSelector(
    (state: RootState) => state.mangadex.currentMangaId
  );

  useEffect(() => {
    const currentUrl = window.location.hash;
    const params: any = new URLSearchParams(currentUrl.substring(1));
    setAnilistToken(params.get("access_token"));
    console.log(anilistToken);
  }, [anilistToken]);

  useEffect(() => {}, [mangadexFollows]);

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
      {mangadexFollows &&
        Object.entries(mangadexFollows.statuses).map(([id, status]) => (
          <button
            key={id}
            onClick={() => {
              dispatch(fetchMangaId(id));
              dispatch(
                updateMangaListAsync({
                  token: anilistToken,
                  manga_id: selectedMangadexId, //from the selector. need to figure out dispatching cause this dispatch happens before selector refreshes
                  manga_status: status,
                })
              );
            }}
          >
            {id}
          </button>
        ))}
    </div>
  );
}

export default App;
