import React, { useState, useRef } from "react";

import { Notification } from "../components/notification";

import { History } from "../components/history";

import { DownloadButton } from "../components/downloadButton";

import { Logout } from "../components/logout";

import useCheckUrl from "../hooks/useCheckUrl";

import useCreateFile from "../hooks/useCreateFile";

export const Home = () => {
    const inputRef = useRef();
    const buttonRef = useRef();
    const [notification, setNotification] = useState(false);
    const [notificationStatus, setNotificationStatus] = useState();
    const [notificationMessage, setNotificationMessage] = useState("");

    const { urlValid, inputUrl, checkUrl } = useCheckUrl(
        setNotification,
        setNotificationMessage,
        setNotificationStatus,
        buttonRef
    );

    const { fileName, fileStatus, handleSubmit } = useCreateFile(
        setNotification,
        setNotificationMessage,
        setNotificationStatus,
        inputRef,
        buttonRef
    );

    return (
        <main className="min-w-full min-h-screen grid place-content-center bg-[#212121]">
            <Logout />
            {notification && (
                <Notification
                    text={notificationMessage}
                    status={notificationStatus}
                    on={notification}
                />
            )}
            <form
                onSubmit={(e) => handleSubmit(inputUrl, e)}
                className="grid place-content-center h-screen"
            >
                <input
                    className="rounded-lg my-5 bg-violet-100 text-lg border-2 border-purple-500 px-4 py-2 placeholder-purple-400 focus:text-violet-950 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-500 w-[90vw] max-w-[650px]"
                    placeholder="www.6pm.com/example"
                    onChange={(e) => checkUrl(e.target.value)}
                    ref={inputRef}
                />
                <div className="flex flex-col gap-5 sm:flex-row">
                    <button
                        ref={buttonRef}
                        type="submit"
                        value="Create CSV"
                        disabled={!urlValid}
                        className="w-full bg-violet-100 rounded-lg text-lg px-4 py-2 border-2 border-violet-100 cursor-pointer text-violet-950 font-semibold hover:border-purple-700 focus:ring-1 focus:ring-purple-500 focus:border-purple-700 focus:outline-none disabled:hover:border-violet-100 disabled:text-violet-400 disabled:cursor-not-allowed"
                    >
                        Create CSV
                    </button>
                    <DownloadButton
                        fileName={fileName}
                        fileStatus={fileStatus}
                        setNotification={setNotification}
                        setNotificationMessage={setNotificationMessage}
                        setNotificationStatus={setNotificationStatus}
                    />
                </div>
            </form>
            <History
                setNotification={setNotification}
                setNotificationMessage={setNotificationMessage}
                setNotificationStatus={setNotificationStatus}
                fileName={fileName}
            />
        </main>
    );
};
