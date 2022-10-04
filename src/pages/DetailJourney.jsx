import Layout from "../components/NavigationBar";
import imgdtl from "../assets/images/imgdtl.png";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/useContext";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { API } from "../config/api";

export default function Detail() {
  const [isLogin, setIsLogin] = useState(false);
  const [state] = useContext(UserContext);
  console.log("ini state detail journey", state);

  const { id } = useParams();
  const navigate = useNavigate();

  let { data: journeys } = useQuery("journeyCache", async () => {
    const response = await API.get("/journey/" + id);
    console.log("ini detail journey: ", response);
    return response.data.data;
  });

  useEffect(() => {
    if (state) setIsLogin(true);
    else {
      setIsLogin(false);
      alert("Silahkan Sign In");
      navigate("/");
    }
  }, [state]);

  return (
    <>
      <Layout />
      <div className="w-100 d-flex mt-4">
        <div className="w-50">
          <h1 className="fw-bold title_detail ms-5 ps-3">{journeys?.title}</h1>
        </div>
        <div className="w-50">
          <p className="author text-end fw-semibold fs-5 me-5 pe-3">
            {journeys?.user.fullname}
          </p>
        </div>
      </div>
      <div className="mb-5">
        <p className="text-primary ms-5 ps-3">{journeys?.created_at}</p>
      </div>
      <div className="w-100 d-flex mb-5">
        <img
          src={journeys?.image}
          className="imgdtl rounded-4 mx-auto"
          alt=""
        />
      </div>
      <div className="d-flex w-100 mb-5">
        <div className="text_dtl mx-auto">
          <p>
            <span className="tab-dtl"></span>
            {journeys?.description}
          </p>
        </div>
      </div>
    </>
  );
}
