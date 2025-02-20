import { useParams } from "react-router-dom";
import { useGetBicycleByIdQuery } from "@/redux/feacures/public/getBycleApi";
import { Card, Button, Col, Row, Typography, Spin } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const Checkout = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useGetBicycleByIdQuery(id);

  if (isLoading) {
    return (
      <div className="flex justify-center my-16">
        <Spin size="large" />
      </div>
    );
  }

  if (error || !data?.data) {
    return (
      <div>Product not found or there was an error fetching the details.</div>
    );
  }

  const { name, brand, price, type, description, quantity } = data.data;

  return (
    <div className="my-12 px-4 lg:px-16">
      <Title level={2} className="text-center mb-6">
        Checkout
      </Title>

      <Row gutter={16} justify="center">
        <Col xs={24} sm={20} md={16} lg={12} xl={10}>
          <Card
            title={<div className="text-center text-lg">{name}</div>}
            bordered={false}
            // cover={<img alt={name} src="https://via.placeholder.com/300" />}
            actions={[
              <Button
                type="primary"
                size="large"
                icon={<ShoppingCartOutlined />}
                block
                className="mt-4"
              >
                Pay Now - ${price}
              </Button>,
            ]}
          >
            <Text strong>Brand: </Text>
            {brand}
            <br />
            <Text strong>Category: </Text>
            {type}
            <br />
            <Text strong>Price: </Text>${price}
            <br />
            <Text strong>Description: </Text>
            <Text>{description}</Text>
            <br />
            <Text strong>Stock: </Text>
            <Text className={quantity > 0 ? "text-green-500" : "text-red-500"}>
              {quantity > 0 ? "In Stock" : "Out of Stock"}
            </Text>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Checkout;
