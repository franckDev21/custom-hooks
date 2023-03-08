import { useState } from "react";

const useModal = () => {
  const [show, setShow] = useState(false);

  const closeModal = () => setShow(false);
  const openModal = () => setShow(true);

  return {
    show,
    openModal,
    closeModal
  }
};

export default useModal;
