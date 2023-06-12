import { Layout as AntdLayout } from 'antd';

import Container from 'components/Container';
import Header from './Header';

const { Content } = AntdLayout;

interface ILayout {
  children: React.ReactNode;
}

const Layout = ({ children }: ILayout) => {
  return (
    <AntdLayout
      hasSider={false}
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Header />
      <Container>
        <Content
          style={{
            flex: '1 0 auto',
          }}
        >
          {children}
        </Content>
      </Container>
    </AntdLayout>
  );
};

export default Layout;
