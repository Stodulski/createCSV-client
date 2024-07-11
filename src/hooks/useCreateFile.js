import { useState } from "react";
import axios from "axios";

const useCreateFile = (
    setNotification,
    setNotificationMessage,
    setNotificationStatus,
    inputRef,
    buttonRef
) => {
    const [fileStatus, setFileStatus] = useState(false);
    const [fileName, setFileName] = useState("");

    const handleSubmit = async (url, e) => {
        e.preventDefault();
        setNotification(true);
        setNotificationStatus(0);
        setNotificationMessage("In process...");
        const { VITE_API } = import.meta.env;
        try {
            inputRef.current.value = "";
            inputRef.current.disabled = true;
            buttonRef.current.disabled = true;
            const response = await axios.post(`${VITE_API}/csv/new`, {
                url: url,
            });
            setFileName({name: response.data.name, csv: response.data.csv})
            setNotification(true);
            setNotificationMessage(response.data.text);
            setFileStatus(true);
        } catch (error) {
            console.log(error);
            setNotificationStatus(1);
            setNotificationMessage("Error");
        } finally {
            inputRef.current.disabled = false;
            setTimeout(() => {
                setNotification(false);
            }, 3000);
        }
    };
    return {
        fileName,
        fileStatus,
        handleSubmit,
    };
};

export default useCreateFile;
