import React, { useEffect, useRef, useState } from 'react'




const GetPicture = () => {
    const imgRef = useRef<HTMLImageElement>(null)
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
            imgRef.current!.src = objectURL;

        });
    }


    return (<>
        <div>GetPicture</div>
        <div>이미지 프롬포트 입력</div>
        <input ref={inputRef} defaultValue={"masterpiece, best quality, ultra-detailed, illustration, close-up, straight on, face focus, 1girl, white hair, golden eyes, long hair, halo, angel wings, serene expression, looking at viewer"} />
        <button onClick={imgCreateHandler}>이미지 생성</button>
        <img ref={imgRef} alt="이미지 생성 실험" />
    </>
    )
}

export default GetPicture