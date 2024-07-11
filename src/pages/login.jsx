import React, { useState } from "react";

import { Notification } from "../components/notification";

import instance from "../instance";

export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [notification, setNotification] = useState(false);
    const [notificationStatus, setNotificationStatus] = useState();
    const [notificationMessage, setNotificationMessage] = useState("");

    const { VITE_API } = import.meta.env;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await instance.post(`${VITE_API}/login`, {
                username,
                password,
            });
            const currentTime = new Date().getTime();
            const expirationTime = currentTime + 24 * 60 * 60 * 1000;
            localStorage.setItem("expirationTime", expirationTime);
            localStorage.setItem("token", response.data.token);
            window.location.href = "/";
            setNotification(true);
            setNotificationStatus(0);
            setNotificationMessage("Success");
        } catch (error) {
            setNotification(true);
            setNotificationStatus(1);
            if (error.response.data.text) {
                setNotificationMessage(error.response.data.text);
            } else {
                setNotificationMessage("Server error");
            }
            setTimeout(() => {
                setNotification(false);
            }, 3000);
        }
    };

    return (
        <main className="min-w-full min-h-screen grid place-content-center bg-[#212121]">
            {notification && (
                <Notification
                    text={notificationMessage}
                    status={notificationStatus}
                    on={notification}
                />
            )}
            <div className="card px-8 py-6 rounded-lg bg-violet-800 w-72">
                <h1 className="text-center font-bold text-3xl text-white">
                    Login
                </h1>
                <form className="my-6" onSubmit={(e) => handleSubmit(e)}>
                    <input
                        className="p-2 my-2 rounded w-[100%] focus:outline-violet-600"
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                        type="text"
                    />
                    <input
                        className="p-2 my-2 rounded w-[100%] focus:outline-violet-600"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                    />
                    <button className="bg-violet-600 hover:bg-violet-500 text-white font-semibold p-2 mt-3 rounded w-[100%]">
                        Login
                    </button>
                </form>
            </div>
        </main>
    );
};
