import { Button, Container,Card } from "react-bootstrap";

const Welcome=props=>{
    return(
        <Container style={{margin:'10rem', marginLeft:'28rem', marginTop:'5rem'}}>
            <Card className="p-3 bg-dark text-light " style={{ borderRadius:'0.5rem',width: '30rem' }}>
                <h3 className="text-center mb-3">Welcome to Mailbox!!</h3>
                <Button href="/inbox" className="mb-3">Inbox</Button>
                <Button href="/send" className="mb-3">Send Mail</Button>
            </Card>
        </Container>
        
    )
}

export default Welcome;