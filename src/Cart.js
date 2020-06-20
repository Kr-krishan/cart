import React from 'react';
import CartItem from './CartItem'

class Cart extends React.Component{
    constructor(){
        super();
        this.state={
            products:[
                {
                    title:"Watch",
                    qty:8,
                    price:99,
                    img:'' ,
                    id:1
                },{
                    title:"Mobile Phone",
                    qty:2,
                    price:999,
                    img:'',
                    id:2
                },
                {
                    title:"Laptop",
                    qty:1,
                    price:2999,
                    img:'',
                    id:3
                }
            ]
        }
    }
    render(){
        const{products}=this.state;
        return(
            <div className="cart"> 
                
                {products.map((product)=> {
                    return (
                        <CartItem 
                            product={product} 
                            key={product.id}
                        />)
                })}
                
            </div>
        )
    }
}



export default Cart;