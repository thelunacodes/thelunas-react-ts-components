import { useRef } from 'react'
import './App.css'
import Card from './components/Card/Card'

import './globalStyling.css'
import CardDemo from './DemoSections/CardDemo/CardDemo';
import StarRatingDemo from './DemoSections/StarRatingDemo/StarRatingDemo';

function App() {

  function scrollToSection(ref:React.RefObject<HTMLDivElement | null>) {
    if (!ref.current) return;

    ref.current.scrollIntoView({behavior: 'smooth', block: 'start'})
  }
  
  //refs  
  const cardRef = useRef<HTMLDivElement>(null);
  const starRatingRef = useRef<HTMLDivElement>(null);

  const sectionsDict = [
    { "title": "Card", "refObj": cardRef },
    { "title": "StarRating", "refObj": starRatingRef },
  ]

  return (
    <div className='flex column fullScreen hScroll'>
        <header className='demoPageHeader'>
            <h1 className='centeredText'>Welcome to the demo page :)</h1>
        </header>
        <div className='flex row demoPageColumnContainer'>
          <div className='demoPageColumn1'>

            <div className='demoPageContents'>
              <Card children={
                <div className='demoPageContentsSection'> 
                    <p className='centeredText semibold'>Contents</p>
                    <ol>
                      { sectionsDict.map((section, idx) => 
                        <li key={idx} className='demoPageContentItem' onClick={() => scrollToSection(section.refObj)}>
                          {section.title}
                        </li>)
                      }
                    </ol>
                </div>  
              }/>
            </div>
          </div>  
          
          <div className='flex column vCenter demoPageColumn2'>

            <CardDemo cardRef={cardRef} />
            <StarRatingDemo starRatingRef={starRatingRef} />

          </div>
          
          <div className='demoPageColumn3'></div>
        </div>
    </div>
  )
}

export default App
