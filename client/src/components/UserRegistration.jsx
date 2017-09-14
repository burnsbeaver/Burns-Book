import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { setAxiosHeaders } from '../util';

class UserRegistration extends Component {
 constructor(){
   super();
   this.state = {
       errors: [],
       email: '',
       image: '',
       nickname: '',
       password: '',
       password_confirmation: '',
       redirect: false
   }
 }

 _signUp = async (e) => {
   try{
     e.preventDefault();
     const payload = {
       email: this.state.email,
       password: this.state.password,
       password_confirmation: this.state.password_confirmation,
       nickname: this.state.nickname,
       image: this.state.image
     }
     const response = await axios.post('/auth', payload);
     setAxiosHeaders(response.headers);
     this.setState({redirect: true})
     console.log(response.data.data)
     this.props.setuser(response.data.data)
    } catch (err) {
        console.log(err.response.data.errors.full_messages)
        const newState = {...this.state}
        newState.errors = err.response.data.errors.full_messages
        this.setState(newState)
    }
 }


 _handleChange = (e) => {
   const newState = {...this.state};
   newState[e.target.name] = e.target.value;
   this.setState(newState);
 }

 render() {
   const errors = this.state.errors.map((error, i) => {
     return <div key={i}>{error}</div>
   })
   if (this.state.redirect){
     return <Redirect to="/account" />
   }
   return (
     <div>
       {errors}
       <form onSubmit={this._signUp}>
         <div>
           <label htmlFor="email">E-mail: </label>
           <input onChange={this._handleChange} type="text" name="email" value={this.state.email} required/>
         </div>
         <div>
           <label htmlFor="nickname">Username: </label>
           <input onChange={this._handleChange} type="text" name="nickname" value={this.state.nickname} required/>
         </div>
         <div>
           <label htmlFor="image">Profile Image: </label>
           <input onChange={this._handleChange} type="text" name="image" value={this.state.image} />
         </div>
         <div>
           <label htmlFor="password">Password: </label>
           <input onChange={this._handleChange} type="password" name="password" value={this.state.password} required/>
         </div>
         <div>
           <label htmlFor="password">Confirm Password: </label>
           <input onChange={this._handleChange} type="password" name="password_confirmation" value={this.state.password_confirmation} required/>
         </div>

         <button>Sign Up</button>
       </form>
     </div>
   );
 }
}

export default UserRegistration;
