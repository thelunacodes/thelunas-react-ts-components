import { useState } from 'react'
import './App.css'
import CardBox from './components/CardBox/CardBox'
import StarRating from './components/StarRating/StarRating'

function App() {
  const [rating, setRating] = useState(0);

  return (
    <div className='flex vCenter hCenter fullScreen '>
      <CardBox cardContent={
        <div style={{padding: "20px"}}>
          <p>This is a CardBox component.</p>
          <StarRating showEmptyStars={true} rating={5}/>
          <StarRating showEmptyStars={true} rating={rating} ratingSetter={setRating}/>
        </div>
      } hasBoxShadow={true} cardBorderRadius='10px' />
    </div>
  )
}

export default App
