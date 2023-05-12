import Header from "src/shared/components/Header/Header";

import CreateProductContainer from "../containers/CreateProduct/CreateProduct";

const CreateProduct = () => (
  <>
    <Header hideSearchBar />
    <CreateProductContainer />
  </>
);

export default CreateProduct;
