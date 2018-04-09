import React, { Component } from 'react';
import { AmiiboService, HttpMethodsService } from '../../services/';
import { AmiiboList, Search } from '../../components';
import './Dashboard.css';

export default class Dashboard extends Component {
    constructor() {
        super();
        const httpMethodsService = new HttpMethodsService();
        this.amiiboService = new AmiiboService(httpMethodsService);
        this.state = { list: [] };
    }

    componentDidMount() {
        this.getAmbiiboList();
    }

    /**
     * Ge amiibo list and set the state
     */
    getAmbiiboList() {
        this.amiiboService.list().then(result => {
            this.setState({ list: result });
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

    render() {
        return (
            <div className="dashboard-container">
                <Search
                    onSearchCharacter={(data) => this.onSearchCharacter(data)}
                    onSearchAmiiboSeries={(data) => this.onSearchAmiiboSeries(data)}
                    onSearchGameSeries={(data) => this.onSearchGameSeries(data)}
                    onSearchType={(data) => this.onSearchType(data)}
                />
                <AmiiboList list={this.state.list}></AmiiboList>
            </div>
        );
    }
}
