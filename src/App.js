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
      </div>
    );
  }
}

export default App;
