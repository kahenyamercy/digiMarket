import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import OrderSummarry from '../components/orders/OrderSummary'

const Order = () => {
  return (
    <div>
        <Navbar />
        <OrderSummarry />
        <Footer />
    </div>
  )
}

export default Order