import React, { Component } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { FaCartPlus } from 'react-icons/fa';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';

class Product extends Component {
  state = {
    product_name:null,
    image:"",
    product_name:"",
    price:"",
    quantity:"",
    product_description:"",
  };

  render() {
    return (
        <Col style={{ marginBottom: '0.8rem' }}>
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={this.props.image} />
            <Card.Body>
                <Card.Title>{this.props.product_name}</Card.Title>
                <Card.Text>
                   {this.props.product_description}
                    <p>
                        <Badge variant="secondary">Rs {this.props.price}</Badge>
                    </p>
                </Card.Text>
                <Button variant={this.props.buttonColor} onClick={this.props.add}><FaCartPlus /> Add To Cart</Button>
            </Card.Body>
        </Card>
        </Col>
    );
  }
 
}
export default Product;
