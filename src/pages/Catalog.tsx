import * as React from 'react';
import { Box } from '@mui/material';
import { Layout } from "../components";
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { createRandomProduct } from '../features/createRandomProduct';
import { addRandomProducts } from '../features/products/productsSlice';
import { ShortCard } from '../components/Card/ShortCard';


export const Catalog: React.FC = () => {
    const dispatch = useAppDispatch();
    const products = useAppSelector((state) => state.products);

    const showMoreBtnHandler = (): void => {
        const newProducts = Array.from({ length: 4 }, (_, index) => createRandomProduct(products.length + 1 + index));
        dispatch(addRandomProducts(newProducts));
    };
    return(
        <Layout title={"Welcome to Otus Online Store"}>
            <>
            {products.map(( item ) => <ShortCard key={item.id} item={item} />)}
            </>
        </Layout>
    )
}
