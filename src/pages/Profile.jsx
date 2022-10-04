import Layout from "../components/NavigationBar";
import Aku from "../assets/images/aku.jpg";
import { UserContext } from "../context/useContext";
import React, { useContext } from "react";
import { useQuery } from "react-query";
import { API } from "../config/api";
import Card from "react-bootstrap/Card";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import pitabookmark from "../assets/icons/pitabookmark.png";

export default function Profile() {
  const [state] = useContext(UserContext);
  console.log("state di Profile : ", state.user);

  let { data: journeys } = useQuery("journeysCache", async () => {
    const response = await API.get("/journeys");
    console.log("response journeys", response);
    const resultResponse = response.data.data;
    console.log("anuuu", journeys);

    const resultFilter = resultResponse.filter(
      (data) => data.user.id === state.user.id
    );
    console.log("resultFilter nihh :", resultFilter);
    return resultFilter;
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
    <>
      <Layout />
      <div className="mt-5 mx-5">
        <h1 className="fw-bold">Profile</h1>
        <div className="w-100 d-flex">
          <img
            className="img_profile mx-auto rounded-circle border border-5 border-opacity-50 border-primary"
            src={Aku}
            alt=""
          />
        </div>
        <div className="text-center mt-2">
          <p className="fs-3 fw-bold">{state.user.fullname}</p>
          <p className="fs-6 text-muted" style={{ marginTop: "-17px" }}>
            {state.user.email}
          </p>
        </div>
      </div>
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
                      s
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
                          <p
                            className="text-muted"
                            style={{ fontSize: "13px" }}
                          >
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
    </>
  );
}
