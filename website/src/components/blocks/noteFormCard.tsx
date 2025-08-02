import GhostTextInput from "../ui/ghostTextInput";
import GhostTextArea from "../ui/ghostTextArea";

export default function NoteFormCard() {
    return (
        <form className="card card-md sm:card-xl w-64 sm:w-96 bg-base-200 text-primary-content shadow-md flex flex-col">
            <div className="card-body flex flex-col flex-grow">
                <GhostTextInput placeholder="Título" />

                <div className="flex-grow">
                    <GhostTextArea placeholder="Añade una nota..." rows={12} />
                </div>

                <div className="card-actions justify-end mt-4 pt-2 border-t border-base-content/30">
                    <button
                        type="submit"
                        className="btn btn-sm btn-primary normal-case"
                    >
                        Guardar Nota
                    </button>
                </div>
            </div>
        </form>
    );
}