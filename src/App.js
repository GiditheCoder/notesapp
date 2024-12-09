import React from "react"
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
import Split from "react-split"
import { addDoc, deleteDoc, doc, onSnapshot, setDoc } from "firebase/firestore"
import { notesCollection ,db} from "./firebase"



export default function App() {
    const [notes, setNotes] = React.useState([])
    const [currentNoteId, setCurrentNoteId] = React.useState("")
    
    
      React.useEffect(()=>{
     const unsubscribe = onSnapshot(notesCollection, (snapshot)=>{
   
     const notesArr = snapshot.docs.map(doc=>{
        return{
            ...doc.data(),
            id: doc.id
    }
    })
    setNotes(notesArr)
})
return unsubscribe

      },[])
      
      React.useEffect(()=>{
    //   we would want to be bale to colleect a const and a data
    // we give  notes as a dependecy because we want to change it based on evry changing change happening to notes
    if (!currentNoteId) {
        setCurrentNoteId(notes[0]?.id)
    }
      }, [notes])


      
    const currentNote =
    notes.find(note => note.id === currentNoteId)
    || notes[0]
 

    // this step was to be able do align the sorted notes ,so it moves to the mostrecent
    // a and b represent , the individual note
      const sortedNotes = notes.sort((a,b)=> b.updatedAt - a.updatedAt )
       const [tempNoteText, setTempNoteText] = React.useState("")

          
       
 
       React.useEffect(()=>{
       
        if(currentNote && typeof currentNote.body === 'string'){
         setTempNoteText(currentNote.body)
        }
       },[currentNote])


       React.useEffect(()=>{
       const  Timersent = setTimeout(()=>{
    
       updateNote(tempNoteText)
       }, 500)
      return ()=> clearTimeout(Timersent, 500)
       },[tempNoteText])




    async function createNewNote() {
         // as pseudocode we want to be able to first talk to the database 
        // we  would need a new syntax called addDoc
        // and thne it by default takes 2 parameters , one from the fire base and one that you are adding but this value varies
        // then we have to pass it as a promise
        // the  line has to be given an await nad the top function an async , i would read up better on that later 
        // the last bit of code is to ensue that the current note created would e the one being selected by the cursor on creation 
        const newNote = {
            body: "# Type your markdown note's title here",
            createdAt: Date.now(),
            updatedAt: Date.now()
        }
        
       const  newNoteref = await addDoc(notesCollection,newNote)
        setCurrentNoteId(newNoteref.id)    
    }
    
    async function updateNote(text) {
        if (notesCollection && currentNoteId) {
            const docRef = doc(notesCollection, currentNoteId);
            await setDoc(docRef, { body: text, updatedAt: Date.now() }, { merge: true });
        } else {
            console.error("notesCollection or currentNoteId is empty or undefined.");
        }
            
    }

    async function delspace(noteId) {
        // we need to be able to get ref to whatt we are deleting
        // we would need to ste it up to a database instead of localStorage
        // we first need to do away with the event
        // we leave the id because riht now , my reatc app is no longer generating id locally instead it is generating it from firestore
// const docRef =   doc(notesCollection, noteId)
//        await  deleteDoc(docRef)

if (notesCollection && noteId) {
    const docRef = doc(notesCollection, noteId);
    await deleteDoc(docRef);
} else {
    console.error("notesCollection or noteId is empty or undefined.");
}
    }
    




    

    
    return (
        <main>
        {
            notes.length > 0 
            ?
            <Split 
                sizes={[30, 70]} 
                direction="horizontal" 
                className="split"
            >
                <Sidebar
                    notes={sortedNotes}
                    currentNote={currentNote}
                    setCurrentNoteId={setCurrentNoteId}
                    newNote={createNewNote}
                    delspace={delspace}
                />
              
                    <Editor 
                        tempNoteText={tempNoteText} 
                        setTempNoteText={setTempNoteText}
                      
                    />
            
            </Split>
            :
            <div className="no-notes">
                <h1>You have no notes</h1>
                <button 
                    className="first-note" 
                    onClick={createNewNote}
                >
                    Create one now
                </button>
            </div>
            
        }
        </main>
    )
}

   
