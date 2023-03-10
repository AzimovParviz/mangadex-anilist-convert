import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { LoginBody, mangadexState, ScoreBody } from "../../types";

const initialState: mangadexState = {
  token: "",
  response: "",
  currentMangaId: "",
  follows: {
    result: "",
    statuses: {
      "": "",
    },
  },
  scores: {
    result: "",
    ratings: {
      "": {
        rating: 50,
      },
    },
  },
};

export const loginAsync = createAsyncThunk(
  "mangadex/login",
  async (credentias: LoginBody) => {
    const response = await axios.post(
      "https://api.mangadex.org/auth/login",
      credentias
    );
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchFollowsAsync = createAsyncThunk(
  "mangadex/follows",
  async (token: string) => {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const response = await axios.get(
      "https://api.mangadex.org/manga/status",
      config
    );
    return response.data;
  }
);

export const fetchScoresAsync = createAsyncThunk(
  "mangadex/rating",
  async (body: ScoreBody) => {
    const config = {
      headers: {
        Authorization: "Bearer " + body.token,
      },
      params: {
	manga: body.follows,
      }
    };
    const response = await axios.get("https://api.mangadex.org/rating", config);
    return response.data;
  }
);

export const fetchMangaId = createAsyncThunk(
  "mangadex/manga",
  async (mangaId: string) => {
    const response = await axios.get(
      "https://api.mangadex.org/manga/" + mangaId
    );
    return response.data;
  }
);

export const mangadexSlice = createSlice({
  name: "mangadex",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, () => {
        console.log("mangadex login pending");
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.response = action.payload;
        console.log("mangadex login success");
      })
      .addCase(loginAsync.rejected, () => {
        console.log("mangadex failed to login");
      })
      .addCase(fetchFollowsAsync.pending, () => {
        console.log("fetchFollows pending");
      })
      .addCase(fetchFollowsAsync.fulfilled, (state, action) => {
        state.follows = action.payload;
        console.log("fetchFollows success");
      })
      .addCase(fetchFollowsAsync.rejected, () => {
        console.log("failed to fetchFollows");
      })
      .addCase(fetchMangaId.pending, () => {
        console.log("fetch manga id pending");
      })
      .addCase(fetchMangaId.fulfilled, (state, action) => {
        state.currentMangaId = action.payload.data.attributes.links.al;
        console.log("fetch manga id success: ", state.currentMangaId);
      })
      .addCase(fetchMangaId.rejected, () => {
        console.log("failed to fetch manga id", );
      })
      .addCase(fetchScoresAsync.pending, () => {
        console.log("fetch mangadex scores pending");
      })
      .addCase(fetchScoresAsync.fulfilled, (state, action) => {
        state.scores = action.payload.data;
        console.log("fetch mangadex scores success: ", state.scores);
      })
      .addCase(fetchScoresAsync.rejected, (action) => {
        console.log("failed to fetch mangadex scores", action);
      });
  },
});

export default mangadexSlice.reducer;
