const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();
const cors = require("cors");
var multer = require("multer");
const mysql = require("mysql");
const app = express();
// app.use(express.static(path.join(__dirname, "public")));

app.use(cors());
app.listen(4000, () => {
  console.log("running on port 4000");
});

app.get("/", (req, res) => {
  res.send("hello world");
});

var connection = mysql.createConnection({
  host: "203.220.47.27",
  user: "Admin",
  password: "password",
});

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

connection.query("USE goexperience");

app.get("/user/:id", function (req, res, next) {
  var query = "SELECT * FROM ?? WHERE ?? = ?";
  var table = ["user", "id", req.params.id];

  query = mysql.format(query, table);
  connection.query(query, function (err, user) {
    if (err) {
      res.json({
        Error: true,
        Message: `Error executing MYSQL query ${err}`,
      });
    } else {
      res.json({
        Error: false,
        Message: `Success`,
        User: user,
      });
    }
  });
});

app.get("/interestedMissions/:user_id", function (req, res, next) {
  var query = "SELECT * FROM ?? WHERE ?? = ?";
  var table = ["user_interest_mission", "user_id", req.params.user_id];

  query = mysql.format(query, table);
  connection.query(query, function (err, user) {
    if (err) {
      res.json({
        Error: true,
        Message: `Error executing MYSQL query ${err}`,
      });
    } else {
      res.json({
        Error: false,
        Message: `Success`,
        User: user,
      });
    }
  });
});

app.get("/boughtMissions/:user_id", function (req, res, next) {
  var query = "SELECT * FROM ?? WHERE ?? = ?";
  var table = ["participating_mission", "user_id", req.params.user_id];

  query = mysql.format(query, table);
  connection.query(query, function (err, mission) {
    if (err) {
      res.json({
        Error: true,
        Message: `Error executing MYSQL query ${err}`,
      });
    } else {
      res.json({
        Error: false,
        Message: `Success`,
        Mission: mission,
      });
    }
  });
});

app.get("/user_feedback", function (req, res, next) {
  var query = "SELECT * FROM ??";
  var table = ["user_feedback"];

  query = mysql.format(query, table);
  connection.query(query, function (err, feedback) {
    if (err) {
      res.json({
        Error: true,
        Message: `Error executing MYSQL query ${err}`,
      });
    } else {
      res.json({
        Error: false,
        Message: `Success`,
        Feedback: feedback,
      });
    }
  });
});

app.get("/preferences/:user_id", function (req, res, next) {
  var query = "SELECT * FROM ?? WHERE ?? = ?";
  var table = ["user_preference", "user_id", req.params.user_id];

  query = mysql.format(query, table);
  connection.query(query, function (err, user) {
    if (err) {
      res.json({
        Error: true,
        Message: `Error executing MYSQL query ${err}`,
      });
    } else {
      res.json({
        Error: false,
        Message: `Success`,
        User: user,
      });
    }
  });
});

app.get("/categories_child/", function (req, res, next) {
  var query = "SELECT * FROM ??";
  var table = ["category_child"];

  query = mysql.format(query, table);
  connection.query(query, function (err, subCategory) {
    if (err) {
      res.json({
        Error: true,
        Message: `Error executing MYSQL query ${err}`,
      });
    } else {
      res.json({
        Error: false,
        Message: `Success`,
        SubCategory: subCategory,
      });
    }
  });
});

app.get("/mission/", function (req, res, next) {
  var query = "SELECT * FROM ??";
  var table = ["mission"];

  query = mysql.format(query, table);
  connection.query(query, function (err, mission) {
    if (err) {
      res.json({
        Error: true,
        Message: `Error executing MYSQL query ${err}`,
      });
    } else {
      res.json({
        Error: false,
        Message: `Success`,
        Mission: mission,
      });
    }
  });
});

app.get("/mission/:mission_id", function (req, res, next) {
  var query = "SELECT * FROM ?? WHERE ?? = ?";
  var table = ["mission", "mission_id", req.params.mission_id];

  query = mysql.format(query, table);
  connection.query(query, function (err, mission) {
    if (err) {
      res.json({
        Error: true,
        Message: `Error executing MYSQL query ${err}`,
      });
    } else {
      res.json({
        Error: false,
        Message: `Success`,
        Mission: mission,
      });
    }
  });
});

