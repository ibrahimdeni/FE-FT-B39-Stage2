import Layout from "../components/NavigationBar";
import { Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { UserContext } from "../context/useContext";
import React, { useContext } from "react";
import { useQuery } from "react-query";
import { API } from "../config/api";

export default function BookMark() {
  const [state] = useContext(UserContext);
  console.log("state di Profile : ", state.user);

  let { data: bookmarks } = useQuery("bookmarksCache", async () => {
    const response = await API.get("/bookmarks");
    console.log("response bookmarks", response);
    const resultResponse = response.data.data;
    console.log("anuuu bookmarks", bookmarks);

    const resultFilter = resultResponse.filter(
      (data) => data.user.id === state.user.id
    );
    console.log("resultFilter bookmarks nihh:", resultFilter);
    return resultFilter;
  });

  console.log("test journeys", bookmarks);

  return (
    <>
      <div>
        <Layout />
        <h1 className="fw-bold title_detail ms-5 ps-3">Bookmark</h1>
      </div>
      <div className="">
        <div className="overflow-hidden w-100" id="">
          <Row md={4} className="">
            {bookmarks?.map((bookmark, index) => {
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
                      src={bookmark.journey.image}
                    />
                    <Link
                      to={`/detail/${bookmark.journey.id}`}
                      className="text-decoration-none text-dark"
                    >
                      <Card.Body>
                        <div>
                          <h5>{bookmark.journey.title}</h5>
                          <p
                            className="text-muted"
                            style={{ fontSize: "13px" }}
                          >
                            {bookmark.journey.created_at}
                          </p>
                          <p
                            className="text-muted"
                            style={{ fontSize: "13px", marginTop: "-17px" }}
                          >
                            {bookmark.journey.user.fullname}
                          </p>
                        </div>
                        <Card.Text style={{ fontSize: "14px" }}>
                          {bookmark.journey.description}
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
