import React, { useEffect,useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Review.css';
import happyImage from '../../images/giphy.gif';
import { useHistory } from 'react-router';

const Review = () => {
    const [cart, setCart] =useState([]);
    const [orderPlaced,setOrderPlaced]= useState(false);
     const history = useHistory() 
    const handleProceedCheckOut =() => {
        history.push('/shipment')
      
    }
    const removeProduct = (productKey)=>{
        console.log('remove clicked')
        const newCart =cart.filter(pd =>pd.key !== productKey)
        setCart(newCart)
        removeFromDatabaseCart(productKey);
    }
    useEffect(() =>{
        const savedCard = getDatabaseCart();
        const productKeys=Object.keys(savedCard);
        const cartProducts =productKeys.map(key => {
        const product = fakeData.find (pd => pd.key === key);
        product.quantity =savedCard[key];

        return product;
    });
    setCart(cartProducts);
    },[]);
    let thankyou; 
    if(orderPlaced){
        thankyou=<img src={happyImage} alt=""/>
    }
    return (
        <div className="review twin-container">
             <div className="product-container">
             {
                 cart.map(pd =>  <ReviewItem 
                    
                    key={pd.key}
                    removeProduct ={removeProduct}
                    product ={pd}></ReviewItem>)
             }
             {thankyou}
             </div>
             <div className="cart-container">
                 <Cart cart={cart}></Cart>
                 <button onClick={handleProceedCheckOut} className="main-button">Proceed Checkout</button>

             </div>
            
        </div>
    );
};

export default Review;