app.get("/vendor/", function (req, res, next) {
  var query = "SELECT * FROM ??";
  var table = ["vendor"];

  query = mysql.format(query, table);
  connection.query(query, function (err, vendor) {
    if (err) {
      res.json({
        Error: true,
        Message: `Error executing MYSQL query ${err}`,
      });
    } else {
      res.json({
        Error: false,
        Message: `Success`,
        Vendor: vendor,
      });
    }
  });
});

app.get("/search/:searchparam", function (req, res, next) {
  let string = "%" + req.params.searchparam + "%";
  console.log(string);
  var query =
    "SELECT * FROM ?? WHERE CONCAT(mission_title, description, legal_info, key_info, location) LIKE ? ORDER BY mission_title ASC;";
  if (string === "%$rH7fB%") {
    query = "SELECT * FROM ??";
  }
  var table = ["mission", string];

  query = mysql.format(query, table);
  connection.query(query, function (err, search) {
    if (err) {
      res.json({
        Error: true,
        Message: `Error executing MYSQL query ${err}`,
      });
    } else {
      res.json({
        Error: false,
        Message: `Success`,
        Search: search,
      });
    }
  });
});

app.get("/avatar/:avatar_id", function (req, res, next) {
  let id = req.params.avatar_id;
  var query = "SELECT * FROM ?? WHERE ?? = ?;";
  var table = ["user_avatar", "avatar_id", id];

  query = mysql.format(query, table);
  connection.query(query, function (err, avatar) {
    if (err) {
      res.json({
        Error: true,
        Message: `Error executing MYSQL query ${err}`,
      });
    } else {
      res.json({
        Error: false,
        Message: `Success`,
        Avatar: avatar,
      });
    }
  });
});

app.get("/avatars", function (req, res, next) {
  var query = "SELECT * FROM ??";
  var table = ["user_avatar"];

  query = mysql.format(query, table);
  connection.query(query, function (err, avatar) {
    if (err) {
      res.json({
        Error: true,
        Message: `Error executing MYSQL query ${err}`,
      });
    } else {
      res.json({
        Error: false,
        Message: `Success`,
        Avatar: avatar,
      });
    }
  });
});

app.get("/cartsession/:user_id", function (req, res, next) {
  var query = "SELECT * FROM ?? WHERE ?? = ?";
  var table = ["addcart_session", "user_id", req.params.user_id];

  query = mysql.format(query, table);
  connection.query(query, function (err, session) {
    if (err) {
      res.json({
        Error: true,
        Message: `Error executing MYSQL query ${err}`,
      });
    } else {
      res.json({
        Error: false,
        Message: `Success`,
        Session: session,
      });
    }
  });
});

app.get("/cart/:session_id", function (req, res, next) {
  var query = "SELECT * FROM ?? WHERE ?? = ?";
  var table = ["mission_cart", "session_id", req.params.session_id];

  query = mysql.format(query, table);
  connection.query(query, function (err, cart) {
    if (err) {
      res.json({
        Error: true,
        Message: `Error executing MYSQL query ${err}`,
      });
    } else {
      res.json({
        Error: false,
        Message: `Success`,
        Cart: cart,
      });
    }
  });
});

app.get("/cart/:session_id", function (req, res, next) {
  var query = "SELECT * FROM ?? WHERE ?? = ?";
  var table = ["mission_cart", "session_id", req.params.session_id];

  query = mysql.format(query, table);
  connection.query(query, function (err, cart) {
    if (err) {
      res.json({
        Error: true,
        Message: `Error executing MYSQL query ${err}`,
      });
    } else {
      res.json({
        Error: false,
        Message: `Success`,
        Cart: cart,
      });
    }
  });
});

app.get("/badge/:user_id", function (req, res, next) {
  var query = "SELECT * FROM ?? WHERE ?? = ?";
  var table = ["user_badge", "user_id", req.params.user_id];
  query = mysql.format(query, table);
  connection.query(query, function (err, badges) {
    if (err) {
      res.json({
        Error: true,
        Message: `Error executing MYSQL query ${err}`,
      });
    } else {
      res.json({
        Error: false,
        Message: `Success`,
        Badges: badges,
      });
    }
  });
});

