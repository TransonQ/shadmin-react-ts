import { cn } from "@/lib"
import { ClassNameValue } from "tailwind-merge"
import {
  calcFontWeight,
  calcTextVariant,
  calcTone,
  FontWeight,
  Variant,
} from "../calc"

type Element =
  | "dt"
  | "dd"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "span"
  | "strong"
  | "legend"

type TextProps = {
  as?: Element
  variant?: Variant
  fontWeight?: FontWeight
  children?: React.ReactNode
  tone?: "default" | "subdued" | "critical" | "success"
  className?: ClassNameValue
  visuallyHidden?: boolean
}

export const Text = ({
  as: Element = "span",
  children,
  tone,
  variant,
  fontWeight,
  className,
  visuallyHidden,
}: TextProps) => {
  return (
    <Element
      className={cn(
        calcTone(tone),
        calcTextVariant(variant),
        calcFontWeight(fontWeight),
        className,
        visuallyHidden && "sr-only"
      )}
    >
      {children}
    </Element>
  )
}
