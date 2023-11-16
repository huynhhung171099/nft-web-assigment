"use client";
import { useState } from "react";

function CheckedAlert({ message }: { message: string }) {
  const [visible, setVisible] = useState("visible");
  setTimeout(() => {
    setVisible("hidden");
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
      <div className="bg-green-500 text-green font-bold rounded-t px-4 py-2">
        Success!
      </div>
      <div className="border border-t-0 border-green-400 rounded-b bg-green-100 px-4 py-3 text-green-700">
        <p>{message}</p>
      </div>
    </div>
  ) : (
    <></>
  );
}
export default CheckedAlert;
