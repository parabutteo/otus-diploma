import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Box, IconButton, InputBase } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

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
export const AddToBasket: React.FC<IAddToBasket> = ({
  counter,
  isDisabled,
  increaseClick,
  decreaseClick,
}) => {
  const { t } = useTranslation();

  if (counter > 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          overflow: 'hidden',
          opacity: isDisabled ? 0.5 : 1,
        }}
      >
        <IconButton onClick={decreaseClick} disabled={isDisabled}>
          <RemoveIcon />
        </IconButton>
        <InputBase
          value={counter}
          readOnly
          inputProps={{
            style: {
              textAlign: 'center',
              width: '2.5rem',
              fontWeight: 500,
              fontSize: '1rem',
            },
          }}
        />
        <IconButton onClick={increaseClick} disabled={isDisabled}>
          <AddIcon />
        </IconButton>
      </Box>
    );
  }

  return (
    <Button
      disabled={isDisabled}
      onClick={increaseClick}
      startIcon={<ShoppingCartIcon />}
      variant="contained"
    >
      {t('card.addToBasket')}
    </Button>
  );
};
