import React from 'react'
import PropTypes from 'prop-types';
import {Image} from './Thumb.styles'
import { Link } from 'react-router-dom'

const Thumb =({image, movieId, clickable})=>(
   <div>
       {clickable? (
           <Link to = {`/${movieId}`}>
            <Image src ={image} alt ="movie-thumbnails"/>
            </Link> 
       ): (
        <Image src ={image} alt ="movie-thumbnails"/>
       )
       } 
   </div>
);
Thumb.propTypes = {
    image: PropTypes.string,
    movieId: PropTypes.number,
    clickable: PropTypes.bool
  };

export default Thumb