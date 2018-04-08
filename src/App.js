import React, { Component } from 'react';
import { Dashboard } from './pages/';
import { LoadingBarService } from './services';
import Spinner from 'react-spinkit';

class App extends Component {
  constructor() {
    super();
    this.loadingBarService = new LoadingBarService();
    this.state = { isLoading: false };
    this.loadingBarService.isLoading((data) => this.onLoadingBar(data));
  }

  onLoadingBar(isLoading) {
    console.log(isLoading)
    this.setState({ isLoading: isLoading });
  }

  render() {
    return (
      <div className="container">
        {this.renderLoadingBar()}
        <Dashboard></Dashboard>
      </div>
    );
  }

  renderLoadingBar() {
    const spinner = (
      <div className='loading-bar'>
        <Spinner name="ball-scale-multiple" color="goldenrod" />
      </div>
    );
    return this.state.isLoading ? spinner : null;
  }
}

export default App;
