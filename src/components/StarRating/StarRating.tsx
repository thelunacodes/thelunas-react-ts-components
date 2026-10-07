import React, { useState } from "react";
import { faStar, faStarHalfStroke, faX, type IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { faStar as faEmptyStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./StarRating.css"
import StarIcon from "./StarIcon/StarIcon";

type StarRatingType = {
    starWidth?:string,
    showEmptyStars?:boolean,

    rating?:number,
    ratingSetter?:React.Dispatch<React.SetStateAction<number>>, 
    maxRating?:number
}

function getStarList(rating:number, maxRating:number, showEmptyStars:boolean):IconDefinition[] {
    var hasHalf = rating % 1 != 0;
    var numOfStars = Math.floor(rating);
    var starList:IconDefinition[] = [];

    if (rating === 0) {
        starList.push(faEmptyStar);
        var numOfGrayStars = Math.floor(maxRating - rating) - 1;
    } else {
        for (let i = 0; i < numOfStars; i++) {
            starList.push(faStar);
        }
            
        if (hasHalf) { starList.push(faStarHalfStroke); }

        var numOfGrayStars = Math.floor(maxRating - rating);
    }

    if (showEmptyStars) {
        for (let i = 0; i < numOfGrayStars; i++) {
            starList.push(faEmptyStar);
        }        
    } 

    return starList;
}

export default function StarRating({ starWidth='20px', rating=0, ratingSetter, maxRating=5, showEmptyStars=false } : StarRatingType) {
    const [isHovering, setIsHovering] = useState<boolean>(false);
    const [ratingHover, setRatingHover] = useState<number>(rating);
    
    // Handle invalid values 
    const safeRating = Math.min(Math.max(rating, 0), maxRating);
    const safeStarWidth = !CSS.supports("width",starWidth) ? '20px' : starWidth;
    const ratingValFontSize = `calc(${safeStarWidth} * 0.8)`;
    const resetScoreIconWidth = `calc(${safeStarWidth} * 0.5)`;

    const showResetBtn = !ratingSetter || safeRating === 0;

    // Render stars
    let targetRating = isHovering ? ratingHover : safeRating;
    let starsIcon = getStarList(targetRating, maxRating, showEmptyStars);

    return (
        <div className="starRatingMainContainer">
            <p className="ratingVal" style={{fontSize: ratingValFontSize}}>{safeRating.toFixed(1)}</p>
            <div className="starsContainer" onMouseOver={() => setIsHovering( ratingSetter !== undefined )} onMouseOut={() => setIsHovering(false)}>
                {starsIcon.map((ico,idx) => 
                    <React.Fragment key={idx}>
                        <StarIcon icon={ico} 
                            value={idx+1} 
                            starWidth={safeStarWidth}
                            isHoveringSetter={setIsHovering} 
                            ratingHoverSetter={setRatingHover}
                            ratingSetter={ratingSetter}/>
                    </React.Fragment>
                )}
            </div>
            <div> 
                <button 
                    type="button" 
                    onClick={() => ratingSetter?.(0)}
                    className={`resetScoreBtn ${showResetBtn && 'hidden'}`}
                    title="Reset score">
                    <FontAwesomeIcon icon={faX} style={{width: resetScoreIconWidth}} className={`resetScoreIcon`} />
                </button>
            </div>
        </div>
    )
}