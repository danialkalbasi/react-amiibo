import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import './Header.css';
import logo from './logo.jpg';

export default class Header extends Component {
    render() {
        return (
            <Grid>
                <Row>
                    <Col md={3}>
                        <img alt="logo" className="header-logo" src={logo} />
                    </Col>
                    <Col md={9} className="children-container">
                        {this.props.children}
                    </Col>
                </Row>
            </Grid>
        );
    }
}
