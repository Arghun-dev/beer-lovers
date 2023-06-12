import { Col, Row } from 'antd';
import cs from 'classnames';

import style from './Container.module.scss';

const responsiveOptions = {
  xs: 24,
  sm: 24,
  md: 24,
  lg: 23,
  xl: 19,
  xxl: 17,
};

interface ContainerProps {
  children: React.ReactNode;
  fluid?: boolean;
  className?: string;
}

const Container = ({ children, fluid = false, ...props }: ContainerProps) => {
  const colProps = () => {
    if (fluid) return { span: 24 };
    return responsiveOptions;
  };
  return (
    <Row
      justify="center"
      {...props}
      className={cs([
        fluid ? style.containerFluid : style.container,
        props.className,
      ])}
      data-testid="container"
    >
      <Col {...colProps()}>{children}</Col>
    </Row>
  );
};

export default Container;
