import { Carousel } from "antd";

const contentStyle: React.CSSProperties = {
  height: "400px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#fff",
};
const Banner = () => {
  return (
    <div className="my-[50px]">
      <Carousel autoplay={{ dotDuration: true }} autoplaySpeed={5000}>
        <div>
          <h3 style={contentStyle}>
            <img
              className="object-cover w-full h-full"
              src="https://i.ibb.co.com/hFDS6tDm/carl-nenzen-loven-ig-Kjieyjcko-unsplash.jpg"
              alt=""
            />
          </h3>
        </div>
        <div>
          <h3 style={contentStyle}>
            <img
              className="object-cover w-full h-full"
              src="https://i.ibb.co.com/qYLcD5BL/streetsh-v-ZAk-n9-Plfc-unsplash.jpg"
              alt=""
            />
          </h3>
        </div>
        <div>
          <h3 style={contentStyle}>
            <img
              className="object-cover w-full h-full"
              src="https://i.ibb.co.com/jkdJyQmP/dmitrii-vaccinium-sw9-Vozf6j-4-unsplash.jpg"
              alt=""
            />
          </h3>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
