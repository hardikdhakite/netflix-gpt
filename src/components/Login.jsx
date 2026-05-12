import React, { useState } from 'react'
import Header from './Header'

const Login = () => {

    const [isSignInForm, setIsSignInForm] = useState(true);

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    };

    return (
        <div className='relative h-screen'>

            <img
                className='absolute h-full w-full object-cover'
                src='https://cdn.mos.cms.futurecdn.net/rDJegQJaCyGaYysj2g5XWY.jpg'
                alt='background'
            />

            <div className='absolute inset-0 bg-black/60'></div>

            <Header />

            <div className='absolute inset-0 flex items-center justify-center'>

                <form className='flex flex-col bg-black/70 p-10 rounded-md w-80'>

                    <h1 className='text-white text-3xl font-bold mb-6'>
                        {isSignInForm ? "Sign In" : "Sign Up"}
                    </h1>

                    {!isSignInForm && (
                        <input
                            type='text'
                            placeholder='Full Name'
                            className='p-3 mb-4 bg-gray-700 text-white rounded-md'
                        />
                    )}

                    <input
                        type='email'
                        placeholder='Email Address'
                        className='p-3 mb-4 bg-gray-700 text-white rounded-md'
                    />

                    <input
                        type='password'
                        placeholder='Password'
                        className='p-3 mb-6 bg-gray-700 text-white rounded-md'
                    />

                    <button
                        type='submit'
                        className='p-3 bg-red-600 text-white rounded-md cursor-pointer'
                    >
                        {isSignInForm ? "Sign In" : "Sign Up"}
                    </button>

                    <p
                        onClick={toggleSignInForm}
                        className='text-white mt-4 cursor-pointer'
                    >
                        {isSignInForm
                            ? "New to Netflix? Sign Up now"
                            : "Already registered? Sign In Now"}
                    </p>

                </form>
            </div>
        </div>
    )
}

export default Login