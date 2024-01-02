import { Outlet, Link, useLocation } from "react-router-dom";

const About = () => {
  const location = useLocation();
  const isProfile = location.pathname.split("/")[2];

  const visitProfile = (
    <Link style={{ color: "blue" }} to="profile">
      Visit Profile
    </Link>
  );

  const backButton = (
    <Link style={{ color: "blue" }} to="">
      back
    </Link>
  );

  return (
    <div className="container">
      <h1 style={{ paddingBlock: "30px" }}>This is about of our Page.</h1>
      {isProfile ? backButton : visitProfile}
      <Outlet />
    </div>
  );
};

export default About;
