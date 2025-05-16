import { useForm } from 'react-hook-form';
import React from 'react';
import { Button } from '../../../components';
import clsx from 'clsx';
import { useAppDispatch } from '../../../store/hooks';
import { addProduct, editProduct, removeProduct } from '../../../features/products/productsSlice';

// Тип для видов формы
type TProcedure = 'add' | 'edit';

type TAuthFormData = {
  id: string;
  title: string;
  category: string;
  image: string;
  price: number;
  details: string;
};

interface IProductForm {
  /** Вид формы */
  procedureType: TProcedure;
}

/**
 * Компонент добавления/редактирования продукта
 *
 * Тип формы прокидывается пропсом
 *
 * @param procedureType тип процедуры
 *
 * @returns React.FC
 */

export const ProductForm: React.FC<IProductForm> = ({ procedureType }) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<TAuthFormData>();

  const dispatch = useAppDispatch();

  // Признак формы с типом "добавление товара"
  const isAddProcedure = procedureType === 'add';

  // Заглушка для эмуляции вывода значения из базы
  const defaultFieldValue = 'какое-то имеющееся значение поля';

  const onSubmit = (data: TAuthFormData) => {
    console.log(`Введенные данные в форме ${isAddProcedure ? 'добавления товара' : 'редактирования товара'}: `, data);
    isAddProcedure ? dispatch(addProduct(data)) : dispatch(editProduct(data));
    reset();
  };

  const deleteHandler = (id: string): void => {
    if (watch('id') !== null && watch('id') !== '') {
      console.log('Удалён товар с ID ' + watch('id'));
      dispatch(removeProduct(id));
      reset();
    }
  };

  // Эффект для обнуления формы при смене procedureType
  React.useEffect(() => {
    reset();
  }, [procedureType, reset]);

  return (
    <form className="margin-top-24 form" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="login">ID</label>
      <input
        {...register('id', {
          value: null,
          required: true,
        })}
        className={clsx(errors.id && 'error-field', 'grid-content')}
        type="text"
        id="id"
        placeholder="Введите идентификатор"
      />
      <label htmlFor="login">Название</label>
      <input
        {...register('title', {
          value: !isAddProcedure ? defaultFieldValue : null,
          required: true,
        })}
        className={clsx(errors.title && 'error-field', 'grid-content')}
        type="text"
        id="title"
        placeholder="Введите название"
      />

      <label htmlFor="category">Категория</label>
      <select
        {...register('category', {
          value: !isAddProcedure ? 't-shirts' : null,
          required: true,
        })}
        className={clsx(errors.category && 'error-field', 'grid-content')}
        id="category"
      >
        <option value="">Выберите категорию</option>
        <option value="t-shirts">Футболки, рубашки</option>
        <option value="clothes">Верхняя одежда</option>
        <option value="boots">Обувь</option>
      </select>

      <label htmlFor="imgPath">Путь к изображению</label>
      <textarea
        {...register('image', {
          value: !isAddProcedure ? defaultFieldValue : undefined,
          required: true,
        })}
        className={clsx(errors.title && 'error-field', 'grid-content')}
        id="imgPath"
        placeholder="Введите адреса через запятую"
      />

      <label htmlFor="login">Описание</label>
      <textarea
        {...register('details', {
          value: !isAddProcedure ? defaultFieldValue : undefined,
          required: true,
        })}
        className={clsx(errors.details && 'error-field', 'grid-content')}
        id="describe"
        placeholder="Введите описание"
      />

      <label htmlFor="login">Цена</label>
      <input
        {...register('price', {
          value: !isAddProcedure ? 10000 : undefined,
          required: true,
        })}
        className={clsx(errors.price && 'error-field', 'grid-content')}
        type="number"
        id="price"
        placeholder="Введите цену"
      />

      <Button className="small margin-top-8" type="submit">
        {isAddProcedure ? 'Добавить' : 'Сохранить'}
      </Button>
      {!isAddProcedure && (
        <Button className="small margin-top-8" onClick={() => deleteHandler(watch('id'))}>
          Удалить
        </Button>
      )}
    </form>
  );
};
