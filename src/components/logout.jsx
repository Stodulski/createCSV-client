import React from "react";

export const Logout = () => {
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("expirationTime");
        window.location.reload()
    };
    return (
        <svg
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 absolute top-0 right-0 m-5 stroke-violet-400 cursor-pointer hover:stroke-violet-200"
            onClick={() => logout()}
        >
            <g id="logout">
                <line className="cls-1" x1="15.92" x2="28.92" y1="16" y2="16" />
                <path d="M23.93,25v3h-16V4h16V7h2V3a1,1,0,0,0-1-1h-18a1,1,0,0,0-1,1V29a1,1,0,0,0,1,1h18a1,1,0,0,0,1-1V25Z" />
                <line className="cls-1" x1="28.92" x2="24.92" y1="16" y2="20" />
                <line className="cls-1" x1="28.92" x2="24.92" y1="16" y2="12" />
                <line
                    className="cls-1"
                    x1="24.92"
                    x2="24.92"
                    y1="8.09"
                    y2="6.09"
                />
                <line className="cls-1" x1="24.92" x2="24.92" y1="26" y2="24" />
            </g>
        </svg>
    );
};
