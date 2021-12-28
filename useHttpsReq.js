// import axios from "axios";
import axios from "axios";
import { useEffect, useState } from "react";

const useHttpsReq = (url = "", type = "GET", header = {}, body = {}) => {
  const [response, setResponse] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    (async () => {
      try {
        if (type === "POST") {
        } else {
          setIsLoading(true);
          const { data } = await axios.get(url);
          setResponse(data);
          setIsLoading(false);
        }
      } catch (err) {
        setIsLoading(false);
        setErrorMsg(err.message);
      }
    })();
  }, [url, type]);
  return {
    response,
    isLoading,
    errorMsg,
  };
};

export default useHttpsReq;

// CALL IN THE PARENT COMPONENT
// const reqResponse = useHttpsReq("/board", "GET");
