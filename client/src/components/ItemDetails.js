import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export default class ItemDetails extends Component {

  state = {
    item: {},
    title: '',
    category: '',
    description: '',
    condition: '',
    imgUrl: '',
    owner: {},
    status: '',
    location: {},
    favourite: false
  }

  getData = () => {
    axios.get(`/api/items/${this.props.match.params.id}`)
      .then(response => {
        this.setState({
          item: response.data,
          title: response.data.title,
          category: response.data.category,
          description: response.data.description,
          condition: response.data.condition,
          imgUrl: response.data.imgUrl,
          status: response.data.status,
          owner: response.data.owner,
          location: response.data.owner.location
        })
      })
      .catch(err => {
        if (err.response.status === 404) {
          this.setState({
            error: 'Not found 🤷‍♀️🤷‍♂️'
          })
        }
      })
  }

  handlePopup = () => {
    this.setState(state => ({
      popup: !state.popup
    }))
  }

  deleteItem = () => {
    axios.delete(`/api/items/${this.state.item._id}`)
      .then(() => {
        this.props.getData();
        this.props.updateMessage('Item deleted succesfully')
        this.props.history.push('/dashboard');
      })
      .catch(err => {
        console.log(err)
      })
  }

  addToFavourites = () => {
    const itemId = this.state.item._id
    axios.put(`/api/user/${this.props.user._id}/favourites`, {
      favourites: itemId
    })
    .then(response => {
      this.setState({
        favourite: true
      })
      this.props.getUser()
    })
    .catch(err => {
      console.log(err)
    })
  }

  removeFromFavourites = () => {
    const itemId = this.state.item._id
    axios.put(`/api/user/${this.props.user._id}/favourites/remove`, {
      favourites: itemId
    })
    .then(response => {
      this.setState({
        favourite: false
      })
      this.props.getUser()
    })
    .catch(err => {
      console.log(err)
    })
  }

  componentDidMount() {
    this.getData();
    this.props.user.favourites.forEach(favourite => {
      if (favourite._id === this.props.match.params.id) {
        this.setState({
          favourite: true
        })
      }
    })
  }

  render() {
    if (this.state.error) return <h2>{this.state.error}</h2>
    return (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:px-8 sm:py-20 sm:gap-x-8 md:py-16">
          <div className="z-10 col-start-1 row-start-1 px-4 pt-20 sm:pt-6 pb-4 bg-gradient-to-t from-black via-transparent sm:bg-none">
            <p className="text-md font-medium text-white sm:mb-1 sm:text-gray-500">{this.state.category}</p>
            <h2 className="text-2xl font-semibold text-white sm:text-2xl sm:leading-7 sm:text-black md:text-3xl">{this.state.title}</h2>
          </div>
          <div className="col-start-1 row-start-2 px-4 py-2 sm:pb-16">
            <div className="flex items-center text-sm font-medium my-3 sm:mt-2 sm:mb-4">
              <div className="ml-1">
                <span className="text-black">{this.state.condition}</span>
                <span className="text-base font-normal mx-2">·</span>
                {this.state.location ? (
                <>
                <span>{this.state.location.street} {this.state.location.number}, {this.state.location.postCode} {this.state.location.city}</span>
                <span className="text-gray-400"> ({this.state.location.country})</span>
                </>
                ) : <span className="text-gray-400">No location specified</span>}
              </div>
            </div>
          <hr className="w-16 border-gray-300 hidden sm:block"></hr>
          <div className="my-4">{this.state.description}</div>
          </div>
          
          <div className="col-start-1 row-start-3 space-y-1 px-4 py-4">
            <div className="flex items-center text-black text-sm font-medium">
            <Link to={`/profile/${this.state.owner._id}`} className="mr-2 bg-gray-100">Given by <span className="underline">{this.state.owner.username}</span></Link>
            </div>
            <div className="flex flex-col text-sm">
              {this.state.owner.phoneNumber && (
                <>
                <span>Tel: {this.state.owner.phoneNumber}</span>
                </>
                )}
              {this.state.owner.email && <span>Email: {this.state.owner.email}</span>}
            </div>
            
            {this.props.user !== null && this.state.owner._id === this.props.user._id}
            
          
          </div>
          <div className="col-start-1 row-start-1 flex sm:col-start-2 sm:row-span-3">
        <div className="w-full grid grid-cols-1 grid-rows-1 gap-2">
          <div className="relative col-span-1 row-span-1 md:col-span-1">
            <img src={this.state.imgUrl} alt={this.state.title} className="absolute inset-0 w-full h-full object-cover bg-gray-100 sm:rounded-lg" />
          </div>
        </div>
      </div>
          {this.props.user !== null && this.state.owner._id === this.props.user._id ? (
            <div className="flex-row py-3">
              <Link to={`/items/${this.state.item._id}/edit`}><button
              className="group relative w-40 justify-center py-2 mx-2 px-4 sm:my-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              type="button">Edit Item</button></Link>
              <button
              className="group relative w-40 justify-center py-2 mx-2 px-4 border-2 text-sm font-medium rounded-md text-red-800 border-red-800 bg-transparent hover:bg-red-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => this.handlePopup()}>Delete Item</button>
                {this.state.popup && (
                  <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

                      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

                      <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                      <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                          <div className="sm:flex sm:items-start">
                            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                              <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                              </svg>
                            </div>
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                              <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                Delete item
                              </h3>
                              <div className="mt-2">
                                <p className="text-sm text-gray-500">
                                  Are you sure you want to delete this item? The item will be permanently removed. This action cannot be undone.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                          <button onClick={() => this.deleteItem()} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                            Delete item
                          </button>
                          <button onClick={() => this.handlePopup()} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
            </div>
          ) : 
            !this.state.favourite ?
            <div className="flex-row py-3">
              <button 
                className="group relative w-40 justify-center py-2 mx-2 px-4 sm:my-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => this.addToFavourites()}>Add to Wishlist</button>
              {/* This button should be a link to the send message component */}
              <button
                className="group relative w-40 justify-center py-2 mx-2 px-4 sm:my-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >Contact owner</button>
            </div> 
            :
            <div className="flex-row py-3">
              <button 
                className="group relative w-50 justify-center py-2 mx-2 px-4 sm:my-1 border border-indigo-600 text-sm font-medium rounded-md text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => this.removeFromFavourites()}>Remove from Wishlist</button>
              {/* This button should be a link to the send message component */}
              <button
                className="group relative w-40 justify-center py-2 mx-2 px-4 sm:my-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >Contact owner</button>
            </div>
            }
        </div>
      </>
    )
  }
}