import React from 'react';
import Bookmark from './Bookmark';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <div className='bg-gray-100 h-20 px-8 font-raleway w-full'>
      <div className='max-w-5xl flex flex-row w-full h-full justify-between mx-auto'>
        <div className='flex flex-row gap-16'>
          <Link to='/' className='self-center'>
            <div className='flex flex-row items-center'>
              
              <p className='font-bold text-2xl'>Yuqing</p>
            </div>
          </Link>
          <div className='flex flex-row gap-6'>
            <Link to='/life-list' className='self-center'>Life List</Link>
            <Link to='/info' className='self-center'>Info</Link>
          </div>
        </div>
        {/*<div className='flex flex-row gap-3'>
          <Bookmark />
          <Bookmark />
          <Bookmark />
        </div>*/}
      </div>
    </div>
  );
}

export default NavBar;