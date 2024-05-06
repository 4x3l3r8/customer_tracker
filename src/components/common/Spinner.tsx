import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

interface Props {
    text?: string;
    size?: "default" | "sm" | "lg";
    variant?: "default" | "destructive" | "success";
}

/**
 * The `Spinner` component in JavaScript React displays a spinning icon with customizable size,
 * variant, and accompanying text.
 * 
 * 
 * @param {{text?:string, size?: "default" | "sm" | "lg", variant?:"default" | "destructive" | "success"}} Props
 * 
 * @returns The `Spinner` component is being returned, which consists of a div containing a spinning
 * loader (spinner) and a text element. The spinner's appearance is determined by the `size` and
 * `variant` props passed to the component. The text displayed below the spinner is determined by the
 * `text` prop.
 */
export const Spinner = ({ text, size, variant }: Props) => {
    const spinnerVariant = cva("block rounded-full border-4 animate-spin",
        {
            variants: {
                variant: {
                    default: "border-t-blue-500",
                    destructive: "border-t-red-400",
                    success: "border-t-green-400",
                },
                size: {
                    default: "h-12 w-12",
                    sm: "h-6 w-6",
                    lg: "h-16 w-16"
                }
            },
            defaultVariants: {
                size: "default",
                variant: "default"
            }
        }
    )

    const loadingTextVariant = cva("text-grey-500 font-medium py-1 capitalize block",
        {
            variants: {
                size: {
                    default: "text-md",
                    sm: "text-sm",
                    lg: "text-xl"
                }
            },
            defaultVariants: {
                size: "default"
            }
        }
    )
    return (
        <div className="flex flex-col items-center gap-2 text-gray-500">
            <span className={cn(spinnerVariant({ size, variant }))}></span>
            {text && <span className={cn(loadingTextVariant({ size }))}>{text}</span>}
        </div>
    );
};
