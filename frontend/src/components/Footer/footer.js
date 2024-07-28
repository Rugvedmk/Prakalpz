import React from "react";
import "./footer.css";
function Footer() {
  return (
    <footer 
      className="text-white text-center text-lg-start" 
      style={{ backgroundColor: "#23242a", padding: "30px 0" , marginBottom:"0px", marginTop:'150px' ,position:'relative', width:'100%',bottom:'0'}}
    >
      {/* Grid container */}
      {/* <div className="container"> */}
        {/* Grid row */}
        <div className="row">
          {/* Grid column */}
          <div className="col-lg-4 col-md-12 mb-4 mb-md-0">
            <h5 className="text-uppercase mb-4">About Prakalpz</h5>
            <p>
              This platform facilitates students and universities in gaining
              nationwide recognition by showcasing their innovative projects,
              enhancing their profiles, and promoting peer-to-peer learning.
              This improved engagement encourages users to upload more content,
              engage with others, and spend more time on this platform
            </p>
          </div>
          {/* Grid column */}

          {/* Grid column */}
          <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase mb-4 pb-1">Team</h5>
            <div className="form-outline form-white mb-4">
              <div className="form-notch">
                <div
                  className="form-notch-leading"
                  style={{ width: "9px" }}
                ></div>
                <div
                  className="form-notch-middle"
                  style={{ width: "48.8px" }}
                ></div>
                <div className="form-notch-trailing"></div>
              </div>
            </div>
            <ul className="fa-ul" style={{ marginLeft: "1.65em" }}>
              <li className="mb-3">
                <span className="fa-li">
                  <i className="fas fa-home"></i>
                </span>
                <span className="ms-2">Prajwal Sakunde</span>
              </li>
              <li className="mb-3">
                <span className="fa-li">
                  <i className="fas fa-envelope"></i>
                </span>
                <span className="ms-2">Om Patil</span>
              </li>
              <li className="mb-3">
                <span className="fa-li">
                  <i className="fas fa-phone"></i>
                </span>
                <span className="ms-2">Pruthvij Desai</span>
              </li>
              <li className="mb-3">
                <span className="fa-li">
                  <i className="fas fa-print"></i>
                </span>
                <span className="ms-2">Rugved Kulkarni</span>
              </li>
              <li className="mb-3">
                <span className="fa-li">
                  <i className="fas fa-print"></i>
                </span>
                <span className="ms-2">Mehul Charak</span>
              </li>
            </ul>
          </div>
          {/* Grid column */}

          {/* Grid column */}
          <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase mb-4">Connect with Us</h5>
            <div class="cardFooter">
              <div class="background"></div>
              <div class="logoFooter">Socials</div>

              <a href="https://github.com/prakalpz">
                <div class="box box1">
                  <span class="icon">
                    <svg
                      viewBox="0 0 30 30"
                      xmlns="http://www.w3.org/2000/svg"
                      class="svg"
                    >
                      <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
                    </svg>
                  </span>
                </div>
              </a>

              <a href="#">
                <div class="box box2">
                  {" "}
                  <span class="icon">
                    <svg
                      viewBox="0 0 512 512"
                      xmlns="http://www.w3.org/2000/svg"
                      class="svg"
                    >
                      <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
                    </svg>
                  </span>
                </div>
              </a>

              <a href="https://discord.gg/AN72UsGG">
                <div class="box box3">
                  <span class="icon">
                    <svg
                      viewBox="0 0 640 512"
                      xmlns="http://www.w3.org/2000/svg"
                      class="svg"
                    >
                      <path d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z"></path>
                    </svg>
                  </span>
                </div>
              </a>

              <div class="box box4"></div>
            </div>
          </div>
          {/* Grid column */}
        </div>
        {/* Grid row */}
      {/* </div> */}
      {/* Grid container */}

      {/* Copyright */}
      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        © 2023 Copyright:
        <a className="text-white" href="https://mdbootstrap.com/">
          Prakalpz.com
        </a>
      </div>
      {/* Copyright */}
    </footer>
  );
}

export default Footer;
