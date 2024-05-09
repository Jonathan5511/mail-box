import { Row, Col, Table } from "react-bootstrap";
import classes from "./SentMails.module.css";
import { useSelector } from "react-redux";
import { Fragment, useEffect, useState } from "react";

const SentMail = () => {
  const [sentMails, setSentMails] = useState([]);
  const currMail = useSelector((state) => state.auth.mailId);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://mail-react-c7e1b-default-rtdb.firebaseio.com/mail.json")
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Getting data failed!";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
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

        let sentMail = uploadedData.filter((item) => item.from !== currMail);

        setSentMails(sentMail);
        setLoading(false);
      })
      .catch((err) => {
        alert(err.message);
        setLoading(false);
      });
  }, [currMail]);

  return (
    <Fragment>
      {!loading && (
        <div>
          <Row>
            <Col>
              <div className={classes.control}>
                <Table>
                  <thead>
                    <tr>
                      <th>Subject</th>
                      <th>Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sentMails.map((item) => {
                      return (
                        <tr key={item.id}>
                          <td>{item.subject}</td>
                          <td>{item.message}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
        </div>
      )}
      {loading && <p>Loading...</p>}
    </Fragment>
  );
};

export default SentMail;
