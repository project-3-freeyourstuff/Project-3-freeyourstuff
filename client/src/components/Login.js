import React, { Component } from 'react'
import { login } from '../services/auth';

export default class Login extends Component {

  state = {
    username: '',
    password: '',
    message: ''
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { username, password } = this.state;
    login(username, password)
      .then(response => {
        if (response.message) {
          this.setState({
            message: response.message,
            username: '',
            password: ''
          })
        } else {
          console.log(response);
          // we now put the user in the state of App.js
          this.props.setUser(response);
          this.props.history.push('/');
        }
      })
  }

  render() {
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">Username: </label>
          <input
            id="username"
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <label htmlFor="password">Password: </label>
          <input
            id="password"
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <button type="submit">Log in</button>
          {this.state.message && (
            <h3>{this.state.message}</h3>
          )}
        </form>
      </div>
    )
  }
}