app.get("/badges", function (req, res, next) {
  var query = "SELECT * FROM ??";
  var table = ["badge"];

  query = mysql.format(query, table);
  connection.query(query, function (err, badges) {
    if (err) {
      res.json({
        Error: true,
        Message: `Error executing MYSQL query ${err}`,
      });
    } else {
      res.json({
        Error: false,
        Message: `Success`,
        Badges: badges,
      });
    }
  });
});

app.post("/createmission", function (req, res, next) {
  const mission_title = req.body.mission_title;
  const map = req.body.map;
  const description = req.body.description;
  const category_id = req.body.category_id;
  const vendor_id = req.body.vendor_id;
  const price = req.body.price;
  const activity_time = req.body.activity_time;
  const location = req.body.location;
  const created_at = req.body.created_at;
  const picture = "image";
  const legal_info = req.body.legal_info;
  const key_info = req.body.key_info;

  var query =
    "INSERT INTO ?? (mission_title, map, description, category_id, vendor_id, price, activity_time, location, created_at, picture, legal_info, key_info) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
  var table = ["mission"];

  query = mysql.format(query, table);
  connection.query(
    query,
    [
      mission_title,
      map,
      description,
      category_id,
      vendor_id,
      price,
      activity_time,
      location,
      created_at,
      picture,
      legal_info,
      key_info,
    ],
    function (err, mission) {
      if (err) {
        console.log(err);
        res.json({
          Error: true,
          Message: `Error executing MYSQL query ${err}`,
        });
      } else {
        var resultArray = Object.values(JSON.parse(JSON.stringify(mission)));
        missionId = resultArray[2];
        var queryForChangeImageName = "UPDATE ?? SET ?? = ? WHERE ?? = ?;";
        var table = [
          "mission",
          "picture",
          `${missionId}\.jpg`,
          "mission_id",
          `${missionId}`,
        ];
        queryForChangeImageName = mysql.format(queryForChangeImageName, table);
        connection.query(queryForChangeImageName, function (err, result) {
          if (err) {
            console.log(err);
          } else {
            console.log("Name changed success");
          }
        });

        var queryForCollection = "INSERT INTO ?? (??, ??, ??) VALUES (?,?,?);";
        var table = [
          "vendor_mission_collection",
          "vendor_id",
          "mission_id",
          "quanity",
          `${vendor_id}`,
          `${missionId}`,
          0,
        ];
        queryForCollection = mysql.format(queryForCollection, table);
        connection.query(queryForCollection, function (err, result) {
          if (err) {
            console.log(err);
          } else {
            console.log("update the collection of vendor");
          }
        });
      }
    }
  );
});

app.post("/missionIdSearch", function (req, res, next) {
  const mission_title = req.body.mission_title;
  const vendor_id = req.body.vendor_id;

  var query = "SELECT ?? FROM ?? WHERE (?? = ? ) AND (?? = ?) ";
  var table = [
    "mission_id",
    "mission",
    "mission_title",
    mission_title,
    "vendor_id",
    vendor_id,
  ];

  query = mysql.format(query, table);
  connection.query(query, function (err, mission) {
    if (err) {
      console.log(err);
      res.json({
        Error: true,
        Message: `Error executing MYSQL query ${err}`,
      });
    } else {
      var resultArray = Object.values(JSON.parse(JSON.stringify(mission)));
      missionId = resultArray[0].mission_id;
      // console.log(missionId);
      res.json({
        Error: true,
        Message: `Error executing MYSQL query ${err}`,
        MissionId: missionId,
      });
    }
  });
});

// -------------- upload image method --------------

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb(null, "../missions/src/assets/img/missions");
    cb(null, "../missions/public/img/missions");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage }).single("file");

app.post("/uploadImage", function (req, res) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.log(err);
      return res.status(500).json(err);
    } else if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    console.log("no prob.");
    return res.status(200).send(req.file);
  });
});

// -------------- upload image method --------------

