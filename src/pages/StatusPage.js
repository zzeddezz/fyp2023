import React, { useState, useEffect } from "react";
import axios from "axios";

function StatusPage() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {}, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/booking/status?q=${search}`
      );
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full flex justify-center h-rm-nav">
      <div className="container flex flex-col  p-20">
        <div className="w-full flex justify-center items-center">
          <input
            onChange={handleChange}
            className="border px-3 py-2 text-sm placeholder:text-sm rounded-md"
            type="text"
            placeholder="Insert your key"
          />
          <button
            onClick={handleSubmit}
            className="ml-5 px-3 py-2 border rounded-md text-sm text-background font-medium shadow-lg bg-accent "
          >
            Search
          </button>
        </div>

        <div className="w-full flex mt-20">
          <div className="w-full flex items-center p-5 drop-shadow">
            <table className="w-full">
              <thead>
                <tr className="font-light text-sm border-b border-accent bg-secondary h-16">
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Booking Date</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {data !== "" ? (
                  <>
                    <tr className="text-center text-sm h-20 border-b border-accent bg-background">
                      <td>{data.name}</td>
                      <td>{data.phone}</td>
                      <td>{data.bookingDate}</td>
                      <td
                        className={`${
                          data.status === "Pending"
                            ? "text-red-danger"
                            : "text-primary"
                        } font-medium`}
                      >
                        {data.status}
                      </td>
                    </tr>
                    {data.status === "Reject" && (
                      <tr className="text-sm font-semibold text-text h-20 border-b border-accent bg-background">
                        <td className="px-10" colSpan={4}>
                          Reason : {data.reason}
                        </td>
                      </tr>
                    )}
                  </>
                ) : (
                  <tr className="text-center h-20 border-b border-accent bg-background">
                    <td>No results found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatusPage;
