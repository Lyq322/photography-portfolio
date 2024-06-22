import React, { useState, useEffect } from 'react';
import ImageModal from './ImageModal';

function Favorites() {
  const [birdPhotos, setBirdPhotos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [openedPhoto, setOpenedPhoto] = useState();
  
  const order = [5, 47, 8, 1, 44, 35, 41, 51, 27, 15, 21, 2, 6, 36, 20, 11, 39, 25, 37, 26, 19, 17, 31, 40, 18, 48, 16, 38, 46, 14, 45, 22, 4, 42, 12, 30, 32, 43, 10, 28, 33, 3, 24, 34, 49, 29, 9, 7, 23, 50, 13];

  useEffect(() => {
    fetch('/bird-photos.json')
      .then(response => response.json())
      .then(data => {
        for (const species in data) {
          data[species] = data[species].filter(photo => photo.tags.includes('fav'));
        }
        let randomizedPhotos = [];
        let i = 1;
        for (const species in data) {
          for (const photo in data[species]) {
            randomizedPhotos.push({
              species: species,
              info: data[species][photo],
              id: i
            });
          }
          i++;
        }
        console.log('randomizedPhotos', randomizedPhotos)
        setBirdPhotos(randomizedPhotos);
      });
  }, []);

  return (
    <div className='w-full p-10 columns-2 xl:columns-3 space-y-1 gap-1'>
      {birdPhotos.length != 0 && order.map((index, i) => {
        console.log('index', index - 1, birdPhotos[index - 1])
        return (
          <div 
            key={i} 
            className='relative group'
            onClick={() => {
              setModalOpen(true);
              setOpenedPhoto(`birds/${birdPhotos[index - 1]?.species}/${birdPhotos[index - 1]?.info.id}.jpg`);
            }}
          >
            <img 
              src={`birds/${birdPhotos[index - 1]?.species}/${birdPhotos[index - 1]?.info.id}.jpg`} 
              alt={birdPhotos[index - 1]?.species} 
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-200'></div>
            <p className='font-raleway absolute bottom-0 left-0 w-full text-center opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transform translate-y-full transition-all duration-300 text-white mb-2'>{birdPhotos[index - 1]?.species}</p>
          </div>
        );
      })}
      <ImageModal isOpen={modalOpen} onClose={() => setModalOpen(false)} imgSrc={openedPhoto} />
    </div>
  );
}

export default Favorites;