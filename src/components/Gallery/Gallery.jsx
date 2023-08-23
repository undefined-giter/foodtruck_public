import s from './style.module.css'
import globalStyles from '../../styles/global.module.css'
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'

export const Gallery = () => {
  const [pictures, setPictures] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const startIndexRef = useRef(0)
  const scrollTimeoutRef = useRef(null)


  const numberOfImages = 34;
  const imageNames = useMemo(() => {
    const names = [];
    for (let i = 0; i < numberOfImages; i++) {
      names.push(`${i}.jpg`);
    }
    return names;
  }, [numberOfImages]);

  const calculateLimit = useCallback(() => {
    const screenWidth = window.innerWidth
    if (screenWidth <= 940) {
      return 1
    } else if (screenWidth <= 1410) {
      return 2
    } else if (screenWidth <= 1880) {
      return 3
    } else {
      return 4
    }
  }, []);

  const fetchImages = useCallback((limit = calculateLimit()) => {

    setIsLoading(true)
    
    const startIndex = startIndexRef.current
    const endIndex = Math.min(startIndex + limit, imageNames.length)
    const imagesToLoad = imageNames.slice(startIndex, endIndex)

    setPictures((prevPictures) => [...prevPictures, ...imagesToLoad]);
    startIndexRef.current = endIndex

    setIsLoading(false)
  }, [calculateLimit, imageNames])

  const handleScroll = useCallback(() => {
    if(isLoading) return;

    const { scrollTop, clientHeight, scrollHeight } = document.documentElement
    const bottomOffset = scrollHeight - (scrollTop + clientHeight)
    const fetchThreshold = 150;

    // delay to avoid over-calls
    if (bottomOffset < fetchThreshold) {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(() => {
        fetchImages(calculateLimit());
      }, 300);
    }
  }, /* eslint-disable react-hooks/exhaustive-deps */ [])
  //   //[fetchImages, handleScroll, calculateLimit] (TODO) bug source

  useEffect(() => {
    fetchImages();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={s.galleryDiv}>
      <h1 className={globalStyles.title}>Galerie</h1>
      <div className={s.gallery}>
        {pictures.length > 0 &&
          pictures.map((picture, index) => (
            <img key={index} src={`/img/gallery/${picture}`}
             width='450px' height='300px' alt={`${picture}, Index : ${index}`} />
          ))}
        {isLoading && <p style={{ fontSize: '24px' }}>Loading...</p>}
      </div>
      <br /><br />
    </div>
  );
};



// AXIOS / dynamique version - TODO find how allow CORS for prod
// import s from './style.module.css';
// import globalStyles from '../../styles/global.module.css';
// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import axios from 'axios';

// export const Gallery = () => {
//   const [pictures, setPictures] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const startIndexRef = useRef(0);
//   const [allImagesLoaded, setAllImagesLoaded] = useState(false);
//   const scrollTimeoutRef = useRef(null);

//   const calculateLimit = useCallback(() => {
//     const screenWidth = window.innerWidth;
//     if (screenWidth <= 940) {
//       return 1;
//     } else if (screenWidth <= 1410) {
//       return 2;
//     } else if (screenWidth <= 1880) {
//       return 3;
//     } else {
//       return 4;
//     }
//   }, []);

//   const fetchImages = useCallback((limit = calculateLimit()) => {
//     if (allImagesLoaded) return;
    
//     setIsLoading(true)
//     const apiUrl = 'https://foodtruck.leorip.com/img/gallery/'; //TODO
//     axios
//       .get(apiUrl)
//       .then((response) => {
//         const startIndex = startIndexRef.current;
//         const endIndex = Math.min(startIndex + limit, response.data.length);
//         const imageNames = response.data.slice(startIndex, endIndex);
//         setPictures((prevPictures) => [...prevPictures, ...imageNames]);
//         startIndexRef.current = endIndex;
//         if (endIndex >= response.data.length) {
//           setAllImagesLoaded(true);
//           return;
//         }
//         setIsLoading(false)
//       })
//       .catch((error) => {
//         console.error('Erreur lors de la récupération des images :', error)
//         setIsLoading(false)
//       });
//   }, [allImagesLoaded, calculateLimit]);

//   const handleScroll = useCallback(() => {
//     if (allImagesLoaded || isLoading) return;

//     const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
//     const bottomOffset = scrollHeight - (scrollTop + clientHeight);
//     const fetchThreshold = 100;

//     // using a delay to avoid overcalls
//     if (bottomOffset < fetchThreshold) {
//       if (scrollTimeoutRef.current) {
//         clearTimeout(scrollTimeoutRef.current);
//       }
//       scrollTimeoutRef.current = setTimeout(() => {
//         fetchImages(calculateLimit());
//       }, 300);
//     }
//   }, [allImagesLoaded, isLoading, fetchImages, calculateLimit]);

//   useEffect(() => {
//     fetchImages();
//     window.addEventListener('scroll', handleScroll);
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, /* eslint-disable react-hooks/exhaustive-deps */ [])
//   //[fetchImages, handleScroll, calculateLimit] (TODO) bug source

//   return (
//     <div className={s.galleryDiv}>
//       <h1 className={globalStyles.title}>Galerie</h1>
//       <div className={s.gallery}>
//         {pictures.length > 0 &&
//           pictures.map((picture, index) => (
//             <img key={index} src={`https://foodtruck.leorip.com/img/gallery/${picture}`} 
//               width='450px' height='300px' alt={`${picture}, Index : ${index}`} />
//           ))
//         }
//         {isLoading && <p style={{fontSize: '24px'}}>Loading...</p>}
//       </div>
//       <br /><br />
//     </div>
//   );
// };
