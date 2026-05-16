import React, { useState, useRef } from "react";
import { supabase } from "../utils/supabase";
import { useNavigate } from "react-router-dom";

import { checkValidData } from "../utils/validate";
import Header from "./Header";

const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    const navigate = useNavigate();

    const email = useRef(null);
    const password = useRef(null);
    const name = useRef(null);

    const handleButtonClick = async () => {

        const message = checkValidData(
            email.current.value,
            password.current.value,
            name.current?.value
        );

        setErrorMessage(message);

        if (message) return;

        if (!isSignInForm) {

            const { data, error } = await supabase.auth.signUp({
                email: email.current.value,
                password: password.current.value,
                options: {
                    data: {
                        full_name: name.current.value,
                    },
                },
            });

            if (error) {
                setErrorMessage(error.message);
                return;
            }

            console.log(data);

            if (data.session) {
                navigate("/browse");
            } else {
                alert("Check your email to confirm signup");
            }

        } else {

            const { data, error } =
                await supabase.auth.signInWithPassword({
                    email: email.current.value,
                    password: password.current.value,
                });

            if (error) {
                setErrorMessage(error.message);
                return;
            }

            console.log(data);

            navigate("/browse");
        }
    };

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
        setErrorMessage(null);
    };

    return (
        <div className="relative h-screen">

            <img
                className="absolute h-full w-full object-cover"
                src="https://cdn.mos.cms.futurecdn.net/rDJegQJaCyGaYysj2g5XWY.jpg"
                alt="background"
            />

            <div className="absolute inset-0 bg-black/60"></div>

            <Header />

            <div className="absolute inset-0 flex items-center justify-center">

                <form
                    onSubmit={(e) => e.preventDefault()}
                    className="flex flex-col bg-black/70 p-10 rounded-md w-80"
                >

                    <h1 className="text-white text-3xl font-bold mb-6">
                        {isSignInForm ? "Sign In" : "Sign Up"}
                    </h1>

                    {!isSignInForm && (
                        <input
                            ref={name}
                            type="text"
                            placeholder="Full Name"
                            className="p-3 mb-4 bg-gray-700 text-white rounded-md outline-none"
                        />
                    )}

                    <input
                        ref={email}
                        type="email"
                        placeholder="Email Address"
                        className="p-3 mb-4 bg-gray-700 text-white rounded-md outline-none"
                    />

                    <input
                        ref={password}
                        type="password"
                        placeholder="Password"
                        className="p-3 mb-4 bg-gray-700 text-white rounded-md outline-none"
                    />

                    {errorMessage && (
                        <p className="text-red-500 text-sm mb-4">
                            {errorMessage}
                        </p>
                    )}

                    <button
                        type="submit"
                        onClick={handleButtonClick}
                        className="p-3 bg-red-600 text-white rounded-md cursor-pointer hover:bg-red-700 transition"
                    >
                        {isSignInForm ? "Sign In" : "Sign Up"}
                    </button>

                    <p
                        onClick={toggleSignInForm}
                        className="text-white mt-4 cursor-pointer text-sm"
                    >
                        {isSignInForm
                            ? "New to Netflix? Sign Up now"
                            : "Already registered? Sign In Now"}
                    </p>

                </form>
            </div>
        </div>
    );
};

export default Login;