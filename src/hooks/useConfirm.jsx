// hooks/useConfirm.js
import { useState, useCallback } from "react";
import ConfirmModal from "../components/Common/ConfirmModal/ConfirmModal";

const useConfirm = () => {
  const [modal, setModal] = useState({
    visible: false,
    title: "",
    message: "",
    onConfirm: null,
  });

  const confirm = useCallback((title, message) => {
    return new Promise((resolve) => {
      setModal({
        visible: true,
        title,
        message,
        onConfirm: () => {
          setModal({ ...modal, visible: false });
          resolve(true);
        },
      });
    });
  }, []);

  const ConfirmDialog = () =>
    modal.visible ? (
      <ConfirmModal
        isOpen={modal.visible}
        title={modal.title}
        message={modal.message}
        onConfirm={modal.onConfirm}
        onCancel={() => setModal({ ...modal, visible: false })}
      />
    ) : null;

  return { confirm, ConfirmDialog };
};

export default useConfirm;
