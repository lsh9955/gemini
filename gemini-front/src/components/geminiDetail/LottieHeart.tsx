import { FC, useRef, useEffect } from "react";
import lottie, { AnimationItem } from "lottie-web";
import HeartAnimation from "../../assets/animation-effect/HeartAnimation.json";

interface LottieHeartProps {
  animationData: any; // Replace with your actual type
  visible: boolean;
  onComplete: () => void;
}

const LottieHeart: FC<LottieHeartProps> = ({
  animationData,
  visible,
  onComplete,
}) => {
  const container = useRef<HTMLDivElement>(null);
  const animationInstance = useRef<AnimationItem | null>(null);

  useEffect(() => {
    if (container.current) {
      animationInstance.current = lottie.loadAnimation({
        container: container.current,
        animationData: animationData,
        renderer: "svg",
        loop: false,
        autoplay: false,
      });

      animationInstance.current.addEventListener("complete", onComplete);

      return () => {
        if (animationInstance.current) {
          animationInstance.current.removeEventListener("complete", onComplete);
          animationInstance.current.destroy();
        }
      };
    }
  }, [animationData, onComplete]);

  useEffect(() => {
    if (animationInstance.current) {
      if (visible) {
        animationInstance.current.goToAndPlay(0);
      } else {
        animationInstance.current.stop();
      }
    }
  }, [visible]);

  return <div ref={container} />;
};

export default LottieHeart;
