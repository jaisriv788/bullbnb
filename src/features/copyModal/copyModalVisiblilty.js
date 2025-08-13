import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCopyModalVisible: false,
  isScreenLoaderVisible: false,
  isTodayEarningModalVisible: false,
};

const modalVisibilitySlice = createSlice({
  name: "modalVisible",
  initialState,
  reducers: {
    copyModalVisibilty: (state, action) => {
      state.isCopyModalVisible = action.payload;
    },
    screenLoaderVisibilty: (state, action) => {
      state.isScreenLoaderVisible = action.payload;
    },
    todayEarningVisibility: (state, action) => {
      state.isTodayEarningModalVisible = action.payload;
    },
  },
});

export const {
  copyModalVisibilty,
  screenLoaderVisibilty,
  todayEarningVisibility,
} = modalVisibilitySlice.actions;

export default modalVisibilitySlice.reducer;
