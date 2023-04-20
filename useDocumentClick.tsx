import { useEffect } from "react";

const useDocumentClick = (callback: (event: any) => void) => {
  useEffect(() => {
    const handleClick = (event: any) => {
      callback(event);
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);
};

export default useDocumentClick;
