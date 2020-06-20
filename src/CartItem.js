import React from 'react';

class CartItem extends React.Component{

    constructor(){
        super();
        this.state={
            price:999,
            title: 'Mobile phone',
            qty:1,
            img: ''
        }
        //this.increaseQuantity=this.increaseQuantity.bind(this)
    }

    increaseQuantity =() => {
        //console.log('this.state',this.state.qty);
        
        //1st form of setState
        // this.setState({
        //     qty:this.state.qty+1
        // })

        //2nd form of setState -> if prevState is required
        this.setState((prevState) => {
            return {
                qty:this.state.qty+1
            }
        })
    }

    decreaseQuantity =() => {
        //console.log('this.state',this.state.qty);

        //2nd form of setState -> if prevState is required
        this.setState((prevState) => {
            if(prevState.qty>1){
                return {
                    qty:this.state.qty-1
                }
            }
        })
    }

    render(){
        const{price,qty,title}=this.state;
        return (
            <div className="cart-item">
                <div className="left-block">
                    <img style={styles.image} />
                </div>
                <div className="right-block">
                    <div style={ {fontSize:25} }> {title} </div>
                    <div style={ {color:'#777'} }>Rs {price} </div>
                    <div style={ {color:'#777'} }>Qty {qty} </div>
                    <div className="cart-item-actions">
                        {/* buttons */}
                        <img 
                            alt="increase" 
                            className="action-icons" 
                            src="https://image.flaticon.com/icons/svg/992/992651.svg" 
                            onClick={this.increaseQuantity}
                        />
                        <img 
                            alt="decrease" 
                            className="action-icons" 
                            src="https://image.flaticon.com/icons/svg/1665/1665612.svg" 
                            onClick={this.decreaseQuantity}
                        />
                        <img 
                            alt="delete" 
                            className="action-icons" 
                            src="https://image.flaticon.com/icons/svg/1214/1214428.svg" 
                        />
                    </div>
                </div>

            </div>
        );
    }
}

const styles={
    image:{
        height:110,
        width:110,
        borderRadius:4,
        backgroundColor:'#ccc'
    }
}

export default CartItem;