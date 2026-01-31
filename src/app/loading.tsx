import React from "react";

const loading = () => {
  return (
    <>
      <style>{`
        .spinner {
          border: 4px solid #f3f3f3;
          border-top: 4px solid #be9249;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 2s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <div className="spinner" style={{ marginRight: "8px" }}></div>
        loading
      </div>
    </>
  );
};

export default loading;
