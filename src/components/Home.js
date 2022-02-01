import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);

  const [error, setError] = useState("");

  const baseURL =
    "https://adaorachi.github.io/esetech-assessment-api/game-data.json";
  const fetchData = async () => {
    try {
      const res = await axios.get(baseURL);
      //   console.log(res.json());
      setData(res.data);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(data);
  console.log(error);

  return (
    <div>
      <div className="container">
        <div className="sideBar">
          <h3>Filter Result</h3>
          <div className="inputDiv">
            <lable for="name">Name(contains)</lable>
            <input type="text" name="name" value="" placeholder="Text string" />
          </div>
          <div className="inputDiv">
            <lable for="options">Order By</lable>
            <select name="options" value="">
              <option>Name</option>
              <option>Name</option>
            </select>
          </div>
          <div className="btnDiv">
            <button>Clear</button>
          </div>
        </div>
        <div className="containerBody">
          {!data ? (
            <div
              style={{
                color: "white",
                margin: "auto",
                width: "50px",
                height: "50px",
              }}
            >
              <h3>Loading</h3>
            </div>
          ) : (
            data.slice(0, 10).map((item) => (
              <div className="content">
                <div className="box-1"></div>

                <div className="box-2">
                  <h3>{item && item.name}</h3>
                  <p>Release date 12/03/2022</p>
                  <p style={{ width: "600px" }}>
                    {item && item.summary.slice(0, 250)} ...
                  </p>
                  <span>{item && item.rating.toFixed(0)}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
