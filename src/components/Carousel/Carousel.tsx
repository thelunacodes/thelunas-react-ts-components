import { useState, type ComponentPropsWithoutRef, type ReactNode } from "react";
import "./Carousel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

type CarouselType = ComponentPropsWithoutRef<"div"> & {
    childrenList: ReactNode[] 
    className?:string
}

export default function Carousel({childrenList, className="", ...rest}:CarouselType) {
    const [currIdx, currIdxSetter] = useState(0)

    return (
        <div className={`carouselContainer ${className}`} {...rest}>
            <FontAwesomeIcon icon={faChevronLeft} className="carouselChevBtns"/>
            {childrenList[currIdx]}
            <FontAwesomeIcon icon={faChevronRight} className="carouselChevBtns"/>
        </div>
    )
}