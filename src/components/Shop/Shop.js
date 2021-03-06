import React, { useState,useEffect } from 'react';
import fakeData from '../../fakeData';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import { Link } from 'react-router-dom';
import './Shop.css';

const Shop = () => {
    const first10= fakeData.slice(0,10); 
    const [products,setProducts]= useState(first10);
    const [cart, setCart]=useState([]);

    useEffect (() =>{
        const savedCart = getDatabaseCart();
        const productKeys =Object.keys(savedCart);
        const previousCart = productKeys.map(existingKey =>{
            const product =fakeData.find(pd => pd.key ===existingKey );
            product.quantity=savedCart[existingKey];
            return product;
        })
        console.log(productKeys);
    },[])


    const handleProduct =(product)=>{
        const toBeAddedKey =product.key;
        const sameProduct = cart.find(pd=>pd.key === toBeAddedKey);
        let count= 1;
        let newCart ;
        if(sameProduct){
            const count =sameProduct.quantity + 1;
            sameProduct.quantity= count;
            const others =cart.filter(pd => pd.key !== toBeAddedKey);
            newCart =[...others,sameProduct]
        }
        else{
            product.quantity= 1;
            newCart= [...cart,product];
        }
       
       
        
        setCart(newCart);
        
         addToDatabaseCart(product.key,count);
    
         
    }
    
       return (
        <div className="twin-container">
           <div className="product-container">
     
                {
                    products.map(pd => <Product 
                        key={pd.key}
                        handleAdProduct={handleProduct}
                        product={pd}></Product>)
                    
                }
         

           </div>
           <div className="cart-container">
              <Cart cart={cart}></Cart>
              <Link to ="/review"><button className="main-button"> 
           Review Order</button></Link>

           </div>
           
          
            
        </div>
    );
};

export default Shop;