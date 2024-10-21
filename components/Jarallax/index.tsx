"use client";

import { HTMLAttributes } from "react";
import classNames from "../../utils/classnames";
import useJarallax from "../../hooks/jarallax/useJarallax";

type JarallaxProps = HTMLAttributes<HTMLDivElement>;
export default function Jarallax({children, className, ...props}: JarallaxProps) {
    useJarallax();

    return (
        <div className={classNames("jarallax", className)} {...props}>
            {children}
        </div>
    )
}