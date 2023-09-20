import {
  connectDatabase,
  insertDocument,
  getAllDocuments,
} from "../../../helpers/db-util";

// Request handler function for managing comments for a specific event
async function handler(req, res) {
  const eventId = req.query.eventId;
  let client;

  try {
    // Establish a database connection
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed" });
    return;
  }

  try {
    // Handle POST requests (adding comments)
    if (req.method === "POST") {
      // Extract data from the request body
      const { email, name, text } = req.body;

      // Validate the input data
      if (
        !email.includes("@") ||
        !name ||
        name.trim() === "" ||
        !text ||
        text.trim() === ""
      ) {
        res.status(422).json({ message: "Invalid input." });
        client.close();
        return;
      }

      const newComment = {
        email,
        name,
        text,
        eventId,
      };

      // Insert the new comment into the database
      const result = await insertDocument(client, "comments", newComment);
      newComment._id = result.insertedId;

      // Respond with a success message and the newly added comment
      res.status(201).json({ message: "Added comment.", comment: newComment });
    }

    // Handle GET requests (retrieving comments)
    if (req.method === "GET") {
      // Retrieve all comments for the specified event from the database
      const documents = await getAllDocuments(client, "comments", { _id: -1 });
      res.status(200).json({ comments: documents });
    }
  } catch (error) {
    // Handle errors and respond with appropriate error messages
    res.status(500).json({ message: "Server error: " + error.message });
  } finally {
    // Ensure the database connection is closed after processing the request
    client.close();
  }
}

export default handler;
