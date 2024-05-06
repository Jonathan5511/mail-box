import { useEffect, useState } from "react";
import { Button, Container,Card } from "react-bootstrap";

const Welcome=props=>{
    const [count,setCount] = useState(0)

    useEffect(()=>{
        fetch('https://mail-react-c7e1b-default-rtdb.firebaseio.com/mail.json'
        ).then(res=>{
            if(res.ok){
                return res.json()
            }else{
                return res.json().then(data=>{
                    let errorMessage = 'Failed to fetch data!'
                    if(data && data.error && data.error.message){
                        errorMessage= data.error.message
                    }
                    throw new Error(errorMessage)
                })
            }
        }).then(data=>{
            let count=0;
            for(const key in data){
                if(data[key].check===false){
                    count = count+1
                }
            }
            setCount(count)
        }).catch(err=>{
            alert(err.message)
        })
    },[])

    return(
        <Container style={{margin:'10rem', marginLeft:'28rem', marginTop:'5rem'}}>
            <Card className="p-3 bg-dark text-light " style={{ borderRadius:'0.5rem',width: '30rem' }}>
                <h3 className="text-center mb-3">Welcome to Mailbox!!</h3>
                <Button href="/inbox" className="mb-3">Inbox ({count})</Button>
                <Button href="/sent" className="mb-3">Sent</Button>
                <Button href="/send" className="mb-3">Send Mail</Button>
            </Card>
        </Container>
        
    )
}

export default Welcome;