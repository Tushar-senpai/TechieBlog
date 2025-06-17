import { useState } from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Logo, Input } from './index'
import { login } from '../store/authSlice'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import Swal from "sweetalert2";
import image from '../../src/assets/Signupimg.svg'
import { motion } from 'framer-motion';

function Signup() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit, watch, setError, clearErrors, formState: { errors } } = useForm()
  const [error, setError] = useState("")

  const create = async (data) => {
    setError("")
    // Validate passwords match
    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match")
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match"
      })
      return
    }

    try {
      const userAccount = await authService.createAccount(data)
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

  const password = watch("password")

  return (
    <div className="font-[sans-serif]">
      <div className="min-h-screen flex flex-col items-center justify-center py-2 px-4">
        <motion.div className="grid md:grid-cols-2 items-center gap-6 max-w-6xl w-full"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}>
          
          {/* Image Section */}
          <motion.div className="max-md:mt-5"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}>
            <img src={image} className="w-full aspect-[71/50] max-md:w-4/5 mx-auto block object-cover" alt="Signup" />
          </motion.div>

          {/* Form Section */}
          <motion.div className="border border-gray-300 rounded-lg p-6 max-w-md shadow-xl max-md:mx-auto"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}>

            {error && <p className="text-red-600 text-center">{error}</p>}
            <form onSubmit={handleSubmit(create)} className="space-y-4">
              <div className="mb-2 flex justify-center">
                <Logo width="100%" className="justify-center" />
              </div>
              <div className="mb-8">
                <h3 className="text-orange-600 text-3xl font-bold">Create Account</h3>
                <p className="text-gray-500 text-sm mt-4 leading-relaxed">Enter your details and start your journey with us.</p>
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">Name</label>
                <Input {...register("name", { required: true })} placeholder="Enter user name" type="text" className="w-full p-3 text-sm border border-gray-300 rounded-lg outline-orange-600" />
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">Email</label>
                <Input {...register("email", { required: true })} placeholder="Enter email" type="email" className="w-full p-3 text-sm border border-gray-300 rounded-lg outline-orange-600" />
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">Password</label>
                <Input {...register("password", { required: true })} placeholder="Enter password" type="password" className="w-full p-3 text-sm border border-gray-300 rounded-lg outline-orange-600" />
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">Confirm Password</label>
                <Input
                  {...register("confirmPassword", { required: "Please confirm your password" })}
                  placeholder="Confirm password"
                  type="password"
                  className="w-full p-3 text-sm border border-gray-300 rounded-lg outline-orange-600"
                />
                {errors.confirmPassword && (
                  <p className="text-red-600 text-sm mt-1">{errors.confirmPassword.message}</p>
                )}
              </div>

              <div className="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 border-gray-300 rounded" required />
                <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-800">I accept the <Link to='/terms' className='text-blue-600 font-semibold hover:underline ml-1'>Terms and Conditions</Link></label>
              </div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.3 }}>
                <Button type="submit" className="w-full shadow-xl py-2.5 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700">Register</Button>
              </motion.div>

              <p className="text-sm text-gray-800 mt-6">Already have an account? <Link to="/login" className="text-blue-600 font-semibold hover:underline ml-1">Sign In</Link></p>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default Signup
