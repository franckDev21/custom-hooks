import { useEffect, useState } from "react";

const useFixed = (height: number = 100) => {
  const [fixed, setFixed] = useState(false);

  const transitionNavBar = () => {
    window.scrollY > height ? setFixed(true) : setFixed(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);
    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", transitionNavBar);
  }, []);

  return {
    fixed
  }
}

export default useFixed