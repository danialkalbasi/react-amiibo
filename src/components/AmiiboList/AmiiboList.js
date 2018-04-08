import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';
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

        return this.props.list.map((item, index) => this.createList(item, index));
    }

    /**
     * Create the list ui
     * @param {*} item is the amiibo item
     * @param {*} index is the item index
     */
    createList(item, index) {
        return (
            <a key={index} className="list-group-item list-group-item-action">
                <Grid>
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
                </Grid>
            </a>);
    }

    render() {
        return (
            <div className="list-group">
                {this.renderAmiiboList()}
            </div>);
    }
}