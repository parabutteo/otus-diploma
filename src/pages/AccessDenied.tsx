import React from 'react';
import { Layout } from '../components';
import { Link } from 'react-router-dom';

export const AccessDenied: React.FC = () => (
  <Layout title="Доступ запрещен">
    <p className="margin-top-32">Доступ к запрашиваемой Вами странице запрещен</p>
    <p className="margin-top-8">Вы можете:</p>
    <ul>
      <li>
        вернуться на <Link to="/">главную</Link>
      </li>
      <li>
        пройти процедуру <Link to="/auth">авторизации</Link>
      </li>
    </ul>
  </Layout>
);
