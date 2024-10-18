const express = require("express");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
const path = require("path");

const app = express();
const port = 5010;

// إعداد قاعدة البيانات
const dbConfig = require("./db");

// إعداد المسارات
const roomsRoute = require("./routes/roomsRoute");
const usersRoute = require("./routes/usersRoute");
const bookingRoute = require("./routes/bookingsRoute");

// استخدام الميدلويرز
app.use(express.json()); // معالجة بيانات الجسم
app.use(cors());
app.use(compression());
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));

app.use(express.static(path.join(__dirname, "public")));

app.use(
  "/images",
  express.static(path.join(__dirname, "../frontend/public/images")),
);

// إعداد المسارات للـ API
app.use("/api", roomsRoute);
app.use("/api", usersRoute);
app.use("/api", bookingRoute);

// التعامل مع أخطاء 404
app.use((req, res, next) => {
  res.status(404).send("عذرًا، هذا المورد غير موجود.");
});

// بدء الخادم
app.listen(port, () => {
  console.log(`Node server started on port ${port} using nodemon`);
});
