import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ImageModal from './ImageModal';

function SpeciesPage() {
  const [birdPhotos, setBirdPhotos] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [openedPhoto, setOpenedPhoto] = useState('');
  const { species } = useParams();

  useEffect(() => {
    fetch('/bird-photos.json')
      .then(response => response.json())
      .then(data => {
        setBirdPhotos(data);
        console.log(data);
      });
  }, []);

  return (
    <div className='font-raleway p-10'>
      <h1 className='font-bold text-3xl mb-4 text-center'>{species}</h1>
      <div className='w-full columns-2 xl:columns-3 space-y-1 gap-1'>
        {birdPhotos.length != 0 && birdPhotos[species] && birdPhotos[species].map((photo, i) => {
          if (photo.id == 0) return;
          return (
            <img 
              key={i} 
              src={`../birds/${species}/${photo.id}.jpg`} 
              alt={species}
              onClick={() => {
                setIsOpen(true);
                setOpenedPhoto(`../birds/${species}/${photo.id}.jpg`);
              }}
            />
          );
        })}
      </div>
      <ImageModal isOpen={isOpen} onClose={(() => setIsOpen(false))} imgSrc={openedPhoto} />
    </div>
  );
}

export default SpeciesPage;