/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetBicycleQuery } from "@/redux/feacures/public/getBycleApi";
import {
  Card,
  Col,
  Input,
  Row,
  Spin,
  Select,
  Slider,
  Checkbox,
  Button,
} from "antd";
import { Link } from "react-router-dom";
import { useState } from "react";

const { Option } = Select;

const AllProducts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [availability, setAvailability] = useState<boolean | null>(null);

  const { data, isLoading } = useGetBicycleQuery(searchTerm);

  const filteredProducts = data?.data?.filter((item: any) => {
    const matchesSearch =
      item?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.brand.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPrice =
      item?.price >= priceRange[0] && item?.price <= priceRange[1];

    const matchesBrand = selectedBrand ? item?.brand === selectedBrand : true;
    const matchesCategory = selectedCategory
      ? item?.category === selectedCategory
      : true;
    const matchesModel = selectedModel ? item?.model === selectedModel : true;
    const matchesAvailability =
      availability !== null ? item?.quantity > 0 === availability : true;

    return (
      matchesSearch &&
      matchesPrice &&
      matchesBrand &&
      matchesCategory &&
      matchesModel &&
      matchesAvailability
    );
  });

  return (
    <div className="my-12 px-4 lg:px-16">
      <h1 className="text-center text-3xl font-bold text-gray-800 mb-6">
        All Products
      </h1>
      <div className="flex justify-center mb-6">
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
            <Option value="SpeedX">SpeedX</Option>
            <Option value="TrailBlaze">TrailBlaze</Option>
            <Option value="UrbanMove">UrbanMove</Option>
          </Select>
        </div>

        <div>
          <p className="text-gray-700 font-semibold mb-2">Category</p>
          <Select
            placeholder="Select Category"
            allowClear
            className="w-full"
            onChange={setSelectedCategory}
          >
            <Option value="Mountain">Mountain</Option>
            <Option value="Road">Road</Option>
            <Option value="Hybrid">Hybrid</Option>
          </Select>
        </div>

        <div>
          <p className="text-gray-700 font-semibold mb-2">Model</p>
          <Select
            placeholder="Select Model"
            allowClear
            className="w-full"
            onChange={setSelectedModel}
          >
            <Option value="ModelX">Model X</Option>
            <Option value="ModelY">Model Y</Option>
            <Option value="ModelZ">Model Z</Option>
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
        <Row gutter={[24, 24]} className="justify-center">
          {filteredProducts?.map((item: any) => (
            <Col key={item?._id} xs={24} sm={12} md={8} lg={6}>
              <Card
                title={item?.name}
                hoverable
                className="shadow-lg rounded-lg border border-gray-200"
              >
                <p className="text-gray-700 font-semibold">
                  Brand: {item?.brand}
                </p>
                <p className="text-gray-600">Price: ${item?.price}</p>
                <p className="text-gray-600">Category: {item?.category}</p>
                <p className="text-gray-600">Model: {item?.model}</p>
                <p className="text-gray-500 text-sm">{item?.description}</p>
                <p
                  className={`text-gray-600 ${
                    item?.quantity > 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {item?.quantity > 0 ? "In Stock" : "Out of Stock"}
                </p>

                <Link to={`/product-details/${item?._id}`}>
                  <Button type="primary" className="w-full mt-4">
                    View Details
                  </Button>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default AllProducts;
