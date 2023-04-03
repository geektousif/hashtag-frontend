import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Product from "./Product";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { token } = JSON.parse(localStorage.getItem("user"));

  const fetchProducts = async () => {
    const config = {
      headers: {
        authorization: `Token ${token}`,
      },
    };
    setLoading(true);
    try {
      const response = await axios.get("products/", config);

      setProducts(response.data);
      console.log(products);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="w-4/5 mx-auto py-3 mt-6 flex flex-wrap gap-6">
      {/* FIXME CSS certain number of product each line */}
      {loading && <div>Loading</div>}
      {!loading &&
        products.map((item, key) => (
          <Link to={`productPage/${item.id}`}>
            <Product
              key={key}
              imageUrl={item.display_image}
              name={item.title}
              price={item.price}
            />
          </Link>
        ))}
    </div>
  );
};

export default Products;
