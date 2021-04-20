import React, { useRef } from "react";

import "./GenericModal.scss";

import useOutsideClick from "../../hooks/useOutsideClick";
import { Close } from "@material-ui/icons";

const GenericModal = (props) => {
  const genericModalRef = useRef();
  const genericModalDialogRef = useRef();

  const handleCloseButtonClick = (e) => {
    e.preventDefault();
    fadeOutModal();
  };

  const fadeOutModal = () => {
    genericModalRef.current.classList.add("generic-modal--closing");
    setTimeout(props.closeModal, 450);
  };

  useOutsideClick(genericModalDialogRef, fadeOutModal);

  return (
    <div className="generic-modal" ref={genericModalRef}>
      <div className="generic-modal__dialog" ref={genericModalDialogRef}>
        <div className="generic-modal__heading">
          <div className="generic-modal__title">Privacy Statement</div>
          <button className="generic-modal__close btn btn-danger" onClick={(e) => handleCloseButtonClick(e)}>
            <Close/>
          </button>
        </div>
        <div className="generic-modal__content">{props.children}</div>
        <div className="generic-modal__footer"></div>
      </div>
    </div>
  );
};

export default GenericModal;
