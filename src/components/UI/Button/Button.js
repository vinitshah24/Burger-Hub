import React, { Component } from 'react';
import Auxilary from '../../../hoc/Auxilary';

import './Button.css';

class Button extends Component {
    render() {
        var btnStyle = 'Button ' + this.props.btnType;
        return (
            <Auxilary>
                <button
                    className={btnStyle}
                    onClick={this.props.clicked}>
                    {this.props.children}
                </button>
            </Auxilary>
        );
    }
}
export default Button;