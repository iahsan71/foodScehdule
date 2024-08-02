import { AUTH_NOTIFICATION, AUTH_SET_LOADING } from "../types";

const initialState = {
  notification: {
    message: "",
    type: "",
  },
  loading: false,
};

export default function authReducer(state = initialState, { action, payload }) {
  switch (action) {

    default:
      return {
        ...state,
      };
  }
}
