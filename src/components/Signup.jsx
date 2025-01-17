import { useState } from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Logo, Input } from './index'
import { login } from '../store/authSlice'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import Swal from "sweetalert2";

function Signup() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()
  const [error, setError] = useState("")

  const create = async (data) => {
    setError("")
    try {
        const userAccount = await authService.createAccount(data)
        console.log(userAccount);
        if (userAccount) {
            Swal.fire({
                icon: 'success',
                title: 'Account Created Successfully!',
                text: 'Please check your email to verify your account before logging in.',
                confirmButtonText: 'OK',
            }).then(() => {
                navigate('/login')
            })
        }
    } catch (error) {
        setError(error.message)
        Swal.fire({
            icon: "error",
            title: "Registration Failed!",
            text: error.message || "An error occurred during registration.",
            confirmButtonText: "Try Again",
        })
    }
  }

  return (
    <div className='flex items-center justify-center'>
      <div className={`mx-auto w-full max-w-lg bg-gray-100 dark:bg-gray-800 rounded-xl p-10 border border-black/10 dark:border-gray-600`}>

        <div className='mb-2 flex justify-center'>
          <span className='inline-block w-full max-w-[100px]'>
            <Logo width='100%' className="justify-center" />
          </span>
        </div>

        <h2 className="text-center text-3xl font-bold leading-tight text-shadow dark:text-gray-200">Sign up to your account</h2>
        <p className="mt-2 text-center text-base text-black/60 dark:text-gray-400">
          Already have an account?&nbsp;
          <Link to="/login" className="font-medium text-primary dark:text-orange-400 transition-all duration-200 hover:underline">
            Sign In
          </Link>
        </p>

        {error && <p className="text-red-600 dark:text-red-400 mt-8 text-center"> {error} </p>}

        <form onSubmit={handleSubmit(create)} className="mt-8">
          <div className='space-y-5'>
            <Input

              className="hover-input focus:border-blue-500 focus:ring-2 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105"
              label={<strong className="dark:text-gray-300">Full Name:</strong>}
              placeholder="Enter your full Name"
              {...register("name", {
                required: true,
              })}
            />
            <Input
              className="hover-input focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105"
              label={<strong className="dark:text-gray-300">Email:</strong>}
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be a valid address",
                },
              })}
            />
            <Input
              className="hover-input focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105"
              label={<strong className="dark:text-gray-300">Password:</strong>}
              type="password"
              placeholder="Enter Your Password"
              {...register("password", {
                required: true,
              })}
            />
            <p>By creating account, you agree with the </p>
            <p><Link to='/terms' className='terms'>Terms and conditions</Link></p>
            <Button
              type="submit"
              className="w-full bg-primary dark:bg-orange-400 dark:text-gray-800 hover:bg-primary/90 dark:hover:bg-orange-500 transition-all"
            >
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>

  )
}

export default Signup
