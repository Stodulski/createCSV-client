import React from "react";

export const DownloadButton = ({
    fileName,
    fileStatus,
    setNotification,
    setNotificationMessage,
    setNotificationStatus,
}) => {
    const { VITE_API } = import.meta.env;
    const downloadFile = async () => {
        try {
            const response = await fetch(`${VITE_API}/${fileName}`, {
                method: "GET",
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            });
            if (!response.ok) {
                throw new Error();
            }
            const blob = await response.blob();
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", fileName);
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
    return (
        <a
            className={`w-full ${
                fileStatus && "text-violet-950"
            }  bg-violet-100 rounded-lg text-lg px-4 py-2 border-2 border-violet-100 cursor-pointer  font-semibold hover:border-purple-700 ${
                !fileStatus &&
                "text-violet-400 cursor-not-allowed hover:border-violet-100 pointer-events-none"
            }   focus:ring-1 focus:ring-purple-500 focus:border-purple-700 focus:outline-none text-center`}
            onClick={() => downloadFile()}
        >
            Download
        </a>
    );
};
