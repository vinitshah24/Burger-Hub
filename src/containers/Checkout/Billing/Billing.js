import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';

import './Billing.css';

class Billing extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    //POST ORDER
    orderHandler = (event) => {
        event.preventDefault();
        //Spin up a spinner until the process is completed
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Customer',
                address: {
                    street: 'Streetz',
                    zipCode: '28109',
                    country: 'USA'
                },
                email: 'test@email.com'
            },
            deliveryMethod: 'Express'
        }
        //.json required for Firebase
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false});
                console.log("ORDERS.JSON RESPONSE");
                console.log(response);
                //Go back to the home page
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ loading: false});
            });

    }

    render() {
        let form = (
            <form>
                <input className="Input" type="text" name="name" placeholder="Your Name" />
                <input className="Input" type="email" name="email" placeholder="Your Mail" />
                <input className="Input" type="text" name="street" placeholder="Street" />
                <input className="Input" type="text" name="postal" placeholder="Postal Code" />
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className="ContactData">
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default Billing;