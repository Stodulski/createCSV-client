import React from "react";

import { HistoryItem } from "./historyItem";

import useFetchFiles from "../hooks/useFetchFiles";

export const History = ({
    setNotification,
    setNotificationMessage,
    setNotificationStatus,
    fileName
}) => {
    const {files, setFiles} = useFetchFiles(fileName);
    return (
        <section className="my-10 max-w-[650px]">
            <h1 className="text-white text-2xl">File history</h1>
            <div className="w-full flex flex-col-reverse justify-center items-center py-5 gap-y-5">
                {files.length === 0 && (
                    <h2 className="text-white text-lg mt-5">No files.</h2>
                )}
                {files.map((item) => (
                    <HistoryItem
                        name={item.name}
                        id={item._id}
                        key={item._id}
                        setNotification={setNotification}
                        setNotificationMessage={setNotificationMessage}
                        setNotificationStatus={setNotificationStatus}
                        files={files}
                        setFiles={setFiles}
                    />
                ))}
            </div>
        </section>
    );
};
