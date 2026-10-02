import React, { useRef } from "react"
import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./StarIcon.css"

type StarIconType = {
    icon: IconDefinition,
    value: number,
    starWidth?:string, // example: '24px'

    isHoveringSetter?: React.Dispatch<React.SetStateAction<boolean>>,
    ratingHoverSetter?: React.Dispatch<React.SetStateAction<number>>,
    ratingSetter?: React.Dispatch<React.SetStateAction<number>>,
}

/**
 * An interactive star icon, meant to be used within the 'StarRating' component.
 * @param icon - Star icon (faStar/faStarHalfStroke/faEmptyStar)
 * @param value - The star icon's score value.
 * @param starWidth - The star icon's CSS width. Height will match this value. Example: '20px'
 * @param isHoveringSetter - Setter for the 'isHovering' parameter.
 * @param ratingHoverSetter - Setter for the temporary rating score value, displayed when the user's mouse cursor is hovering the parent component.
 * @param ratingSetter - Setter for the main rating score value.
 * @returns The rendered star icon element.
 */
export default function StarIcon({icon, value, starWidth, isHoveringSetter, ratingHoverSetter, ratingSetter} : StarIconType) {
    const starRef = useRef<HTMLDivElement>(null);
    
    function isHoveringLeftCorner(mouseEvent:React.MouseEvent<HTMLDivElement>) {
        if (!starRef.current) return false;

        const starRect = starRef.current.getBoundingClientRect();

        const xStart = starRect.left;
        const xEnd = starRect.right;
        const halfWidth = Math.floor((xEnd-xStart) / 2);
        const xMiddle = xStart + halfWidth+1;

        // console.log(`xStart: ${xStart} | xEnd: ${xEnd} | mouseEvent.clientX: ${mouseEvent.clientX} | halfWidth: ${halfWidth} | xMiddle: ${xMiddle}`)

        return mouseEvent.clientX < xMiddle
    }

    function onStarClick(mouseEvent:React.MouseEvent<HTMLDivElement>) {
        let isHalfHover = isHoveringLeftCorner(mouseEvent)
        ratingSetter?.(isHalfHover ? value - 0.5 : value)
        isHoveringSetter?.(false);
    }

    function onStarHover(mouseEvent:React.MouseEvent<HTMLDivElement>) {
        if (ratingSetter) {
            let isHalfHover = isHoveringLeftCorner(mouseEvent)
            ratingHoverSetter?.((isHalfHover ? value - 0.5 : value))
        }
    }

    const iconStyle = {
        "--star-width": `${starWidth}`,
    } as React.CSSProperties

    return (
        <div ref={starRef} onClick={(e) => onStarClick(e)} style={iconStyle} onMouseOver={(e) => onStarHover(e)}>
            <FontAwesomeIcon icon={icon} className="starIcon" />
        </div>
    )
}