import { Fragment, useEffect, useState } from "react";
import { Button, Container, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import ComposeMail from "../component/mails/ComposeMail";
import ReceivedMails from "../component/mails/ReceivedMails";
import SentMail from "../component/mails/SentMails";

const Welcome = (props) => {
  const [count, setCount] = useState(0);
  const [showComposeMail, setShowComposeMail] = useState(false);
  const [showInbox, setShowInbox] = useState(true);
  const [showSentMail, setShowSentMail] = useState(false);
  const [reload, setReload] = useState(false);
  const currMail = useSelector((state) => state.auth.mailId);

  const onshowComposeMail = () => {
    setShowComposeMail(true);
    setShowInbox(false);
    setShowSentMail(false);
  };

  const onshowInbox = () => {
    setShowInbox(true);
    setShowComposeMail(false);
    setShowSentMail(false);
  };

  const onShowSentMail = () => {
    setShowSentMail(true);
    setShowInbox(false);
    setShowComposeMail(false);
  };

  const handleSend = () => {
    setReload((prevReload) => !prevReload);
  };

  useEffect(() => {
    fetch("https://mail-react-c7e1b-default-rtdb.firebaseio.com/mail.json")
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Failed to fetch data!";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        let count = 0;
        for (const key in data) {
          if (data[key].check === false) {
            count = count + 1;
          }
        }
        setCount(count);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, [currMail, reload]);

  return (
    <Fragment>
      <Container
        style={{
          margin: "10rem",
          marginLeft: "-1rem",
          marginTop: "0rem",
          maxHeight: "100rem",
        }}
      >
        <Card
          className="p-3 bg-dark text-light "
          style={{ borderRadius: "0rem", width: "10rem", height: "35.1rem" }}
        >
          <h3 className="text-center mb-3">Welcome</h3>
          <Button onClick={onshowInbox} className="mb-1 p-1" variant="light">
            Inbox ({count})
          </Button>
          <Button onClick={onShowSentMail} className="mb-1 p-1" variant="light">
            Sent
          </Button>
          <Button
            onClick={onshowComposeMail}
            className="mb-1 p1"
            variant="light"
          >
            Send Mail
          </Button>
        </Card>
      </Container>
      {showComposeMail && (
        <Container
          style={{
            margin: "10rem",
            marginLeft: "9rem",
            marginTop: "-45rem",
            maxHeight: "0rem",
            height: "50rem",
            maxWidth: "100rem",
            width: "76rem",
          }}
        >
          <ComposeMail onSend={handleSend} />
        </Container>
      )}
      {showInbox && (
        <Container
          style={{
            margin: "10rem",
            marginLeft: "9rem",
            marginTop: "-45rem",
            maxHeight: "0rem",
            height: "50rem",
            maxWidth: "0rem",
            width: "50rem",
          }}
        >
          <ReceivedMails onSend={handleSend} />
        </Container>
      )}
      {showSentMail && (
        <Container
          style={{
            margin: "10rem",
            marginLeft: "9rem",
            marginTop: "-45rem",
            maxHeight: "0rem",
            height: "50rem",
            maxWidth: "0rem",
            width: "50rem",
          }}
        >
          <SentMail />
        </Container>
      )}
    </Fragment>
  );
};

export default Welcome;
