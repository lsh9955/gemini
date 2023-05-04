import React, { FC, useEffect, useState } from "react";
import axios from "axios";

const Gallery: FC = () => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);

  useEffect(() => {
    const headers = {
      "X-Username": "gemini",
    };

    const params = {
      page: `${page}`,
      size: `${size}`,
    };

    axios
      .get("http://192.168.31.73/user-service/gallery", {
        headers: headers,
        params: params,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return <div></div>;
};

export default Gallery;
