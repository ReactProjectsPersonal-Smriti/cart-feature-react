import React, { useState, useContext, useReducer, useEffect } from 'react'
import cartItems from './data'
import reducer from './reducer'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = React.createContext()

//initial state defined for useReducer hook
const initialState = {
  loading: false,
  cart: [],
  total: 0,
  amount: 0
}

const AppProvider = ({ children }) => {
  //useReducer hook (same like useState)
  const [state, dispatch] = useReducer(reducer, initialState);

  //calculate total amount and total price when any changes is made to cart
  useEffect(() => {
    dispatch({ type: 'GET_TOTALS' })
  }, [state.cart])

  //increment or decrement item number
  const toggleItem = (id, type) => {
    dispatch({ type: 'TOGGLE_ITEM', payload: { id, type } })
  }

  //dispatch function for clearing cart list
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  // const incrementItem = (id) => {
  //   dispatch({ type: 'INCREMENT_ITEM', payload: id })
  // }

  // const decrementItem = (id) => {
  //   dispatch({ type: 'DECREMENT_ITEM', payload: id })
  // }

  const removeItem = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id })
  }

  //fetch data from api
  const fetchData = async () => {
    //loading screen until api is fetched
    dispatch({ type: 'LOADING' })
    const res = await fetch(url);
    const cart = await res.json();
    //display items after the api is fetched
    dispatch({ type: 'DISPLAY_ITEMS', payload: cart })
  }

  //fetch data function call as soon as the page is rendered
  useEffect(() => {
    fetchData();
  }, [])

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        removeItem,
        toggleItem
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

// custom hook
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
