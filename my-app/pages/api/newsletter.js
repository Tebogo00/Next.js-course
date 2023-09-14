function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    // Check if it's an email and if it contains '@', and send a response if the email is incorrect
    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address." });
      return;
    }

    console.log(userEmail);

    // Sending a response if the email is correct
    res.status(201).json({ message: "signed up" });
  }
}

export default handler;
