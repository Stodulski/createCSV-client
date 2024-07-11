import axios from "axios";
import { useState, useEffect } from "react";

const useFetchFiles = (fileName) => {
    const [files, setFiles] = useState([]);
    const fetchFiles = async () => {
        try {
            const response = await axios.get(`/api/csv/get`, {
                headers: { Authorization: localStorage.getItem("token") },
            });
            setFiles(response.data);
        } catch (error) {
            setFiles([]);
        }
    };

    useEffect(() => {
        fetchFiles();
    }, [fileName]);

    return {files, setFiles};
};

export default useFetchFiles;
