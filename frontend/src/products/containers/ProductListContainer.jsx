import ProductListItem from 'src/products/components/ProductListItem'

const ProductListContainer = () => {
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 py-2'>
            <ProductListItem />
            <ProductListItem />
            <ProductListItem />
            <ProductListItem />
            <ProductListItem />
            <ProductListItem />
            <ProductListItem />
            <ProductListItem />
            <ProductListItem />
            <ProductListItem />
            <ProductListItem />
            <ProductListItem />
            <ProductListItem />
            <ProductListItem />
        </div>
    );
};

export default ProductListContainer;