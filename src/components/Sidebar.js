import React from "react"

export default function Sidebar(props) {
    const noteElements = props.notes.map((note, index) => (
        <div key={note.id}>
            <div className={`title ${
                    note.id === props.currentNote.id ? "selected-note" : ""
                }`}
                onClick={() => props.setCurrentNoteId(note.id)}
            >
                
                <h4 className="text-snippet">{typeof note.body === 'string' ? note.body.split("\n")[0] : ""}</h4>
                <button className="Bin" onClick={()=>props.delspace(note.id)}>Bin</button>

            </div>
        </div>
    ))

    return (
        <section className="pane sidebar">
            <div className="sidebar--header">
                <h3>Notes</h3>
                <button className="new-note" onClick={props.newNote}>+</button>
            </div>
            {noteElements}
        </section>
    )
}
