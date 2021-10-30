import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "./Navbar";
import "../index.css";

const Words = () => {
  const [words, setWords] = useState([]);
  const [query, setQuery] = useState("");
  const history = useHistory();

  useEffect(() => {
    getData();
  }, [words.length]);

  // Getting data from server
  const getData = async () => {
    const response = await fetch("http://localhost:5000/", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    });
    const data = await response.json();
    setWords(data);
  };

  return (
    <>
      <Navbar setQuery={setQuery} />
      <div className="container">
        <h1 className="heading">Words List</h1>
        {words &&
          words.map((word, index) => {
            if (word.id.includes(query)) {
              return (
                <div
                  className="wordContainer"
                  onClick={() => history.push(`/word/${word.id}`)}
                  key={index}
                >
                  <h1 className="wordTitle">{word.id}</h1>
                  <div className="descContainer">
                    <div
                      style={{
                        marginRight: "10px",
                      }}
                    >
                      {word.type.map((obj, index) => (
                        <p key={index}>{`(${obj}):`}</p>
                      ))}
                    </div>
                    <div>
                      {word.examples.map((example, index) => (
                        <p key={index}>{example}</p>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }
          })}
      </div>
    </>
  );
};

export default Words;
