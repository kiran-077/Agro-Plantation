import React from 'react'
import "./Grid1.css"
import name from "./All-spices.png"
import name1 from "./Artboard-2-copy.png"
import name2 from "./Artboard-2.png"
import name3 from ".//Mango.png"
const Sixth1 = () => {
  return (
    <div className='gridImages'>
        <div className='top'>

            <img src={name2}/>
            <img src={name3}/>

        </div>
<div className='bottom'>
<img src={name}/>
<img src={name1}/>

</div>

    </div>
  )
}

export default Sixth1