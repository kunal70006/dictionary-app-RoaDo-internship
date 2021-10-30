import React, { useState } from "react";

import "../index.css";

const AddWord = () => {
  const [word, setWord] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = async (e) => {
    e.preventDefault();
    // Sending a POST req to the server to add a specific word to the DB
    try {
      const res = await fetch(`https://mern-internship.herokuapp.com/${word}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          word,
        }),
      });

      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  if (isOpen) {
    return (
      <div className="modal">
        <h1>Add to Dictionary</h1>
        <form onSubmit={handleChange}>
          <label htmlFor="addWord">Add Word</label>
          <br />
          <input
            type="text"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            id="addWord"
            className="addWordInput"
          />
          <br />
          <button className="inputBtns" onClick={() => setIsOpen(false)}>
            Cancel
          </button>
          <input type="submit" value="Add" className="inputBtns" />
        </form>
      </div>
    );
  } else {
    return (
      <div className="addWord" onClick={() => setIsOpen(true)}>
        <h1>+</h1>
      </div>
    );
  }
};

export default AddWord;
