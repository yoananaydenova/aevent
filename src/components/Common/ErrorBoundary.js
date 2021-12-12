import { Component } from "react";
import Image from "react-bootstrap/Image";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.log(error);
    return error;
  }

  render() {
    if (this.state.hasError) {
      return (       
          <Image
            src="/images/404-page.jpg"
            className="error-page-image"
            fluid
          />     
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
