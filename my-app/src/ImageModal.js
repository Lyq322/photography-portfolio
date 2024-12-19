import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageGallery from "react-image-gallery";

function ImageModal({ isOpen, onClose, imageGallery }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (isOpen) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [isOpen]);

  return (
    <div className='font-raleway'>
      {isOpen && (
        <div className={`fixed flex flex-row justify-center items-center inset-0 z-50 transition-opacity ease-in-out`}>
          <div 
            className={`fixed inset-0 w-full h-full bg-black z-10 duration-200 ${visible ? 'opacity-80' : 'opacity-0'}`}
            onClick={onClose}
          />
          <div 
            className={`py-12 z-30 duration-200 ${visible ? 'opacity-100' : 'opacity-0'}`}
          >
            <ImageGallery items={imageGallery} />
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageModal;