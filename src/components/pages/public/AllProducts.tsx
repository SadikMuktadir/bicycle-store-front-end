/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetBicycleQuery } from "@/redux/feacures/public/getBycleApi";
import { Col, Input, Row, Spin, Select, Slider, Checkbox, Card } from "antd";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
const { Option } = Select;

const AllProducts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [availability, setAvailability] = useState<boolean | null>(null);

  const { data, isLoading } = useGetBicycleQuery(searchTerm);

  const filteredProducts = data?.data?.filter((item: any) => {
    const matchesSearch =
      item?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.brand.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPrice =
      item?.price >= priceRange[0] && item?.price <= priceRange[1];

    const matchesBrand = selectedBrand ? item?.type === selectedBrand : true;
    const matchesAvailability =
      availability !== null ? item?.quantity > 0 === availability : true;

    return matchesSearch && matchesPrice && matchesBrand && matchesAvailability;
  });

  return (
    <div className="my-12 px-4 lg:px-16">
      <h1 className="text-3xl font-medium title-font text-gray-900 mb-12 text-center">
        All Products
      </h1>
      <div className="flex justify-start mb-6">
        <Input
          placeholder="Search by name or brand..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-[400px] px-4 py-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div>
          <p className="text-gray-700 font-semibold mb-2">Price Range</p>
          <Slider
            range
            min={0}
            max={5000}
            step={100}
            value={priceRange}
            onChange={(value) => setPriceRange(value as [number, number])}
          />
          <p className="text-gray-600 text-sm">
            Price: ${priceRange[0]} - ${priceRange[1]}
          </p>
        </div>

        <div>
          <p className="text-gray-700 font-semibold mb-2">Brand</p>
          <Select
            placeholder="Select Brand"
            allowClear
            className="w-full"
            onChange={setSelectedBrand}
          >
            <Option value="Mountain">Mountain</Option>
            <Option value="Road">Road</Option>
            <Option value="Hybrid">Hybrid</Option>
            <Option value="BMX">BMX</Option>
          </Select>
        </div>
        <div className="flex items-center mt-4">
          <Checkbox
            checked={availability === true}
            onChange={(e) => setAvailability(e.target.checked ? true : null)}
          >
            In Stock Only
          </Checkbox>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center my-16">
          <Spin size="large" />
        </div>
      ) : (
        <Row gutter={[24, 24]} className="justify-start">
          {filteredProducts?.map((item: any) => (
            <Col key={item?._id} xs={24} sm={12} md={8} lg={8}>
              <Card
                title={item?.name}
                hoverable
                className="shadow-lg rounded-lg border border-gray-200 flex flex-col h-full"
                cover={
                  <img
                    src={item?.imageUrl}
                    alt={item?.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                }
              >
                <div className="flex flex-col flex-grow">
                  <p className="text-gray-700 font-semibold">
                    Brand: {item?.brand}
                  </p>
                  <p className="text-gray-600">Price: ${item?.price}</p>
                  <p className="text-gray-600">Category: {item?.type}</p>
                  <p className="text-gray-500 text-sm flex-grow">
                    {item?.description.length > 100
                      ? `${item?.description.slice(0, 100)}...`
                      : item?.description}
                  </p>
                  <p
                    className={`text-gray-600 ${
                      item?.quantity > 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    <div>{item?.quantity}</div>
                    <div>
                      {item?.quantity > 0 ? "In Stock" : "Out of Stock"}
                    </div>
                  </p>
                </div>

                {/* Ensures the button is always at the bottom */}
                <div className="mt-auto pt-4">
                  <Link to={`/product-details/${item?._id}`}>
                    <Button className="w-full">View Details</Button>
                  </Link>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default AllProducts;
