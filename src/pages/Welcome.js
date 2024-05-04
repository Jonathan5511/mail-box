import { Button, Container,Card } from "react-bootstrap";

const Welcome=props=>{
    return(
        <Container style={{margin:'10rem', marginLeft:'28rem', marginTop:'5rem'}}>
            <Card className="p-3 bg-dark text-light " style={{ borderRadius:'0.5rem',width: '30rem' }}>
                <h3 className="text-center">Welcome to Mailbox!!</h3>
                <Button href="/send">Send Mail</Button>
            </Card>
        </Container>
        
    )
}

export default Welcome;