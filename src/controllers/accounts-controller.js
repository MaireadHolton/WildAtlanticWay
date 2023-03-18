import { db } from "../models/db.js";
import { UserSpec, UserCredentialsSpec} from "../models/joi-schemas.js";

export const accountsController = {
  // set the title of the welcome page for the app
  index: {
    auth: false,
    handler: function (request, h) {
      return h.view("main", { title: "Welcome to myWildAtlanticWay" });
    },
  },

  // set the title for the sign up section of the app
  showSignup: {
    auth: false,
    handler: function (request, h) {
      return h.view("signup-view", { title: "Sign up for myWildAtlanticWay" });
    },
  },

  // set the control for the signup validation of a new user, return error if any information is entered incorrectly
  signup: {
    auth: false,
    validate: {
      payload: UserSpec,
      options: {abortEarly: false},
      failAction: function (request, h, error) {
        return h.view("signup-view", { title: "Sign up error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const user = request.payload;
      await db.userStore.addUser(user);
      return h.redirect("/");
    },
  },

  // set the title for the login section of the app
  showLogin: {
    auth: false,
    handler: function (request, h) {
      return h.view("login-view", { title: "Login to myWildAtlanticWay" });
    },
  },

  // set the control for the login validation of a user, return to login section if any information is entered incorrectly
  login: {
    auth: false,
    validate: {
      payload: UserCredentialsSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("login-view", { title: "Log in error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const { email, password } = request.payload;
      const user = await db.userStore.getUserByEmail(email);
      if (!user || user.password !== password) {
        return h.redirect("/");
      }
      request.cookieAuth.set({ id: user._id });
      return h.redirect("/dashboard");
    },
  },

  // set the control for user logout and redirect to the welcome page
  logout: {
    handler: function (request, h) {
      request.cookieAuth.clear();
      return h.redirect("/");
    },
  },

 // set the control for user validation
  async validate(request, session) {
    const user = await db.userStore.getUserById(session.id);
    if (!user) {
      return { isValid: false };
    }
    return {isValid: true, credentials: user };
  },
};

