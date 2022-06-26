import axios from "axios";
import { useEffect, useState } from "react";
import { CATEGORY, QUIZ, URL } from "../features/types";

axios.defaults.baseURL = "https://opentdb.com/";

export const useAxios = (props: URL) => {
  const { url } = props;
  const [response, setResponse] = useState<CATEGORY | QUIZ | undefined>(
    undefined
  );
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(url)
        .then((res) => setResponse(res.data))
        .catch((err) => setError(err))
        .finally(() => setLoading(false));
    };
    fetchData();
  }, [url]);

  return { useAxios, response, error, loading };
};
