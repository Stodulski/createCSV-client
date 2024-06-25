import { useState } from "react";

const useCheckUrl = (
    setNotification,
    setNotificationMessage,
    setNotificationStatus,
    buttonRef
) => {
    const [urlValid, setUrlValid] = useState(false);
    const [inputUrl, setInputUrl] = useState("");

    const checkUrl = (url) => {
        setInputUrl(url);
        const pattern = /^(https?:\/\/)?(www\.)?6pm\.com(\/|$)/;
        if (!pattern.test(url)) {
            setNotificationMessage("Invalid URL");
            setNotificationStatus(1);
            setNotification(true);
            setUrlValid(false);
            buttonRef.current.disabled = true;
        } else {
            setNotification(false);
            setUrlValid(true);
            buttonRef.current.disabled = false;
        }
        if (url.length === 0) {
            buttonRef.current.disabled = true;
            setUrlValid(false);
            setNotification(false);
        }
    };

    return {
        urlValid,
        inputUrl,
        checkUrl,
        setInputUrl,
    };
};

export default useCheckUrl;
