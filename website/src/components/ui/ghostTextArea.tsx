type GhostTextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    placeholder: string;
    rows?: number;
};

export default function GhostTextArea({
    placeholder,
    rows = 4,
    ...rest
}: GhostTextAreaProps) {
    return (
        <textarea
            className="textarea textarea-ghost textarea-lg text-lg px-4 py-3 w-full max-w-md sm:max-w-2xl resize-none focus:outline-none focus:ring-0 focus:bg-transparent bg-transparent"
            placeholder={placeholder}
            rows={rows}
            {...rest}
        />
    );
}
