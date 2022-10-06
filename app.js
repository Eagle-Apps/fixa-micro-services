import express from "express";
import cors from "cors";
import proxy from "express-http-proxy";

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: true }));

app.use("/client-services", proxy("http://localhost:8001"));
app.use("/utility-services", proxy("http://localhost:8003"));
app.use("/technician-services", proxy("http://localhost:8004"));
app.use("/billing-services", proxy("http://localhost:8005"));
app.use("/deliveries-services", proxy("http://localhost:8007"));

const port = process.env.PORT || 5000;

const start = () => {
  try {
    app.listen(port, () => {
      console.log(`Gateway is soft on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
