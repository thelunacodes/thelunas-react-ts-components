import React from "react"

import "./CardDemo.css"
import Card from "../../components/Card/Card"

type CardDemoType = {
    cardRef:React.RefObject<HTMLDivElement|null>
}

export default function CardDemo({cardRef}:CardDemoType) {

    return (
        <div className='demoPageSectionContainer' ref={cardRef}>
            <h1 className='demoPageComponentTitle'>Card</h1>
            <div className='flex column vCenter cardDemoContainer'>
                <Card children={ 
                    <div className='flex vCenter hCenter cardDemoExample1'>
                        <p>This is a card.</p>
                    </div> 
                } style={{width: '500px', height:'200px'}}/>

                <Card children={ 
                    <div className='flex column vCenter cardDemoExample2'>
                        <p className="semibold" style={{fontSize: '1.2rem'}}>Sign in</p>

                        <div className="flex column cardDemoSignInFields">
                            <div className="flex column">
                                <input type="email" id="email-input" placeholder="Email"/>
                            </div>
                            
                            <div className="flex column">
                                <input type="password" id="password-input" placeholder="Password"/>
                            </div>

                            <div className="flex column vCenter" style={{margin: '25px 0px', gap: "5px"}}>
                                <button className="cardDemoButton" id="btn-sign-in">Sign in</button>
                                <button className="cardDemoButton" id="btn-sign-on">Sign on</button>
                            </div>
                        </div>
                    </div> 
                } style={{width: '500px', height:'fit-content'}}/>
            </div>
            <p className="centeredText" style={{fontStyle: 'italic'}}>Usage example of the 'card' component.</p>

        </div>
    )
}