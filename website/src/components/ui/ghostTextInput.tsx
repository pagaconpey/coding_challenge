type GhostTextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    placeholder: string;
};

export default function GhostTextInput({
    placeholder,
    ...rest
}: GhostTextInputProps) {
    return (
        <input
            type="text"
            placeholder={placeholder}
            className="input input-ghost input-lg px-4 py-3 text-lg w-full max-w-md sm:max-w-lg focus:outline-none focus:ring-0 focus:bg-transparent bg-transparent"
            {...rest}
        />
    );
}
