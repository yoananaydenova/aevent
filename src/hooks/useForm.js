import { faCapsules } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
// import { omit } from "loadash";

const useForm = (callback) => {
  //Form values
  const [values, setValues] = useState({});
  //Errors
  const [errors, setErrors] = useState({});
  //A function to validate each input values
  const validate = (event, name, value) => {
    switch (name) {
      case "email":
        if (
          !new RegExp(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ).test(value)
        ) {
          setErrors({
            ...errors,
            email: "Enter a valid email address",
          });
        } else {
          const newObj = (({ email, ...rest }) => rest)(errors);
          setErrors(newObj);
        }
        break;
      case "password":
        if (
          !new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/).test(value)
        ) {
          setErrors({
            ...errors,
            password:
              "Password should contains atleast 8 charaters and containing uppercase,lowercase and numbers",
          });
        } else {
          const newObj = (({ password, ...rest }) => rest)(errors);
          setErrors(newObj);
        }
        break;
      case "confirmPassword":
        if (values.password !== value) {
          setErrors({
            ...errors,
            confirmPassword: "Passwords don't match.",
          });
        } else {
          const newObj = (({ confirmPassword, ...rest }) => rest)(errors);
          setErrors(newObj);
        }
        break;
      case "firstName":
        if (!new RegExp(/^[A-Z][a-z]{2,16}$/).test(value)) {
          setErrors({
            ...errors,
            firstName:
              "First Name must be start with uppercase and should contains between 3 and 16 charaters",
          });
        } else {
          const newObj = (({ firstName, ...rest }) => rest)(errors);
          setErrors(newObj);
        }
        break;
      case "lastName":
        if (!new RegExp(/^[A-Z][a-z]{2,16}$/).test(value)) {
          setErrors({
            ...errors,
            lastName:
              "Last Name must be start with uppercase and should contains between 3 and 16 charaters",
          });
        } else {
          const newObj = (({ lastName, ...rest }) => rest)(errors);
          setErrors(newObj);
        }
        break;
      case "title":
        if (!new RegExp(/^\s*(?:\S\s*){3,16}$/).test(value)) {
          setErrors({
            ...errors,
            title:
              "The title must be start with uppercase and should contains between 3 and 16 charaters",
          });
        } else {
          const newObj = (({ title, ...rest }) => rest)(errors);
          setErrors(newObj);
        }
        break;
      case "endDateTime":
        if (values.startDateTime > value) {
          setErrors({
            ...errors,
            dateTime: "End date time can not be before start date time",
          });
        } else {
          const newObj = (({ dateTime, ...rest }) => rest)(errors);
          setErrors(newObj);
        }
        break;
      case "startDateTime":
        if (values.endDateTime < value) {
          setErrors({
            ...errors,
            dateTime: "End date and time can not be before start date time",
          });
        } else {
          const newObj = (({ dateTime, ...rest }) => rest)(errors);
          setErrors(newObj);
        }
        break;
      case "detailInfo":
        if (!new RegExp(/^[A-Z][a-z].{1,}$/).test(value)) {
          setErrors({
            ...errors,
            detailInfo:
              "The information about the event must be start with uppercase and should contains minimum 3 charaters",
          });
        } else {
          const newObj = (({ detailInfo, ...rest }) => rest)(errors);
          setErrors(newObj);
        }
        break;
      case "eventOrganizer":
        if (!new RegExp(/^[A-Z][a-z].{1,}$/).test(value)) {
          setErrors({
            ...errors,
            eventOrganizer:
              "The name of event organizer must be start with uppercase and should contains minimum 3 charaters",
          });
        } else {
          const newObj = (({ eventOrganizer, ...rest }) => rest)(errors);
          setErrors(newObj);
        }
        break;
      default:
        break;
    }
  };

  //A method to handle form inputs
  const handleChange = (event) => {
    //To stop default events
    event.persist();

    let name = event.target.id;
    let val = event.target.value;

    validate(event, name, val);

    //Let's set these values in state
    setValues({
      ...values,
      [name]: val,
    });
  };

  const handleSubmit = (event) => {
    if (event) event.preventDefault();

    if (Object.keys(errors).length === 0 && Object.keys(values).length !== 0) {
      callback(event);
    } else {
      console.log("There is an Error in the form!");
    }
  };

  return {
    values,
    setValues,
    errors,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
