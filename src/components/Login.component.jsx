import React, { useContext, useState } from "react";
import { TextInputField, Button, Heading, Alert } from "evergreen-ui";
import { useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import firebase from "../firebase.utils.js";

const Login = () => {
  const history = useHistory();
  const { handleSubmit, errors, control } = useForm();
  const [backendError, setBackendError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async ({ email, password }) => {
    setIsLoading(true);
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      history.push("/dashboard");
    } catch (error) {
      setIsLoading(false);
      setBackendError(error.message);
    }
  };

  return (
    <>
      {!!backendError ? (
        <Alert
          intent="danger"
          marginBottom={16}
          marginTop={8}
          title={backendError}
        />
      ) : null}
      <form style={{ margin: "5px" }} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          as={TextInputField}
          type="email"
          control={control}
          label="Email"
          placeholder="Enter your email"
          isInvalid={!!errors.email}
          name="email"
          validationMessage={errors.email && errors.email.message}
          rules={{
            required: {
              value: true,
              message: "This field is required",
            },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          }}
        />
        <Controller
          as={TextInputField}
          type="password"
          control={control}
          label="Password"
          placeholder="Enter your password"
          isInvalid={!!errors.password}
          name="password"
          validationMessage={errors.password && "This field is required"}
          rules={{ required: true }}
        />
        <Button isLoading={isLoading} appearance="primary" type="submit">
          Login
        </Button>
      </form>
    </>
  );
};

export default Login;
