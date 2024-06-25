import React from "react";

export const Notification = ({ text, status, on }) => {
    return (
        <div
            className={`fixed ${on ? "inline" : "hidden"} ${
                !status ? "bg-green-500/90" : "bg-red-500/90"
            } bottom-0 right-0 left-0 w-[90vw] max-w-[320px] mx-auto mb-5 grid place-content-center p-2 rounded-lg`}
        >
            <span className="text-white">{text}</span>
        </div>
    );
};
