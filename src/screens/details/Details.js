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

  render(){
    return(<div className="mainDiv">
    
       <Header logoutHandler={this.loginredirect} baseUrl= "http://localhost:8080/api/"/><div>
       <div className="resMainDiv">
      <div style={{marginLeft:"2.5%",marginRight:"2.5%"}}>
      <Grid item container>
      <Grid item xs={10} >
          <div >
          <ButtonBase className="image"disableRipple={true}> 
          <img id="imageDisplay" alt={this.state.resData.restaurant_name} src={this.state.resData.photo_URL}/>
          </ButtonBase>
          </div>
          </Grid>
        </Grid>
        </div>
        <Grid item xs={6} container >
        <Grid item xs container direction="column" className="screenSize" spacing={2} >
        <Grid item xs>
          <Typography className="resName">{this.state.resData.restaurant_name}</Typography>
          <Typography id="LocalityCity"> {this.state.locality}-{this.state.city}</Typography><br/>
         
          {(this.state.resData.categories || []).map((category, index) => {
                return (<Typography key={"span" + category.id} display="inline" 
                className="categories " variant="h6">{category.category_name}, </Typography>
                );
              })}</Grid>
              <Grid item container spacing={5}>
                  <Grid item xs={7}  >
                  <span style={{fontWeight:"bolder"}} className="cusRating"><i className="fa fa-star"></i> {this.state.resData.customer_rating}</span>
                  <span className="textResDetails" style={{display:"block",color:"grey",fontSize:20}}>AVERAGE RATING BY</span>
                  <span  className="textResDetails" style={{color:"grey",fontSize:20}}><span className="textResDetails" style={{fontWeight:"bolder",color:"grey",fontSize:20}}>{this.state.resData.number_customers_rated} </span>CUSTOMERS</span>
                
                  </Grid>
                  <Grid item xs={5}>
                <span style={{fontWeight:"bolder"}} className="cusRating"><i className="fa fa-inr"></i>{this.state.resData.average_price}</span>
                  <span className="textResDetails" style={{display:"block",color:"grey",fontSize:20}}>AVERAGE COST FOR</span>
                  <span className="textResDetails" style={{color:"grey",fontSize:20}}>TWO PEOPLE</span>
            
                </Grid>
            </Grid>
            </Grid>
            </Grid>
           </div> 
    </div>
    <div className="orderFunction">
    <div className="orderMenu">
    {(this.state.resData.categories || []).map((category, index) => 
    {
                return (<div key={"div"+category.id}><div key={"sub-div" + category.id}
                className="categoriesCart">{category.category_name} </div>
                <Divider/><br/>
                {
                  category.item_list.map(item => {
                  return(<div key={item.id}>
                   {item.item_type==='VEG'?
                    <div className="menuList"><span >
                      <i className="fa fa-circle" style={{color:"green",width:"1",height:"1"}} aria-hidden="true"></i>
                    </span><span className="itemName">{item.item_name}</span><span className="price">
                      <i className="fa fa-inr"></i> {item.price}</span><span className="addIcon">
                        <IconButton onClick={this.addToCart.bind(this,item,category)}><AddIcon/></IconButton>
                        </span></div>
                    :
                    <div className="menuList"><span>
                      <i className="fa fa-circle" style={{color:"red"}} aria-hidden="true"></i>
                      </span><span className="itemName">{item.item_name}</span><span className="price">
                        <i className="fa fa-inr"></i> {item.price}</span><span className="addIcon">
                          <IconButton onClick={this.addToCart.bind(this,item,category)}><AddIcon/>
                          </IconButton></span></div>
                   }
                    </div>)
                  })
                }</div>
                );
              })}
    </div>
    <div className="myCart"><Card className="cardRoot">
            <CardContent className="cardContentRoot">
            <Badge className="hideBadgeonModal" badgeContent={this.state.cartItems.totalItemCount===0?'0':this.state.cartItems.totalItemCount} color="primary">
    <ShoppingCartIcon/></Badge><span style={{fontWeight:"bold",fontSize:"30px",marginLeft:"6%"}}>My Cart</span><br/><br/>
    <div>                                            {(this.state.cartItems.itemList || []).map((cartItem, index) => (
                      <div className="myCartItemList" key={cartItem.item.id} >
                       
                              <div className="itemNameinCart" >
                                  <span >
                                  {cartItem.item.item_type==="VEG"?
                     <span><span><i className="fa fa-stop-circle-o" style={{color:"green",width:"1",height:"1"}} aria-hidden="true"></i>
                    </span><span >{cartItem.item_name}</span></span>
                    :
                    <span><span>
                      <i className="fa fa-stop-circle-o" style={{color:"red"}} aria-hidden="true"></i>
                      </span><span >{cartItem.item_name}</span></span>
                   }
                                      <span style={{color:"grey", fontSize:20, marginLeft:8}} >{cartItem.item.item_name}</span>
                                  </span>
                              </div> 
                                  <div >
                                    <div  className="addRemove">
                                      <IconButton aria-label="Remove Item" onClick={this.removeAnItemFromCart.bind(this, cartItem, index)}>
                                          <RemoveIcon  style={{fontSize: 22, fontWeight:"bold", fill: 'black'}} />
                                      </IconButton>
                                      <Typography style={{marginTop:"8%", fontSize: 20, fill: 'grey'}}>{cartItem.quantity}</Typography> 
                                      <IconButton aria-label="Add Item"  onClick={this.addAnItemFromCart.bind(this, cartItem, index)}>
                                          <AddIcon style={{fontSize: 22, fontWeight:"bold", fill: 'black'}}/>
                                      </IconButton>     
                                      </div>                                                              
                                  </div>
                                  <div style={{paddingTop:"2%"}}>
                                      <span style={{fontWeight:"bold", color:"grey", fontSize:"120%"}}><i className="fa fa-inr"></i>
                                      <span>  {cartItem.totalItemPrice}</span></span>                                                               
                                  </div>                                                        
                          
                      </div>
                  ))}</div>
                    <Grid item xs container justify="space-between" style={{marginTop: 16}}>
                <Grid item >
                    <Typography style={{fontSize:"170%",fontWeight:"bold"}} gutterBottom className="bold">
                        Total Amount                                                                  
                    </Typography>
                </Grid>
                <Grid item >
                    <Typography style={{fontSize:"170%",fontWeight:"bold"}}  gutterBottom className="bold">
                          <i className="fa fa-inr"></i>
                       <span>  {this.state.cartItems.totalPrice}</span>                                                                 
                    </Typography>
                </Grid>
            </Grid>
              </CardContent>
              <CardActions><Button style={{width:"100%",fontSize:" 20px"}} variant="contained" 
              onClick={this.checkOutCart.bind(this)} color="primary">
                CHECKOUT</Button>
                </CardActions>
    </Card></div>
    </div>
    <Snackbar key={"snack"}
      anchorOrigin={{vertical: 'bottom', horizontal: 'left'}} 
      autoHideDuration={3000}
      open={this.state.snackBarOpen}
      onClose={() => this.setState({ snackBarOpen: false })}
      message={<span id="message-id">{this.state.snackBarMessage}</span>}
      action={
                <IconButton
                color="inherit"
                    >
                    <CloseIcon/>
                </IconButton>
            }
      />
    </div>
    );
      }
    }
    export default (Details);
