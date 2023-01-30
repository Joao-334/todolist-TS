import React from 'react'

//CSS
import styles from './Modal.module.css';

interface Props {
    children: React.ReactNode
}

const Modal = ({children}: Props) => {

    const closeModal = (e: React.MouseEvent): void => {
        const modal = document.getElementById('modal');
        modal!.classList.add('hide');
    }

  return (
    <div id='modal' className='hide'>
        <div className={styles.fade}></div>
            <div className={styles.modal}>
                <i className="bi bi-x-circle" onClick={closeModal}></i>
                {children}
            </div>
    </div>
  )
}

export default Modal