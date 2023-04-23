import { useState, useEffect } from "react";
import useStateTest from "./useStateTest";

type FullScreenHookReturnType = {
  isFullScreen: boolean;
  setFullScreen: () => void;
};

const useFullScreen = (): FullScreenHookReturnType => {

  const { setFullScreen: setShowScreen, fullScreen } = useStateTest()

  const [isFullScreen, setIsFullScreen] = useState<boolean>(fullScreen ? fullScreen:false);

  useEffect(() => {
    setShowScreen(isFullScreen)
  },[isFullScreen])

  const setFullScreen = () => {
    const element = document.documentElement as any;

    if (!isFullScreen) {
      if (element?.requestFullscreen) {
        element?.requestFullscreen();
      } else if (element?.webkitRequestFullscreen) {
        element?.webkitRequestFullscreen();
      } else if (element?.msRequestFullscreen) {
        element?.msRequestFullscreen();
      }
    } else {
      if ((document as any)?.exitFullscreen) {
        (document as any)?.exitFullscreen();
      } else if ((document as any)?.webkitExitFullscreen) {
        (document as any)?.webkitExitFullscreen();
      } else if ((document as any)?.msExitFullscreen) {
        (document as any)?.msExitFullscreen();
      }
    }
  };

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document?.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);
    document.addEventListener(
      "webkitfullscreenchange",
      handleFullScreenChange
    );
    document.addEventListener("msfullscreenchange", handleFullScreenChange);

    return () => {
      document.removeEventListener(
        "fullscreenchange",
        handleFullScreenChange
      );
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullScreenChange
      );
      document.removeEventListener(
        "msfullscreenchange",
        handleFullScreenChange
      );
    };
  }, []);

  return { isFullScreen, setFullScreen };
};

export default useFullScreen;
