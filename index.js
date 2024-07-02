const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());


app.get("/", (req, res) => res.send("Express on Vercel"));

// Slack verification
app.post("/slack/events", (req, res) => {
  const { type, token, challenge, event } = req.body;

  console.info(type, token, JSON.stringify(event));

  if (type === "url_verification") {
    res.send({ challenge });
  } else if (type === "event_callback") {
    const { type, text, user, channel } = event;

    console.info(type, text, user, channel);

    if (type === "message" && user !== "YOUR_BOT_USER_ID") {
      // Forward message to AI server
      //   axios.post('http://your-ai-server-endpoint', { text })
      //     .then(response => {
      //       console.log('Message sent to AI server:', response.data);
      //     })
      //     .catch(error => {
      //       console.error('Error sending message to AI server:', error);
      //     });
    }

    res.sendStatus(200);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
