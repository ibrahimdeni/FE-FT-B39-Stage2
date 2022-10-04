import React, { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import pitabookmark from "../assets/icons/pitabookmark.png";
import { API } from "../config/api";
import { UserContext } from "../context/useContext";

function BasicExample() {
  const [state] = useContext(UserContext);
  console.log("ini state buat book", state);

  let { data: journeys } = useQuery("journeysCache", async () => {
    const response = await API.get("/journeys");
    console.log("response journeys", response);
    const resultResponse = response.data.data;
    console.log("resultResponse", resultResponse);
    return response.data.data;
  });

  console.log("test journeys", journeys);

  const handleBookmark = async (e, jurneyId) => {
    e.preventDefault();
    try {
      console.log("ini kita mau bookmark :", state.user.id);

      // Configuration Content-type
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      };

      // const
      console.log("data mauc checj", jurneyId, state.user.id);

      const response = await API.post(
        "/bookmark",
        {
          journey_id: parseInt(jurneyId),
          user_id: parseInt(state.user.id),
        },
        config
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <div className="overflow-hidden w-100" id="">
        <Row md={4} className="">
          {journeys?.map((jurney, index) => {
            return (
              <Col className="d-flex justify-content-center" key={index}>
                <Card
                  style={{ width: "18rem", height: "23rem" }}
                  className="my-5"
                >
                  <Card.Img
                    variant="top"
                    style={{ objectFit: "cover" }}
                    height="180px"
                    src={jurney.image}
                  />
                  <img
                    src={pitabookmark}
                    style={{ position: "absolute", marginLeft: "88%" }}
                    alt=""
                    className="mt-1"
                    onClick={(e) => {
                      // setSelectedJourneyId(jurney.id);
                      handleBookmark(e, jurney.id);
                    }}
                  />
                  <Link
                    to={`/detail/${jurney.id}`}
                    className="text-decoration-none text-dark"
                  >
                    <Card.Body>
                      <div>
                        <h5>{jurney.title}</h5>
                        <p className="text-muted" style={{ fontSize: "13px" }}>
                          {jurney.created_at}
                        </p>
                        <p
                          className="text-muted"
                          style={{ fontSize: "13px", marginTop: "-17px" }}
                        >
                          {jurney.user.fullname}
                        </p>
                      </div>
                      <Card.Text style={{ fontSize: "14px" }}>
                        {jurney.description}
                      </Card.Text>
                    </Card.Body>
                  </Link>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}

export default BasicExample;
// export default BasicExample
