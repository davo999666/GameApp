import React, { useState } from 'react';

const SignInForm = () => {
    const [emailOrUsername, setEmailOrUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Sign in data:', { emailOrUsername, password });
    };

    function handlerSignIn() {

    }

    return (
        <div className='fixed top-0 left-0 h-20 w-80 border border-red-500 bg-white p-4'>
        <form onSubmit={handleSubmit} className="sign-in-form">
            <input
                type="text"
                name="emailOrUsername"
                placeholder="Email or Username"
                value={emailOrUsername}
                onChange={(e) => setEmailOrUsername(e.target.value)}
                required
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Sign In</button>
        </form>
        </div>
    );
};

export default SignInForm;
