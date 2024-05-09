import { Fragment, useCallback, useEffect, useState } from "react";
import { Button, Col, ListGroup, Row, Table, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import classes from "./ReceivedMails.module.css";
import { mailActions } from "../../store/mail";
import blueDot from "../../utilities/bluedot.png";
import blackDot from "../../utilities/blackDot.png";

const ReceivedMails = (props) => {
  const [inboxMail, setInboxMail] = useState([]);
  const [viewMail, setViewMail] = useState([]);
  const [deleteChange, setDeleteChange] = useState(false);
  const currMail = useSelector((state) => state.auth.mailId);
  const dispatch = useDispatch();
  const mailRead = useSelector((state) => state.mail.isRead);
  const [loading, setLoading] = useState(true);

  const onReadHandler = (id, to, from, subject, message, read, check) => {
    console.log(id);
    console.log(inboxMail.id);
    dispatch(mailActions.read());
    const openMail = inboxMail.filter((item) => item.id === id);
    setViewMail(openMail);
    fetch(
      `https://mail-react-c7e1b-default-rtdb.firebaseio.com/mail/${id}.json`,
      {
        method: "PUT",
        body: JSON.stringify({
          id: id,
          to: to,
          from: from,
          subject: subject,
          content: message,
          read: read,
          check: true,
        }),
        headers: { "Content-Type": "application/json" },
      }
    );
    props.onSend();
  };

  const onCloseReadHandler = () => {
    dispatch(mailActions.unRead());
  };

  const onDeleteHandler = useCallback(
    async (id) => {
      setDeleteChange(true);
      await fetch(
        `https://mail-react-c7e1b-default-rtdb.firebaseio.com/mail/${id}.json`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      setDeleteChange(false);
      props.onSend();
    },
    [props]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://mail-react-c7e1b-default-rtdb.firebaseio.com/mail.json"
        );
        if (!res.ok) {
          const data = await res.json();
          let errorMessage = "Getting data failed!";
          if (data && data.error && data.error.message) {
            errorMessage = data.error.message;
          }
          throw new Error(errorMessage);
        }
        const data = await res.json();
        console.log("Received data from API:", data);
        let uploadedData = [];
        for (const key in data) {
          uploadedData.push({
            id: key,
            to: data[key].to,
            from: data[key].from,
            subject: data[key].subject,
            message: data[key].content,
            read: data[key].read,
            check: data[key].check,
          });
        }
        console.log("Transformed data:", uploadedData);
        const inboxItems = uploadedData.filter((mail) => mail.to !== currMail);
        console.log("Inbox items:", inboxItems);

        setInboxMail(inboxItems);
        setLoading(false);
      } catch (err) {
        alert(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [currMail, onDeleteHandler, deleteChange]);

  return (
    <Fragment>
      <br />
      {!loading && !mailRead && (
        <div>
          <div>
            <Row>
              <Col>
                <div className={classes.control}>
                  <Table>
                    <thead>
                      <tr>
                        <th>From</th>
                        <th>Subject</th>
                        <th>Message</th>
                        <th></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {inboxMail.map((item) => {
                        return (
                          <tr key={item.id}>
                            <td>
                              {!item.check ? (
                                <img src={blueDot} alt="BlueMarker" />
                              ) : (
                                <img src={blackDot} alt="EmptyMarker" />
                              )}
                              &nbsp;
                              {item.from}
                            </td>
                            <td>{item.subject}</td>
                            <td>{item.message}</td>
                            <td>
                              <Button
                                size="sm"
                                variant="dark"
                                onClick={() =>
                                  onReadHandler(
                                    item.id,
                                    item.to,
                                    item.from,
                                    item.subject,
                                    item.message,
                                    item.read,
                                    item.check
                                  )
                                }
                              >
                                Open Mail
                              </Button>
                            </td>
                            <td>
                              <Button
                                size="sm"
                                variant="dark"
                                onClick={() => onDeleteHandler(item.id)}
                              >
                                Delete
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      )}
      {loading && <p>Loading...</p>}
      {mailRead && (
        <div className={classes.control}>
          <Card>
            <ListGroup>
              {viewMail.map((item) => {
                return (
                  <div>
                    <ListGroup.Item key={item.key}>
                      From: {item.from}
                    </ListGroup.Item>
                    <ListGroup.Item key={item.key}>
                      Subject: {item.subject}
                    </ListGroup.Item>
                    <ListGroup.Item key={item.key}>
                      Message: {item.message}
                    </ListGroup.Item>
                    <Button
                      className="m-3 "
                      onClick={onCloseReadHandler}
                      variant="dark"
                    >
                      Back
                    </Button>
                  </div>
                );
              })}
            </ListGroup>
          </Card>
        </div>
      )}
    </Fragment>
  );
};

export default ReceivedMails;
