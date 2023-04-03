import SectionCard from "../../components/admin/SectionCard";
import ProductIcon from "../../images/product-icon-png-4.jpg";
import UserIcon from "../../images/pngwing.com.png";

const Home = () => {
  return (
    // TODO restrict admin page to only admin user
    <div className="my-14 mx-auto w-4/5 flex flex-wrap justify-center gap-x-[20%] gap-y-10">
      <SectionCard title="products" image={ProductIcon} />
      <SectionCard title="users" image={UserIcon} />
    </div>
  );
};

export default Home;
