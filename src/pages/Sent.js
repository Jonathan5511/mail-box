import { Row, Col, Button, Table } from "react-bootstrap";
import classes from './Sent.module.css'
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Sent=()=>{
    const [sentMails,setSentMails] = useState([])
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
                    message:data[key].content,
                    read:data[key].read,
                    check:data[key].check
                })
            }
            
            const sentMail = uploadedData.filter(item=>item.from!==currMail)
            setSentMails(sentMail)
        }).catch(err=>{
            alert(err.message)
        })
    },[currMail])

    return(
        <div className="col d-flex justify-content-center">
                    <Row>
                        <Col>
                        <div className={classes.control}>
                        <Button href="/send" className="mb-3">Compose</Button>
                            <Table >
                                <thead>
                                    <tr>
                                        
                                        <th>Subject</th>
                                        <th>Message</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                    {sentMails.map((item)=>{
                                        return(<tr key={item.id}>
                                            <td>{item.subject}</td>
                                            <td>{item.message}</td>
                                            
                                        </tr>
                                        )
                                    })}
                                    
                                </tbody>
                            </Table>
                            <Button href='/welcome' >Back</Button>
                            </div>
                        </Col>
                </Row>
            </div>
    )
}

export default Sent;