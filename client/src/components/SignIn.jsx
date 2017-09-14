import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { setAxiosHeaders } from '../util';

class SignUp extends Component {
 constructor(){
   super();
   this.state = {
       errors: [],
       email: '',
       password: '',
       redirect: false
   }
 }

_signIn = async (e) => {
try {
  e.preventDefault();
  const payload = {
    email: this.state.email,
    password: this.state.password,
  }
    const response = await axios.post('/auth/sign_in', payload);
    setAxiosHeaders(response.headers);
    console.log(response)
    this.setState({redirect: true})
    this.props.setuser(response.data.data)
  } catch (err) {
      console.log(err.response.data)
      const newState = {...this.state}
      newState.errors = err.response.data.errors
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
       <form onSubmit={this._signIn}>
         <div>
           <label htmlFor="email">E-mail: </label>
           <input onChange={this._handleChange} type="text" name="email" value={this.state.email} />
         </div>
         <div>
           <label htmlFor="password">Password: </label>
           <input onChange={this._handleChange} type="password" name="password" value={this.state.password} />
         </div>
         <button>Sign In</button>
       </form>
     </div>
   );
 }
}

export default SignUp;
