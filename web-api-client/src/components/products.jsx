import React, { Component } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import Product from '../components/product';

class Products extends Component {

    state = {
        allProducts: [],
        buttonColor:"primary"

    };

    async componentDidMount() {
        let { data } = await axios.get("http://localhost:5000/api/products");
        let productsArray = data.map(product => {
          return {
            product_id: product.product_id,
            product_description: product.product_description,
            product_name: product.product_name,
            price: product.price,
            image: product.image,
          };
        });
        this.setState({ allProducts: productsArray });
      }
    
      async addToCart(id){
        this.state.buttonColor="success";
        let oldList = new Array();
        var productArray={};
        let { data } = await axios.get("http://localhost:5000/api/products/"+id+"");
        productArray={
            "product_id": data[0].product_id,
            "product_name": data[0].product_name,
            "price": data[0].price,
            "image": data[0].image,
            "quantity":1,
            "category":data[0].category_id,
            "product_description":data[0].product_description
          };
           console.log(productArray);    
           console.log(oldList);
            oldList = JSON.parse(localStorage.getItem("cart"));
            oldList.push(productArray);
            localStorage.setItem("cart",JSON.stringify(oldList));
            localStorage.setItem("productCount",oldList.length);
            console.log("list"+localStorage.getItem("cart"));

      }

      
  render() {
    
    return (
        <Container>
            <h1 style={{color:"#fff"}} align="center">Products</h1>
            <Row align="center">
            {this.state.allProducts.map(product => (
            <div className="col-sm" key={product.product_id}>
              <Product
                key={product.product_id}
                product_name={product.product_name}
                product_description={product.product_description}
                image={product.image}
                price={product.price}
                add={()=>this.addToCart(product.product_id)}
                buttonColor={this.state.buttonColor}
              />
            </div>
          ))}
            </Row>
        </Container>
    );
  }
}

export default Products;