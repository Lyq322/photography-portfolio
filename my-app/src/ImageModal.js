import React from 'react';
import { useNavigate } from 'react-router-dom';

function ImageModal({ isOpen, onClose, imgSrc }) {
  const navigate = useNavigate();

  return (
    <div className='font-raleway'>
      {isOpen && (
        <div className='fixed flex flex-row justify-center items-center inset-0 z-50'>
          <div 
            className='fixed inset-0 w-full h-full bg-black opacity-80 z-10' 
            onClick={onClose} 
          />
          <div 
            className='flex flex-col gap-10 h-full z-30 justify-center items-center'
            onClick={onClose}
          >
            <img src={imgSrc} className='h-3/4' onClick={(e) => e.stopPropagation()} />
            <button 
              className='bg-white border border-gray-200 rounded w-min whitespace-nowrap px-2'
              onClick={() => navigate(`/species/${imgSrc.split('/')[1]}`)}
            >
              See More!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageModal;