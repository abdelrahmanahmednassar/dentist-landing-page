import React from "react";
import { getTranslations } from "next-intl/server";

const loading = async () => {
  const t = await getTranslations();
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
        .loadingContainer {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
        }
        .loadingText {
          margin-left: 8px;
        }
        [dir="rtl"] .loadingText {
          margin-left: 0;
          margin-right: 8px;
        }
      `}</style>
      <div className="loadingContainer">
        <div className="spinner"></div>
        <span className="loadingText">{t("loading")}</span>
      </div>
    </>
  );
};

export default loading;
