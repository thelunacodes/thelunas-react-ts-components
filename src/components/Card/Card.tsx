import type { ReactNode, ComponentPropsWithoutRef } from "react"
import "./Card.css"

type CardType = ComponentPropsWithoutRef<"div"> & {
    children: ReactNode,
    className?:string
}

/**
 * A card component. Supports `<div>` props (e.g. style, onclick, title).
 * 
 * @param children - The content rendered inside the card. Accepts any renderable
 * React node (elements, text, other components, etc.).
 * @param className - Aditional CSS classes applied to the card container.
 * @returns The rendered Card element.
 * 
 *  @example
 * <Card children={ 
 *     <div className='flex vCenter hCenter cardDemoExample1'>
 *         <p>This is a card.</p>
 *     </div> 
 * } style={{width: '500px', height:'200px'}}/>
 *
 */
export default function Card({children, className="", ...rest }:CardType) {
    return (
        <div className={`cardContainer ${className}`} {...rest}>
            {children}
        </div>
    )
}