import { Link } from 'react-router-dom';
import { Layout } from 'antd';

import style from './Header.module.scss';

const { Header } = Layout;

const MyHeader = () => {
  return (
    <Header className={style.header}>
      <img src="/logo.png" width={40} style={{ marginRight: 16 }} alt="logo" />
      <Link
        to="/"
        style={{ color: 'rgba(0, 0, 0, .85)' }}
        data-testid="home-page-link"
      >
        <h1>Beer Lovers</h1>
      </Link>
    </Header>
  );
};

export default MyHeader;
