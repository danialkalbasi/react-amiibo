import React, { Component } from 'react';
import { AmiiboService, HttpMethodsService } from '../../services/';
import { AmiiboList } from '../../components';
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

    render() {
        return (<div className="dashboard-container">
            <AmiiboList list={this.state.list}></AmiiboList>
        </div>);
    }
}
