import React from 'react';
import PropTypes from 'prop-types';
import './Modal.css';


export const Modal = ({
  closeModal,
  type,
  text
}) => (
  <div className='modal'>
    <div className='modal-content'>
      <h3>{type && type.toUpperCase()}</h3>
      <p>{text}</p>
      <button className='close' onClick={closeModal}>OK</button>
    </div>
  </div>
);

Modal.propTypes = {
  success: PropTypes.bool
};

export default Modal;
