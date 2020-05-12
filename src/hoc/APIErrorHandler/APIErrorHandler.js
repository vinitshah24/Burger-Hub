import React, { Component } from 'react';

import Modal from '../../components/OrderPopup/Modal/Modal';
import Auxilary from '../Auxilary';

//Takes Wrapper component as an input
const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }

        //Setup axios listener
        componentWillMount() {
            // In case of success, set error to null and send the request
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            });
            // In case of failure, set the error
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({ error: error });
            });
        }

        componentWillUnmount() {
            //Deleting the intece[tors once it is already mounted
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null });
        }

        render() {
            return (
                <Auxilary>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Auxilary>
            );
        }
    }
}

export default withErrorHandler;