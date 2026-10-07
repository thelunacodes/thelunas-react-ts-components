import React, { useState } from "react";
import { faStar, faStarHalfStroke, faX, type IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { faStar as faEmptyStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./StarRating.css"
import StarIcon from "./StarIcon/StarIcon";

type StarRatingType = {
    starWidth?:string,
    showEmptyStars?:boolean,
    readOnly?:boolean,

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

/**
 * A star rating display with optional user interaction.
 * 
 * Renders a row of stars representing `rating`. When `readOnly` is false and a
 * `ratingSetter` is provided, hovering previews a score, clicking sets it, and a
 * reset button clears it back to 0. Half-stars are supported.
 * 
 * @param rating - The current star rating, clamped between 0 and `maxRating`. Defaults to `0`.
 * @param maxRating - The maximum rating value, and the total number of stars displayed if `showEmptyStars` is true. Defaults to `5`.
 * @param readOnly - If true, disables any user interaction (clicking, hovering). Defaults to `false`.
 * @param ratingSetter - React state setter used to update the current value of `rating`.
 * @param showEmptyStars - If true, displays outlined stars for the remaining points up to `maxRating`. Defaults to `false`.
 * @param starWidth - CSS width of each star (e.g. '24px', '2rem'). The rating text and the reset button scale proporionally. Falls back to '20px' if invalid. Defaults to `'20px'`.
 * @returns The rendered StarRating element.
 * 
 * @example
 * const [rating, setRating] = useState(0);
 *
 * // Interactive
 * <StarRating rating={rating} ratingSetter={setRating} maxRating={5} showEmptyStars />
 * 
 * //Read-only
 * <StarRating rating={rating} maxRating={5} showEmptyStars readOnly /> 
 *
 */
export default function StarRating({ starWidth='20px', rating=0, ratingSetter, readOnly=false, maxRating=5, showEmptyStars=false } : StarRatingType) {
    const [isHovering, setIsHovering] = useState<boolean>(false);
    const [ratingHover, setRatingHover] = useState<number>(rating);
    
    // Handle invalid values 
    const safeRating = Math.min(Math.max(rating, 0), maxRating);
    const safeStarWidth = !CSS.supports("width",starWidth) ? '20px' : starWidth;
    const ratingValFontSize = `calc(${safeStarWidth} * 0.8)`;
    const resetScoreIconWidth = `calc(${safeStarWidth} * 0.5)`;

    const showResetBtn = !readOnly && safeRating > 0;

    // Render stars
    let targetRating = isHovering ? ratingHover : safeRating;
    let starsIcon = getStarList(targetRating, maxRating, showEmptyStars);

    return (
        <div className="starRatingMainContainer">
            <p className="ratingVal" style={{fontSize: ratingValFontSize}}>{safeRating.toFixed(1)}</p>
            <div className="starsContainer" onMouseOver={() => setIsHovering(!readOnly)} onMouseOut={() => setIsHovering(false)}>
                {starsIcon.map((ico,idx) => 
                    <React.Fragment key={idx}>
                        <StarIcon icon={ico} 
                            value={idx+1} 
                            starWidth={safeStarWidth}
                            isHoveringSetter={setIsHovering} 
                            ratingHoverSetter={setRatingHover}
                            ratingSetter={ratingSetter}
                            readOnly={readOnly}/>
                    </React.Fragment>
                )}
            </div>
            <div> 
                <button 
                    type="button" 
                    onClick={() => ratingSetter?.(0)}
                    className={`resetScoreBtn ${!showResetBtn && 'hidden'}`}
                    title="Reset score">
                    <FontAwesomeIcon icon={faX} style={{width: resetScoreIconWidth}} className={`resetScoreIcon`} />
                </button>
            </div>
        </div>
    )
}