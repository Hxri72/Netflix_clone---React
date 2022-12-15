import React,{useEffect,useState} from 'react'
import './RowPost.css'
import Youtube from 'react-youtube'
import {image_url,API_KEY} from '../../Constants/constants'
import axios from '../../axios'

function RowPost(props) {
  const [movies,setMovie] = useState([])
  const [urlId,seturlId] = useState('')
  useEffect(()=>{
    axios.get(props.url).then(response=>{
      console.log(response.data)
      setMovie(response.data.results)
    })
  },[])

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleMovie = (id) => {
    console.log(id)
    axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(response=>{
      console.log(response.data)
      if(response.data.results.length!==0){
        seturlId(response.data.results[0])
      }else{
        console.log('Trailer is not available')
      }
    })
  }

  return (
    <div className='row'>
      <h2>{props.title}</h2>
      <div className='posters'>
        {movies.map((obj)=>
            <img onClick={()=>handleMovie(obj.id)} className={props.isSmall ? 'smallPoster': 'poster'} alt='posters' src={`${image_url+obj.backdrop_path}`}/>
        )}
     
      
      </div>
      { urlId && <Youtube opts={opts} videoId = {urlId.key}  /> }
    </div>
  )
}

export default RowPost
