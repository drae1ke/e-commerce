import React from "react";
import { createContext } from "react";
import products from '../assets/products';

export const ShopContext = createContext(null);
const ShopProvider = (props ) => {
    const contextValue = {products};
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    ); 
}
export default ShopProvider;