app.post("/addPreference", function (req, res, next) {
  const preference_id = req.body.preference_id;
  const user_id = req.body.user_id;

  var query = "INSERT INTO ?? (user_id, preference_id) VALUES (?, ?)";
  var table = ["user_preference"];

  query = mysql.format(query, table);
  connection.query(query, [user_id, preference_id], function (err, preference) {
    if (err) {
      res.json({
        Error: true,
        Message: `Error executing MYSQL query ${err}`,
      });
      console.log(err);
    } else {
      console.log(preference);
    }
  });
});

app.post("/deletePreference", function (req, res, next) {
  const preference_id = req.body.preference_id;
  const user_id = req.body.user_id;

  var query = "DELETE FROM ?? WHERE user_id = ? AND preference_id = ?; ";
  var table = ["user_preference"];

  query = mysql.format(query, table);
  connection.query(query, [user_id, preference_id], function (err, preference) {
    if (err) {
      res.json({
        Error: true,
        Message: `Error executing MYSQL query ${err}`,
      });
      console.log(err);
    } else {
      console.log(preference);
    }
  });
});

app.post("/DeleteOldReview", function (req, res, next) {
  const participant_id = req.body.participant_id;

  var query = "DELETE FROM ?? WHERE participant_id = ?;";
  var table = ["user_feedback"];

  query = mysql.format(query, table);
  connection.query(query, [participant_id], function (err, review) {
    if (err) {
      res.json({
        Error: true,
        Message: `Error executing MYSQL query ${err}`,
      });
      console.log(err);
    } else {
      console.log(review);
    }
  });
});

app.post("/UpdateReview", function (req, res, next) {
  const participant_id = req.body.participant_id;
  const text = req.body.text;
  const rating = req.body.rating;
  const created_at = req.body.created_at;

  var query =
    "INSERT INTO ?? (text, rating, created_at, participant_id) VALUES (?,?,?,?) ";
  var table = ["user_feedback"];

  query = mysql.format(query, table);
  connection.query(
    query,
    [text, rating, created_at, participant_id],
    function (err, review) {
      if (err) {
        res.json({
          Error: true,
          Message: `Error executing MYSQL query ${err}`,
        });
        console.log(err);
      } else {
        console.log(review);
      }
    }
  );
});

app.post("/editprofile", function (req, res, next) {
  const id = req.body.id;
  const username = req.body.username;
  const email = req.body.email;
  const phone = req.body.phone;
  const gender = req.body.gender;
  const dob = req.body.dob;
  const modified_at = req.body.modified_at;
  const password = req.body.password;

  var query =
    "UPDATE ?? SET username = ?, email = ?, dob = ?, modified_at = ?, phone = ?, gender = ?, password = ? WHERE id = ?";

  var table = ["user"];

  query = mysql.format(query, table);
  connection.query(
    query,
    [username, email, dob, modified_at, phone, gender, password, id],
    function (err, details) {
      if (err) {
        res.json({
          Error: true,
          Message: `Error executing MYSQL query ${err}`,
        });
        console.log(err);
      } else {
        console.log(details);
      }
    }
  );
});

// const id = req.body.id;
// const username = req.body.username;
// const last_name = req.body.last_name;
// const first_name = req.body.first_name;
// const email = req.body.email;
// const phone = req.body.phone;
// const status = req.body.status;
// const gender = req.body.gender;
// const dob = req.body.dob;
// const created_at = req.body.created_at;
// const modified_at = req.body.modified_at;
// const password = req.body.password;
// const avatar_id = req.body.avatar_id;
// const current_exp = req.body.current_exp;
// const total_exp = req.body.total_exp;
// const total_num_badge = req.body.total_num_badge;
// const total_num_voucher = req.body.total_num_voucher;

app.post("/changeavatar", function (req, res, next) {
  const id = req.body.id;
  const avatar_id = req.body.avatar_id;

  var query = "UPDATE ?? SET avatar_id = ? WHERE id = ?";

  var table = ["user"];

  query = mysql.format(query, table);
  connection.query(query, [avatar_id, id], function (err, details) {
    if (err) {
      res.json({
        Error: true,
        Message: `Error executing MYSQL query ${err}`,
      });
      console.log(err);
    } else {
      console.log(details);
    }
  });
});

