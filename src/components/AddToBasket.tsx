import React from 'react';
import { Button, Box, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';

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
          border: 1,
          borderColor: 'divider',
          borderRadius: 2,
          overflow: 'hidden',
          width: '100%',
        }}
      >
        <IconButton
          onClick={decreaseClick}
          disabled={isDisabled}
          sx={{ borderRadius: 0, width: 40, height: 40 }}
        >
          <RemoveIcon fontSize="small" />
        </IconButton>
        <Box
          sx={{
            flexGrow: 1,
            textAlign: 'center',
            fontWeight: 500,
            fontSize: '1rem',
            px: 1,
          }}
        >
          {counter}
        </Box>
        <IconButton
          onClick={increaseClick}
          disabled={isDisabled}
          sx={{ borderRadius: 0, width: 40, height: 40 }}
        >
          <AddIcon fontSize="small" />
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
      fullWidth
    >
      {t('card.addToBasket')}
    </Button>
  );
};
