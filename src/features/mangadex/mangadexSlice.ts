import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState, AppThunk } from "../../app/store";

export interface mangadexState {
  token: string;
  response: string;
}

type LoginBody = {
  username: string;
  password: string;
};

const initialState: mangadexState = {
  token: "",
  response: "",
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
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

export const mangadexSlice = createSlice({
  name: "mangadex",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, () => {
        console.log("login pending");
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.response = action.payload;
        console.log("login success");
        //state.token = state.response.token.session;
      })
      .addCase(loginAsync.rejected, () => {
        console.log("failed to login");
      })
      .addCase(fetchFollowsAsync.pending, () => {
        console.log("fetchFollows pending");
      })
      .addCase(fetchFollowsAsync.fulfilled, (state, action) => {
        state.response += action.payload;
        console.log("fetchFollows success");
        //state.token = action.payload.token.session;
      })
      .addCase(fetchFollowsAsync.rejected, () => {
        console.log("failed to fetchFollows");
      });
  },
});

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.mangadex.value)`
//export const selectCount = (state: RootState) => state.mangadex.token;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default mangadexSlice.reducer;