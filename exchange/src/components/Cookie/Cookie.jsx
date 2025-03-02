import Footer from "../footer/Footer";
import "./Cookie.css";

const Cookie = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <main className="flex-fill">
        <div className="container-lg my-5">
          {" "}
          {/* Container mai restrâns */}
          <div className="row justify-content-center">
            <div className="col-lg-11 col-md-10">
              {" "}
              {/* Lățime mai mică */}
              <div
                className="card mb-3 mx-auto"
                style={{ backgroundColor: "transparent", border: "none" }}
              >
                <div
                  className="card-body"
                  style={{
                    backgroundColor: "transparent",
                    padding: "3rem 1rem"
                  }}
                >
                  <h1
                    className="card-title text-center mb-5 footer-title-for-mobile"
                    style={{
                      fontSize: "3.5rem",
                      fontWeight: "600", // Mai puțin bold
                      color: "#FFD824"
                    }}
                  >
                    Cookies
                  </h1>
                  <p
                    className="card-text text-white mb-4 footer-description-for-mobile"
                    style={{
                      fontSize: "21px",
                      fontWeight: "400", // Text subțire
                      textAlign: "justify",
                      marginTop: "30px"
                    }}
                  >
                    Cookies are small text files that our website saves on your
                    device to improve your browsing experience. They can be used
                    to collect information about how users navigate the site and
                    to provide personalized content.
                  </p>
                  <p
                    className="card-text text-white mb-4 footer-description-for-mobile"
                    style={{
                      fontSize: "21px",
                      fontWeight: "400",
                      textAlign: "justify"
                    }}
                  >
                    You can control and manage cookies in your browser settings
                    or delete them at any time. Please note that certain cookies
                    may be essential for the proper functioning of the site, and
                    if you block or delete them, some features may not work
                    correctly.
                  </p>
                  <p
                    className="card-text text-white mb-4 footer-description-for-mobile"
                    style={{
                      fontSize: "21px",
                      fontWeight: "400",
                      textAlign: "justify"
                    }}
                  >
                    If you have any questions or concerns about our cookie
                    policy, please contact us. By continuing to browse our site,
                    you agree to the use of cookies in accordance with our
                    policy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cookie;
