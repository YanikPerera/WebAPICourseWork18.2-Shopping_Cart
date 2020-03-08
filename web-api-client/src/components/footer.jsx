import React, { Component } from "react";
import { FaFacebookF } from 'react-icons/fa';
import { FaShoppingCart } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';
import '../assets/css/footer.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';

class Footer extends Component {
  render() {
    return (
        <div className="footer-style">
            <Container style={{color:"#6c757d"}}>
                <Row align="center">
                    <Col>
                        <Badge variant="secondary">Email:</Badge> <a href="mailto: support@toyshop.lk"><Badge variant="light">support@toyshop.lk</Badge></a>
                    </Col>
                    <Col>
                        <Badge variant="light"><a href="https://www.facebook.com/MashableToyShop/"><FaFacebookF /> Facebook</a></Badge>
                    </Col>
                </Row>
                <Row align="center">
                    <Col>
                        <Badge variant="secondary">Telephone:</Badge> <a href="tel: +94112345678"><Badge variant="light">011 234 5678</Badge></a>
                    </Col>
                    <Col>
                        <Badge variant="light"><a href="https://www.instagram.com/thetoystorelawrence/"><FaInstagram /> Instagram</a></Badge>
                    </Col>
                </Row>
                <Row align="center">
                    <Col>
                        <Badge variant="secondary">Address:</Badge> <Badge variant="light">No.35, Mahasen Lake, Colombo 5</Badge>
                    </Col>
                    <Col>
                        <Badge variant="light"><a href="https://twitter.com/thetoystoreme"><FaTwitter /> Twitter</a></Badge>
                    </Col>
                </Row>
                <br />
                <center>
                    <b><i>Copyright © 2020 The Toys Shop (Pvt) Ltd</i></b>
                </center>
            </Container>
        </div>
    );
  }
}

export default Footer;