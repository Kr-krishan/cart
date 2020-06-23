import React from 'react';
import Cart from './Cart';
import Navbar from './Navbar'
import * as firebase from 'firebase';


class App extends React.Component {

  constructor(){
    super();
    this.state={
      products:[],
      loading:true
    }
  }

  componentDidMount(){
    firebase
      .firestore()
      .collection('products')
      .get()
      .then((snapshot)=>{
        console.log(snapshot);

        snapshot.docs.map((doc)=>{
          console.log(doc.data());
        });

        const products=snapshot.docs.map((doc)=>{
          const data=doc.data();
          data['id']=doc.id;
          return data;
        });

        this.setState({
          products,
          loading:false
        })
      })
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
    const{products,loading}=this.state;
    return (
      <div className="App">
        <Navbar count={this.getCartCount()} />
        <Cart 
          products={products}
          onIncreaseQuantity={this.handleIncreaseQuantity}
          onDecreaseQuantity={this.handleDecreaseQuantity}
          onDeleteQuantity={this.handleDeleteQuantity}
        />

        {loading && <h1>Loading Cart Items...</h1>}

        <div style={ {fontSize:20, padding:10} }>
          Total : {this.getCartTotal()} 
        </div>

      </div>

      
    );
  }
}

export default App;
