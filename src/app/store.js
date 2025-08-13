import { configureStore } from "@reduxjs/toolkit";
import walletReducer from "../features/walletAddress/web3WalletInfo";
import modalReducer from "../features/copyModal/copyModalVisiblilty";
import dashboardReducer from "../features/dashboardData/dashboardDataInfo";

export const store = configureStore({
  reducer: {
    accountDetails: walletReducer,
    modalVisibility: modalReducer,
    dashboardData: dashboardReducer,
  },
});
