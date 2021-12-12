import Carousel from "react-bootstrap/Carousel";

const AboutUs = () => {
  return (
    <section className="about-us">
      <section className="about-us-info">
        <h1 className="about-us-info-title">About Us</h1>
        <p className="about-us-info-text">
          The idea of ​​aevent is to give a chance to everyone to create and
          participate in an event for free.
        </p>
        <h3>Try it! You will not regret!</h3>
      </section>
      <section className="about-us-carousel">
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/images/about-us-1.jpg"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>For your parties</h3>
              <p>Organize easily.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/images/about-us-2.jpg"
              alt="Second slide"
            />

            <Carousel.Caption>
              <h3>For your eating events</h3>
              <p>Invite friends and interesting people.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/images/about-us-3.jpg"
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3>For your sporting events</h3>
              <p>Become popular and stay in good shape.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </section>
    </section>
  );
};
export default AboutUs;
