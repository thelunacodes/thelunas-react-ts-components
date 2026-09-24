import type { ReactNode } from "react"
import "./CardBox.css"

type CardBoxType = {
    cardContent: ReactNode,
    hasHoverResponse?: boolean,
    hasBoxShadow?: boolean,
    hasBorder?:boolean,

    margin?: string,
    cardWidth?: string,
    minCardWidth?: string, 
    maxCardWidth?: string,
    cardHeight?: string, 
    minCardHeight?: string, 
    maxCardHeight?: string,
    cardBoxShadow?: string,
    cardBorderRadius?: string,
    cardBorderColor?: string, 
    cardBorderWidth?: string,
    cardBgColor?: string  
}

export default function CardBox({cardContent,  
                                hasHoverResponse, 
                                hasBoxShadow,
                                hasBorder,
                                margin, 
                                cardWidth, 
                                minCardWidth, 
                                maxCardWidth, 
                                cardHeight, 
                                minCardHeight, 
                                maxCardHeight, 
                                cardBoxShadow,
                                cardBorderRadius,
                                cardBorderColor,
                                cardBorderWidth,
                                cardBgColor}:CardBoxType) {

    const cardBoxStyle = {
        '--card-margin': `${margin ?? '0px 0px 0px 0px'}`,
        '--card-width': `${cardWidth ?? 'fit-content'}`,
        '--card-height': `${cardHeight ?? 'fit-content'}`,
        '--card-cursor': `${hasHoverResponse ? 'pointer' : 'default'}`,
        "--border-radius": `${cardBorderRadius ?? "0px"}`,
        "--border-color": `${(hasBorder) && (cardBorderColor ?? "#bdbdbd")}`,
        "--border-width": `${(hasBorder) && (cardBorderWidth ?? "1px")}`,
        
        "--min-card-width": `${minCardWidth ?? "none"}`,
        "--max-card-width": `${maxCardWidth ?? "none"}`,
        "--min-card-height": `${minCardHeight ?? "none"}`,
        "--max-card-height": `${maxCardHeight ?? "none"}`,
        "--card-bg-color": `${cardBgColor ?? "#ffffff"}`,
        "--card-box-shadow": `${(hasBoxShadow ? (cardBoxShadow ?? "5px 5px 5px #dad9d9") : "none")}`
    } as React.CSSProperties

    return (
        <div className="cardContainer" style={cardBoxStyle}>
            {cardContent}
        </div>
    )
}