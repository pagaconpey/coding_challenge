
type HorizontalCenterProps = {
    children: React.ReactNode;
    className?: string;
};

export default function HorizontalCenter({ children, className = "" }: HorizontalCenterProps) {
    return (
        <div className={`flex justify-center ${className}`}>
            {children}
        </div>
    );
}