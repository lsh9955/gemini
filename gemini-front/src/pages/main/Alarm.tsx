import React, { useEffect, useRef } from "react";

const Alarm: React.FC = () => {
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http:// 192.168.0.71:8081/alarm");
    xhr.setRequestHeader("X-Username", "yyj");
    xhr.withCredentials = true;
    xhr.send();

    const eventSource = new EventSource("http:// 192.168.0.71:8081/alarm");
    eventSource.onmessage = (event) => {
      const message = document.createElement("div");
      message.innerText = event.data;
      messagesRef.current?.appendChild(message);
    };
    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div>
      <h1>Alarm Page</h1>
      <div ref={messagesRef} />
    </div>
  );
};

export default Alarm;
