import Layout from "../components/NavigationBar";
import { Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { UserContext } from "../context/useContext";
import React, { useContext, useEffect } from "react";
import { useQuery } from "react-query";
import { API } from "../config/api";
import moment from "moment";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import icondelete from "../assets/icons/delete.jpg";

export default function BookMark() {
  const [state] = useContext(UserContext);
  console.log("state di Profile : ", state.user);

  const navigate = useNavigate();

  let { data: bookmarks, refetch: okeiRefetch } = useQuery(
    "bookmarksCache",
    async () => {
      const response = await API.get("/bookmarks");
      console.log("response bookmarks", response);
      const resultResponse = response.data.data;
      console.log("anuuu bookmarks", bookmarks);

      const resultFilter = resultResponse.filter(
        (data) => data.user.id === state.user.id
      );
      console.log("resultFilter bookmarks nihh:", resultFilter);
      return resultFilter;
    }
  );

  console.log("test journeys", bookmarks);

  const handleDelete = async (e, bookmarkId) => {
    e.preventDefault();
    try {
      console.log("ini kita mau delete :", state.user.id);

      // Configuration Content-type
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      };

      // const
      console.log("data mauc check d", bookmarkId, state.user.id);

      const response = await API.delete(`/bookmark/${bookmarkId}`, config);
      console.log("ini respon delete", response);
      okeiRefetch();
      navigate("/bookmark");
      // navigate("/profile");
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
      <div>
        <Layout />
        <h1 className="fw-bold title_detail ms-5 ps-3">Bookmark</h1>
      </div>
      <div className="px-4">
        <div className="overflow-hidden w-100" id="">
          <Row md={4} className="">
            {bookmarks?.map((bookmark, index) => {
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
                      s
                      src={bookmark.journey.image}
                    />
                    <img
                      src={icondelete}
                      style={{
                        position: "absolute",
                        cursor: "pointer",
                        marginLeft: "88%",
                        marginTop: "1%",
                        width: "31px",
                        backgroundColor: "white",
                      }}
                      onClick={(e) => {
                        // setSelectedJourneyId(jurney.id);
                        Swal.fire({
                          title: "Do you want to delete this Journey?",
                          showDenyButton: true,
                          showCancelButton: true,
                          confirmButtonText: "Delete",
                          denyButtonText: `Don't delete`,
                        }).then((result) => {
                          /* Read more about isConfirmed, isDenied below */
                          if (result.isConfirmed) {
                            Swal.fire({
                              icon: "success",
                              title: "Success!",
                              showConfirmButton: true,
                              onClick: handleDelete(e, bookmark.ID),
                            });
                          } else if (result.isDenied) {
                            Swal.fire("The journey is not deleted", "", "info");
                          }
                        });
                      }}
                      className="rounded-circle"
                      alt=""
                    />
                    <Link
                      to={`/detail/${bookmark.journey.id}`}
                      className="text-decoration-none text-dark"
                    >
                      <Card.Body>
                        <div>
                          <h5>{bookmark.journey.title.slice(0, 20)} ..</h5>
                          <p
                            className="text-muted"
                            style={{ fontSize: "12px" }}
                          >
                            {moment(bookmark.journey.created_at).format(
                              "dddd, DD MMMM YYYY"
                            )}
                          </p>
                          <p
                            className="text-muted"
                            style={{ fontSize: "12px", marginTop: "-17px" }}
                          >
                            {bookmark.journey.user.fullname}
                          </p>
                        </div>
                        <Card.Text
                          style={{
                            fontSize: "14px",
                            textAlign: "justify",
                            marginTop: "-10px",
                          }}
                        >
                          {bookmark.journey.description.slice(0, 145)} ...
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
