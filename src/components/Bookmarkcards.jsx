import React, { useContext, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import pitabookmark from "../assets/icons/pitabookmark.png";
import { API } from "../config/api";
import { UserContext } from "../context/useContext";
import moment from "moment";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Swal from "sweetalert2";

function BasicExample() {
  const [state] = useContext(UserContext);
  const isLogin = state.isLogin;
  console.log("ini state buat book", state);

  const [search, setSearch] = useState("");

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
      <div>
        <h1 className="fw-bold ms-5 mt-4">Journey</h1>
        <div className="mt-4 search-engine mx-auto">
          <InputGroup className="mb-3">
            <Form.Control
              className="PH_home py-2 shadow border-info border-opacity-50"
              placeholder="Find The Journeys Here!"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              onChange={(e) => setSearch(e.target.value)}
            />
            {/* <InputGroup.Text
              className="px-5 bg-primary fw-semibold text-light"
              id="basic-addon2"
            >
              Search
            </InputGroup.Text> */}
          </InputGroup>
        </div>
      </div>
      <div className="overflow-hidden w-100" id="">
        <Row md={4} className="">
          {journeys
            ?.filter((item) => {
              return search.toLowerCase() === ""
                ? item
                : item.title.toLowerCase().includes(search);
            })
            .map((jurney, index) => {
              return (
                <Col className="d-flex justify-content-center" key={index}>
                  <Card
                    style={{ width: "18rem", height: "23rem" }}
                    className="my-5 shadow border-info border-opacity-25"
                  >
                    <Card.Img
                      variant="top"
                      style={{ objectFit: "cover" }}
                      height="180px"
                      src={jurney.image}
                    />
                    {isLogin ? (
                      <img
                        src={pitabookmark}
                        style={{
                          position: "absolute",
                          cursor: "pointer",
                          marginLeft: "88%",
                        }}
                        alt=""
                        className="mt-1"
                        onClick={(e) => {
                          // setSelectedJourneyId(jurney.id);
                          Swal.fire({
                            title: "Do you want to bookmark this Journey?",
                            showDenyButton: true,
                            // showCancelButton: true,
                            confirmButtonText: "Save",
                            denyButtonText: `Don't save`,
                          }).then((result) => {
                            /* Read more about isConfirmed, isDenied below */
                            if (result.isConfirmed) {
                              Swal.fire({
                                icon: "success",
                                title: "Success!",
                                showConfirmButton: true,
                                onClick: handleBookmark(e, jurney.id),
                              });
                            } else if (result.isDenied) {
                              Swal.fire("The journey is not saved", "", "info");
                            }
                          });
                        }}
                      />
                    ) : (
                      ""
                    )}

                    <Link
                      to={`/detail/${jurney.id}`}
                      className="text-decoration-none text-dark"
                    >
                      <Card.Body>
                        <div>
                          <h5>{jurney.title.slice(0, 20)} ..</h5>
                          <p
                            className="text-muted"
                            style={{ fontSize: "12px" }}
                          >
                            {moment(jurney.created_at).format(
                              "dddd, DD MMMM YYYY"
                            )}
                          </p>
                          <p
                            className="text-muted"
                            style={{ fontSize: "12px", marginTop: "-17px" }}
                          >
                            {jurney.user.fullname}
                          </p>
                        </div>
                        <Card.Text
                          style={{
                            fontSize: "14px",
                            textAlign: "justify",
                            marginTop: "-10px",
                          }}
                        >
                          {jurney.description.slice(0, 145)} ...
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
