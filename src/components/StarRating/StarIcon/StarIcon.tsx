import React, { useRef } from "react"
import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./StarIcon.css"

type StarIconType = {
    icon: IconDefinition,
    value: number,
    starWidth?:string, // example: '24px'
    readOnly:boolean

    isHoveringSetter?: React.Dispatch<React.SetStateAction<boolean>>,
    ratingHoverSetter?: React.Dispatch<React.SetStateAction<number>>,
    ratingSetter?: React.Dispatch<React.SetStateAction<number>>,
}

/**
 * A single interactive star icon, meant to be used inside the 'StarRating' component.
 * 
 * Hovering previews a score and clicking sets it. 
 *
 * @param icon - Star icon to render (`faStar`, `faStarHalfStroke` or `faEmptyStar`).
 * @param value - The score this star represents when its right half is hovered/clicked.
 * @param readOnly - If true, ignores user actions (clicking, hovering).
 * @param isHoveringSetter - Setter for the parent's `isHovering` state. 
 * @param ratingHoverSetter - Setter for the temporary rating shown while the cursor hovers the stars.
 * @param ratingSetter - Setter for the main rating value, called on click.
 * @param starWidth - CSS width of the star (e.g. `'20px'`). Height matches this value.
 * @returns The rendered StarIcon element.
 */
export default function StarIcon({icon, value, starWidth, readOnly, isHoveringSetter, ratingHoverSetter, ratingSetter} : StarIconType) {
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
        if (!readOnly) {
            let isHalfHover = isHoveringLeftCorner(mouseEvent)
            ratingSetter?.(isHalfHover ? value - 0.5 : value)
            isHoveringSetter?.(false);
        }
    }

    function onStarHover(mouseEvent:React.MouseEvent<HTMLDivElement>) {
        if (!readOnly) {
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