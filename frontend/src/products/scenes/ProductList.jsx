import Header from "src/shared/components/Header/Header";
// import Categories from "../components/Categories";
import ProductListContainer from "../containers/ProductListContainer";

const ProductList = () => (
  <>
    <Header />
    <div className="px-6 lg:mx-5">
      {/* <Categories extraClasses="pt-3 mb-5" /> */}
      <h1 className="mt-4 mb-3 text-xl font-bold">Fresh Recommendations</h1>
      <ProductListContainer />
    </div>
  </>
);

export default ProductList;
