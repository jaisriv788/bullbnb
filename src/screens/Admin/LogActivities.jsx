import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Footer from "../../component/Footer";
import Title from "../../component/Title";
import { screenLoaderVisibilty } from "../../features/copyModal/copyModalVisiblilty";

function LogActivities({ openSidebar }) {
  const baseUrl = useSelector((state) => state.accountDetails.baseUrl);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;
  const dispatch = useDispatch();

  function formatDate(dateString) {
    const date = new Date(dateString);

    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short", // gives "Aug"
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }

  async function getData() {
    try {
      dispatch(screenLoaderVisibilty(true));

      const userFormData = new FormData();
      userFormData.append("action", "log_activities");
      // userFormData.append("value", "total_users");

      const data = await axios.post(`${baseUrl}api/admin-api`, userFormData);
      console.log(data.data.data);
      setData(data.data.data);
      // console.log(data.data.data.length);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(screenLoaderVisibilty(false));
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div
      className={`absolute inset-0 overflow-x-hidden backdrop-blur-[1px] bg-black/80 flex justify-center sm:py-4 ${
        openSidebar && "lg:pr-20 "
      }`}
    >
      <div
        className={`${
          openSidebar ? "w-[90%] lg:w-full" : "w-[90%] lg:w-[80%]"
        } flex flex-col sm:px-5 max-w-[1320px]`}
      >
        <Title title="Log Activities" />
        <div className="flex-1">
          <div className="overflow-x-auto rounded-box border border-white/40">
            <table className="table border-collapse">
              <thead className="bg-gradient-to-r text-white from-[#E08208] via-[#BD4616] to-[#A6201E]">
                <tr>
                  <th className="border border-white/50 px-2 py-1 text-center">
                    S.No.
                  </th>
                  <th className="border border-white/50 px-2 py-1 text-center">
                    Subject
                  </th>
                  <th className="border border-white/50 px-2 py-1 text-center">
                    User Id
                  </th>
                  <th className="border border-white/50 px-2 py-1 text-center">
                    Discription
                  </th>
                  <th className="border border-white/50 px-2 py-1 text-center">
                    IP
                  </th>
                  <th className="border border-white/50 px-2 py-1 text-center">
                    Location
                  </th>
                  <th className="border border-white/50 px-2 py-1 text-center">
                    Browser
                  </th>
                  <th className="border border-white/50 px-2 py-1 text-center">
                    Device
                  </th>
                  <th className="border border-white/50 px-2 py-1 text-center">
                    Status
                  </th>
                  <th className="border border-white/50 px-2 py-1 text-center">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gradient-to-r from-white/20 via-white/10 to-white/20">
                {paginatedData.length === 0 ? (
                  <tr>
                    <td
                      colSpan={10}
                      className="text-center border border-white/50 py-4"
                    >
                      Loading...
                    </td>
                  </tr>
                ) : (
                  paginatedData.map((item, index) => (
                    <tr key={index}>
                      <td className="border border-white/50 px-2 py-1 text-center">
                        {startIndex + index + 1}
                      </td>
                      <td className="border border-white/50 px-2 py-1 text-center">
                        {item.subject}
                      </td>
                      <td className="border border-white/50 px-2 py-1 text-center">
                        {item.user_id}
                      </td>
                      <td className="border border-white/50 px-2 py-1 text-center">
                        {item.description}
                      </td>
                      <td className="border border-white/50 px-2 py-1 text-center">
                        {item.ip}
                      </td>
                      <td className="border border-white/50 px-2 py-1 text-center">
                        {item.loc_data}
                      </td>
                      <td className="border border-white/50 px-2 py-1 text-center">
                        {item.browser}
                      </td>
                      <td className="border border-white/50 px-2 py-1 text-center">
                        {item.device}
                      </td>
                      <td className="border border-white/50 px-2 py-1 text-center">
                        <span className="bg-green-800 px-2 text-xs font-bold py-0.5 rounded-full">
                          {item.status}
                        </span>
                      </td>
                      <td className="border border-white/50 px-2 py-1 text-center">
                        {formatDate(item.created_at)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {totalPages > 1 && (
            <div className="flex mt-2 justify-center">
              <div className="join self-center flex flex-wrap gap-1">
                {/* Page 1 always */}
                <button
                  onClick={() => setCurrentPage(1)}
                  className={`join-item btn  w-12 ${
                    currentPage === 1 ? "bg-[#0D6EFD] text-white" : ""
                  }`}
                >
                  1
                </button>

                {/* Left ellipsis */}
                {currentPage > 3 && (
                  <button className="join-item btn btn-disabled">...</button>
                )}

                {/* Pages around current */}
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(
                    (page) =>
                      page !== 1 &&
                      page !== totalPages &&
                      page >= currentPage - 1 &&
                      page <= currentPage + 1
                  )
                  .map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`join-item btn  w-12 ${
                        currentPage === page ? "bg-[#0D6EFD] text-white" : ""
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                {/* Right ellipsis */}
                {currentPage < totalPages - 2 && (
                  <button className="join-item btn btn-disabled">...</button>
                )}

                {/* Last page always */}
                {totalPages > 1 && (
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    className={`join-item btn  w-12 ${
                      currentPage === totalPages
                        ? "bg-[#0D6EFD] text-white"
                        : ""
                    }`}
                  >
                    {totalPages}
                  </button>
                )}

                {/* Next button */}
                {currentPage < totalPages && (
                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="join-item btn  w-16"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default LogActivities;
