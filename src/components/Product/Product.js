import React from 'react';
import'./Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee,faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const Product = ({product,handleAdProduct} ) => {
  //  console.log(props.product);
  //  const {product,handleAdProduct} =props;
    const {img,name,seller,price,stock,key}=product;
    return (
        <div className="product">
           
            <div>
                <img src={img} alt=""/>

            </div>
            <div> <h4 className='product-name'><Link to={"/product/"+key}> {name}</Link></h4>
            <br/>
            <p><small>by:{seller}</small></p>
            <br/>
            <p>${price}</p>
            <br/>
            <p><small>Only{stock}left in stock</small></p>
            <button className="main-button"
                onClick={() =>handleAdProduct(product)}>
                <FontAwesomeIcon icon={faShoppingCart} />add to cart</button>
            </div>
            
        </div>
    );
};

export default Product;