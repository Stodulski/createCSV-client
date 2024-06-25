import React from "react";

export const DownloadButton = ({
    fileName,
    fileStatus,
    setNotification,
    setNotificationMessage,
    setNotificationStatus,
}) => {
    const downloadFile = async () => {
        try {
            const csvBlob = fileName.csv;
            const blobUrl = window.URL.createObjectURL(new Blob([csvBlob]));
            const a = document.createElement("a");
            a.href = blobUrl;
            a.download = fileName.name;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
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
