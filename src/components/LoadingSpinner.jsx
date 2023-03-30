import React from "react";
import "../styles/Spinner.css";

export default function LoadingSpinner() {

  return (
    <div className="spinner-container">
      <div className="loading-spinner">
      </div>
      <br />
      Loading...
    </div>
  );
}