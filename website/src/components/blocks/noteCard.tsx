import truncateText from "@/utils/truncateText";
import formatDate from "@/utils/formatDate";

export type NoteCardProps = {
    title: string;
    content: string;
    createdAt: string;
    titleMaxLength?: number;
    contentMaxLength?: number;
};

export default function NoteCard({title, content, createdAt, titleMaxLength = 50, contentMaxLength = 150}: NoteCardProps) {
    return (
        <div className="card card-md sm:card-xl w-64 sm:w-96 bg-base-200 text-primary-content shadow-md flex flex-col">
            <div className="card-body flex flex-col flex-grow">
                <h2 className="card-title">{truncateText(title, titleMaxLength)}</h2>
                <p className="flex-grow my-2">{truncateText(content, contentMaxLength)}</p>
                <div className="card-actions justify-end mt-4 pt-2 border-t border-base-content/30">
                    <span className="text-sm text-base-content/70">
                        Nota Creada: {formatDate(createdAt)}
                    </span>
                </div>
            </div>
        </div>
    );
}