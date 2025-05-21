import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface Character {
  id: number;
  name: string;
  image: string;
}

interface CharactersState {
  data: Character[];
  loading: boolean;
  error: string | null;
}

const initialState: CharactersState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchCharacters = createAsyncThunk(
  "characters/fetchCharacters",
  async () => {
    const response = await axios.get(
      "https://rickandmortyapi.com/api/character"
    );
    return response.data.results as Character[];
  }
);

const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default charactersSlice.reducer;
