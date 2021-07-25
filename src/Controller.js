import React,{Component} from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Checkout from './screens/checkout/Checkout';

//Creating controller class for easy routing the pages
class Controller extends Component{
    constructor(){
        super()
        this.baseUrl = "http://localhost:8080/api/" //setting the baseUrl of the api
    }

    render(){
        return(
            <Router>
                <div className = 'main-conatiner'>
                    <Route path='/checkout' render={(props) => <Checkout {...props} baseUrl={this.baseUrl} />} /> {/* Route to Checkout Page */}
                </div>
            </Router>
        )
    }

}

export default Controller;