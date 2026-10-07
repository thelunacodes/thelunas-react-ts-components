import React, { useRef } from 'react'
import './App.css'  

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

  const sectionListDict = [
    { "title": "Card", "refObj": cardRef },
    { "title": "StarRating", "refObj": starRatingRef },
  ]

  const sectionList = [
    <CardDemo cardRef={cardRef} />,
    <StarRatingDemo starRatingRef={starRatingRef} />
  ]

  return (
    <div className='flex column fullScreen '>
        <div className='flex row'>
          <div className='flex column vCenter demoPageColumn1'>
            <p className='centeredText semibold' style={{padding: '20px', fontSize:'1.1rem'}}>Components</p>

            <div className='demoPageComponentList'>
              { sectionListDict.map((section, idx) => 
                <div key={idx} className='demoPageComponentListItem' onClick={() => scrollToSection(section.refObj)}>
                  <p>{section.title}</p>
                </div>)
              }
            </div>
            
          </div> 

          <div className='flex column vCenter demoPageColumn2'>
            <div className='flex column vCenter demoSectionsContainer'>
              <h1 className='centeredText' style={{marginBottom: '100px'}}>Welcome to the demo page :)</h1>
              
              { sectionList.map((section, idx) => 
                <React.Fragment key={idx}>
                  {section}
                  <div className='divider'></div>
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
    </div>
  )
}

export default App
