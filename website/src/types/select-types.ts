/**
 * Defines the shape of an individual option in a selector component.
 * Each option includes a visible label and an internal value.
 * Intended to be used with single-choice UI components like dropdowns or segmented buttons.
 *
 * @template T - A string literal type that restricts the allowed values.
 */
export interface SelectOption<T extends string> {
    label: string;
    value: T;
}

/**
 * Props for a generic selection component that allows choosing a single option from a list.
 * Useful for dropdowns, radio button groups, or custom segmented controls.
 *
 * @template T - The type of the selectable values.
 */
export interface SelectSentimentProps<T extends string> {
    value: T;
    onChange: (value: T) => void;
    options: SelectOption<T>[];
    placeholder?: string;
}