import pitabookmark from "../assets/icons/pitabookmark.png";
import { BiDotsVerticalRounded } from "react-icons/bi";
import React, { useContext, useEffect } from "react";
import icondelete from "../assets/icons/delete.jpg";
import { UserContext } from "../context/useContext";
import Layout from "../components/NavigationBar";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { API } from "../config/api";
import Swal from "sweetalert2";
import moment from "moment";
import AKUU from "../assets/images/profileUser.png";

// import Aku from "../assets/icons/usernew.png";
// import { useState } from "react";

export default function Profile() {
  const [state] = useContext(UserContext);
  console.log("state di Profile : ", state.user);

  // const [journeyData, setJourneyData] = useState([]);

  const navigate = useNavigate();

  let { data: journeys, refetch: dataRefecth } = useQuery(
    "journeysCache",
    async () => {
      const response = await API.get("/journeys");
      console.log("response journeys", response);
      const resultResponse = response.data.data;
      console.log("anuuu", journeys);

      const resultFilter = resultResponse.filter(
        (data) => data.user.id === state.user.id
      );
      console.log("resultFilter nihh :", resultFilter);

      // setJourneyData(resultFilter);
      // journeyData.push(resultFilter);
      return resultFilter;
    }
  );

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

  const handleDelete = async (e, jurneyId) => {
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

      const response = await API.delete(`/journey/${jurneyId}`, config);
      console.log(response);
      dataRefecth();
      // navigate("/");
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      Swal.fire({
        icon: "error",
        title: "Heyyoo!",
        text: "You have to login first~",
      });

      navigate("/");
    }
  }, []);

  return (
    <>
      <Layout />
      <div className="mt-3 mx-5 p-3">
        <h1 className="fw-bold">Profile</h1>
        <div
          className="d-flex py-3 shadow border border-5 rounded-5"
          style={{ height: "200px", marginTop: "30px" }}
        >
          <div className="w-25 d-flex">
            <img
              className="img_profile w-50 mx-auto rounded-5 border border-5 border-opacity-50 border-primary"
              style={{ objectFit: "cover" }}
              src={AKUU}
              alt=""
            />
          </div>
          <div className="text-center w-75 pt-4">
            <p className="fs-3 fw-bold">{state.user.fullname}</p>
            <p className="fs-6 fw-semibold" style={{ marginTop: "-17px" }}>
              {state.user.email}
            </p>
            <p className="fs-6 fw-semibold" style={{ marginTop: "-17px" }}>
              {state.user.phone}
            </p>
            <p className="fs-6 fw-semibold" style={{ marginTop: "-17px" }}>
              {state.user.address}
            </p>
          </div>
        </div>
      </div>
      <div className="px-5">
        <div className="overflow-hidden w-100" id="">
          <Row md={4} className="">
            {journeys?.map((jurney, index) => {
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
                    <Dropdown
                      style={{
                        position: "absolute",
                        cursor: "pointer",
                        marginLeft: "81%",
                        marginTop: "1.5%",
                        width: "31px",
                      }}
                      className="rounded-circle"
                      key="start"
                      drop="start"
                      backgroundColor="transparent"
                    >
                      <Dropdown.Toggle
                        variant="light"
                        id="dropdown-button-start"
                        key="start"
                        drop="start"
                      >
                        <BiDotsVerticalRounded />
                      </Dropdown.Toggle>

                      <Dropdown.Menu className="fw-bold" variant="light">
                        <Dropdown.Item
                          className="fw-semibold"
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
                                Swal.fire(
                                  "The journey is not saved",
                                  "",
                                  "info"
                                );
                              }
                            });
                          }}
                        >
                          <img
                            src={pitabookmark}
                            style={{ width: "20pxd", marginRight: "10px" }}
                            alt=""
                          />
                          Bookmark
                        </Dropdown.Item>
                        <Dropdown.Item
                          className="fw-semibold"
                          onClick={(e) => {
                            // setSelectedJourneyId(jurney.id);
                            Swal.fire({
                              title: "Do you want to delete this Journey?",
                              showDenyButton: true,
                              confirmButtonText: "Delete",
                              denyButtonText: `Don't delete`,
                            }).then((result) => {
                              /* Read more about isConfirmed, isDenied below */
                              if (result.isConfirmed) {
                                Swal.fire({
                                  icon: "success",
                                  title: "Success!",
                                  showConfirmButton: true,
                                  onClick: handleDelete(e, jurney.id),
                                });
                              } else if (result.isDenied) {
                                Swal.fire(
                                  "The journey is not deleted",
                                  "",
                                  "info"
                                );
                              }
                            });
                          }}
                        >
                          <img
                            src={icondelete}
                            style={{
                              width: "30px",
                              marginRight: "10px",
                              backgroundColor: "white",
                            }}
                            alt=""
                            className="rounded-circle"
                          />
                          Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
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
                        <p
                          style={{
                            fontSize: "14px",
                            textAlign: "justify",
                            marginTop: "-10px",
                          }}
                        >
                          {jurney.description.slice(0, 145)} ...
                        </p>
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
