import { Fragment, useEffect, useState} from "react";
import { Button, Col, ListGroup, Row,Table,Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import classes from './Inbox.module.css'
import { mailActions } from "../store/mail";


const Inbox = ()=>{
    const [inboxMail,setInboxMail] = useState([])
    const [viewMail,setViewMail]= useState([])
    const currMail = useSelector(state=>state.auth.mailId)
    const dispatch = useDispatch()
    const mailRead = useSelector(state=>state.mail.isRead)
    

    const onReadHandler=(id, to, from, subject, message, read, check)=>{
        console.log(id)
        console.log(inboxMail.id)
        dispatch(mailActions.read())
        const openMail = inboxMail.filter((item)=>item.id===id)
        setViewMail(openMail)
        fetch(`https://mail-react-c7e1b-default-rtdb.firebaseio.com/mail/${id}.json`,{
            method:'PUT',
            body:JSON.stringify({
                id:id,
                to:to,
                from:from,
                subject:subject,
                content:message,
                read:read,
                check:true
            }),
            headers:{'Content-Type':'application/json'}
        })
    }

    const onCloseReadHandler=()=>{
        dispatch(mailActions.unRead())
    }

    useEffect(()=>{
        fetch('https://mail-react-c7e1b-default-rtdb.firebaseio.com/mail.json'
        ).then(res=>{
            if(res.ok){
                return res.json()
            }else{
                return res.json().then(data=>{
                    let errorMessage = 'Getting data failed!'
                    if(data && data.error && data.error.message){
                        errorMessage=data.error.message
                    }
                    throw new Error(errorMessage)
                })
            }
        }).then(data=>{
            let uploadedData=[]
            for(const key in data){
                
                    uploadedData.push({
                        id:key,
                        to:data[key].to,
                        from:data[key].from,
                        subject:data[key].subject,
                        message:data[key].content,
                        read:data[key].read,
                        check:data[key].check
                    })
                }
               
            const inboxItems= uploadedData.filter(mail=>mail.to!==currMail)
            setInboxMail(inboxItems);
            
        }).catch(err=>{
            alert(err.message)
        })
        
    },[currMail])

    

    return(
        <Fragment>
            <br/>
            {!mailRead && <div className="col d-flex justify-content-center">
                    <Row>
                        <Col>
                        <div className={classes.control}>
                        <Button href="/send" className="mb-3">Compose</Button>
                            <Table >
                                <thead>
                                    <tr>
                                        <th>From</th>
                                        <th>Subject</th>
                                        <th>Message</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                    {inboxMail.map((item)=>{
                                        return(<tr  key={item.id}>
                                        
                                            <td>{item.from}</td>
                                            <td>{item.subject}</td>
                                            <td>{item.message}</td>
                                            <td><Button size="sm" variant="dark" onClick={()=>onReadHandler(item.id,item.to,item.from,item.subject,item.message,item.read,item.check)}>Open Mail</Button></td>
                                        </tr>)
                                    })}
                                    
                                </tbody>
                            </Table>
                            <Button href='/welcome' >Back</Button>
                            </div>
                        </Col>
                </Row>
            </div>  }  
                   { mailRead && <div className={classes.control}>
                    <Card >
                        <ListGroup>
                            {viewMail.map(item=>{
                                return(<div><ListGroup.Item key={item.key}>
                                    From: {item.from} 
                                </ListGroup.Item>
                                <ListGroup.Item key={item.key}>
                                     Subject: {item.subject} 
                                </ListGroup.Item>
                                <ListGroup.Item key={item.key}>
                                    Message: {item.message}
                                </ListGroup.Item>
                                <Button className="m-3 " onClick={onCloseReadHandler}>Back</Button></div>)
                                
                            })}
                        </ListGroup>
                   </Card>
                    </div>}
            
        </Fragment>
    )
}

export default Inbox;