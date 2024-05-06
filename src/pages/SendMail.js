import {Form,Button} from "react-bootstrap";
import { Editor } from "react-draft-wysiwyg";
import "../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import { useRef, useState } from "react";

const SendMail = ()=>{
    const fromInputRef = useRef() 
    const toInputRef = useRef()
    const subjectInputRef = useRef()

    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const handleEditorStateChange = (newEditorState) => {
        setEditorState(newEditorState);
    };

    const onSubmitHandler = event =>{
        event.preventDefault();
        const enteredFromEmail = fromInputRef.current.value
        const enteredToEmail = toInputRef.current.value
        const enteredSubjectEmail = subjectInputRef.current.value
        let editorContent = editorState.getCurrentContent().getPlainText();
        if(enteredFromEmail.trim().length === 0 || enteredToEmail.trim().length ===0 || enteredSubjectEmail.trim().length === 0 || editorContent.trim().length===0){
            alert('Please enter all details!!')
            return;
        }
        const emailInfo ={
            from:enteredFromEmail,
            to:enteredToEmail,
            subject:enteredSubjectEmail,
            content:editorContent
        }
        fetch('https://mail-react-c7e1b-default-rtdb.firebaseio.com/mail.json',{
            method:'POST',
            body:JSON.stringify(emailInfo),
            headers:{'Content-Type':'application/json'}
        }).then(res=>{
            if(res.ok){
                return res.json()
            }else{
                return res.json().then(data=>{
                    let errorMessage = 'Storing data failed!!'
                    if(data && data.error && data.error.message){
                        errorMessage=data.error.message
                    }
                    throw new Error(errorMessage)
                })
            }
        }).then(data=>{
            console.log(data)
            fromInputRef.current.value=''
            toInputRef.current.value=''
            subjectInputRef.current.value=''
            
        }).catch(err=>{
            alert(err.message)
        })
    }

    return(
        
            <div className="p-3 bg-dark text-light" >
                <Form onSubmit={onSubmitHandler}>
                    <Form.Group className="mb-3 " controlId="formGroupSenderEmail">
                        <Form.Label>From</Form.Label>
                        <Form.Control type="email" placeholder="Sender Email" ref={fromInputRef}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupReceiverEmail">
                        <Form.Label>To</Form.Label>
                        <Form.Control type="email" placeholder="Receiver Email" ref={toInputRef}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formText">
                        <Form.Label>Subject</Form.Label>
                        <Form.Control type="text" placeholder="Subject" ref={subjectInputRef}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formText">
                        <Editor 
                        toolbarClassName="py-3 border-bottom bg-light"
                        wrapperClassName="card mt-3"
                        editorClassName="card-body pt-0"
                        editorStyle={{ minHeight: "15rem" }}
                        editorState={editorState}
                        onEditorStateChange={handleEditorStateChange}/>
                    </Form.Group>
                    
                    <div className="mb-3"> 
                        <Button variant="primary" type="submit" >Send</Button>
                        <Button variant="primary" href="/welcome" style={{float:"right"}}>Back</Button>
                    </div>
                    
                </Form>
            </div>
       
    )
}

export default SendMail;