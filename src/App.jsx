// App.jsx
import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import { Routes, Route } from "react-router";
import { useMatch } from "react-router";
//Redux
import {
  isConnected,
  setAddress,
  saveMainUser,
  isAdmin,
  setId,
} from "./features/walletAddress/web3WalletInfo";
import { setUserData } from "./features/dashboardData/dashboardDataInfo";
import { useDispatch, useSelector } from "react-redux";
//components
import Sidebar from "./component/Sidebar";
import Navbar from "./component/Navbar";
import AdminNavbar from "./component/AdminNavbar";
import ProtectedRoute from "./component/ProtectedRoute";
import PublicRoute from "./component/PublicRoute";
import LandingNavbar from "./component/LandingNavbar";
import CopyModel from "./component/CopyModel";
import ScreenLoader from "./component/ScreenLoader";
import TodayEarning from "./component/TodayEarning";
import DetailsPage from "./component/matrixTree/DetailsPage";
//screens
import Profile from "./screens/Profile";
import PromoPdf from "./screens/PromoPdf";
import Reviews from "./screens/Reviews";
import Certificate from "./screens/Certificate";
import TotalLostBonus from "./screens/TotalLostBonus";
import RewardWall from "./screens/RewardWall";
import Token from "./screens/Token";
import Game from "./screens/Game";
import Faqs from "./screens/Faq";
import Support from "./screens/Support";
import LandingPage from "./screens/LandingPage";
import Login from "./screens/Login";
import AdminLogin from "./screens/AdminLogin";
import Registration from "./screens/Registration";
import Dashboard from "./screens/Dashboard";
import Download from "./screens/Download";
import CryptoCluster from "./screens/CryptoCluster";
//team
import MyTree from "./screens/Team/MyTree";
import DirectPartner from "./screens/Team/DirectPartner";
import NetworkPartner from "./screens/Team/NetworkPartner";
import MatrixTree from "./screens/Team/MatrixTree";
//income
import DirectKickBonus from "./screens/Income/DirectKickBonus";
import LevelBonus from "./screens/Income/LevelBonus";
import LuxuryBonus from "./screens/Income/LuxuryBonus";
import PoolBonus from "./screens/Income/PoolBonus";
import SponsorBonus from "./screens/Income/SponsorBonus";
import LuxuryBonusDetails from "./screens/Income/LuxuryBonusDetails";
//academy
import Calculator from "./screens/Academy/Calculator";
import TutorialVideo from "./screens/Academy/TutorialVideo";
//admin
import AdminDashboard from "./screens/Admin/AdminDashboard";
import ProtectedAdminRoute from "./component/ProtectedAdminRoute";
import LogActivities from "./screens/Admin/LogActivities";
import RankAchiever from "./screens/Admin/RankAchiever";
import TopDirectList from "./screens/Admin/TopDirectList";
import TopEarnerList from "./screens/Admin/TopEarnerList";
import UserList from "./screens/Admin/UserList";
import PartnerSponsorBonus from "./screens/Admin/Income/PartnerSponsorBonus";
import PartnerPoolBonus from "./screens/Admin/Income/PartnerPoolBonus";
import PartnerLuxuryBonus from "./screens/Admin/Income/PartnerLuxuryBonus";
import PartnerLevelBonus from "./screens/Admin/Income/PartnerLevelBonus";
import PartnerDirectKickBonus from "./screens/Admin/Income/PartnerDirectKickBonus";

