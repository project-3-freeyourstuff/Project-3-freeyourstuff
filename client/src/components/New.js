import React, { Component } from 'react';
import axios from 'axios';
export default class New extends Component {
  state = {
    title: '',
    category: '',
    description: '',
    condition: ''
  }
  handleSubmit = e => {
    e.preventDefault();
    console.log('this state', this.state)
    const { title, category, description, condition } = this.state;
    axios.post('/api/items/new', {
      title,
      category,
      description,
      condition
    })
    .then(response => {
      console.log(response.data);
      this.setState({
        title: '',
        category: '',
        description: '',
        condition: ''
      })
      this.props.getData();
      this.props.history.push('/');
    })
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          name="title"
          id="title"
          value={this.state.title}
          onChange={this.handleChange}
        />
        <label htmlFor="category">Category:</label>
        <select name="category" id="category">
          <option defaultValue> -- select an option -- </option>
          <option value="books">Books</option>
          <option value="clothing-accessories">Clothing & Accessories</option>
          <option value="electronics">Electronics</option>
          <option value="family-baby">Family & Baby</option>
          <option value="hobbies">Hobbies</option>
          <option value="house-garden">House & Garden</option>
          <option value="music-movies">Music & Movies</option>
          <option value="pets">Pets</option>
          <option value="transports">Transports</option>
          <option value="other">Other</option>
        </select>
        <label htmlFor="title">Description: </label>
        <input
          type="text"
          name="description"
          id="description"
          value={this.state.description}
          onChange={this.handleChange}
        />
        <label htmlFor="condition">Condition:</label>
        <select name="condition" id="condition">
          <option defaultValue> -- select an option -- </option>
          <option value="new">New</option>
          <option value="as-new">As New</option>
          <option value="used-good">Used - Good</option>
          <option value="user-fair">User - Fair</option>
        </select>
        <button type="submit">Add new ad</button>
      </form>
    )
  }
}