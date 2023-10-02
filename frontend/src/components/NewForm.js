import React from "react";

import "../scss/style.css";

function NewForm() {
  return (
    <div className="parent--container--form">
      <div className="form--bg">
        <img src={image} />
      </div>
      <div className="main--form">
        <form>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewForm;
