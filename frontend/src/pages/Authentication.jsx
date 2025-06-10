import React from 'react';

const Authentication = () => {
    return (
        <form>
            <input type="text" name="firstName" placeholder="First Name" />
            <input type="text" name="lastName" placeholder="Last Name" />
            <input type="email" name="email" placeholder="Email" />
            <input type="password" name="password" placeholder="Password" />
            <input type="text" name="country" placeholder="Country" />
            <input type="number" name="age" placeholder="Age" />
            <button type="submit">Register</button>
        </form>
    );
};

export default Authentication;
