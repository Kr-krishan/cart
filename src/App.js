import React from 'react';
import Cart from './Cart';
import Navbar from './Navbar'


class App extends React.Component {

  constructor(){
    super();
    this.state={
      products:[
        {
          title:"Watch",
          qty:8,
          price:99,
          img:'https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' ,
          id:1
        },{
          title:"Mobile Phone",
          qty:2,
          price:999,
          img:'https://images.unsplash.com/photo-1580910051074-3eb694886505?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
          id:2
        },
        {
          title:"Laptop",
          qty:1,
          price:2999,
          img:'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
          id:3
        }
      ]
    }
  }

  handleIncreaseQuantity = (product)=>{
    //console.log("increse qty of this",product);
    const{products}=this.state;
    const index=products.indexOf(product);
    
    products[index].qty+=1;
    
    this.setState({
      products
    });
  }

  handleDecreaseQuantity = (product)=>{
    //console.log("decrese qty of this",product);
    const{products}=this.state;
    const index=products.indexOf(product);
    
    if(products[index].qty>0){
        products[index].qty-=1;
    }  

    this.setState({
      products
    });
  }

  handleDeleteQuantity=(id)=>{
    //console.log("delete",id);
    const{products}=this.state;
    const items=products.filter((item)=> id!==item.id);

    this.setState({
      products:items
    })
  }

  getCartCount=()=>{
    const{products}=this.state;
    let count=0;

    products.forEach((product)=>{
      count+=product.qty;
    })

    return count;
  }

  getCartTotal=()=>{
    const{products}=this.state;
    let CartTotal=0;

    products.forEach((product)=>{
      CartTotal+=(product.qty*product.price);
    })
    return CartTotal;
  }

  render(){
    const{products}=this.state;
    return (
      <div className="App">
        <Navbar count={this.getCartCount()} />
        <Cart 
          products={products}
          onIncreaseQuantity={this.handleIncreaseQuantity}
          onDecreaseQuantity={this.handleDecreaseQuantity}
          onDeleteQuantity={this.handleDeleteQuantity}
        />

        <div style={ {fontSize:20, padding:10} }>
          Total : {this.getCartTotal()} 
        </div>

      </div>

      
    );
  }
}

export default App;
