import { createContext, useState ,useContext} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {  Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { ChakraProvider, chakra } from '@chakra-ui/react'
import Nav from './components/Nav'
import Home from './components/home'
import About from './components/aboutUs'
import ProductById from './components/productCard'
import Cart from './components/cart'
import Spesific from './components/spesific'
import ProductPage from './components/ProductPage'
import FinishOrder from './components/finishOrder'
import { CookiesProvider } from 'react-cookie';
import Login from './components/Login'
import Registrate from './components/registrate'
import AllProducts from './components/allProducts'




function App() {
  const [userName,setUserName]=useState(false)

  const route=createBrowserRouter(
    createRoutesFromElements(
      <>
     <Route path='/' element={<Nav/>} >
          <Route path='home' element={<Home/>}></Route>
          <Route path='products' element={<AllProducts/>}></Route>
          <Route path='about' element={<About/>}></Route>
          {/* <Route path='/products/byId/:id'  element={<ProductById/>}/> */}
          {/* <Route path='cart' element={<Cart/>}/> */}
          <Route path='product' element={<Spesific/>}/>
          <Route path='/products/byName/:name' element={<ProductPage/>}/>
          <Route path='/orders/finishOrder' element={<FinishOrder/>}/>
          <Route path='/Login' element={<Login/>}/>
          <Route path='/Registrate' element={<Registrate/>}/>
      </Route>
      </>
    )
  )

  return (
    <ChakraProvider>
      <CookiesProvider>
      <RouterProvider router={route}>
        </RouterProvider>
      </CookiesProvider>
    </ChakraProvider>
  )
}


export default App

