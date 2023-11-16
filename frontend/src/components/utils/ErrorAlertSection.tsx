"use client";
import { useState } from "react";

function ErrorAlertSection({ message }: { message: string }) {
  const [visible, setVisible] = useState(true);
  setTimeout(() => {
    setVisible(false);
  }, 3000);
  return visible ? (
    <div
      style={{
        position: "fixed",
        visibility: message as any,
        bottom: "0px",
        left: "0px",
        width: "100%",
        zIndex: 9999999,
        borderRadius: "0px",
      }}
      role="alert"
    >
      <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
        Crap!
      </div>
      <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
        <p>{message}</p>
      </div>
    </div>
  ) : (
    <></>
  );
}
export default ErrorAlertSection;
