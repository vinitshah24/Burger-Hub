import React, { Component } from 'react';

import './Modal.css';
import Auxillary from '../../../hoc/Auxilary';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

    //Don't rerender Order summary in the popup again and again since it is not shown until clicked
    shouldComponentUpdate(nextProps, nextState) {
        //order summary only update on change in props
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    componentWillUpdate() {
        console.log('[Modal] WillUpdate');
    }

    render() {
        return (
            <Auxillary>
                <Backdrop
                    show={this.props.show}
                    clicked={this.props.modalClosed}
                />
                <div
                    className="Modal"
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </Auxillary>
        )
    }
}

export default Modal;