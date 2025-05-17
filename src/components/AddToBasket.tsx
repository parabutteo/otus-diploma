import React from 'react';
import clsx from 'clsx';
import { Button } from '@mui/material';

interface IAddToBasket {
  /** Счетчик позиций */
  counter: number;
  /** Признак заблокированности кнопки */
  isDisabled?: boolean;
  /** Хендлер клика при добавлении */
  increaseClick: (event: React.MouseEvent) => void;
  /** Хендлер клика при удалении */
  decreaseClick: (event: React.MouseEvent) => void;
}

/**
 * Кнопка "добавить в корзину"
 *
 * В качестве пропсов принимает признак isDisabled, указывающий на блокировку кнопки
 *
 * и counter для определения количества добавленных позиций
 *
 * В компоненте встречается паттерн "Conditional rendering"
 *
 * Компонент подходит под паттерн "High order component"
 */

export const AddToBasket: React.FC<IAddToBasket> = ({ counter, isDisabled, increaseClick, decreaseClick }) => {
  if (counter > 0) {
    return (
      <div className={clsx('counter', 'flex-row', 'align-items-center', isDisabled && 'disabled')}>
        <Button onClick={decreaseClick}>-</Button>
        <input type="number" value={counter} onChange={() => null} readOnly />
        <Button onClick={increaseClick}>+</Button>
      </div>
    );
  }

  return (
    <Button disabled={isDisabled} onClick={increaseClick}>
      Добавить в корзину
      <i className="margin-left-12 fa fa-shopping-cart" />
    </Button>
  );
};
