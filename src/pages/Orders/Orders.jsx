import React from 'react'
import './Orders.css'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import axios from "axios"
import { assets } from '../../assets/assets'


const Orders = ({ url }) => {

  const [Orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(url + "/api/order/list");
    if (response.data.success) {
      setOrders(response.data.data);
      console.log(response.data.data);
    }
    else {
      toast.error("Error")
    }
  }

  const statusHandler = async (event, orderId) => {
    const response = await axios.post(url + "/api/order/status", {
      orderId,
      status: event.target.value
    })
    if (response.data.success) {
      await fetchAllOrders();
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [])

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {Orders.map((Order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className='order-item-food'>
                {Order.items.map((item, index) => {
                  if (index === Order.items.length - 1) {
                    return item.name + " x " + item.quantity
                  }
                  else {
                    return item.name + " x " + item.quantity + " , "
                  }
                })}
              </p>
              <p className="order-item-name">{Order.address.firstName + " " + Order.address.lastName}</p>
              <div className="order-item-address">
                <p>{Order.address.street + ","}</p>
                <p>{Order.address.city + ", " + Order.address.state + ", " + Order.address.country + ", " + Order.address.zipcode}</p>
              </div>
              <p className='order-item-phone'>{Order.address.phone}</p>
            </div>
            <p>Items : {Order.items.length}</p>
            <p>₹{Order.amount}</p>
            <select onChange={(event) => statusHandler(event, Order._id)} value={Order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="delivered">delivered</option>
            </select>

          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
