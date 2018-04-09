import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, ListGroupItem, ListGroup, Glyphicon } from 'react-bootstrap';
import './AmiiboList.css';

export default class AmiiboList extends Component {
    static propTypes = {
        list: PropTypes.array.isRequired,
        onSortByType: PropTypes.func.isRequired,
        onSortByName: PropTypes.func.isRequired,
    }

    static defaultProps = {
        list: []
    }

    constructor(props) {
        super(props);
        this.state = { sortByType: 'asc', sortByName: 'asc' }
    }

    /**
     * Render the amiibo list of items
     */
    renderAmiiboList() {
        if (!Array.isArray(this.props.list)) {
            return null;
        }

        return (
            <div>
                <ListGroup>
                    {this.createHeader()}
                    {!this.props.list.length ? this.createNoItemsMessage() : null}
                    {this.props.list.map((item, index) => this.createListItem(item, index))}
                </ListGroup>
            </div>
        );
    }

    /**
     * Create the list ui
     * @param {*} item is the amiibo item
     * @param {*} index is the item index
     */
    createListItem(item, index) {
        return (
            <ListGroupItem key={index} className={index === 0 ? 'item-first' : ''}>
                <Row>
                    <Col md={1} xs={12}>
                        <p className='item-text item-number'>{index + 1}</p>
                    </Col>
                    <Col md={3} xs={12}>
                        <div className='item-image-container'>
                            <img className='item-image' alt={item.name} src={item.image} />
                        </div>
                        <p className='item-text item-name'>{item.name}</p>
                    </Col>
                    <Col md={2} xs={12}>
                        <p className='item-text item-character'>{item.character}</p>
                    </Col>
                    <Col md={2} xs={12}>
                        <p className='item-text item-amiibo-series'>{item.amiiboSeries}</p>
                    </Col>

                    <Col md={2} xs={12}>
                        <p className='item-text item-game-series'>{item.gameSeries}</p>
                    </Col>

                    <Col md={2} xs={12}>
                        <p className='item-text item-type'>{item.type}</p>
                    </Col>

                </Row>
            </ListGroupItem>);
    }

    createHeader() {
        return (
            <ListGroupItem className="list-header">
                <Row>
                    <Col md={1}>
                        <p className="list-header-title">#</p>
                    </Col>
                    <Col md={3}>
                        <p className="list-header-title" onClick={() => this.sortByName()}>
                            Name
                        <Glyphicon className={this.toggleSortIcon(this.state.sortByName)} glyph="sort" />
                        </p>
                    </Col>
                    <Col md={2}>
                        <p className="list-header-title">Character</p>
                    </Col>
                    <Col md={2}>
                        <p className="list-header-title">Amiibo Series</p>
                    </Col>
                    <Col md={2}>
                        <p className="list-header-title">Game Series</p>
                    </Col>
                    <Col md={2}>
                        <p className="list-header-title" onClick={() => this.sortByType()}>
                            Type
                        <Glyphicon className={this.toggleSortIcon(this.state.sortByType)} glyph="sort" />
                        </p>
                    </Col>
                </Row>
            </ListGroupItem>
        );
    }

    sortByType() {
        if (this.state.sortByType === 'asc') {
            this.props.onSortByType(this.state.sortByType);
            this.setState({ sortByType: 'desc' });
        }
        else {
            this.props.onSortByType('desc');
            this.setState({ sortByType: 'asc' });
        }
    }

    sortByName() {
        if (this.state.sortByName === 'asc') {
            this.props.onSortByName(this.state.sortByName);
            this.setState({ sortByName: 'desc' });
        }
        else {
            this.props.onSortByName('desc');
            this.setState({ sortByName: 'asc' });
        }
    }

    toggleSortIcon(sortType) {
        return sortType === 'asc' ? 'list-header-icon-asc' : 'list-header-icon-desc';
    }

    createNoItemsMessage() {
        return (
            <ListGroupItem className="no-items-message">
                <Row>
                    <Col md={12}>
                        <p>There is no item</p>
                    </Col>
                </Row>
            </ListGroupItem>
        );
    }

    render() {
        return (
            <div className="list-container">
                {this.renderAmiiboList()}
            </div>);
    }
}