import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  Card,
  Typography,
  PaginationProps,
  Pagination,
  Skeleton,
  Result,
} from 'antd';

import useDebounce from 'hooks/useDebounce';
import { useGetBeersQuery } from '../../services/beersService';
import { IBeer } from 'types/IBeer';

import BeersFilter from 'components/BeersFilter';

const { Meta } = Card;
const { Paragraph } = Typography;

const Beers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [search, setSearch] = useState('');
  const [abvLt, setLowerABV] = useState('20');
  const [abvGt, setGreaterABV] = useState('0');
  const debouncedSearch = useDebounce(search, 400);
  const {
    data: beers,
    isLoading,
    isError,
  } = useGetBeersQuery({
    currentPage,
    pageSize,
    beerName: debouncedSearch,
    abvGt,
    abvLt,
  });

  const pageHandler: PaginationProps['onChange'] = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize || 10);
  };

  const renderList = () => {
    if (isError) {
      return (
        <Result
          status="500"
          title="500"
          subTitle="Sorry, something went wrong."
        />
      );
    }

    return (
      <Row gutter={[16, 16]}>
        {beers?.map((beer: IBeer) => (
          <Col key={beer.id} xs={24} sm={12} md={8} lg={6}>
            <Link to={`/beers/${beer.id}`}>
              <Card
                cover={
                  <img
                    alt={beer.name}
                    src={beer.image_url}
                    width={100}
                    height={200}
                    style={{ objectFit: 'contain' }}
                  />
                }
                style={{ paddingTop: 20 }}
                hoverable
              >
                <Meta
                  title={beer.name}
                  description={
                    <Paragraph ellipsis={{ rows: 2 }}>
                      {beer.description}
                    </Paragraph>
                  }
                />
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    );
  };

  return (
    <Row gutter={[16, 16]} data-testid="beers-list">
      <Col xs={24}>
        <BeersFilter
          abvGt={abvGt}
          abvLt={abvLt}
          search={search}
          setSearch={setSearch}
          setGreaterABV={setGreaterABV}
          setLowerABV={setLowerABV}
        />
      </Col>
      <Col xs={24}>
        <Skeleton
          loading={isLoading}
          data-testid="beers-loading"
          style={{ height: '100vh' }}
        >
          {renderList()}
          {beers?.length ? (
            <div style={{ textAlign: 'center' }}>
              <Pagination
                style={{ margin: '48px 0', marginBottom: 120 }}
                current={currentPage}
                pageSize={pageSize}
                onChange={pageHandler}
                total={
                  beers?.length > 0 ? beers.length * currentPage + 1 : undefined
                }
                showSizeChanger
              />
            </div>
          ) : null}
          {beers?.length === 0 ? (
            <Result status="warning" title="No beer found!" />
          ) : null}
        </Skeleton>
      </Col>
    </Row>
  );
};

export default Beers;
