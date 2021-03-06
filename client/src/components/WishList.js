import React from 'react'
import { Link } from 'react-router-dom'

export default function WishList(props) {

  console.log('favourites', props.user.favourites)
  const items = props.user.favourites.map(item => (
    <div key={item._id}>
      <Link to={`/items/${item._id}`}><img className="object-cover h-40 w-40 rounded hover:opacity-70" src={item.imgUrl} alt={item.title}/></Link>
      <h1 className="text-lg mt-2 font-medium hover:underline"><Link to={`/items/${item._id}`}>{item.title}</Link></h1>
      <div>{item.condition}</div>
    </div>
    ))

  return (
    <div>
      <div className="text-2xl flex py-1 px-3 sm:px-10 m-3 sm:m-5 justify-center lg:justify-start">My Wishlist</div>
      <div className="flex px-10 m-10 justify-start align-text-top flex-wrap gap-3">
        {items}
      </div>
    </div>
  )
}