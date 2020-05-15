import React, { Component } from 'react';
import { connect } from 'react-redux';

import Auxillary from '../Auxilary';
import Header from '../../components/Navigation/Header/Header';
import Footer from '../../components/Footer/Footer';

import './Layout.css';

class Layout extends Component {
    render() {
        return (
            <Auxillary>
                <Header isAuth={this.props.isAuthenticated} />
                <main className="content">
                    {this.props.children}
                </main>
                <Footer />
            </Auxillary>
        )
    }
}

const mapStateToProps = state => {
    return {
        //Check if authenticated
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(Layout);