import React, { useEffect, useRef } from "react";

const Alarm: React.FC = () => {
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://172.30.1.39:8081/alarms");
    xhr.setRequestHeader("X-Username", "yyj");
    xhr.withCredentials = true;
    xhr.send();

    const eventSource = new EventSource("http://172.30.1.39:8081/alarms");
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
