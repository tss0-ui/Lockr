import app from "./index";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Lockr Auth API running on port ${PORT}`);
});
