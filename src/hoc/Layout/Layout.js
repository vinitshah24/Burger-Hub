import React, { Component } from 'react';
import Auxillary from '../Auxilary';
import Header from '../../components/Navigation/Header/Header';
import Footer from '../../components/Footer/Footer';
import './Layout.css';

class Layout extends Component {
    render() {
        return (
            <Auxillary>
                <Header />
                <main className="content">
                    {this.props.children}
                </main>
                <Footer />
            </Auxillary>
        )
    }
}

export default Layout;