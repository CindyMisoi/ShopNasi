import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

// context => state management
const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

   // product and index of the product we want to update in our cart
     let foundProduct;
     let index;

  // dynamic add to cart function
  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );

    // update states
    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    //inc quantity if product is in cart
    if (checkProductInCart) {
      // update items in the cart
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id)
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
      });

      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;

      setCartItems([...cartItems, { ...product }]);
    }

    toast.success(`${qty} ${product.name} added to the cart.`);
  };
  //   Remove item from cart
  const onRemove = (product) => {
    // product to update
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id)

    // update state => total price, total quantity
    setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity);
    setCartItems(newCartItems);
  }

  //   quantity update for our cart items
  const toggleCartItemQuantity = (id, value) => {
       foundProduct = cartItems.find((item) => item._id === id);
       index = cartItems.findIndex((product) => product._id === id);
       const newCartItems = cartItems.filter((item) => item._id !== id);
    //    incrementing and decrementing
    if(value === "inc"){
    //    update state of the cart items
       setCartItems([...newCartItems, {...foundProduct, quantity: foundProduct.quantity + 1} ]) 
       setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
       setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    }

    else if(value === "dec"){
     if(foundProduct.quantity > 1){
    //    update state of the cart items
       setCartItems([...newCartItems, {...foundProduct, quantity: foundProduct.quantity - 1} ]) 
       setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
       setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
     }
    }
  }

  //  dynamic qty update function
  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };
  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  };

  //  create context provider => global state
  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        setCartItems,
        totalPrice,
        setTotalPrice,
        totalQuantities,
        setTotalQuantities,
        incQty,
        decQty,
        onAdd,
        qty,
        toggleCartItemQuantity,
        onRemove
      }}
    >
      {children}
    </Context.Provider>
  );
};

// use the context
export const useStateContext = () => useContext(Context);