app.post("/sign_in/submit", function (req, res, next) {
  const email = req.body.email;
  const checkPassword = req.body.passwordcheck;

  var query = "SELECT ??, ?? FROM ?? WHERE ?? = ?";
  var table = ["password", "id", "user", "email", email];

  query = mysql.format(query, table);
  connection.query(query, function (err, result) {
    if (err) {
      res.send({
        Error: true,
        Login: false,
        Message: `Error executing MYSQL query ${err}`,
        user_id: null,
      });
    } else {
      var resultArray = Object.values(JSON.parse(JSON.stringify(result)));
      console.log(resultArray[0]);
      if (resultArray[0] === undefined) {
        res.send({
          Error: false,
          Login: false,
          Message: `Wrong User ID and password`,
          user_id: null,
        });
        return;
      }
      var truePassword = resultArray[0].password;
      var userId = resultArray[0].id;
      if (truePassword === checkPassword) {
        console.log("user is matched to the password");
        res.send({
          Error: false,
          Login: true,
          Message: `Success`,
          user_id: userId,
        });
      } else {
        console.log("user's password is not matched");
        res.send({
          Error: false,
          Login: false,
          Message: `Wrong Password`,
          user_id: null,
        });
      }
    }
  });
});

app.post("/sign_up/submit", function (req, res, next) {
  const userName = req.body.userName;
  const lastName = req.body.lastName;
  const firstName = req.body.firstName;
  const email = req.body.email;
  const date = req.body.date;
  const password = req.body.password;

  var query =
    "INSERT INTO ?? (username, last_name, first_name, email, created_at, password, avatar_id, total_exp, current_exp, total_num_badge, total_num_voucher) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
  var table = ["user"];

  query = mysql.format(query, table);
  connection.query(
    query,
    [userName, lastName, firstName, email, date, password, 1, 0, 0, 0, 0],
    function (err, result) {
      if (err) {
        res.send({
          Error: true,
          Message: `Error executing MYSQL query ${err}`,
          user_id: null,
        });
      }
    }
  );

  console.log("Hey mate");
  var queryForId = "SELECT ?? FROM ?? WHERE ?? = ?";
  var table = ["id", "user", "email", email];
  queryForId = mysql.format(queryForId, table);
  console.log(email);
  let newUserId;
  connection.query(queryForId, function (err, result) {
    if (err) {
      console.log("err");
      res.send({
        Error: true,
        Login: false,
        Message: `Error executing MYSQL query ${err}`,
        user_id: null,
      });
    } else {
      var resultArray = Object.values(JSON.parse(JSON.stringify(result)));
      var userId = resultArray[0].id;
      console.log(userId);
      newUserId = userId;
      res.send({
        Error: false,
        Login: true,
        Message: `Success`,
        user_id: userId,
      });
    }
  });

  var query = "INSERT INTO ?? (user_id, total, created_at) VALUES (?,?,?);";
  var table = ["addcart_session"];
  let today = new Date().toISOString().substring(0, 10);
  query = mysql.format(query, table);
  connection.query(query, [newUserId, 0, today], function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log("all good mate! you have a cart and not poor");
    }
  });
});

app.post("/sign_up_vendor/submit", function (req, res, next) {
  const companyName = req.body.companyName;
  const email = req.body.email;
  const password = req.body.password;
  const website = req.body.website;
  const address = req.body.address;
  const phone = req.body.phone;
  const ABN = req.body.ABN;
  const date = req.body.date;
  const industryId = req.body.industryId;

  var query =
    "INSERT INTO vendor (username, password, created_at, industry_id, phone, address, ABN, email, website) VALUES (?,?,?,?,?,?,?,?,?);";
  var table = [
    companyName,
    password,
    date,
    industryId,
    phone,
    address,
    ABN,
    email,
    website,
  ];

  query = mysql.format(query, table);
  connection.query(query, function (err, result) {
    if (err) {
      console.log(`Error executing MYSQL query ${err}`);
      res.send({
        Error: true,
        Message: `Error executing MYSQL query ${err}`,
        vendor_id: null,
      });
    }
  });

  console.log("Hey vondor");
  var queryForId = "SELECT ?? FROM ?? WHERE ?? = ?";
  var table = ["id", "vendor", "email", email];
  queryForId = mysql.format(queryForId, table);
  console.log(email);
  connection.query(queryForId, function (err, result) {
    if (err) {
      console.log("err");
      res.send({
        Error: true,
        Login: false,
        Message: `Error executing MYSQL query ${err}`,
        vendor_id: null,
      });
    } else {
      var resultArray = Object.values(JSON.parse(JSON.stringify(result)));
      var vendorId = resultArray[0].id;
      console.log(vendorId);
      res.send({
        Error: false,
        Login: true,
        Message: `Success`,
        vendor_id: vendorId,
      });
    }
  });
});

