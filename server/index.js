const express = require("express");
const dotenv = require("dotenv");
const request = require("request");
const port = 5000;

dotenv.config();

const spotifyClientId = process.env.SPOTIFY_CLIENT_ID;
const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET;

const app = express();
let accessToken = "";

app.get("/auth/login", (req, res) => {
  const scope =
    "user-follow-read user-read-recently-played user-read-playback-position user-read-email user-read-private user-library-read user-top-read playlist-read-collaborative playlist-read-private";

  const params = new URLSearchParams({
    response_type: "code",
    scope: scope,
    client_id: spotifyClientId,
    redirect_uri: "http://localhost:3000/auth/callback",
  });

  res.redirect("https://accounts.spotify.com/authorize/?" + params.toString());
});

app.get("/auth/callback", (req, res) => {
  var code = req.query.code;

  var authOptions = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      code: code,
      redirect_uri: "http://localhost:3000/auth/callback",
      grant_type: "authorization_code",
    },
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(spotifyClientId + ":" + spotifyClientSecret).toString(
          "base64"
        ),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    json: true,
  };

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      accessToken = body.access_token;
      res.redirect("/");
    } else {
      console.log(response.body);
    }
  });
});

app.get("/auth/token", (req, res) => {
  res.json({ accessToken });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
