import { useForm } from 'react-hook-form';
import React from 'react';
import { Button } from '../../../components';
import clsx from 'clsx';
import { ProfileT } from '../../../pages/Profile';

interface IProfileForm {
  /** Опциональные классы */
  className?: string;
  form: ProfileT;
  setForm: React.Dispatch<React.SetStateAction<ProfileT>>;
  sendHandler: () => void;
}

type TProfileFormData = {
  name: string;
  aboutMe: string;
};

/**
 * Компонент формы в профиле
 *
 * @param className опциональные css классы
 * @param form стейт формы
 * @param setForm диспатч формы
 * @param sendHandler обработчик отправки формы
 *
 * @returns React.FC
 */

export const ProfileForm: React.FC<IProfileForm> = ({ className, form, setForm, sendHandler }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TProfileFormData>();

  const onSubmit = (data: TProfileFormData) => {
    console.log('Введенные данные в форме профиля: ', data);
    sendHandler();
    reset();
  };

  return (
    <form className={clsx('box', 'form', className)} onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">Имя</label>
      <div className="grid-content">
        <input
          {...register('name', {
            value: form.name,
            required: 'Пожалуйста, введите ваше имя',
            pattern: {
              value: /^[А-Яа-я\s]+$/g,
              message: 'Недопустимые символы в имени',
            },
          })}
          className={clsx(errors.name && 'error-field')}
          type="text"
          id="name"
          placeholder="Введите имя"
          onChange={(ev) => setForm({ ...form, name: ev.target.value })}
        />
        {errors.name && <p className="error">{errors.name.message}</p>}
      </div>

      <label htmlFor="aboutMe">Обо мне</label>
      <textarea
        {...register('aboutMe', {
          value: String(form.aboutMe),
        })}
        id="aboutMe"
        className="grid-content"
        rows={4}
        placeholder="Напишите пару слов о себе"
        onChange={(ev) => setForm({ ...form, aboutMe: ev.target.value })}
      />

      <Button className="small" type="submit">
        Отправить
      </Button>
    </form>
  );
};
