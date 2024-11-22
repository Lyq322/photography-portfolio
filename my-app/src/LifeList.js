import React, { useState, useEffect } from 'react';
import ImageModal from './ImageModal';
import Stats from './Stats';
const sampleStatsData = [
  {
    'species': 'Northern Cardinal',
    'state': 'Texas',
    'date': '2021-01-01',
  },
  {
    'species': 'American Robin',
    'state': 'California',
    'date': '2021-02-15',
  },
  {
    'species': 'Blue Jay',
    'state': 'Texas',
    'date': '2021-03-10',
  },
  {
    'species': 'Bald Eagle',
    'state': 'Beijing',
    'date': '2021-04-05',
  },
  {
    'species': 'Peregrine Falcon',
    'state': 'California',
    'date': '2021-05-20',
  },
  {
    'species': 'Great Horned Owl',
    'state': 'Texas',
    'date': '2021-06-25',
  },
  {
    'species': 'Red-tailed Hawk',
    'state': 'California',
    'date': '2021-07-30',
  },
  {
    'species': 'Snowy Owl',
    'state': 'Beijing',
    'date': '2021-08-15',
  },
  {
    'species': 'Sandhill Crane',
    'state': 'Texas',
    'date': '2021-09-10',
  },
  {
    'species': 'Wood Duck',
    'state': 'California',
    'date': '2021-10-05',
  },
  {
    'species': 'Eastern Bluebird',
    'state': 'Beijing',
    'date': '2021-11-20',
  },
  {
    'species': 'American Goldfinch',
    'state': 'Texas',
    'date': '2021-12-25',
  },
  {
    'species': 'Barn Owl',
    'state': 'California',
    'date': '2022-01-15',
  },
  {
    'species': 'Black-capped Chickadee',
    'state': 'Beijing',
    'date': '2022-02-10',
  },
  {
    'species': 'Northern Flicker',
    'state': 'Texas',
    'date': '2022-03-05',
  },
  {
    'species': 'Western Meadowlark',
    'state': 'California',
    'date': '2022-04-20',
  },
  {
    'species': 'Ruby-throated Hummingbird',
    'state': 'Beijing',
    'date': '2022-05-25',
  },
  {
    'species': 'Mourning Dove',
    'state': 'Texas',
    'date': '2022-06-30',
  },
  {
    'species': 'Pileated Woodpecker',
    'state': 'California',
    'date': '2022-07-15',
  },
  {
    'species': 'Common Loon',
    'state': 'Beijing',
    'date': '2022-08-10',
  },
  {
    'species': 'Red-winged Blackbird',
    'state': 'Texas',
    'date': '2022-09-05',
  }
]

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
    <div className='w-full p-10 bg-gray-800 text-white font-raleway'>
      <h1 className='font-bold text-3xl mb-4 text-center'>Life List</h1>
      <Stats data={sampleStatsData} />
      <div className='grid grid-cols-3 gap-x-8 gap-y-6'>
        {Object.keys(birdPhotos).map((species, index) => {
          if (birdPhotos[species].length == 0) return;

          return (
            <div key={index} className='flex flex-col gap-2 items-center relative'>
            
                {birdPhotos[species].map((photo, p_index) => {
                  if (photo.position == 1) {
                    return (
                      <div 
                        key={p_index} 
                        className='flex flex-col gap-2'
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
                        <p className='w-full text-center text-white'>{species}</p>
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
            </div>
          )
        })}
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