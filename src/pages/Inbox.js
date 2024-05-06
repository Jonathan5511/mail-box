import { Fragment, useEffect, useState } from "react";
import { Button, Col, Row,Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import classes from './Inbox.module.css'


const Inbox = ()=>{
    const [inboxMail,setInboxMail] = useState([])
    const currMail = useSelector(state=>state.auth.mailId)
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
                        message:data[key].content
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
            <div className="col d-flex justify-content-center">
                
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
                                    </tr>
                                </thead>
                                <tbody>
                                    {inboxMail.map((item)=>{
                                        return(<tr key={item.id}>
                                            <td>{item.from}</td>
                                            <td>{item.subject}</td>
                                            <td>{item.message}</td>
        
                                        </tr>)
                                    })}
                                    
                                </tbody>
                            </Table>
                            <Button href='/welcome' >Back</Button>
                            </div>
                        </Col>
                </Row>
            </div>    
                   
            
        </Fragment>
    )
}

export default Inbox;