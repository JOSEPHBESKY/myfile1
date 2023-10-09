import React, { useState } from 'react'
import sample from "../../assets/images/skoda3.jpg"
import ReactPlayer from 'react-player/lazy'

function Mvideo() {
  var w = window.innerWidth;
  var h = window.innerHeight;
  return (
    <div>
      <video
         width='100%'
          height='500px'
          controls
          src="http://192.168.1.20:3001/static/media/sample.2f256764.mp4" 
          controlsList="nodownload"
        />
    </div>
  )
}

export default Mvideo