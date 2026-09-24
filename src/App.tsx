import './App.css'
import CardBox from './components/CardBox/CardBox'

function App() {
  return (
    <div className='flex vCenter hCenter fullScreen '>
      <CardBox cardContent={
        <div style={{padding: "20px"}}>
          <p>This is a CardBox component.</p>
        </div>
      } hasBoxShadow={true} cardBorderRadius='10px' />
    </div>
  )
}

export default App
