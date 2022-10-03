import Layout from "../components/NavigationBar";
import Aku from "../assets/images/aku.jpg";

export default function Profile() {
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
          <p className="fs-3 fw-bold">Ibrahim Ganteng</p>
          <p className="fs-6 text-muted" style={{ marginTop: "-17px" }}>
            BaimGansBingit@mail.com
          </p>
        </div>
      </div>
    </>
  );
}
