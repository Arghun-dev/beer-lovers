import { Form, Row, Col, Input } from 'antd';

const { Search } = Input;

interface BeersFilterProps {
  search: string;
  abvGt: string;
  abvLt: string;
  setSearch: (value: string) => void;
  setGreaterABV: (value: string) => void;
  setLowerABV: (value: string) => void;
}

const BeersFilter = ({
  search,
  abvGt,
  abvLt,
  setSearch,
  setGreaterABV,
  setLowerABV,
}: BeersFilterProps) => {
  return (
    <Form
      layout="vertical"
      data-testid="beers-filter"
      initialValues={{ abvGt, abvLt }}
    >
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Form.Item label="Search beer" htmlFor="search-beer">
            <Search
              id="search-beer"
              size="large"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              placeholder="Search by beer name"
              allowClear
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item label="ABV greater than" htmlFor="abv-gt-input">
            <Input
              id="abv-gt-input"
              type="number"
              size="large"
              value={abvGt}
              onChange={(e) => {
                setGreaterABV(e.target.value);
              }}
              max={20}
              min={0}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item label="ABV lower than" htmlFor="abv-lt-input">
            <Input
              id="abv-lt-input"
              type="number"
              size="large"
              value={abvLt}
              onChange={(e) => {
                setLowerABV(e.target.value);
              }}
              max={20}
              min={0}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default BeersFilter;
