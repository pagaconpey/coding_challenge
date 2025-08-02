type GhostTextAreaProps = {
    placeholder: string;
    rows?: number;
};

export default function GhostTextArea({
    placeholder,
    rows = 4,
}: GhostTextAreaProps) {
    return (
        <textarea
            className="textarea textarea-ghost textarea-lg text-lg px-4 py-3 w-full max-w-md sm:max-w-lg resize-none focus:outline-none focus:ring-0"
            placeholder={placeholder}
            rows={rows}
        />
    );
}