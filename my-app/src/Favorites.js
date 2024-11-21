import React, { useState, useEffect } from 'react';
import ImageModal from './ImageModal';

const limit = 4;

function Favorites() {
  const [birdPhotos, setBirdPhotos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [openedPhoto, setOpenedPhoto] = useState();

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (loading) {
      setPage((page) => page + 1);
      setLoading(false);
    }
  }, [loading]);


  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  /*const handleScroll = debounce(() => {
    if (document.body.scrollHeight - 300 < window.scrollY + window.innerHeight && !loading) {
      setLoading(() => true);
    }
  });
  window.addEventListener("scroll", debounce(handleScroll, 500));*/
  
  useEffect(() => {
    fetch('/bird-photos.json')
      .then(response => response.json())
      .then(data => {
        for (const species in data) {
          data[species] = data[species].filter(photo => photo.tags.includes('fav'));
        }
        let photos = [];
        let i = 0;
        for (const species in data) {
          for (const photo in data[species]) {
            photos.push({
              species: species,
              info: data[species][photo],
              id: i
            });
            i++;
          }
        }
        setBirdPhotos(photos);
      });
  }, []);

  return (
    <div className='w-full p-10 columns-2 xl:columns-3 space-y-1 gap-1'>
      {birdPhotos.length !== 0 && birdPhotos.slice(0, page * limit).map((photo, i) => {
        return (
          <div 
            key={i} 
            className={`relative group col-start-${(i % 3) + 1}`}
            onClick={() => {
              setModalOpen(true);
              setOpenedPhoto(`birds/${photo.species}/${photo.info.id}.jpg`);
            }}
          >
            <img 
              src={`birds/${photo.species}/${photo.info.id}.jpg`} 
              alt={photo.species} 
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-200'></div>
            <p className='font-raleway absolute bottom-0 left-0 w-full text-center opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transform translate-y-full transition-all duration-300 text-white mb-2'>{photo.species}</p>
          </div>
        );
      })}
      <ImageModal isOpen={modalOpen} onClose={() => setModalOpen(false)} imgSrc={openedPhoto} />
    </div>
  );
}

export default Favorites;