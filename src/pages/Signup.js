import { useRef } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";

const Signup = props =>{
    const emailInputRef = useRef()
    const passwordInputRef = useRef()
    const cpasswordInputRef = useRef()

    const onSubmitHandler=event=>{
        event.preventDefault()
        const enteredEmail = emailInputRef.current.value
        const enteredPassword = passwordInputRef.current.value
        const enteredCpassword =cpasswordInputRef.current.value
        console.log(enteredEmail)
        if(enteredEmail.trim().length === 0 || enteredPassword.trim().length===0){
            alert('Please enter all detials!!')
            return;
        }
        if(enteredPassword===enteredCpassword){
            fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBtqAksUMVQaM5s-MzgcY17TKDUIkNN9b8',{
            method:'POST',
            body:JSON.stringify({
                email:enteredEmail,
                password:enteredPassword,
                returnSecureToken:true
            }),
                headers:{'Content-Type':'application/json'}
            }).then(res=>{
                if(res.ok){
                    return res.json()
                }else{
                    return res.json().then(data=>{
                        let errorMessage = 'Signup failed'
                        if(data && data.error && data.error.message){
                            errorMessage= data.error.message
                        }
                        throw new Error(errorMessage)
                    })
                }
            }).then(data=>{
                console.log('Signed In')
            }).catch(err=>{
                alert(err.message)
            })
            emailInputRef.current.value=''
            passwordInputRef.current.value=''
            cpasswordInputRef.current.value=''
        }else{
            alert('Password not matching')
        }
        
    }

    return (
        <Container style={{margin:'10rem', marginLeft:'25rem'}}>
            <Card className="p-3 bg-dark text-light " style={{ borderRadius:'0.5rem',width: '30rem' }}>
                <Form onSubmit={onSubmitHandler}>
                    <Form.Group className="mb-3 " controlId="formGroupEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" ref={emailInputRef}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" ref={passwordInputRef}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupCPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Confirm Password" ref={cpasswordInputRef}/>
                    </Form.Group>
                    <Button variant="primary" type="submit">Submit</Button>
                </Form>
            </Card>
        </Container>
        
    )
}

export default Signup;