import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCopyModalVisible: false,
  isScreenLoaderVisible: false,
  isTodayEarningModalVisible: false,
  isTotalEarningModalVisible: false,
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
    totalEarningVisibility: (state, action) => {
      state.isTotalEarningModalVisible = action.payload;
    },
  },
});

export const {
  copyModalVisibilty,
  screenLoaderVisibilty,
  todayEarningVisibility,
  totalEarningVisibility,
} = modalVisibilitySlice.actions;

export default modalVisibilitySlice.reducer;
