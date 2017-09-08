import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import { setAxiosHeaders } from '../util';

class UserRegistration extends Component {
 constructor(){
   super();
   this.state = {
       email: '',
       password: '',
       password_confirmation: '',
       redirect: false
   }
 }

 _signUp = async (e) => {
   e.preventDefault();
   const payload = {
     email: this.state.email,
     password: this.state.password,
     password_confirmation: this.state.password_confirmation
   }
   const response = await axios.post('/auth', payload);
   console.log(response)
   setAxiosHeaders(response.headers);
   this.setState({redirect: true})
   this.props.setuser(response.data.data)
 }


 _handleChange = (e) => {
   const newState = {...this.state};
   newState[e.target.name] = e.target.value;
   this.setState(newState);
 }

 render() {
   if (this.state.redirect){
     return <Redirect to="/account" />
   }
   return (
     <div>
       <form onSubmit={this._signUp}>
         <div>
           <label htmlFor="email">E-mail: </label>
           <input onChange={this._handleChange} type="text" name="email" value={this.state.email} />
         </div>
         <div>
           <label htmlFor="password">Password: </label>
           <input onChange={this._handleChange} type="text" name="password" value={this.state.password} />
         </div>
         <div>
           <label htmlFor="password">Confirm Password: </label>
           <input onChange={this._handleChange} type="text" name="password_confirmation" value={this.state.password_confirmation} />
         </div>

         <button>Sign Up</button>
       </form>
     </div>
   );
 }
}

export default UserRegistration;
