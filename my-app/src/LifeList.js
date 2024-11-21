import React, { useState, useEffect } from 'react';
import ImageModal from './ImageModal';

function LifeList() {
  const [birdPhotos, setBirdPhotos] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [openedPhoto, setOpenedPhoto] = useState();

  useEffect(() => {
    fetch('/bird-photos.json')
      .then(response => response.json())
      .then(data => {
        setBirdPhotos(data);
        console.log(data);
      });
  }, []);

  return (
    <div className='w-full p-10 bg-gray-800 text-white'>
      <h1 className='font-bold text-3xl mb-4 text-center'>Life List</h1>
      <div className='grid grid-cols-3 gap-1'>
        {Object.keys(birdPhotos).map((species, index) => (
            <div key={index} className='flex flex-col gap-2 items-center relative'>
              {birdPhotos[species].length != 0 && (
                <>
                  {birdPhotos[species].map((photo, p_index) => {
                    if (photo.position == 1) {
                      return (
                        <div 
                          key={p_index} 
                          className='relative group'
                          onClick={() => {
                            setModalOpen(true);
                            setOpenedPhoto(`birds/${species}/${photo.id}.jpg`);
                            console.log(birdPhotos[species]);
                            return;
                          }}
                        >
                          <img 
                            src={`birds/${species}/${photo.id}.jpg`} 
                            alt={species}
                          />
                          <div className='absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-200'></div>
                          <p className='font-raleway absolute bottom-0 left-0 w-full text-center opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transform translate-y-full transition-all duration-300 text-white mb-2'>{species}</p>
                        </div>
                      );
                    } /*else if (photo.position == 2) {
                      return (
                        <img key={index} src={`birds/${species}/${photo.id}.jpg`} alt={species} className='mt-2 mr-3 pb-12 absolute top-0 z-40 brightness-75 w-full h-full object-cover' />
                      );
                    } else if (photo.position == 3) {
                      return (
                        <img key={index} src={`birds/${species}/${photo.id}.jpg`} alt={species} className='pb-12 absolute top-0 z-30 brightness-75 w-full h-full object-cover' />
                      );
                    }*/
                  })}
                </>                                   
              )}
            </div>
          )
        )}
        {/*Object.keys(birdPhotos).map((species, index) => (
          <React.Fragment key={index}>
            {birdPhotos[species].length == 0 && (
              <div
                className='relative group flex flex-row gap-2 items-center justify-center w-full bg-gray-200'
              >
                <img 
                  src={`birds/default.png`} 
                  alt={species}
                  className='h-20'
                />
                <p>{species}</p>
                {<div className='absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-200'></div>
                <p className='font-raleway absolute bottom-0 left-0 w-full text-center opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transform translate-y-full transition-all duration-300 text-white mb-2'>{species}</p>}
              </div>
            )}
          </React.Fragment>
        ))*/}
      </div>
      <ImageModal isOpen={modalOpen} onClose={() => setModalOpen(false)} imgSrc={openedPhoto} />
    </div>
  );
}

export default LifeList;