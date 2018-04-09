import React, { Component } from 'react';
import { AmiiboService, HttpMethodsService } from '../../services/';
import { AmiiboList, Search, Header } from '../../components';
import { Button, Glyphicon } from 'react-bootstrap';
import './Dashboard.css';

export default class Dashboard extends Component {
    constructor() {
        super();
        const httpMethodsService = new HttpMethodsService();
        this.amiiboService = new AmiiboService(httpMethodsService);
        this.state = { list: [], clearSearchInput: false };
    }

    componentDidMount() {
        this.getAmbiiboList();
    }

    /**
     * Ge amiibo list and set the state
     */
    getAmbiiboList() {
        this.setState({ clearSearchInput: true });
        this.amiiboService.list().then(result => {
            this.setState({ list: result });
            this.setState({ clearSearchInput: false });
        });
    }

    /**
     * It fires when the user search with character filter
     * @param {*} data 
     */
    onSearchCharacter(data) {
        this.amiiboService.getByCharacter(data.searchText).then(list => {
            this.setState({ list: list });
        });
    }

    /**
     * It fires when the user search with type filter
     * @param {*} data
     */
    onSearchType(data) {
        this.amiiboService.getByType(data.searchText).then(list => {
            this.setState({ list: list });
        });
    }

    /**
     * It fires when the user search with game series filter
     * @param {*} data
     */
    onSearchGameSeries(data) {
        this.amiiboService.getByGameSeries(data.searchText).then(list => {
            this.setState({ list: list });
        });
    }

    /**
     * It fires when the user search with amiibo series filter
     * @param {*} data
     */
    onSearchAmiiboSeries(data) {
        this.amiiboService.getByAmiiboSeries(data.searchText).then(list => {
            this.setState({ list: list });
        });
    }

    /**
     * It fires whenever user sort the list by type
     * @param {*} sortType is the type of the sort
     */
    onListSortByType(sortType) {
        if (sortType === 'asc') {
            this.sortAmiiboAscBy('type');
        }
        else {
            this.sortAmiiboDescBy('type');
        }
    }

    /**
     * It fires whenever user sort the list by name
     * @param {*} sortType is the type of the sort
     */
    onListSortByName(sortType) {
        if (sortType === 'asc') {
            this.sortAmiiboAscBy('name');
        }
        else {
            this.sortAmiiboDescBy('name');
        }
    }

    /**
     * It sort the list by desc order
     * @param {*} fieldName is the name of object field
     */
    sortAmiiboDescBy(fieldName) {
        this.amiiboService.list().then(result => {
            const sorted = result.sort((item, nextItem) => {
                return nextItem[fieldName].localeCompare(item[fieldName]);
            });
            this.setState({ list: sorted });
        });
    }

    /**
     * It order the list by asc order
     * @param {*} fieldName is the name of the field
     */
    sortAmiiboAscBy(fieldName) {
        this.amiiboService.list().then(result => {
            const sorted = result.sort((item, nextItem) => {
                return item[fieldName].localeCompare(nextItem[fieldName]);
            });
            this.setState({ list: sorted });
        });
    }

    render() {
        return (
            <div className="dashboard-container">
                <div className="dashboard-header">
                    <Header>
                        <Search
                            shouldClearInput={this.state.clearSearchInput}
                            onSearchCharacter={(data) => this.onSearchCharacter(data)}
                            onSearchAmiiboSeries={(data) => this.onSearchAmiiboSeries(data)}
                            onSearchGameSeries={(data) => this.onSearchGameSeries(data)}
                            onSearchType={(data) => this.onSearchType(data)}
                        />
                    </Header>
                </div>
                <section>
                    <div className="container list-container">
                        <Button onClick={() => this.getAmbiiboList()} className="view-all-button" bsSize="small">
                            <Glyphicon glyph="th-list" /> View All
                        </Button>
                        <AmiiboList
                            onSortByType={(sort) => this.onListSortByType(sort)}
                            onSortByName={(sort) => this.onListSortByName(sort)}
                            list={this.state.list}>
                        </AmiiboList>
                    </div>
                </section>
            </div>
        );
    }
}
