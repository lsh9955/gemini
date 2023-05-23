import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";

const size = 40;
const heartColor = "rgba(248, 51, 42, 1)";

const wishlistHeartWiggle = keyframes`
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(-10deg);
  }
  75% {
    transform: rotate(8deg);
  }
  100% {
    transform: rotate(0deg);
  }
`;

const wishlistHeartAdd = keyframes`
  0% {
    fill: ${heartColor};
    stroke-width: 5;
  }
  50% {
    stroke-width: 20;
  }
  100% {
    fill: ${heartColor};
    stroke-width: 5;
  }
`;

const WishlistHeartGroup = styled.div<{ visible: boolean }>`
  position: absolute;
  z-index: 10000;
  //   top: -25%;
  left: 15%;
  width: 70%;
  height: 70%;
  display: ${(props) => (props.visible ? "block" : "none")};

  input[type="checkbox"] {
    left: -99999px;
    top: -99999px;
    position: absolute;

    &:checked + label svg {
      animation: ${wishlistHeartWiggle} 400ms 50ms forwards ease-in-out;
    }

    &:checked + label svg #heart-path {
      animation: ${wishlistHeartAdd} 300ms forwards;
      stroke: ${heartColor};
    }

    & + label svg #heart-path {
      transition: fill 200ms;
      stroke-width: ${(props) => (props.visible ? "5px" : "0")};
    }

    & + label:hover svg #heart-path {
      transition: stroke 150ms linear;
      stroke: ${heartColor};
    }
  }

  label {
    display: inline-block;
    position: relative;
    width: 100%;
  }
`;

type HeartCssEffectProps = {
  id: string;
  visible: boolean;
  onAnimationEnd: () => void;
};

const HeartCssEffect: React.FC<HeartCssEffectProps> = ({
  id,
  visible = false, // Provide a default value for `visible`
  onAnimationEnd,
}) => {
  const [isVisible, setIsVisible] = useState(visible); // 변경된 부분: isVisible 상태를 useState로 관리
  const heartRef = useRef<HTMLInputElement | null>(null);
  const checkboxRef = useRef<HTMLInputElement | null>(null); // Create a ref for the checkbox

  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.checked = true;
    }
  }, [isVisible, visible]);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isVisible]);

  useEffect(() => {
    const node = heartRef.current;
    if (node) {
      node.addEventListener("animationend", onAnimationEnd);

      return () => {
        node.removeEventListener("animationend", onAnimationEnd);
      };
    }
  }, [onAnimationEnd]);

  const handleClick = () => {
    setIsVisible(true);
    if (checkboxRef.current) {
      //   checkboxRef.current.checked = true;
      checkboxRef.current.checked = !checkboxRef.current.checked; // Toggle the checkbox's checked state
    }
  };

  return (
    <WishlistHeartGroup visible={isVisible}>
      {/* 변경된 부분: visible -> isVisible */}
      <input id={id} ref={heartRef} type="checkbox" />
      <label htmlFor={id} onClick={handleClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          x="0px"
          y="0px"
          viewBox="0 0 100 100"
        >
          <g transform="translate(0,-952.36218)">
            <path
              style={{ color: "#000000" }}
              d="M34.166665,972.36218 
                C22.747115,972.36218 14.999995,981.28109 14.999995,992.63247
                C14.999995,1012.0919 29.999985,1020.2 49.999995,1032.3622
                C69.999995,1020.2 84.999985,1012.0919 84.999985,992.63247
                C84.999985,981.28109 77.252885,972.36218 65.833335,972.36218
                C58.483195,972.36218 52.441855,976.41623 49.999995,978.84865
                C47.558135,976.41623 41.516795,972.36218 34.166665,972.36218
                Z"
              //   fill="transparent"
              fill={heartColor}
              id="heart-path"
              //   stroke="#737373"
              stroke={heartColor}
              strokeWidth="5"
            />
          </g>
        </svg>
      </label>
    </WishlistHeartGroup>
  );
};

export default HeartCssEffect;
