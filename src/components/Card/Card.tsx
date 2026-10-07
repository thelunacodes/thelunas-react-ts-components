import type { ReactNode, ComponentPropsWithoutRef } from "react"
import "./Card.css"

type CardType = ComponentPropsWithoutRef<"div"> & {
    children: ReactNode,
    className?:string
}

export default function Card({children, className="", ...rest }:CardType) {
    return (
        <div className={`cardContainer ${className}`} {...rest}>
            {children}
        </div>
    )
}