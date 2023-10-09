import { Stack } from '@mui/material'
import React from 'react'
import ReactAudioPlayer from 'react-audio-player'

function MAudio() {
  return (
    <div>
         <Stack alignItems='center' height='100%' width='100%' justifyItems='center'>
        <ReactAudioPlayer
        src='blob:http://192.168.1.20:3001/aba25f27-5073-4cd8-b896-920f9eb35754'
        controlsList= 'nodownload'
        controls
         />
        </Stack>
    </div>
  )
}

export default MAudio
