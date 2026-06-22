import { Link } from "react-router-dom";
import vendors from "../data/vendors";

const Home = () => {
  const featuredVendors = vendors.slice(0, 4);

  const categories = [
    "South Indian",
    "Fast Food",
    "Chinese",
    "Italian",
    "Desserts",
    "Biryani",
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HERO SECTION */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to Food Court
          </h1>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Explore multiple food vendors, discover delicious meals,
            and order your favorite dishes from one place.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/vendors"
              className="bg-black text-white px-8 py-3 rounded-lg hover:bg-red-600 transition"
            >
              Explore Vendors
            </Link>

            <Link
              to="/orders"
              className="border border-black px-8 py-3 rounded-lg hover:bg-black hover:text-white transition"
            >
              View Orders
            </Link>
          </div>

        </div>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-6 py-16">

        <h2 className="text-3xl font-bold mb-8 text-center">
          Food Categories
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">

          {categories.map((category) => (
            <div
              key={category}
              className="bg-white border border-gray-200 rounded-lg p-5 text-center hover:border-red-500 hover:shadow-md transition"
            >
              <h3 className="font-semibold text-gray-800">
                {category}
              </h3>
            </div>
          ))}

        </div>
      </section>

      {/* FEATURED VENDORS */}
      <section className="bg-white py-16">

        <div className="max-w-7xl mx-auto px-6">

          <div className="flex justify-between items-center mb-10">

            <h2 className="text-3xl font-bold">
              Featured Vendors
            </h2>

            <Link
              to="/vendors"
              className="text-red-600 font-semibold hover:underline"
            >
              View All →
            </Link>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {featuredVendors.map((vendor) => (
              <div
                key={vendor.id}
                className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition"
              >
                <h3 className="text-xl font-bold mb-2">
                  {vendor.name}
                </h3>

                <p className="text-gray-500 text-sm mb-3">
                  {vendor.category}
                </p>

                <p className="text-sm text-gray-600 mb-4">
                  ⭐ {vendor.rating}
                </p>

                <Link
                  to={`/vendor/${vendor.id}`}
                  className="inline-block bg-black text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                  View Menu
                </Link>
              </div>
            ))}

          </div>

        </div>

      </section>

      {/* STATS */}
      <section className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">

          <div className="bg-white p-6 rounded-lg border">
            <h3 className="text-3xl font-bold text-red-600">
              10+
            </h3>
            <p className="text-gray-600 mt-2">
              Vendors
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border">
            <h3 className="text-3xl font-bold text-red-600">
              50+
            </h3>
            <p className="text-gray-600 mt-2">
              Menu Items
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border">
            <h3 className="text-3xl font-bold text-red-600">
              1000+
            </h3>
            <p className="text-gray-600 mt-2">
              Happy Customers
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border">
            <h3 className="text-3xl font-bold text-red-600">
              4.8★
            </h3>
            <p className="text-gray-600 mt-2">
              Average Rating
            </p>
          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="bg-black text-white">

        <div className="max-w-4xl mx-auto px-6 py-20 text-center">

          <h2 className="text-4xl font-bold mb-4">
            Hungry?
          </h2>

          <p className="text-gray-300 mb-8">
            Browse vendors and order your favorite meals now.
          </p>

          <Link
            to="/vendors"
            className="inline-block bg-red-600 px-8 py-3 rounded-lg hover:bg-red-700 transition"
          >
            Order Now
          </Link>

        </div>

      </section>

    </div>
  );
};

export default Home;