'use client';
import { useState } from "react";
import truncateText from "@/utils/truncateText";
import formatDate from "@/utils/formatDate";
import { capitalizeWord } from "@/utils/capitalizeFirstLetter";

export type NoteCardProps = {
    content: string;
    sentiment: string;
    createdAt: string;
    contentMaxLength?: number;
};

export default function NoteCard({ content, sentiment, createdAt, contentMaxLength = 150 }: NoteCardProps) {
    const [showFullContent, setShowFullContent] = useState(false);

    const toggleContent = () => setShowFullContent(prev => !prev);
    const displayText = showFullContent ? content : truncateText(content, contentMaxLength);

    return (
        <div className="card card-md sm:card-xl w-64 sm:w-96 bg-base-200 text-primary-content shadow-md flex flex-col">
            <div className="card-body flex flex-col flex-grow">
                <p className="flex-grow my-2 whitespace-pre-wrap">{displayText}</p>

                {content.length > contentMaxLength ? <button
                    className="btn btn-link btn-sm self-end text-info no-underline hover:underline"
                    onClick={toggleContent}
                >
                    {showFullContent ? "Ocultar" : "Ver todo"}
                </button>
                : null }
                
                <div className="card-actions justify-between mt-4 pt-2 border-t border-base-content/30">
                    <div className="badge badge-md">{capitalizeWord(sentiment)}</div>
                    <span className="text-sm text-base-content/70">
                        Nota Creada: {formatDate(createdAt)}
                    </span>
                </div>
            </div>
        </div>
    );
}