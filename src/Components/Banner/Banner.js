import React, { useEffect, useState } from 'react'
import {API_KEY,image_url} from '../../Constants/constants'
import './Banner.css'
import axios from '../../axios'

function Banner() {

    const [movie,setMovie] = useState() 

    
    useEffect(() => {
        axios.get(`trending/all/week?api_key=${API_KEY}&language=en-US`).then((response)=>{
          
          function getRandomItem(arr) {

            // get random index value
            const randomIndex = Math.floor(Math.random() * arr.length);
        
            // get random item
            const item = arr[randomIndex];
        
            return item;
        }    
          const moviesArr = getRandomItem(response.data.results)
          setMovie(moviesArr)
        }) 
    }, [])
  return (
    <div className='banner' style={{backgroundImage:`url(${movie ? image_url+movie.backdrop_path: ""})`}}>
      <div className='content'>
        <h1 className='title'>{movie ? movie.title : ""}</h1>
        <div className='banner_buttons'>
            <button className='button'>Play</button>
            <button className='button'>MyList</button>

        </div>
        <h1 className='descriptions'>{movie ? movie.overview : ""}</h1>
      </div>
      <div className="fade_bottom">
         
      </div>
    </div>
  )
}

export default Banner
