import React from 'react';
import {navItems} from "../utils/constants.js";

const Header = () => {
    return (
        <div className='flex space-x-4 my-button px-6 py-2 text-black'>
            {navItems.map((item) => (<button
                onClick={() => {alert(item)}}
            className='px-6 py-2 text-sm font-medium rounded-md border border-red-200 bg-blue-600'
            >{item}</button>))}
        </div>
    );
};

export default Header;