import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const products = [
  {
    id: 1,
    name: "Aloe Vera Gel",
    image: "https://cdn.foreverliving.com/content/dam/flp/inventory/015/015_large.jpg",
    benefits: [
      "Supports digestion",
      "Hydrates skin",
      "Boosts immunity",
      "Cleanses digestive system",
      "Rich in nutrients"
    ]
  },
  {
    id: 2,
    name: "Forever Arctic Sea",
    image: "https://cdn.foreverliving.com/content/dam/flp/inventory/376/376_large.jpg",
    benefits: [
      "Rich in Omega-3",
      "Supports brain health",
      "Promotes heart health",
      "Good for joints",
      "Supports vision"
    ]
  }
];

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    const username = e.target[0].value;
    const password = e.target[1].value;
    if (username === "admin" && password === "1234") {
      setIsLoggedIn(true);
    } else {
      alert("Invalid credentials");
    }
  };

  if (!isLoggedIn) {
    return (
      <section
        className="h-screen bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1581092580505-94d6fbd4f0e5?auto=format&fit=crop&w=1470&q=80')",
        }}
      >
        <div className="bg-white bg-opacity-10 backdrop-blur-md border border-white/20 rounded-xl p-8 w-80 shadow-xl text-white text-center">
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              className="w-full mb-4 p-2 rounded bg-white bg-opacity-20 focus:outline-none placeholder-white"
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full mb-4 p-2 rounded bg-white bg-opacity-20 focus:outline-none placeholder-white"
              required
            />
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold"
            >
              Login
            </button>
          </form>
        </div>
      </section>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-green-700 mb-10">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <motion.div
            key={product.id}
            layoutId={`card-${product.id}`}
            className="bg-white shadow-md rounded-md cursor-pointer hover:shadow-xl transition"
            onClick={() => setSelectedProduct(product)}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-t-md"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-center">{product.name}</h2>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              layoutId={`card-${selectedProduct.id}`}
              className="bg-white rounded-lg p-6 max-w-lg w-full relative"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-64 object-cover rounded-md mb-4"
              />
              <h2 className="text-2xl font-bold mb-2 text-green-700">
                {selectedProduct.name}
              </h2>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                {selectedProduct.benefits.map((benefit, idx) => (
                  <li key={idx}>{benefit}</li>
                ))}
              </ul>
              <button
                onClick={() => setSelectedProduct(null)}
                className="mt-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-16 max-w-4xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold text-green-700 mb-4">Company Profile</h2>
        <p className="mb-2">Forever Living Products is the world’s largest grower, manufacturer and distributor of Aloe Vera-based products.</p>
        <p className="mb-2">Founded in 1978, operating in 160+ countries including India since 2000.</p>
        <p className="mb-2">Product Categories: Health drinks, Bee products, Personal care, Nutritional supplements, Weight management.</p>
        <p className="mb-2">Certifications: Halal, Kosher, NSF, Leaping Bunny, IASC Certified.</p>
        <p>Global headquarters: Scottsdale, Arizona, USA.</p>
      </div>
    </div>
  );
}