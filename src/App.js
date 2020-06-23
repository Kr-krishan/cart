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

    // creating shorthand to use firebase.firestore()
    this.db=firebase.firestore();
  }

  componentDidMount(){    

    //reading the data from firebase
    this.db
      .collection('products')     //getting collection, named products
      .onSnapshot((snapshot)=>{    //onsnapShot(listener) automatically reflects changes done in firebase
        console.log(snapshot);

        //getting data from doc in form of object
        snapshot.docs.map((doc)=>{
          console.log(doc.data());
        });

        const products=snapshot.docs.map((doc)=>{
          const data=doc.data();
          data['id']=doc.id;  //entering id of doc inside data to use it uniquely
          return data;
        });

        //now setting state after getting data
        this.setState({
          products,
          loading:false
        })
      })
  }

  // adding product to firebase
  addProduct=()=>{
    this.db
      .collection('products')
      .add({
        title:"washing machine",
        price:2999,
        qty:2,
        img:''
      })
      .then((docRef)=>{
        console.log("new product added",docRef);
      })
      .catch((error)=>{
        console.log("Error: ",error);
      })
  }

  // increase qty of a product
  handleIncreaseQuantity = (product)=>{
    //console.log("increse qty of this",product);
    const{products}=this.state;
    const index=products.indexOf(product);
    
    // products[index].qty+=1;
    
    // this.setState({
    //   products
    // });

    //increase qty in firebase
    const docRef=this.db.collection('products').doc(products[index].id);

    docRef.update({
      qty:products[index].qty+1
    })
    .then(()=>{
      console.log("update successfully");
    })
    .catch((error)=>{
      console.log("error in update:",error);
    })
  }

  // decrease qty of a product
  handleDecreaseQuantity = (product)=>{
    //console.log("decrese qty of this",product);
    const{products}=this.state;
    const index=products.indexOf(product);
    
    // if(products[index].qty>0){
    //     products[index].qty-=1;
    // }  

    // this.setState({
    //   products
    // });

    //decrease qty in firebase
    const docRef=this.db.collection('products').doc(products[index].id);

    if(products[index].qty>0){
      docRef.update({
        qty:products[index].qty-1
      })
      .then(()=>{
        console.log("update successfully");
      })
      .catch((error)=>{
        console.log("error in update:",error);
      })
    }
  }


  // delete a product
  handleDeleteQuantity=(id)=>{
    //const{products}=this.state;
    // const items=products.filter((item)=> id!==item.id);

    // this.setState({
    //   products:items
    // })

    //delete product from firebase
    const docRef=this.db.collection('products').doc(id);

    docRef
      .delete()
      .then(()=>{
        console.log("Deleted successfully");
      })
      .catch((error)=>{
        console.log("error in delete:",error);
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
        <button onClick={this.addProduct}>Add a Product</button>
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
