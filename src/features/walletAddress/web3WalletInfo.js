import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  walletAddress: 0,
  saveMainUserAddress: 0,
  userId: 0,
  logsContractAddress: "0x1B172920876E2799b5Efd4Ff4B7AcAd5239285d9",
  mainContractAddress: "0x5F32aED3bb6FFcb914990301A5645F5446b0e24c",
  contractAddress: "0x10a6f863280d3e6Ab1e96342f02a6701Ac0F48FF",
  previousContractAddressOne: "0x3e776377f66c92a79ac506f838f95cb5ecc78e4c",
  previousContractAddressTwo: "0x2218A3671708dA22DE2e1b5cE6afc523Bc824118",
  isWalletConnected: false,
  isAdminConnected: false,
  baseUrl: "https://bullbnb.com/old_website/opbullbnb/",
};

const walletAddressSlice = createSlice({
  name: "walletaddress",
  initialState,
  reducers: {
    setAddress: (state, action) => {
      state.walletAddress = action.payload;
    },
    removeAddress: (state) => {
      state.walletAddress = 0;
    },
    setId: (state, action) => {
      state.userId = action.payload;
    },
    removeId: (state) => {
      state.userId = 0;
    },
    isConnected: (state, action) => {
      state.isWalletConnected = action.payload;
    },
    saveMainUser: (state, action) => {
      state.saveMainUserAddress = action.payload;
    },
    isAdmin: (state, action) => {
      state.isAdminConnected = action.payload;
    },
  },
});

export const {
  setAddress,
  setId,
  saveMainUser,
  removeId,
  removeAddress,
  isConnected,
  isAdmin,
} = walletAddressSlice.actions;

export default walletAddressSlice.reducer;
