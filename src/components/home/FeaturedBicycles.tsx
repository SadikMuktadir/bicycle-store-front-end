/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetBycleQuery } from "@/redux/feacures/public/getBycleApi";
import { Button, Card, Col, Row } from "antd";
import { Link } from "react-router-dom";
const FeaturedBicycles = () => {
  const { data } = useGetBycleQuery(undefined);
  return (
    <div className="">
      <div>
        <h1 className="text-center text-[35px]">Featured Bicycles</h1>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {data?.data?.map((item: any) => (
          <Row key={item?._id} gutter={16}>
            <Col span={50}>
              <Card title={item?.name} hoverable variant="borderless">
                <p>{item?.brand}</p>
                <p>{item?.price}</p>
                <p>{item?.type}</p>
                <p>{item?.description}</p>
                <p>{item?.quantity}</p>
                <p>{item?.true}</p>
              </Card>
            </Col>
          </Row>
        ))}
      </div>
      <div className="flex justify-center">
        <Link to="/allProducts">
          <Button>View All</Button>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedBicycles;
