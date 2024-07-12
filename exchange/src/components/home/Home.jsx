import "./Home.css";

function Home() {
  // { firstname = "Robert", lastname = "Smeth", symbol = "$" }
  return (
    <div>
      <div className="navbar">
        <div>
          <h1 className="navbar_header">MobiExchange</h1>
        </div>
        <div>
          <ul className="navbar_ul">
            <li className="li li_1">
              <a href="#" className="a a_1">
                Test1
              </a>
            </li>
            <li className="li li_2">
              <a href="#" className="a a_2">
                Test2
              </a>
            </li>
            <li className="li li_3">
              <a href="#" className="a a_3">
                Test3
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="first_entry">
        <div className="first-half">
          <h2 className="header_first">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae,
            quasi.
          </h2>
          <p className="p_first">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
            maxime officiis at error maiores quibusdam aut, modi, ea dolor qui
            voluptatibus laboriosam recusandae libero, perspiciatis optio
            corrupti incidunt distinctio. Porro.
          </p>
          <img
            className="img_first_half"
            src="https://th.bing.com/th/id/OIP.AC_uTz4oD2gtdm3TsJgyLgHaFn?rs=1&pid=ImgDetMain"
          ></img>
          <div className="tranzactions">
            <div className="tranziction">
              <h2>$</h2>
              <div className="about-tranziction">
                <div>
                  <h3>Successfull Transactions </h3>
                </div>
                <div>
                  <h3>+2M</h3>
                </div>
              </div>
            </div>

            <div className="tranziction">
              <h2>$</h2>
              <div className="about-tranziction">
                <div>
                  <h3>Successfull Transactions</h3>
                </div>
                <div>
                  <h3>+2M</h3>
                </div>
              </div>
            </div>
          </div>
          <div className=""></div>
        </div>
        <div className="second-half">
          <div>
            <h2>Hello, {"firstname"}</h2>
          </div>
          <div>
            <div>
              <div>
                <input type="text" />
              </div>
              <div>
                <h2>Currency: {"symbol"}</h2>
              </div>
            </div>
            <div>
              <div>
                <input type="text" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
