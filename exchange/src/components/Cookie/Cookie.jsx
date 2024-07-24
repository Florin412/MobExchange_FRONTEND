import Footer from "../footer/Footer";

const Cookie = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <main className="flex-fill">
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-lg-10 col-md-12">
              <div className="card mb-5" style={{ backgroundColor: 'transparent', border: 'none', padding: '3rem 1rem' }}>
                <div className="card-body" style={{ backgroundColor: 'transparent', padding: '0' }}>
                  <h1 className="card-title text-center mb-4" style={{ fontSize: '5rem', fontWeight: 'bold', color: '#FFD824' }}>Cookies</h1>
                  <p className="card-text text-white" style={{ fontSize: '2rem', textAlign: 'justify' }}>
                    Cookies are small text files that our website saves on your device to improve your browsing experience. They can be used to collect information about how users navigate the site and to provide personalized content.
                  </p>
                  <p className="card-text text-white" style={{ fontSize: '2rem', textAlign: 'justify' }}>
                    You can control and manage cookies in your browser settings or delete them at any time. Please note that certain cookies may be essential for the proper functioning of the site, and if you block or delete them, some features may not work correctly.
                  </p>
                  <p className="card-text text-white" style={{ fontSize: '2rem', textAlign: 'justify' }}>
                    If you have any questions or concerns about our cookie policy, please contact us. By continuing to browse our site, you agree to the use of cookies in accordance with our policy.
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
