import React, { Component } from 'react'
import FastfoodIcon from '@material-ui/icons/Fastfood';
import { Button } from '@material-ui/core';
import { AccountCircle} from '@material-ui/icons';

import "./Header.css";

class Header extends Component {

    constructor() {
        super();
        this.state = {
            loggedIn: sessionStorage.getItem('access-token') === null ? false : true,
            loggedInName: sessionStorage.getItem('customer-name'),
        }
    }

    loginButtonEventHandler = () => {
        this.setState({
            ...this.state,
            isModalOpen: true,
            loginContactNo: "",
            loginContactNoRequired: "dispNone",
            loginPassword: "",
            loginPasswordRequired: "dispNone",
            firstName: "",
            firstNameRequired: "dispNone",
            lastName: "",
            email: "",
            emailRequired: "dispNone",
            invalidEmail: "dispNone",
            signUpPassword: "",
            signUpPasswordRequired: "dispNone",
            signUpContactNo: "",
            signUpContactNoRequired: "dispNone",
            inValidLoginContact: "dispNone",
            invalidPassword: "dispNone",
            notRegisteredContact: "dispNone",
            validPasswordHelpText: "dispNone",
            contactNoRegistered: "dispNone",
            contactHelpText: "dispNone",
        })
       
        if(this.props.changeBadgeVisibility){
            this.props.changeBadgeVisibility();
        }
    }

    profileClickEventHandler = (event) => {
        this.state.anchorEl ? this.setState({ anchorEl: null }) : this.setState({ anchorEl: event.currentTarget });
        this.MenuToggleEventHandler();
    }

    render() {
        return (
            <div>
                <header className="product-head">
                    <FastfoodIcon className="icon-product" fontSize="large" htmlColor="white" />
                    {this.props.showHeaderSearchBox === true &&
                        <span className="search-header">
                        </span>
                    }

                   

                    {this.state.loggedIn !== true ?
                        <Button className="loginButton" size="large" variant="contained" onClick={this.loginButtonEventHandler}>
                            <AccountCircle className="head-login" />
                            LOGIN
                        </Button>
                        : 
                        <Button className="profileButton" size="large" variant="text" onClick={this.profileClickEventHandler}>
                            <AccountCircle className="profile-button-icon" htmlColor="#c2c2c2" />
                            {this.state.loggedInName}
                        </Button>
                    }
                </header>
            </div>
        )
    }
}

export default Header