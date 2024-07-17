import "./Cookie.css";

const Cookie = () => {
  return (
    <div
      className="card mb-3 mx-auto my-auto mt-3"
      style={{ maxWidth: "45rem" }}
    >
      <div className="card-body my-auto">
        <h5 className="card-title">Cookies</h5>
        <p className="card-text">
          Cookies are small text files that our website saves on your device to
          improve your browsing experience. They can be used to collect
          information about how users navigate the site and to provide
          personalized content.
        </p>
        <p className="card-text">
          You can control and manage cookies in your browser settings or delete
          them at any time. Please note that certain cookies may be essential
          for the proper functioning of the site, and if you block or delete
          them, some features may not work correctly.
        </p>
        <p className="card-text">
          If you have any questions or concerns about our cookie policy, please
          contact us. By continuing to browse our site, you agree to the use of
          cookies in accordance with our policy.
        </p>
      </div>
    </div>
  );
};

export default Cookie;
