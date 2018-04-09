import React, { Component } from 'react';
import { FormControl, Button, Col, Row, DropdownButton, MenuItem } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './Search.css';

export default class Search extends Component {
    static propTypes = {
        onSearchCharacter: PropTypes.func.isRequired,
        onSearchGameSeries: PropTypes.func.isRequired,
        onSearchAmiiboSeries: PropTypes.func.isRequired,
        onSearchType: PropTypes.func.isRequired,
        shouldClearInput: PropTypes.bool
    }

    constructor(props) {
        super(props);
        this.state = { selectedOption: { title: '' }, searchText: '' };
    }

    componentDidMount() {
        this.setDefaults();
    }

    componentWillReceiveProps() {
        if (this.props.shouldClearInput) {
            this.setState({ searchText: '' });
        }
    }

    /**
     * Set defaults values
     */
    setDefaults() {
        const options = this.getDropDownOptions();
        this.setState({ selectedOption: options[0] });
    }

    /**
     * It renders the dropdown control
     */
    renderDropDown() {
        return (
            <DropdownButton
                className="search-dropdown-button"
                title={this.state.selectedOption.title}
                id={`dropdown-filter`}
                onSelect={(data) => this.onChangeDropDownTitle(data)}>
                {this.createDropDownOptions()}
            </DropdownButton>
        )
    }

    /**
     * Return the dropdown options as an array
     */
    getDropDownOptions() {
        const options = [
            {
                key: 1,
                title: 'Character',
                onSearch: (data) => this.props.onSearchCharacter(data)
            },
            {
                key: 2,
                title: 'Game Series',
                onSearch: (data) => this.props.onSearchGameSeries(data)
            },
            {
                key: 3,
                title: 'Amiibo Series',
                onSearch: (data) => this.props.onSearchAmiiboSeries(data)
            },
            {
                key: 4,
                title: 'Type',
                onSearch: (data) => this.props.onSearchType(data)
            },
        ];

        return options;
    }

    /**
     * Render the dropdown options
     */
    createDropDownOptions() {
        let options = this.getDropDownOptions();

        return options.map(item => {
            return <MenuItem key={item.key} eventKey={item.key}>{item.title}</MenuItem>
        });
    }

    /**
     * It fires when the dropdown item get change
     * @param {*} key is the dropdown key
     */
    onChangeDropDownTitle(key) {
        const findOption = this.getDropDownOptions().find(options => options.key === key);
        this.setState({ selectedOption: findOption });
    }

    /**
     * It fires when the search button get clicked
     * It send back the category and the search text
     */
    onSeachClick(event) {
        event.preventDefault();
        if (this.state.searchText) {
            const data = {
                searchText: this.state.searchText
            };

            this.state.selectedOption.onSearch(data);
        }
    }

    onSeachEnter(event) {
        if (event.key === 'Enter') {
            this.onSeachClick(event)
        }
    }

    /**
     * Change the searchText state whenever the input is changed
     * @param {*} event is the text input event
     */
    onSearchTextChange(event) {
        const searchText = event.target.value;

        this.setState({ searchText: searchText })
    }

    render() {
        return (
            <div className="search-form-container">
                <Row xs={12}>
                    <Col md={12} xs={12} className="search-form-inner">
                        {this.renderDropDown()}
                        <FormControl value={this.state.searchText} onKeyPress={(event) => this.onSeachEnter(event)} className="search-form-input" onChange={(event) => this.onSearchTextChange(event)} type="text" required placeholder="Search" />
                        <Button
                            type="button"
                            className="search-form-button"
                            bsStyle="success"
                            onClick={(event) => this.onSeachClick(event)}>
                            Search</Button>
                    </Col>
                </Row>
            </div >
        );
    }
}