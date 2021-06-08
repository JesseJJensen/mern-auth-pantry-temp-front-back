import React, { useEffect, useState } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import Navbar from './components/Navbar'
import Signup from './components/Signup'
import Login from './components/Login'
import Profile from './components/Profile'
import Welcome from './components/Welcome'
import About from './components/About'
import Footer from './components/Footer'

import Pantry from './pages/Pantry'
import MyRecipes from './pages/MyRecipes'
import CookNow from './pages/CookNow'
import Search from './pages/Search'
import ShoppingList from './pages/ShoppingList'
import RecipeInfo from './pages/RecipeInfo'
import AddRecipe from './pages/AddRecipe'

import './App.css'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = localStorage.getItem('jwtToken')
  return (
    <Route
      {...rest}
      render={(props) => {
        return user ? (
          <Component {...rest} {...props} />
        ) : (
          <Redirect to='/login' />
        )
      }}
    />
  )
}

function App() {
  // set state values
  let [currentUser, setCurrentUser] = useState('')
  let [isAuthenticated, setIsAuthenticated] = useState(true)

  useEffect(() => {
    let token
    if (!localStorage.getItem('jwtToken')) {
      setIsAuthenticated(false)
    } else {
      token = jwt_decode(localStorage.getItem('jwtToken'))
      setAuthToken(localStorage.jwtToken)
      setCurrentUser(token)
      setIsAuthenticated(true)
    }
  }, [])

  const nowCurrentUser = (userData) => {
    console.log('nowCurrentUser is working...')
    setCurrentUser(userData)
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    if (localStorage.getItem('jwtToken')) {
      localStorage.removeItem('jwtToken')
      setCurrentUser(null)
      setIsAuthenticated(false)
    }
  }

  console.log('Current User', currentUser)
  console.log('Authenicated', isAuthenticated)

  return (
    <div>
      <Navbar handleLogout={handleLogout} isAuth={isAuthenticated} />
      <div className='container mt-5'>
        <Switch>
          <Route path='/signup' component={Signup} />
          <Route
            path='/login'
            render={(props) => (
              <Login
                {...props}
                nowCurrentUser={nowCurrentUser}
                setIsAuthenticated={setIsAuthenticated}
                user={currentUser}
              />
            )}
          />
          <Route path='/about' component={About} user={currentUser} />

          <PrivateRoute path='/pantry' component={Pantry} user={currentUser} />

          <PrivateRoute
            path='/myrecipes'
            component={MyRecipes}
            user={currentUser}
          />

          <PrivateRoute
            path='/cooknow'
            component={CookNow}
            user={currentUser}
          />

          <PrivateRoute path='/search' component={Search} user={currentUser} />

          <PrivateRoute
            path='/shoppinglist'
            component={ShoppingList}
            user={currentUser}
          />
          <PrivateRoute
            path='/recipeinfo'
            component={RecipeInfo}
            user={currentUser}
          />
          <PrivateRoute
            path='/addrecipe'
            component={AddRecipe}
            user={currentUser}
          />

          <PrivateRoute
            path='/profile'
            component={Profile}
            user={currentUser}
          />
          <Route exact path='/' component={Welcome} />
        </Switch>
      </div>
      <Footer />
    </div>
  )
}

export default App
