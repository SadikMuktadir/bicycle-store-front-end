/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card } from "antd";
import { Link } from "react-router-dom";
import { useGetBicycleQuery } from "@/redux/feacures/public/getBycleApi";
import { Button } from "../ui/button";

const FeaturedBicycles = () => {
  const { data } = useGetBicycleQuery(undefined);

  return (
    <div className="my-12 px-4 lg:px-16">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Featured Bicycles</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data?.data?.slice(0, 6).map((item: any) => (
          <Card
            key={item?._id}
            title={item?.name}
            hoverable
            className="shadow-lg rounded-lg border border-gray-200"
          >
            <p className="text-gray-700 font-semibold">Brand: {item?.brand}</p>
            <p className="text-gray-600">Price: ${item?.price}</p>
            <p className="text-gray-600">Type: {item?.type}</p>
            <p className="text-gray-500 text-sm">{item?.description}</p>
            <p className="text-gray-600">Quantity: {item?.quantity}</p>
          </Card>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <Link to="/allProducts">
          <Button className="px-6 py-2 rounded-md">View All</Button>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedBicycles;
