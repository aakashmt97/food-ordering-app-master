import React, { Component } from "react";
import Header from '../../common/header/Header';
import { Card, CardContent,CardActions} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import CloseIcon from '@material-ui/icons/Close';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import Divider from '@material-ui/core/Divider';
import Button from "@material-ui/core/Button";
import ButtonBase from '@material-ui/core/ButtonBase';
import Snackbar from '@material-ui/core/Snackbar';
import '../../assets/font-awesome-4.7.0/css/font-awesome.min.css';
import './Details.css';
import { IconButton } from "@material-ui/core";

class Details extends Component {
    constructor(props) {
      super(props);
      this.state = {
          resData:[],
          locality:"",
          city:"",
          sum:"0.00",
          snackBarOpen:false,
          cartItems: { 
            restaurant : null, 
            itemList: [], 
            totalPrice: 0, 
            totalItemCount: 0
        }
      }
      this.apiURL = "http://localhost:8080/api/";
  }
}