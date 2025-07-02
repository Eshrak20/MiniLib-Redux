import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  task: {
    id: "tt",
    title: "www",
    description: "awdawd",
  },
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
});

export default taskSlice.reducer;