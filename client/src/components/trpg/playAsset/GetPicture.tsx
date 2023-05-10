import React, { useRef } from 'react'
import { Socket } from "socket.io-client";




const GetPicture = ({ chatSocket }: { chatSocket: Socket }) => {
    const inputRef = useRef<HTMLInputElement>(null)

    const imgCreateHandler = () => {
        const passQuery = async (data: object) => {
            const response = await fetch(
                "https://api-inference.huggingface.co/models/andite/pastel-mix",
                {
                    headers: { Authorization: `${process.env.REACT_APP_HUGGING_FACE_API}` },
                    method: "POST",
                    body: JSON.stringify(data),
                }
            );
            const result = await response.blob();
            return result;
        }

        passQuery({ "inputs": inputRef }).then((response) => {
            const objectURL = URL.createObjectURL(response)
            chatSocket.emit("createPicture", {
                createPicture: objectURL,
                roomId: new URL(window.location.href).pathname.split("/").at(-1) ?? "",
            });

        });
    }


    return (<>

        <div>GetPicture</div>

        <div>이미지 프롬포트 입력</div>
        <input ref={inputRef} defaultValue={"masterpiece, best quality, ultra-detailed, illustration, close-up, straight on, face focus, 1girl, white hair, golden eyes, long hair, halo, angel wings, serene expression, looking at viewer"} />
        <button onClick={imgCreateHandler}>이미지 생성</button>
    </>
    )
}

export default GetPicture