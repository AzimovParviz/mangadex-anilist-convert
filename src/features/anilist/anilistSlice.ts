import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface anilistState {
  response: string;
}

const initialState: anilistState = {
  response: "",
};

type AnilistQueryBody = {
  token: string;
  manga_id: string;
  manga_status: string;
};

export interface StatusDictionary {
  [mangadexStatus: string]: string;
}

const anilistStatuses: StatusDictionary = {
  reading: "CURRENT",
  completed: "COMPLETED",
  plan_to_read: "PLANNING",
  dropped: "DROPPED",
  on_hold: "PAUSED",
};

export const updateMangaListAsync = createAsyncThunk(
  "anilist/mangalist",
  async (body: AnilistQueryBody) => {
    const config = {
      headers: {
        Authorization: "Bearer " + body.token,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    const mutation_query = `
	mutation($mediaId: Int, $status: MediaListStatus) { 
	    SaveMediaListEntry (mediaId: $mediaId, status: $status) {
		id
		status
	    }
	}	
	  `;
    //fetching AL id from Mangadex
    const mangadex_response = await axios.get(
      "https://api.mangadex.org/manga/" + body.manga_id
    );
    const variables = {
      mediaId: mangadex_response.data.data.attributes.links.al,
      status: anilistStatuses[body.manga_status],
    };
    const response = await axios.post(
      "https://graphql.anilist.co",
      {
        query: mutation_query,
        variables: variables,
      },
      config
    );
    return response.data;
  }
);

export const anilistSlice = createSlice({
  name: "anilist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateMangaListAsync.pending, () => {
        console.log("update manga list pending");
      })
      .addCase(updateMangaListAsync.fulfilled, (state, action) => {
        state.response += action.payload;
        console.log("update manga list success", state.response);
        //state.token = action.payload.token.session;
      })
      .addCase(updateMangaListAsync.rejected, (state, action) => {
        console.log("failed to update manga list", state, action);
      });
  },
});

export default anilistSlice.reducer;
