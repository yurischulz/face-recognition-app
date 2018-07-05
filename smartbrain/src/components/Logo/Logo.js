import React from 'react'
import Tilt from 'react-tilt'
import brain from './Logo.png'
import './Logo.css'

const Logo = () => {
  return (
    <div className='ma4 mt0'>
      <Tilt className="Tilt" options={{ max : 55 }} style={{ height: 180, width: 180, position: 'absolute', top: 0 }} >
        <div className="Tilt-inner pa3"><img style={{paddintTop: '5px'}} alt='Logo' src={brain} /></div>
      </Tilt>
    </div>
  )
}

export default Logo
