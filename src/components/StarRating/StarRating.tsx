import { useEffect, useState } from "react";
import { faStar, faStarHalfStroke, faX, type IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { faStar as faEmptyStar } from "@fortawesome/free-regular-svg-icons";

import "./StarRating.css"
import StarIcon from "./StarIcon/StarIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
    const [starsIcon, setStarsIcon] =useState<IconDefinition[]>([])
    const [isHovering, setIsHovering] = useState<boolean>(false);
    const [ratingHover, setRatingHover] = useState<number>(rating);
    
    useEffect(() => {
        let targetRating = isHovering ? ratingHover : rating;
        setStarsIcon(getStarList(targetRating, maxRating, showEmptyStars));
    }, [rating, ratingHover, isHovering])

    function resetScore() {
        if (ratingSetter && rating !== 0) {
            ratingSetter(0);
        }
    }

    return (
        <div className="flex row vCenter">
            <p className="ratingVal">{rating.toFixed(1)}</p>
            <div className="flex row starsContainer" onMouseOver={() => setIsHovering(true)} onMouseOut={() => setIsHovering(false)}>
                {starsIcon.map((ico,idx) => 
                    <StarIcon icon={ico} 
                            value={idx+1} 
                            starWidth={starWidth}
                            isHoveringSetter={setIsHovering} 
                            ratingHoverSetter={setRatingHover}
                            ratingSetter={ratingSetter}/>)
                }

                
            </div>
            <div className="flex vCenter resetScoreBtn" title="Reset score"> 
                <FontAwesomeIcon icon={faX} 
                    className={`resetScoreIcon ${(ratingSetter && rating === 0 || !ratingSetter) && 'hidden'}`}
                    onClick={() => resetScore()} />
            </div>
        </div>
    )
}