app.post("/sign_in_vendor/submit", function (req, res, next) {
  const email = req.body.email;
  const checkPassword = req.body.passwordcheck;

  var query = "SELECT ??, ?? FROM ?? WHERE ?? = ?";
  var table = ["password", "id", "vendor", "email", email];

  query = mysql.format(query, table);
  connection.query(query, function (err, result) {
    if (err) {
      res.send({
        Error: true,
        Login: false,
        Message: `Error executing MYSQL query ${err}`,
        user_id: null,
      });
    } else {
      var resultArray = Object.values(JSON.parse(JSON.stringify(result)));
      console.log(resultArray[0]);
      if (resultArray[0] === undefined) {
        res.send({
          Error: false,
          Login: false,
          Message: `Wrong User ID and password`,
          vendorId: null,
        });
        return;
      }
      var truePassword = resultArray[0].password;
      var vendorId = resultArray[0].id;
      if (truePassword === checkPassword) {
        console.log("user is matched to the password");
        res.send({
          Error: false,
          Login: true,
          Message: `Success`,
          vendorId: vendorId,
        });
      } else {
        console.log("you suck");
        res.send({
          Error: false,
          Login: false,
          Message: `Wrong Password`,
          vendorId: null,
        });
      }
    }
  });
});

app.post("/cartdelete", function (req, res, next) {
  const session_id = req.body.session_id;
  const mission_id = req.body.mission_id;

  var query = "DELETE FROM ?? WHERE mission_id = ? AND session_id = ?";

  var table = ["mission_cart"];

  query = mysql.format(query, table);
  connection.query(query, [mission_id, session_id], function (err, details) {
    if (err) {
      res.json({
        Error: true,
        Message: `Error executing MYSQL query ${err}`,
      });
      console.log(err);
    } else {
      console.log(details);
    }
  });
});

app.post("/sessiontotal", function (req, res, next) {
  const id = req.body.id;
  const total = req.body.total;

  var query = "UPDATE ?? SET total = ? WHERE id = ?";

  var table = ["addcart_session"];

  query = mysql.format(query, table);
  connection.query(query, [total, id], function (err, details) {
    if (err) {
      res.json({
        Error: true,
        Message: `Error executing MYSQL query ${err}`,
      });
      console.log(err);
    } else {
      console.log(details);
    }
  });
});

// connection.end();

app.get("/vendor/:id", function (req, res, next) {
  var query = "SELECT * FROM ?? WHERE ?? = ?";
  var table = ["vendor", "id", req.params.id];

  query = mysql.format(query, table);
  connection.query(query, function (err, vendor) {
    if (err) {
      res.json({
        Error: true,
        Message: `Error executing MYSQL query ${err}`,
      });
    } else {
      res.json({
        Error: false,
        Message: `Success`,
        Vendor: vendor,
      });
    }
  });
});

app.get("/vendor_mission/:id", function (req, res, next) {
  var query = "SELECT * FROM ?? WHERE ?? = ?";
  var table = ["vendor_mission_collection", "vendor_id", req.params.id];

  console.log(req.params.id);
  query = mysql.format(query, table);
  connection.query(query, function (err, vendorMissions) {
    if (err) {
      res.json({
        Error: true,
        Message: `Error executing MYSQL query ${err}`,
      });
    } else {
      console.log("Missions of vendor is fetched successfully from SQL");
      res.json({
        Error: false,
        Message: `Success`,
        VendorMissions: vendorMissions,
      });
    }
  });
});
