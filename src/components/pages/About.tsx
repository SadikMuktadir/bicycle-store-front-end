const About = () => {
  return (
    <div>
      <div className="bg-white">
        <header className=" text-center py-12">
          <h1 className="text-3xl font-medium">About Us</h1>
        </header>

        <section className="text-center py-12 px-4">
          <h2 className="text-2xl font-bold">Mission And Values</h2>
          <p className="mt-4 text-gray-700 max-w-2xl mx-auto">
            Our mission is simple: to inspire and empower people to ride more by
            offering premium-quality bicycles, exceptional service, and a
            commitment to sustainability.
          </p>
          <div className="flex justify-center space-x-8 mt-8 animate-fadeIn">
            <div className="transition transform hover:scale-110">
              <h3 className="text-xl font-bold">500+</h3>
              <p className="text-gray-700">Total Customer</p>
            </div>
            <div className="transition transform hover:scale-110">
              <h3 className="text-xl font-bold">5+</h3>
              <p className="text-gray-700">Years of Experience</p>
            </div>
          </div>
        </section>
        <section className=" py-12 px-6 md:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              About <span className="">RideSphere</span>
            </h2>
            <p className="mt-4 text-gray-700 text-lg">
              At <span className="">RideSphere</span>, we are passionate about
              cycling and committed to providing high-quality bicycles for every
              rider. Whether you're a casual commuter, an adventure seeker, or a
              professional cyclist, we have the perfect bike for you.
            </p>
          </div>

          <div className="max-w-5xl mx-auto mt-10 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900">
                Why Choose Us?
              </h3>
              <ul className="mt-3 space-y-2 text-gray-700">
                <li>
                  ✔️ <span className="font-semibold">Wide Selection</span> –
                  From mountain bikes to city cruisers.
                </li>
                <li>
                  ✔️ <span className="font-semibold">Top-Quality Brands</span> –
                  Durable and high-performance models.
                </li>
                <li>
                  ✔️ <span className="font-semibold">Expert Support</span> –
                  Helping you find the perfect ride.
                </li>
                <li>
                  ✔️ <span className="font-semibold">Affordable Prices</span> –
                  Great bikes at competitive prices.
                </li>
                <li>
                  ✔️ <span className="font-semibold">Sustainability Focus</span>{" "}
                  – Eco-friendly transportation solutions.
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
