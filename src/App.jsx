import React, { Suspense, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import SomethingWentWrong from './components/errors/SomethingWentWrong.jsx'
import Loading from './components/loaders/Loading.jsx'

function App() {

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData))
        } else {
          dispatch(logout())
        }
      }) // catch user kar sakte hai
      .finally(() => setLoading(false))
  }, [])

  return (
    <ErrorBoundary fallback={<SomethingWentWrong />}>
      {!loading ? (
        <div className='min-h-screen flex flex-wrap content-between bg-white'>
          <div className='w-full block'>
            <Header />
            <main >
              {/* <span className='mt-48 pt-48 text-2xl'><br />
            Welcome To TechieBlog</span>  */}
              <Suspense fallback={<Loading />}>
                <Outlet />
              </Suspense>
            </main>
            <Footer />
          </div>
        </div>
      ) : <Loading />}
    </ErrorBoundary>
  )
}

export default App
