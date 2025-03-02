import Footer from "../footer/Footer";

function Privacy() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <main className="flex-fill">
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-lg-11 col-md-12">
              {" "}
              {/* Păstrat col-lg-10 pentru lățime echilibrată */}
              <div className="privacy-section p-4">
                <h1
                  className="privacy-header text-center mb-5 footer-title-for-mobile"
                  style={{
                    fontSize: "3.5rem",
                    fontWeight: "bold",
                    color: "#FFD824"
                  }}
                >
                  Privacy Policy
                </h1>
                <p
                  className="privacy-text text-white text-justify footer-description-for-mobile"
                  style={{ fontSize: "21px" }}
                >
                  Your privacy is important to us. This privacy statement
                  explains the personal data we collect, how we process it, and
                  for what purposes.
                </p>
              </div>
              <div className="privacy-section p-4">
                <h2
                  className="privacy-header footer-description-for-mobile"
                  style={{
                    fontSize: "21px",
                    fontWeight: "bold",
                    color: "#FFD824"
                  }}
                >
                  Information We Collect
                </h2>
                <p
                  className="privacy-text text-white text-justify footer-description-for-mobile"
                  style={{ fontSize: "21px" }}
                >
                  We collect information to provide better services to our
                  users. We collect information in the following ways:
                </p>
                <ul
                  className="privacy-text text-white footer-description-for-mobile"
                  style={{ fontSize: "21px", paddingLeft: "1.5rem" }}
                >
                  <li>Information you give us directly.</li>
                  <li>Information we get from your use of our services.</li>
                </ul>
              </div>
              <div className="privacy-section  p-4">
                <h2
                  className="privacy-header footer-description-for-mobile"
                  style={{
                    fontSize: "21px",
                    fontWeight: "bold",
                    color: "#FFD824"
                  }}
                >
                  How We Use Information
                </h2>
                <p
                  className="privacy-text text-white text-justify footer-description-for-mobile"
                  style={{ fontSize: "21px" }}
                >
                  We use the information we collect to provide, maintain,
                  protect, and improve our services, to develop new ones, and to
                  protect our users.
                </p>
              </div>
              <div className="privacy-section  p-4">
                <h2
                  className="privacy-header footer-description-for-mobile"
                  style={{
                    fontSize: "21px",
                    fontWeight: "bold",
                    color: "#FFD824"
                  }}
                >
                  Information Sharing
                </h2>
                <p
                  className="privacy-text text-white text-justify footer-description-for-mobile"
                  style={{ fontSize: "21px" }}
                >
                  We do not share personal information with companies,
                  organizations, and individuals outside of our company unless
                  one of the following circumstances applies:
                </p>
                <ul
                  className="privacy-text text-white footer-description-for-mobile"
                  style={{ fontSize: "21px", paddingLeft: "1.5rem" }}
                >
                  <li>With your consent.</li>
                  <li>For legal reasons.</li>
                </ul>
              </div>
              <div className="privacy-section  p-4">
                <h2
                  className="privacy-header footer-description-for-mobile"
                  style={{
                    fontSize: "21px",
                    fontWeight: "bold",
                    color: "#FFD824"
                  }}
                >
                  Changes to This Privacy Policy
                </h2>
                <p
                  className="privacy-text text-white text-justify footer-description-for-mobile"
                  style={{ fontSize: "21px" }}
                >
                  Our Privacy Policy may change from time to time. We will post
                  any privacy policy changes on this page.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Privacy;
