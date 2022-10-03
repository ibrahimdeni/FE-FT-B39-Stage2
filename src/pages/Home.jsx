import Layout from "../components/NavigationBar";
import Journey from "../components/Journey";
import Bookmarkcards from "../components/Bookmarkcards";
// import BGTJ from "../assets/images/BGTJ.png";

function Home() {
  return (
    <>
      <Layout />
      <div className="BGHome">
        <div className="w-75" style={{ position: "absolute", top: "20%" }}>
          <h1 className="text-light title-home">The Journey</h1>
          <h1 className="text-light title-home">you ever dreamed of.</h1>
          <p className="text-light text-home fs-5">
            We made a tool so you can easily keep & share your travel memories
            <br />
            But there is a lot more
          </p>
          <p className="text-light text-home fs-5"></p>
        </div>

        <img className="BGTJ" alt="" />
      </div>
      <Journey />
      <Bookmarkcards />
    </>
  );
}

export default Home;
