import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import close from "../assets/close.png";

import "../index.css";

const WordDetails = () => {
  const [word, setWord] = useState([]);
  const [loading, isLoading] = useState(true);
  const history = useHistory();
  const params = history.location.pathname; // Getting URL from the browser

  useEffect(() => {
    getWord();
  }, []);

  const getWord = async () => {
    // Getting the details of a specific word from server
    const res = await fetch(`http://localhost:5000${params}`);
    const data = await res.json();
    setWord(data);
    isLoading(false);
  };

  if (loading) return "Loading";
  else {
    return (
      <>
        <div className="wordDetailsContainer" onClick={() => history.push("/")}>
          <img src={close} alt="close" className="wordDetailsContainerImg" />
        </div>
        <div className="wordDetailsContainerWrapper">
          <h1>{word[0].id}</h1>
          <p className="origin">Origin: {word[0].origin}</p>
          {word[0].type.map((data, index) => (
            <div className="wordDetailsDescContainer" key={index}>
              <p className="type">{data}</p>
              <p style={{ marginBottom: "5px" }}>{word[0].definition[index]}</p>
              <p className="examples">&#9679; {word[0].examples[index]}</p>
            </div>
          ))}
        </div>
      </>
    );
  }
};

export default WordDetails;