function App() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [rehydrated, setRehydrated] = useState(false);

  const dispatch = useDispatch();
  const isCertificatePage = useMatch("/certificate/:name/:rank/:earning");

  function handleSidebar(val) {
    setOpenSidebar(val);
  }

  const isWalletConnected = useSelector(
    (state) => state.accountDetails.isWalletConnected
  );

  const isAdminConnected = useSelector(
    (state) => state.accountDetails.isAdminConnected
  );

  const showCopyModal = useSelector(
    (state) => state.modalVisibility.isCopyModalVisible
  );

  const showScreenLoader = useSelector(
    (state) => state.modalVisibility.isScreenLoaderVisible
  );

  const showTodayEarnginModal = useSelector(
    (state) => state.modalVisibility.isTodayEarningModalVisible
  );

  useEffect(() => {
    const walletConnected = sessionStorage.getItem("walletConnected");
    const walletConnectedBackup = sessionStorage.getItem("walletAddressBackup");
    const walletAddress = sessionStorage.getItem("walletAddress");
    const dashboardData = sessionStorage.getItem("dashboardData");
    const id = sessionStorage.getItem("id");
    const isAdminPresent = sessionStorage.getItem("isAdmin");
    if (isAdminPresent) {
      dispatch(isAdmin(true));
      dispatch(setAddress(walletAddress));
      dispatch(saveMainUser(walletConnectedBackup));
    }
    if (walletConnected && walletAddress) {
      dispatch(setAddress(walletAddress));
      dispatch(saveMainUser(walletConnectedBackup));
      dispatch(isConnected(walletConnected));
      dispatch(setUserData(JSON.parse(dashboardData)));
      dispatch(setId(Number(id)));
    }

    setRehydrated(true);
  }, []);

  useEffect(() => {
    // console.log({ isAdminConnected });
    // console.log({ isWalletConnected });
    const screenWidth = window.innerWidth;
    if (isWalletConnected && !isCertificatePage) {
      if (screenWidth < 1024) {
        setOpenSidebar(false);
      } else if (isWalletConnected) {
        setOpenSidebar(true);
      }
    }
    if (isAdminConnected && !isCertificatePage) {
      const screenWidth = window.innerWidth;
      if (screenWidth < 1024) {
        setOpenSidebar(false);
      } else if (isAdminConnected) {
        setOpenSidebar(true);
      }
    }
  }, [isWalletConnected, isAdminConnected]);

  if (!rehydrated) {
    return <div className="absolute z-50 bg-black h-full w-full">Loading</div>;
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {showScreenLoader && <ScreenLoader />}
      {showCopyModal && <CopyModel />}
      {showTodayEarnginModal && <TodayEarning />}
      {!isCertificatePage && isWalletConnected && (
        <Navbar handleSidebar={handleSidebar} openSidebar={openSidebar} />
      )}
      {!isCertificatePage && isAdminConnected && (
        <AdminNavbar handleSidebar={handleSidebar} openSidebar={openSidebar} />
      )}
      {!isCertificatePage && !isWalletConnected && !isAdminConnected && (
        <LandingNavbar />
      )}

      <div className={`flex flex-1 overflow-hidden bgImg`}>
        {(isWalletConnected || isAdminConnected) && (
          <AnimatePresence>
            {openSidebar && <Sidebar handleSidebar={handleSidebar} />}
          </AnimatePresence>
        )}

        <div className="relative flex-1 overflow-y-auto h-full text-white">
          <Routes>
            <Route element={<PublicRoute />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/registration" element={<Registration />} />
              <Route path="/registration/:id" element={<Registration />} />
              <Route path="/download" element={<Download />} />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route
                path="/dashboard"
                element={<Dashboard openSidebar={openSidebar} />}
              />
              <Route
                path="/certificate/:name/:rank/:earning"
                element={<Certificate openSidebar={openSidebar} />}
              />
              <Route
                path="/bonus/:bonus"
                element={<TotalLostBonus openSidebar={openSidebar} />}
              />
              <Route
                path="/profile"
                element={<Profile openSidebar={openSidebar} />}
              />
              <Route
                path="/cryptocluster"
                element={<CryptoCluster openSidebar={openSidebar} />}
              />
              {/* Team */}
              <Route
                path="/team/direct"
                element={<DirectPartner openSidebar={openSidebar} />}
              />
              <Route
                path="/team/network"
                element={<NetworkPartner openSidebar={openSidebar} />}
              />
              <Route
                path="/team/tree"
                element={<MyTree openSidebar={openSidebar} />}
              />
              <Route
                path="/team/matrix"
                element={<MatrixTree openSidebar={openSidebar} />}
              />
              {/* Income */}
              <Route
                path="/income/sponsor"
                element={<SponsorBonus openSidebar={openSidebar} />}
              />
              <Route
                path="/income/direct"
                element={<DirectKickBonus openSidebar={openSidebar} />}
              />
              <Route
                path="/income/level"
                element={<LevelBonus openSidebar={openSidebar} />}
              />
              <Route
                path="/income/pool"
                element={<PoolBonus openSidebar={openSidebar} />}
              />
              <Route
                path="/income/luxury"
                element={<LuxuryBonus openSidebar={openSidebar} />}
              />
              <Route
                path="/income/luxury/details/:title/:value/:id"
                element={<LuxuryBonusDetails openSidebar={openSidebar} />}
              />
              {/* Academy */}
              <Route
                path="/academy/calculator"
                element={<Calculator openSidebar={openSidebar} />}
              />
              <Route
                path="/academy/tutorial"
                element={<TutorialVideo openSidebar={openSidebar} />}
              />
              {/* Others */}
              <Route
                path="/promos"
                element={<PromoPdf openSidebar={openSidebar} />}
              />
              <Route
                path="/reviews"
                element={<Reviews openSidebar={openSidebar} />}
              />
              <Route
                path="/rewardwall"
                element={<RewardWall openSidebar={openSidebar} />}
              />
              <Route
                path="/token"
                element={<Token openSidebar={openSidebar} />}
              />
              {/* <Route
                path="/game"
                element={<Game openSidebar={openSidebar} />}
              /> */}
              <Route
                path="/faqs"
                element={<Faqs openSidebar={openSidebar} />}
              />
              <Route
                path="/support"
                element={<Support openSidebar={openSidebar} />}
              />
              <Route
                path="/matrixtreedetails/:level"
                element={<DetailsPage openSidebar={openSidebar} />}
              />
            </Route>

            <Route element={<ProtectedAdminRoute />}>
              <Route
                path="/admin/dashboard"
                element={<AdminDashboard openSidebar={openSidebar} />}
              />
              <Route
                path="/admin/userlist"
                element={<UserList openSidebar={openSidebar} />}
              />
              <Route
                path="/admin/logactivities"
                element={<LogActivities openSidebar={openSidebar} />}
              />
              <Route
                path="/admin/rankachiver"
                element={<RankAchiever openSidebar={openSidebar} />}
              />
              <Route
                path="/admin/topdirectlist"
                element={<TopDirectList openSidebar={openSidebar} />}
              />
              <Route
                path="/admin/topearnerlist"
                element={<TopEarnerList openSidebar={openSidebar} />}
              />

              <Route
                path="/admin/income/sponsor"
                element={<PartnerSponsorBonus openSidebar={openSidebar} />}
              />
              <Route
                path="/admin/income/pool"
                element={<PartnerPoolBonus openSidebar={openSidebar} />}
              />
              <Route
                path="/admin/income/luxury"
                element={<PartnerLuxuryBonus openSidebar={openSidebar} />}
              />
              <Route
                path="/admin/income/level"
                element={<PartnerLevelBonus openSidebar={openSidebar} />}
              />
              <Route
                path="/admin/income/direct"
                element={<PartnerDirectKickBonus openSidebar={openSidebar} />}
              />
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
