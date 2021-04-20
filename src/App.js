import React, { useContext } from "react";
import './App.css';
import { AppContext } from "./AppContext";
import SignInFormContainer from "./components/SignInForm/SignInFormContainer";
import RegistrationFormContainer from "./components/RegisterForm/RegistrationFormContainer";
import ForgotPasswordFormContainer from "./components/ForgotPasswordForm/ForgotPasswordFormContainer";
import { HashRouter as Router, Route, Redirect } from "react-router-dom";
import RetailApp from './components/RetailApp';

function App() {

  const {
    signIn,
    register,
    verifyAccount,
    registrationStatus,
    isLoggedIn,
    username,
    getLoginAttempts,
    incrementLoginAttempts,
    resetLoginAttempts,
  } = useContext(AppContext);

  return (
    <Router>
    <Route
      exact
      path="/"
      render={() => {
        if (isLoggedIn && username) {
          return <RetailApp />;
        } else {
          return <Redirect to="/sign-in" />;
        }
      }}
    />

    <Route
      path="/sign-in"
      render={() => {
        if (isLoggedIn && username) {
          return <Redirect to="/" />;
        }
        if (registrationStatus === "verifying") {
          return <Redirect to="/register" />;
        }
        return (
          <SignInFormContainer
            signIn={signIn}
            getLoginAttempts={getLoginAttempts}
            incrementLoginAttempts={incrementLoginAttempts}
            resetLoginAttempts={resetLoginAttempts}
          />
        );
      }}
    />

    <Route
      path="/register"
      render={() => {
        if (isLoggedIn && username) {
          return <Redirect to="/" />;
        }
        return (
          <RegistrationFormContainer
            register={register}
            verifyAccount={verifyAccount}
            registrationStatus={registrationStatus}
          />
        );
      }}
    />

    <Route
      path="/forgot-password"
      render={() => {
        if (isLoggedIn && username) {
          return <Redirect to="/" />;
        }
        return <ForgotPasswordFormContainer />;
      }}
    />

    <Route
      path="/"
      render={() => {
        if (isLoggedIn && username) {
          return <Redirect to="/" />;
        } else {
          return <Redirect to="/sign-in" />;
        }
      }}
    />
  </Router>
  );
}

export default App;
