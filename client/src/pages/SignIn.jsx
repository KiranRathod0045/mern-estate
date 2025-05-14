import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInStart, signInSuccess, signInFailure } from '../../src/redux/user/userSlice'
import { useDispatch, useSelector } from "react-redux";

export default function SignIn() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({})
  const { loading, error } = useSelector((state) => state.user)
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }
  console.log(formData)

  const handleSubmit = async (e) => {
    try {
      dispatch(signInStart())
      e.preventDefault()
      const res = await fetch('/api/auth/signIn',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        })
      const data = await res.json()
      console.log(data)
      if (data.success == false) {
        dispatch(signInFailure(data.message))
        return
      }
      dispatch(signInSuccess(data))
      navigate('/')
    } catch (error) {
      dispatch(signInFailure(error.message))
    }
  }
  return <div className="p-3 max-w-lg mx-auto">
    <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" >
      <input type="email" placeholder="email" className="border p-3 rounded-lg" id="email" onChange={handleChange}></input>
      <input type="password" placeholder="password" className="border p-3 rounded-lg" id="password" onChange={handleChange}></input>
      <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 ">{loading ? 'Loading..' : 'SIGN IN'}</button>
    </form>
    <div className="flex gap-2 mt-5">
      <p>Dont Have an account?</p>
      <Link to={'/sign-up'}><span className="text-blue-700">
        Sign Up</span></Link>
    </div>
    {error && <p className="text-red-500 mt-5">{error}</p>}
  </div>;
}
