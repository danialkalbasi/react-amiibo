import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, ListGroupItem, ListGroup } from 'react-bootstrap';
import './AmiiboList.css';

export default class AmiiboList extends Component {
    static propTypes = {
        list: PropTypes.array.isRequired
    }

    static defaultProps = {
        list: []
    }

    /**
     * Render the amiibo list of items
     */
    renderAmiiboList() {
        if (!Array.isArray(this.props.list)) {
            return null;
        }

        return (
            <ListGroup>
                {this.createHeader()}
                {this.props.list.map((item, index) => this.createList(item, index))}
            </ListGroup>)
    }

    /**
     * Create the list ui
     * @param {*} item is the amiibo item
     * @param {*} index is the item index
     */
    createList(item, index) {
        return (
            <ListGroupItem key={index}>
                <Row>
                    <Col md={4}>
                        <div className='item-image-container'>
                            <img className='item-image' alt={item.name} src={item.image} />
                        </div>
                        <p className='item-text item-name'>{item.name}</p>
                        <p className='item-text item-character'>{item.character}</p>
                    </Col>
                    <Col md={2}>
                        <p className='item-text'>{item.type}</p>
                    </Col>
                    <Col md={3}>
                        <p className='item-text'>{item.gameSeries}</p>
                    </Col>
                    <Col md={3}>
                        <p className='item-text'>{item.amiiboSeries}</p>
                    </Col>
                </Row>
            </ListGroupItem>);
    }

    createHeader() {
        return (
            <ListGroupItem>
                <Row>
                    <Col md={4}>
                        <p>Character</p>
                    </Col>
                    <Col md={2}>
                        <p>Type</p>
                    </Col>
                    <Col md={3}>
                        <p>Game Series</p>
                    </Col>
                    <Col md={3}>
                        <p>Amiibo Series</p>
                    </Col>
                </Row>
            </ListGroupItem>
        );
    }

    render() {
        return (
            <div className="list-group">
                {this.renderAmiiboList()}
            </div>);
    }
}