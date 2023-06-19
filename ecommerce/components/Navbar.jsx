import React from 'react'
import Link from 'next/link'
import {AiOutlineShopping} from 'react-icons/ai'
import Cart from './Cart'
import { useStateContext } from '../context/StateContext'
import {FaShopify} from 'react-icons/fa';


const Navbar = () => {
  const {showCart, setShowCart, totalQuantities} = useStateContext();
  return (
    <div className='navbar-container'>
      <p className='logo'>
        <Link href='/'>
          <span>
            <FaShopify/>
            ShopNasi Store
          </span>
          </Link>
      </p>
      <button type='button' className='cart-icon' onClick= {() => setShowCart(true)}>
        <AiOutlineShopping/>
        <span className='cart-item-qty'>{totalQuantities}</span>
      </button>
      {/* show cart only when it is set to true*/}
     {showCart && < Cart />} 
    </div>
  )
}

export default Navbar