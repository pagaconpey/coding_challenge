
/**
 * Represents the supported props used for pagination
 * component in order to give it functionality
 */

export type PaginationProps = {
    currentPage: number;
    onNext: () => void;
    onPrev: () => void;
    hasNext: boolean;
    hasPrev: boolean;
};
