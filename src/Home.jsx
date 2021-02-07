import React from "react";

function Home() {
  return (
    <div className="home">
      <div class="container">
        <div class="row align-items-center my-5">
          <div class="col-lg-5">
            <h1 class="font-weight-light">Athena</h1>
            <h2 class="font-weight-light">Get Advice. Gain Wisdom.</h2>
            <p>
              Athena provides you with inspirational quotes and philosophies that best suit your needs and personality.
            </p>
            <form>
                <input size="40" placeholder="Phone number, username, or email" /> <br />
                <input size="40" placeholder="Password" /> <br />
                <button>Login In!</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;