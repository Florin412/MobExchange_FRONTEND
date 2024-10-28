import Footer from "../footer/Footer";

const About = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <main className="flex-fill">
        <div className="container-fluid my-5">
          <div className="row justify-content-center">
            <div className="col-lg-10 col-md-12">
              <div
                className="card mb-3 mx-auto"
                style={{ backgroundColor: 'transparent', border: 'none' }}
              >
                <div className="card-body" style={{ backgroundColor: 'transparent', padding: '3rem 1rem' }}>
                  <h1 className="card-title text-center mb-5" style={{ fontSize: '5rem', fontWeight: 'bold', color: '#FFD824' }}>About Us</h1>
                  <p className="card-text text-white mb-4" style={{ fontSize: '2rem', textAlign: 'justify', marginTop: '50px' }}>
                    Welcome to <strong style={{ color: '#FFD824' }}>MobiExchange</strong>, your reliable partner for secure and efficient currency exchanges. We specialize in providing a seamless experience for transactions involving fiat currency. Our platform is designed with your safety and ease of use in mind, making it the ideal choice for all your currency exchange needs.
                  </p>
                  <p className="card-text text-white mb-4" style={{ fontSize: '2rem', textAlign: 'justify' }}>
                    At <strong style={{ color: '#FFD824' }}>MobiExchange</strong>, we prioritize:
                  </p>
                  <ul className="card-text text-white mb-4" style={{ fontSize: '2rem', paddingLeft: '2.5rem', textAlign: 'justify' }}>
                    <li><strong style={{ color: '#FFD824' }}>Trust</strong>: We are committed to maintaining the highest standards of integrity and reliability in all our transactions. You can count on us to handle your exchanges with the utmost care.</li>
                    <li><strong style={{ color: '#FFD824' }}>Security</strong>: Your safety is our top concern. We utilize advanced security measures to ensure that every transaction is protected and your personal information remains confidential.</li>
                    <li><strong style={{ color: '#FFD824' }}>Transparency</strong>: We believe in being clear and open about our processes. From transaction fees to exchange rates, we ensure that you are fully informed every step of the way.</li>
                  </ul>
                  <p className="card-text text-white mb-4" style={{ fontSize: '2rem', textAlign: 'justify' }}>
                    Our team of dedicated experts is here to support you around the clock. We work tirelessly to ensure that your experience with our platform is smooth and enjoyable. Whether you're exchanging a small amount or engaging in larger transactions, we are here to assist you at every turn.
                  </p>
                  <p className="card-text text-white mb-4" style={{ fontSize: '2rem', textAlign: 'justify' }}>
                    We offer a wide range of fiat currencies and advanced trading features to cater to your specific needs. Our user-friendly interface makes it easy for you to navigate and complete your transactions quickly and efficiently.
                  </p>
                  <p className="card-text text-white mb-4" style={{ fontSize: '2rem', textAlign: 'justify' }}>
                    Discover the benefits of using <strong style={{ color: '#FFD824' }}>MobiExchange</strong> and experience a new level of convenience and reliability in currency exchange. Sign up today and start enjoying secure, efficient, and transparent transactions.
                  </p>
                  <p className="card-text text-white mb-4" style={{ fontSize: '2rem', textAlign: 'justify' }}>
                    Thank you for choosing <strong style={{ color: '#FFD824' }}>MobiExchange</strong>. We look forward to serving you!
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

export default About;
