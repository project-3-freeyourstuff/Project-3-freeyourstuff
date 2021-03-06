import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class ItemsList extends Component {
  render() {  
    if (!this.props.filteredItems) return <></>

    const item = this.props.filteredItems.map(item => (
      <div className="flex flex-col p-6 items-center" key={item._id}>
          {this.props.user ? <Link to={`/items/${item._id}`}><img className="object-cover h-40 w-40 rounded hover:opacity-70" src={item.imgUrl} alt={item.title}/></Link> : <button onClick={() => this.props.updateMessage('Please log in to see item details')}><img className="object-cover h-40 w-40 rounded hover:opacity-70" src={item.imgUrl} alt={item.title}/></button>}
          {this.props.user ? <Link to={`/items/${item._id}`}><h1 className="text-lg mt-2 font-medium hover:underline">{item.title}</h1></Link> : <button className="text-lg mt-2 font-medium hover:underline" onClick={() => this.props.updateMessage('Please log in to see item details')}><h1>{item.title}</h1></button>}
          <div>{item.condition}</div>
          {item.owner.location ? (<>
            <span>{item.owner.location.postCode} {item.owner.location.city}</span>
            <span className="text-gray-400"> ({item.owner.location.country})</span>
            </>) : <span className="text-gray-400">(No location specified)</span>
            }
      </div>
    ))

    return (
      <div className="mt-56 lg:mt-12">
        {this.props.message && (
          <div className="flex justify-center my-4">
            <div className="w-6/12 bg-yellow-100 border border-yellow-400 text-yellow-700 px-5 py-3 mt-10 rounded relative" role="alert">
              <strong className="font-bold">{this.props.message}</strong>
              <button onClick={() => this.props.removeMessage()} class="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-3 mr-4 outline-none focus:outline-none">
                <span>×</span>
              </button>
            </div>
            </div>
        )}
        <div className="grid grid-flow-row grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-1 px-8 py-4 text-sm">
        {item}
        </div>
      </div>
    )
  }
}
