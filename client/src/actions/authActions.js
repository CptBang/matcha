import axios from "axios";
import { returnErrors } from "./errorActions";

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  UPDATETAGS_SUCCESS,
  UPDATETAGS_FAIL,
  EXPLORE_SUCCESS,
  EXPLORE_FAIL,
  EMAIL_SUCCESS,
  EMAIL_FAIL
} from "./types";

// Check token & load user
export const loadUser = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING });

  axios
    .get("/api/auth/user", tokenConfig(getState))
    .then(res =>
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};

// Register User
export const register = ({ firstname, lastname, email, password }) => dispatch => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  // Request body
  const body = JSON.stringify({ firstname, lastname, email, password });
  axios
    .post("/api/users/register", body, config)
    .then(res =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      // dispatch(
      //   returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      // );
      dispatch({
        type: REGISTER_FAIL
      });
    });
};

// Update user with bald tags
export const updateBaldTags = ( tags, userId ) => dispatch => {
  console.log(tags + " " + userId);
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    }
  };
  // Request body
  const body = JSON.stringify({ tags, userId});
  axios
    .post("api/users/select/done", body, config)
    .then(res => {
        console.log(res)
        dispatch({
          type: UPDATETAGS_SUCCESS,
          payload: res.data
        })
      }
    )
    .catch(err => {
      dispatch({
        type: UPDATETAGS_FAIL
      });
      console.log(err)
    });
};

// Login User
export const login = ({ email, password, fb }) => dispatch => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({ email, password, fb });

  axios
    .post("/api/auth", body, config)
    .then(res =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      );
      dispatch({
        type: LOGIN_FAIL
      });
    });
};

// Login User
export const sendEmail = ( to, subject, text, id ) => dispatch => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  console.log(to);
  // Request body
  const body = JSON.stringify({ to, subject, text, id });
  console.log(body)
  axios
    .post("/api/users/email", body, config)
    .then(res =>
      dispatch({
        type: EMAIL_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      console.log(err)
      dispatch(
        returnErrors(err.response.data, err.response.status, "EMAIL_FAIL")
      );
      dispatch({
        type: EMAIL_FAIL
      });
    });
};

export const validate = ( id ) => dispatch => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  // Request body
  const body = JSON.stringify({ id });
  console.log(body)
  axios
    .post("/api/users/validate/" + id, body, config)
    .then(res =>
      dispatch({
        type: EMAIL_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      console.log(err)
      dispatch(
        returnErrors(err.response.data, err.response.status, "EMAIL_FAIL")
      );
      dispatch({
        type: EMAIL_FAIL
      });
    });
};
// // Logout User
// export const logout = () => {
//   return {
//     type: LOGOUT_SUCCESS
//   };
// };

// Setup config/headers and token
export const tokenConfig = getState => {
  // Get token from localstorage
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  // If token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};

export const getMatches = ( sexualPreference, gender, location ) => dispatch => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    }
  };
  // Request body
  const body = JSON.stringify({ sexualPreference, gender, location});
  console.log(body);
  axios
    .post("api/users/explore", body, config)
    .then(res => {
        console.log(res.data)
        dispatch({
          type: EXPLORE_SUCCESS,
          payload: res.data
        })
      }
    )
    .catch(err => {
      // dispatch(
      //   returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      // );
      dispatch({
        type: EXPLORE_FAIL
      });
      console.log(err)
    });
};

export const logout = (id) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  console.log(id)
  // Request body
  const body = JSON.stringify({id});
  console.log(body);
  axios
  .post("api/auth/logout", body, config)
  .then(res => {
    console.log(res);
    }
  )
  .catch(err => {
    console.log(err);
  });
  return {
    type: LOGOUT_SUCCESS
  }
}