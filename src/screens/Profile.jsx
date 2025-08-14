import Footer from "../component/Footer";
import centralImageSrc from "../assets/logos/ring-transparent.png";
import imgSrc from "../assets/logos/ring-text.png";
import { useSelector, useDispatch } from "react-redux";
import { Copy } from "lucide-react";
import { Rank } from "../data/data";
import { copyModalVisibilty } from "../features/copyModal/copyModalVisiblilty";
import { useState, useEffect } from "react";
import axios from "axios";
import { screenLoaderVisibilty } from "../features/copyModal/copyModalVisiblilty";
import telegram from "../assets/logos/telegram.png";
import imageBack from "../assets/cover.jpg";
function Profile({ openSidebar }) {
  const userId = useSelector((state) => state.accountDetails.userId);
  const rank = useSelector((state) => state.dashboardData.userData.rank);
  const [usersData, setUsersData] = useState({});
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [username, setUsername] = useState("");
  // const [verified, setVerified] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [dataUpdated, setDataUpdated] = useState(false);
  const [bot, setBot] = useState(false);
  const [name, setName] = useState("");

  const address = useSelector(
    (state) => state.accountDetails.saveMainUserAddress
  );

  const baseUrl = useSelector((state) => state.accountDetails.baseUrl);

  const dispatch = useDispatch();

  async function handleDetailsSave() {
    const formData = new FormData();
    formData.append("original_wallet_address", address);
    formData.append("action", "update_profile");
    formData.append("name", name);
    formData.append("country", selectedCountry);

    await axios.post(`${baseUrl}api/user-actions`, formData);
    setDataUpdated((prev) => !prev);
  }

  async function handelImageUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    // console.log("Selected image:", file);

    const formData = new FormData();
    formData.append("original_wallet_address", address);
    formData.append("action", "update_profile_image");
    formData.append("profile_image", file);

    try {
      const response = await axios.post(
        `${baseUrl}api/user-actions`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setImageUploaded((prev) => !prev);
      console.log("Upload response:", response.data);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  }

  async function getData() {
    dispatch(screenLoaderVisibilty(true));
    try {
      const userFormData = new FormData();
      userFormData.append("action", "get_user_info");
      userFormData.append("original_wallet_address", address);

      const userResponse = await axios.post(
        `${baseUrl}api/get-user-data`,
        userFormData
      );
      // console.log({ userdata: userResponse.data.data });
      setUsersData(userResponse.data.data);

      const formData = new FormData();
      formData.append("action", "get_countries");
      const response = await axios.post(
        `${baseUrl}api/get-user-data`,
        formData
      );
      // console.log(response.data.data);
      setCountries(response.data.data);
      response.data.data.map((item) => {
        if (item.id == userResponse.data.data.country)
          setSelectedCountry(item.id);
      });
      // console.log(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(screenLoaderVisibilty(false));
    }
  }

  useEffect(() => {
    getData();
  }, [imageUploaded, dataUpdated]);

  useEffect(() => {
    if (usersData?.name) {
      setName(usersData.name);
    }
  }, [usersData]);

  return (
    <div
      className={`absolute inset-0 overflow-auto backdrop-blur-[1px] bg-black/60 flex justify-center sm:py-4 ${
        openSidebar && "lg:pr-30"
      }`}
    >
      <div
        className={`${
          openSidebar ? "w-[90%] lg:w-full" : "w-[90%] lg:w-[80%]"
        } flex flex-col  sm:px-5 max-w-[1320px] `}
      >
        <div className="flex-1 flex flex-col gap-10">
          <div className="w-full relative h-[22rem] rounded-3xl overflow-hidden bg-gradient-to-b from-[#6D5122] to-transparent ">
            <img src={imageBack} className="w-full absolute bottom-3/5" />
            <div className="absolute -z-0 top-2/5 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative w-[150px] flex items-center justify-center aspect-square">
                <img
                  className="h-full rounded-full"
                  src={
                    usersData?.profile_image
                      ? `${baseUrl}user/${usersData?.profile_image}`
                      : imgSrc
                  }
                />
                <img
                  className="absolute animate-spin"
                  style={{ animationDuration: "15s" }}
                  src={centralImageSrc}
                />
              </div>
            </div>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-center">
              <div className="text-2xl font-bold">
                {usersData?.name ? usersData.name : "Bull BNB"}
              </div>
              <div className="text-lg font-semibold">ID: {userId}</div>
              <div className="relative inline-block cursor-pointer">
                <button className="bg-gradient-to-r cursor-pointer px-4 py-1 rounded-xl border-2  from-[#2F0C59] to-[#C40C78]">
                  PHOTO UPLOAD
                </button>
                <input
                  type="file"
                  accept="image/*"
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handelImageUpload}
                />
              </div>
            </div>
            <div className="absolute top-0 right-10">
              <div
                className="w-28 flex-col h-28 bg-white text-black flex justify-start  items-center pt-4 font-semibold"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 100% 80%, 50% 100%, 0 80%)",
                }}
              >
                <span>Rank</span>
                <span>{Rank[rank - 1]}</span>
              </div>
            </div>
          </div>
          <div className="flex lg:flex-row flex-col gap-5">
            <div className="flex-1 flex flex-col justify-between gap-5 md:gap-3 ">
              <div className="flex-1 flex px-5 flex-col justify-evenly flex-wrap py-7 lg:px-20 bg-gradient-to-b from-[#564017] to-transparent rounded-t-xl relative">
                <div className="absolute px-5 text-lg rounded-2xl border-2 border-[#B96FDB]  -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#A024C3] via-[#7B15CD] to-[#5B07D5] ">
                  Referal Link
                </div>
                <div className="text-center">{userId}</div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `http://bullbnb.com/registration/${userId}`
                    );
                    dispatch(copyModalVisibilty(true));
                  }}
                  className="flex mt-2 cursor-pointer justify-center items-center gap-1 connect-btn1 bg-gradient-gold"
                >
                  <Copy size={15} /> Copy Link
                </button>
              </div>
              <div className="flex-1 px-5 flex flex-col justify-evenly flex-wrap py-7 lg:px-20 bg-gradient-to-b from-[#564017] to-transparent rounded-t-xl relative">
                <div className="absolute text-nowrap px-5 text-lg rounded-2xl border-2 border-[#B96FDB]  -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#A024C3] via-[#7B15CD] to-[#5B07D5] ">
                  opBNB Wallet Address
                </div>
                <div className="text-center">
                  {address.slice(0, 4) + "..." + address.slice(-4)}
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(address);
                    dispatch(copyModalVisibilty(true));
                  }}
                  className="flex cursor-pointer mt-2 justify-center items-center gap-1 connect-btn1 bg-gradient-gold"
                >
                  <Copy size={15} /> Copy Address
                </button>
              </div>
            </div>
            <div className="flex-1 h-full ">
              <div className="px-5 flex flex-col justify-evenly flex-wrap py-7 lg:px-20 bg-gradient-to-b from-[#564017] to-transparent rounded-t-xl relative">
                <div className="absolute px-5 text-lg rounded-2xl border-2 border-[#B96FDB]  -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#A024C3] via-[#7B15CD] to-[#5B07D5] ">
                  Profile Details
                </div>
                <div className="flex gap-5 my-5 flex-col">
                  <div className="w-full">
                    <label htmlFor="name" className="text-sm">
                      Nick Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Name"
                      className="bg-gray-800 w-full border border-gray-400 rounded-md px-3 py-1 text-white"
                    />
                  </div>
                  <div className="w-full">
                    <label htmlFor="name" className="text-sm">
                      Telegram username
                    </label>
                    {usersData?.telegram_username == "" ? (
                      bot ? (
                        <div
                          id="name"
                          className="bg-gray-800 flex justify-between gap-3 relative  text-xs items-center w-full border border-gray-400 rounded-md px-3 text-white"
                        >
                          <div className="bg-white flex justify-center items-center absolute w-10 h-full left-0">
                            <img className="h-6" src={telegram} />
                          </div>
                          <input
                            className="ml-10 text-lg w-full focus:outline-none"
                            placeholder="Username"
                            onChange={(e) => setUsername(e.target.value)}
                            type="text"
                          />
                          <button className="text-sm btn-theme2 cursor-pointer">
                            Verify
                          </button>
                        </div>
                      ) : (
                        <div
                          id="name"
                          className="bg-gray-800 flex gap-3 py-2 text-xs items-center w-full border border-gray-400 rounded-md px-3 text-white"
                        >
                          To verify your Telegram username, click on the "Start
                          Bot" button.{" "}
                          <button
                            onClick={() => {
                              window.open(
                                "https://t.me/opBullBNB_bot",
                                "_blank"
                              );
                              setBot(true);
                            }}
                            className="text-sm btn-theme2 cursor-pointer"
                          >
                            Start Bot
                          </button>
                        </div>
                      )
                    ) : (
                      <div
                        id="name"
                        className="bg-gray-800 flex gap-3 py-2 text-xs items-center w-full border border-gray-400 rounded-md px-3 text-white"
                      >
                        verified
                      </div>
                    )}
                  </div>
                  <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="bg-gray-800 cursor-pointer border border-gray-400 rounded-md px-3 py-1 text-white"
                  >
                    <option value="" disabled>
                      Select a country
                    </option>
                    {countries.map((country, index) => (
                      <option key={index} value={country.id}>
                        {country.country_name}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={handleDetailsSave}
                  // disabled={usersData?.telegram_username == "" && !verified}
                  className="flex cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed mt-2 justify-center items-center gap-1 connect-btn1 bg-gradient-gold"
                >
                  Save Details
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Profile;
