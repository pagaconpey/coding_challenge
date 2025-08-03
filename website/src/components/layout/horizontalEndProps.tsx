// This layout component aligns its children to the end (right side) of the horizontal axis.
// It is useful for placing buttons, controls, or labels at the far right of a container.

type HorizontalEndProps = {
    children: React.ReactNode;
    className?: string;
};

export default function HorizontalEnd({ children, className = "" }: HorizontalEndProps) {
    return (
        <div className={`flex justify-end ${className}`}>
            {children}
        </div>
    );
}