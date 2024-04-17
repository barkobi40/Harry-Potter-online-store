const moment = require("moment");
var orderTable = require("../models/order");

const order = (req, res) => {
  const { orderList } = req.body;
  orderTable.insertMany(orderList)
    .then((result) => {
      res.json(result);
    })
    .catch(err => {
      console.error("Error inserting order:", err);
      res.status(500).json({ error: 'Failed to insert order' });
    });
};


const getOrders = (req, res) => {
  const { fanId } = req.body;
  orderTable
    .aggregate([
      {
        $match: {
          fanId: fanId,
        },
      },
      {
        $group: {
          _id: "$orderTime",
          records: {
            $push: "$$ROOT",
          },
        },
      },
    ])
    .then((result) => {
      res.json(result);
    });
};

const deleteOrder = (req, res) => {
  const { orderTime } = req.body;
  const startDate = moment(orderTime, "hh:mm a MMM DD YYYY").startOf("minute");
  const endDate = moment(orderTime, "hh:mm a MMM DD YYYY").endOf("minute");

  orderTable
    .deleteMany({
      orderTime: {
        $gte: startDate.toDate().toISOString(),
        $lt: endDate.toDate().toISOString(),
      },
    })
    .then((result) => {
      res.json(result);
    });
};

const orderSumAverage = (req, res) => {
  const { date_from, date_to } = req.body;
  const queryTime = new Date(date_to);
  const days = (new Date(date_to) - new Date(date_from)) / (1000 * 3600 * 24);
  var datesOfWeek = [];
  for (i = days - 1; i >= 0; i = i - 1) {
    var orderTime = new Date();
    orderTime.setDate(queryTime.getDate() - i);
    datesOfWeek.push(orderTime);
  }

  orderTable
    .aggregate([
      {
        $bucket: {
          groupBy: "$orderTime",
          boundaries: datesOfWeek,
          default: queryTime.getDate() - days,
          output: {
            count: { $sum: 1 },
            sum: { $sum: "$price" },
          },
        },
      },
    ])
    .then((result) => {
      res.json(result);
    });
};

module.exports = {
  order,
  getOrders,
  deleteOrder,
  orderSumAverage,
};
