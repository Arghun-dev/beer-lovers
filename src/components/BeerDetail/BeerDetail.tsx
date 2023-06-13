import { Link, useParams } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/query';
import {
  Row,
  Col,
  Card,
  Skeleton,
  Tag,
  Typography,
  Image,
  Divider,
  Breadcrumb,
} from 'antd';
import { HomeOutlined, ShareAltOutlined } from '@ant-design/icons';

import { useGetSingleBeerQuery } from '../../services/beersService';
import { IBeer } from 'types/IBeer';

import ShareBeerPopover from 'components/ShareBeerPopover';

const { Title, Text, Paragraph } = Typography;

interface IBeerResponseQuery {
  data: IBeer[];
  isLoading: boolean;
  isError: boolean;
}

const Bold = ({ text }: { text: string }) => <Text strong>{text}</Text>;

const BeerDetail = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleBeerQuery<IBeerResponseQuery>(
    id ?? skipToken,
    { skip: !id }
  );

  const {
    name,
    description,
    abv,
    ibu,
    ebc,
    first_brewed,
    brewers_tips,
    food_pairing,
    image_url,
  } = data?.[0] ?? {};

  return (
    <div data-testid="beer-detail-wrapper">
      <Skeleton loading={isLoading}>
        <Breadcrumb
          items={[
            {
              title: (
                <Link to="/">
                  <HomeOutlined />
                </Link>
              ),
            },
            {
              title: name,
            },
          ]}
          style={{ marginBottom: 24 }}
        />
        <Card style={{ marginBottom: 24 }}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={8}>
              <Image src={image_url} alt={name} />
            </Col>
            <Col xs={24} sm={16}>
              <Title level={2}>{name}</Title>
              <Paragraph>{description}</Paragraph>
              <Divider />
              <Title level={5}>Food Pairing:</Title>
              <Paragraph>
                <ul>
                  {food_pairing?.map((food, index) => (
                    <li key={index}>
                      <Tag>{food}</Tag>
                    </li>
                  ))}
                </ul>
              </Paragraph>
              <Divider />
              <Title level={5}>Details:</Title>
              <Paragraph>
                <ul>
                  <li>
                    <Text>
                      <Bold text="ABV:" />
                      &nbsp;
                      {abv}%
                    </Text>
                  </li>
                  <li>
                    <Text>
                      <Bold text="IBU:" /> {ibu}
                    </Text>
                  </li>
                  <li>
                    <Text>
                      <Bold text="EBC:" /> {ebc}
                    </Text>
                  </li>
                  <li>
                    <Text>
                      <Bold text="First Brewed:" /> {first_brewed}
                    </Text>
                  </li>
                  <li>
                    <Text>
                      <Bold text="Brewer's Tips:" /> {brewers_tips}
                    </Text>
                  </li>
                </ul>
              </Paragraph>
              <Row style={{ marginTop: 48 }}>
                <div
                  style={{ cursor: 'pointer' }}
                  data-testid="popover-wrapper"
                >
                  <ShareBeerPopover
                    key="share"
                    title={name}
                    link={`http://localhost:3000/beers/${id}`}
                    placement="bottom"
                  >
                    <ShareAltOutlined key="share" style={{ marginRight: 8 }} />
                    Share
                  </ShareBeerPopover>
                </div>
              </Row>
            </Col>
          </Row>
        </Card>
      </Skeleton>
    </div>
  );
};

export default BeerDetail;
