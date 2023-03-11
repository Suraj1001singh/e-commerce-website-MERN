import React from "react";
import './newsletter.css'
const NewsLetter = () => {
  return (
    <section className="newsletter section">
      <div className="newsletter_container bd-grid">
        <div>
          <h3 className="newsletter_title">
            Subscribe And Get
            <br />
            10% OFF
          </h3>
          <p className="newsletter_description">Get 10% discount for all products </p>
        </div>
        <form action="" className="newsletter_subscribe">
          <input type="text" placeholder="@gmail.com" className="newsletter_input"></input>
          <a href="#" className="button">
            Subcribe
          </a>
        </form>
      </div>
    </section>
  );
};

export default NewsLetter;
