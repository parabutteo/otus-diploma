import React from 'react';
import { createPortal } from 'react-dom';

export interface IModal {
  /** Обработчик закрытия */
  onClose: () => void;
  /** Признак открытия */
  isOpen: boolean;
  /** Контент */
  children: React.ReactNode | string;
  /** Заголовок */
  title: string;
}

/**
 * Компонент модального окна
 *
 * Обрабочик закрытия распространяется как на кнопку закрытия, так и на клик вне модалки (т.е. по оверлею)
 *
 * В Компоненте присутствует паттерн "Children types"
 */

export const Modal: React.FC<IModal> = ({ onClose, isOpen, children, title }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).classList.contains('modal-wrapper')) {
      onClose();
    }
  };

  return (
    <>
      {createPortal(
        <div className="modal-wrapper" onClick={handleOverlayClick}>
          <div className="modal-content">
            <button className="icon-btn modal-close-btn" onClick={onClose}>
              <i className="fa fa-close" />
            </button>
            <div className="modal-body">
              <h2>{title}</h2>
              {children}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};
