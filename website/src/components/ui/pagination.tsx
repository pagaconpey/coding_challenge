'use client';

import { PaginationProps } from "@/types/pagination";

export default function Pagination({
    currentPage,
    onNext,
    onPrev,
    hasNext,
    hasPrev
}: PaginationProps) {
    return (
        <div className="join">
            <button className="join-item btn" onClick={onPrev} disabled={!hasPrev}>«</button>
            <button className="join-item btn">Página {currentPage}</button>
            <button className="join-item btn" onClick={onNext} disabled={!hasNext}>»</button>
        </div>
    );
}