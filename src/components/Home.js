import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { TailSpin } from "react-loader-spinner";

const Home = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [options, setOptions] = useState("");
  const [error, setError] = useState("");

  const baseURL =
    "https://adaorachi.github.io/esetech-assessment-api/game-data.json";
  const fetchData = async () => {
    try {
      const res = await axios.get(baseURL);

      setData(res.data);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    if (options === "date") {
      const newDate = data.sort((a, b) => {
        return (
          new moment(a.first_release_date) - new moment(b.first_release_date)
        );
      });

      setOptions(newDate);
    }

    if (options === "ratings") {
      const ratingList = data.sort((a, b) => {
        return a.ratings - b.ratings;
      });

      console.log(ratingList);
      setData(ratingList);
    }

    if (!name && !options) {
      fetchData();
    }
  }, [name, options]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setName("");
    setOptions("");
  };

  const handleChange = (e) => {
    setName(e.target.value);

    if (name !== "") {
      const result = data.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(name.toLowerCase());
      });
      console.log(result);
      setData(result);
    }
  };

  return (
    <div>
      <div className="container">
        <div className="sideBar">
          <h3>Filter Result</h3>
          <form onSubmit={handleSubmit}>
            <div className="inputDiv">
              <lable for="name">Name [contains]</lable>
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
                placeholder="Text string"
              />
            </div>
            <div className="inputDiv">
              <lable for="options">Order By</lable>

              <select
                className="select"
                name="options"
                onChange={(e) => setOptions(e.target.value)}
              >
                <option />
                <option value="date">Date</option>
                <option value="ratings">Ratings</option>
              </select>
              <i className="fa fa-arrow-up"></i>
            </div>
            <div className="btnDiv">
              <button type="submit">Clear</button>
            </div>
          </form>
        </div>
        <div className="containerBody">
          {data.length === 0 ? (
            <div
              style={{
                color: "white",
                margin: "auto",
                width: "50px",
                height: "50px",
              }}
            >
              <TailSpin
                heigth="100"
                width="100"
                color="white"
                ariaLabel="loading"
              />
            </div>
          ) : (
            data.map((item) => (
              <div className="content">
                <div className="box-1"></div>

                <div className="box-2">
                  <h3>{item && item.name}</h3>
                  <p>{moment(item.first_release_date).format("l")}</p>
                  <div className="box-2-content">
                    {item.summary.length > 150 ? (
                      <p style={{ width: "600px" }}>
                        {item && item.summary.slice(0, 150)} ...
                      </p>
                    ) : (
                      <p style={{ width: "600px" }}>{item && item.summary}</p>
                    )}
                    <span>{item && item.rating.toFixed(0)}</span>
                  </div>
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
