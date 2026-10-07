import React, { useState } from "react"

import "./StarRatingDemo.css"
import StarRating from "../../components/StarRating/StarRating"

type StarRatingDemoType = {
    starRatingRef:React.RefObject<HTMLDivElement|null>
}

export default function StarRatingDemo({starRatingRef}:StarRatingDemoType) {
    const [rating, setRating] = useState(0);
    const [maxRating, setMaxRating] = useState(5);
    const [starWidth, setStarWidth] = useState(20);
    const [showEmptyStars, setShowEmptyStars] = useState(true);
    const [readOnly, setReadOnly] = useState(false);

    return (
        <div className='demoPageSectionContainer' ref={starRatingRef}>
            <h1 className='demoPageComponentTitle'>StarRating</h1>
            <div className='flex column hScroll starRatingDemoContainer'>
                <StarRating rating={rating} ratingSetter={setRating} starWidth={`${starWidth}px`} maxRating={maxRating} showEmptyStars={showEmptyStars} readOnly={readOnly} />

            </div>
            <div className="flex column starRatingDemoOptions">
                <div>
                    <input type="number" className="starRatingDemoOptInput" id="opt-max-rating" min={0} value={maxRating} onChange={(e) => setMaxRating(Number(e.target.value))} />
                    <label htmlFor="opt-max-rating">Max Rating </label>
                </div>
                <div>
                    <input type="number" className="starRatingDemoOptInput" id="opt-star-width" min={0} value={starWidth} onChange={(e) => setStarWidth(Number(e.target.value))} />
                    <label htmlFor="opt-star-width">Star width (in pixels) </label>
                </div>
                <div>
                    <input type="checkbox" id="opt-show-empty-stars" checked={showEmptyStars} onChange={(e) => setShowEmptyStars(e.target.checked)} />
                    <label htmlFor="opt-show-empty-stars">Show empty stars</label>
                </div>
                <div>
                    <input type="checkbox" id="opt-read-only" checked={readOnly} onChange={(e) => setReadOnly(e.target.checked)} />
                    <label htmlFor="opt-read-only">Read only</label>
                </div>
            </div>
        </div>
    )
}