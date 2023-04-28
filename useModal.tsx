import { useState } from "react";

const useModal = () => {
  const [show, setShow] = useState(false);
  const [value,setValue] = useState(0)

  const closeModal = () => setShow(false);
  const openModal = () => setShow(true);

  const doAction = (val: any, callback: (val: any) => void) => {
    callback(value);
    setValue(val)
  };

  return {
    show,
    openModal,
    closeModal,
    doAction,
    value
  }
};

export default useModal;
