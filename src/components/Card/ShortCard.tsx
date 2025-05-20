import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import { AddToBasket } from '../../components/AddToBasket';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addItemToCart, removeItemFromCart } from '../../features/cart/cartSlice';
import { GET_PROFILE_ID } from '../../graphql/queries/profile';
import { ADMIN_ID, categoryMap } from '../../shared/constants';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';

interface Category {
  name: string;
}

export interface IShortCardItem {
  /** Идентификатор */
  id: string;
  /** ID команды */
  commandId?: string;
  /** Заголовок */
  name: string;
  /** Описание */
  desc: string;
  /** Цена */
  price: number;
  /** Главное изображение */
  photo: string;
  /** Категория */
  category: Category;
}

export interface IShortCard {
  item: IShortCardItem;
}

/**
 * Краткая карточка товара
 *
 * В компоненте присутствуют паттерны "Destructuring props" "обратным" способом
 */
export const ShortCard: React.FC<IShortCard> = ({ item }) => {
  const { name, desc, price, photo, id, category } = item;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const addItemToCartHandler = (event: React.MouseEvent): void => {
    event.stopPropagation();
    dispatch(addItemToCart({ id: item.id }));
  };

  const removeItemFromCartHandler = (event: React.MouseEvent): void => {
    event.stopPropagation();
    dispatch(removeItemFromCart(item.id));
  };

  const cartItems = useAppSelector((state) => state.cart.items);
  const totalQuantity = cartItems.reduce((acc, items) => (items.id === item.id ? acc + items.quantity : acc), 0);

  // Признак админской роли
  const { data: pid } = useQuery(GET_PROFILE_ID);
  const profileId = pid?.profile?.id || null;
  const isAdminRole = profileId === ADMIN_ID;

  const categoryPath = categoryMap[category.name];

  return (
    <Card
      onClick={() => navigate(`/card/${categoryPath}/id/${id}`)}
      sx={{
        height: '100%',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <CardMedia component="img" image={photo} alt={name} height={450} sx={{ objectFit: 'cover', objectPosition: 'top' }} />
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Box sx={{ minHeight: '43px' }}>
          <AddToBasket
            counter={totalQuantity}
            increaseClick={addItemToCartHandler}
            decreaseClick={removeItemFromCartHandler}
          />
        </Box>
        <Typography variant="h6" fontWeight={600}>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {desc.length > 50 ? `${desc.slice(0, 50)}...` : desc}
        </Typography>
        <Typography variant="subtitle1" fontWeight="bold">
          {price}.00 ₽
        </Typography>
        {isAdminRole && (
          <Typography variant="caption" color="text.secondary">
            ID: {id}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};
