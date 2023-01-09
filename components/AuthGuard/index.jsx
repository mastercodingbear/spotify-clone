import React, { useEffect, useLayoutEffect, useState } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import LandingPage from "../LandingPage";
import { updateTokenState, getMe, getUserCountry } from "../../redux/actions";
import LoaderWrapper from "../LoaderWrapper";
import axios from "axios";
import {
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
  TOKEN_ENDPOINT,
} from "../../utils/spotifyLogin";
export const AuthGuard = ({
  user,
  children,
  token,
  updateTokenState,
  getMe,
  getUserCountry,
  countryCode,
}) => {
  const router = useRouter();
  const [code, setCode] = useState(null);

  useEffect(() => {
    // if (typeof window !== "undefined")
    if (window.localStorage.getItem("token") !== "null") {
      updateTokenState(window.localStorage.getItem("token"));
      !countryCode ? getUserCountry() : null;
    }
  }, []);

  useEffect(() => {
    if (router.asPath.startsWith("/?code=")) {
      setCode(router.asPath.replace("/?code=", ""));
    }
  }, []);

  useEffect(() => {
    if (code)
      axios({
        method: "post",
        url: TOKEN_ENDPOINT,
        data: `grant_type=authorization_code&redirect_uri=${REDIRECT_URI}&client_id=${CLIENT_ID}&code=${code}`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            new Buffer(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64"),
        },
      }).then((response) => {
        updateTokenState(response.data.access_token);
        window.location.assign("/");
      });
  }, [code]);

  useEffect(() => {
    if (token) {
      window.localStorage.setItem("token", token);
      getMe(token);
    }
  }, [token]);

  if (!token) {
    return <LandingPage />;
  } else {
    if (user) {
      return children;
    } else {
      if (user === null) return <LoaderWrapper />;
      if (user === false) return <LandingPage />;
    }
  }
};

const mapStateToProps = (state) => state;
const mapDispatchToProps = { updateTokenState, getMe, getUserCountry };
export default connect(mapStateToProps, mapDispatchToProps)(AuthGuard);
