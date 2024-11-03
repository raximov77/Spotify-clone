const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const SpotifyWebApi = require("spotify-web-api-node")
const app = express()
app.use(cors())
app.use(bodyParser.json())

app.post("/login", (req, res) => {
  const code = req.body.code
  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:5173",
    clientId: "3a10fa67bde84771b02bdd09fc27cdcd",
    clientSecret: "0e52301d1ccc44e9a32259a865072ff2"
  })
  spotifyApi.authorizationCodeGrant(code).then(data => {
    res.json({
      accessToken: data.body.access_token,
      refreshToken: data.body.refresh_token,
      expiresIn: data.body.expires_in
    })
  }).catch(err => {
    res.sendStatus(400)
  })
})

app.listen(3001)