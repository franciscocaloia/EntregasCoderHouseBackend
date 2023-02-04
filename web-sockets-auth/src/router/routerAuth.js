import express from "express";
import passport from "passport";
import bcrypt from "bcrypt";
import { Strategy as LocalStrategy } from "passport-local";
import { controllerUsers } from "../controller/controllerUsers.js";
passport.use(
  "local-login",
  new LocalStrategy(async (username, password, done) => {
    const user = await controllerUsers.getByFilter({ username });
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        done(null, user);
      } else {
        done(
          {
            title: "Error de inicio de sesión",
            message: "contraseña incorrecta",
          },
          false
        );
      }
    } else {
      done(
        {
          title: "Error de inicio de sesión",
          message: "Usuario no encontrado",
        },
        false
      );
    }
  })
);
passport.use(
  "local-signup",
  new LocalStrategy(async (username, password, done) => {
    if (await controllerUsers.getByFilter({ username })) {
      done({ title: "Error de registro", message: "nombre de usuario en uso" });
    } else {
      const hash = bcrypt.hashSync(password, 8);
      const newUser = { username, password: hash };
      const { insertedId } = await controllerUsers.postUser(newUser);
      done(null, { ...newUser, _id: insertedId });
    }
  })
);
export const routerAuth = express.Router();
routerAuth.get("/signin", (req, res) => {
  res.render("signin");
});
routerAuth.post(
  "/signin",
  passport.authenticate("local-signup", { failWithError: true }),
  (req, res, next) => {
    res.status(201).json({ user: req.user });
  }
);
routerAuth.get("/login", (req, res) => {
  res.render("login");
});
routerAuth.post(
  "/login",
  passport.authenticate("local-login", { failWithError: true }),
  (req, res, next) => {
    res.status(201).json({ user: req.user });
  }
);

routerAuth.delete("/logout", (req, res) => {
  req.logOut((error) => {
    if (error) {
      return res.json({ error });
    }
    res.sendStatus(200);
  });
});
