import Header from "src/shared/components/Header/Header";
import Categories from "../components/Categories";
import ProductListContainer from "../containers/ProductListContainer";

const ProductList = () => (
  <>
    <Header />
    <Categories extraClasses="py-3" />
    <ProductListContainer />
  </>
);

export default ProductList;
