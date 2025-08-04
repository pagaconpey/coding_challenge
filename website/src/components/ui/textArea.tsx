type TextAreaProps = {
    placeholder: string;
    rows?: number;
};

export default function TextArea({
    placeholder,
    rows = 4,
}: TextAreaProps) {
    return (
        <textarea
            className="textarea textarea-lg text-lg px-4 py-3 w-full max-w-md sm:max-w-lg resize-none shadow-md"
            placeholder={placeholder}
            rows={rows}
        />
    );
}
