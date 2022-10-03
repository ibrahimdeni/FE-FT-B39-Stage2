import Layout from "../components/NavigationBar";
import imgdtl from "../assets/images/imgdtl.png";

export default function Detail() {
  return (
    <>
      <Layout />
      <div className="w-100 d-flex mt-4">
        <div className="w-50">
          <h1 className="fw-bold title_detail ms-5 ps-3">
            Bersemayam di Tanah Dewata
          </h1>
        </div>
        <div className="w-50">
          <p className="author text-end fw-semibold fs-5 me-5 pe-3">
            Ibrahim Ganteng
          </p>
        </div>
      </div>
      <div className="mb-5">
        <p className="text-primary ms-5 ps-3">17 October 2020</p>
      </div>
      <div className="w-100 d-flex mb-5">
        <img src={imgdtl} className="imgdtl mx-auto" alt="" />
      </div>
      <div className="d-flex w-100 mb-5">
        <div className="text_dtl mx-auto">
          <p>
            <span className="tab-dtl"></span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure,
            veniam? Rem velit quidem, accusamus repudiandae a quo sint saepe non
            iusto quaerat dolores animi quia doloribus voluptate atque, fuga
            quibusdam! Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Dolore, soluta! Ratione sit, nam similique, commodi beatae sapiente
            dolore officiis vel in et ipsa modi. Fugit aspernatur tenetur sint
            ad ullam.
          </p>
        </div>
      </div>
    </>
  );
}
