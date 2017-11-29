import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import Header from '../../../Shared/Components/Header/Header';
import Routes from '../../../../routes';

class App extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <Header/>
                <Routes/>
            </div>
        )
    }
}

export default App;
