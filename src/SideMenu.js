import React from 'react'
import useStore from './store'

export default function SideMenu() {

  const sound = useStore(state => state.sound)
  const toggle = useStore(state => state.actions.toggleSound)

  return (
    <>
      <div id='sound' onClick={() => toggle()}>
          sound
          <br />
          {sound ? 'on' : 'off'}
        </div>

      <div id='menu'>

        <div className='tooltip'>
          credits
          <div id='credits' className='tooltip-text'>
            <p>Track: PPK - Resurrection</p>
            <a href='https://codesandbox.io/embed/r3f-game-i2160'>Based on game made by Paul Henschel</a>
            <br/>
            <a href='https://github.com/heyitsyuliya/destination-mars'>Destination Mars on GitHub</a>
          </div>
        </div>


      </div>
    </>
  )
}

