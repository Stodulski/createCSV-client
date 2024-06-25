import React from "react";

import axios from "axios";

export const HistoryItem = ({
    name,
    id,
    setNotification,
    setNotificationMessage,
    setNotificationStatus,
    setFiles,
    files,
}) => {
    const { VITE_API } = import.meta.env;
    const downloadFile = async () => {
        try {
            const response = await axios.get(`${VITE_API}/${id}`, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            });

            const blob = response.data.csv;
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", name);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            setNotification(true);
            setNotificationMessage("Downloading...");
            setNotificationStatus(0);
        } catch (error) {
            setNotification(true);
            setNotificationMessage("Error when downloading");
            setNotificationStatus(1);
        } finally {
            setTimeout(() => {
                setNotification(false);
            }, 3000);
        }
    };
    const deleteFile = async () => {
        try {
            const response = await fetch(`${VITE_API}/csv/delete?id=${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            });
            if (!response.ok) {
                throw new Error();
            }
            let newFiles = files.filter((item) => item._id != id);
            setFiles(newFiles);
            setNotification(true);
            setNotificationMessage("Deleting...");
            setNotificationStatus(0);
        } catch (error) {
            setNotification(true);
            setNotificationMessage("Error when deleting");
            setNotificationStatus(1);
        } finally {
            setTimeout(() => {
                setNotification(false);
            }, 3000);
        }
    };
    return (
        <article className="flex justify-between items-center w-full flex-col sm:flex-row gap-y-5 ">
            <span className="text-white font-medium">{name}</span>
            <div className="gap-2 flex w-full sm:w-auto">
                <a
                    className="py-2 px-4 w-full sm:w-auto border-2 cursor-pointer border-white  bg-violet-100 text-violet-950 rounded-lg hover:border-purple-700 focus:ring-1 text-center focus:ring-purple-500 focus:border-purple-700 focus:outline-none"
                    onClick={() => downloadFile()}
                >
                    Download
                </a>
                <button
                    onClick={() => deleteFile()}
                    className="py-2 px-4 w-full sm:w-auto border-2 cursor-pointer border-white bg-violet-100 text-violet-950 rounded-lg hover:border-purple-700 focus:ring-1 focus:ring-purple-500 focus:border-purple-700 focus:outline-none"
                >
                    Delete
                </button>
            </div>
        </article>
    );
};
