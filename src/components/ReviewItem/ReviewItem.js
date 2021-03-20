import React from 'react';

const ReviewItem = (props) => {
    const{name,quantity,key,price} = props.product;
    const reviewItemStyle={borderBottom:'1px solid lightgray',
marginBottom:'5px',
paddingBottom:'5px'
}
    return (
        <div style={reviewItemStyle} className="review-item">
            <h6 className="product-name">This is to review {name}</h6>
            <h6>Quantity{quantity}</h6>
            <p><small>${price}</small></p>
            <button className="main-button"  onClick ={() =>props.removeProduct(key)}> Remove
            </button>
        </div>
    );
};

export default ReviewItem;