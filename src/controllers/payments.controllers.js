const Payment = require("../models/payment.model");

//////////////////////////////////////////////////////////////////////////////
async function addPayment(req, res) {
  try {
    const data = await Payment.create({
      ...req.body,
      charges: (req.body.earned * 25) / 100,
    });
    // console.log(data);
    res.status(201).json(data);
  } catch (error) {
    res.status(404).json({ error });
  }
}

//////////////////////////////////////////////////////////////////////////////
async function getPayments(req, res) {
  try {
    const data = await Payment.find()
      .populate([
        {
          path: "app_id",
          populate: {
            path: "applicant_id",
          },
        },
        {
          path: "app_id",
          populate: {
            path: "job_id",
          },
        },
      ])
      .exec();
    console.log(data);
    res.status(200).json(data);
    // console.log(data);
  } catch (error) {
    res.status(404).json({ error });
  }
}

//////////////////////////////////////////////////////////////////////////////
async function getSinglePayment(req, res) {
  const paymentId = req.params.id;
  try {
    const data = await Payment.findById(paymentId);
    res.status(200).json(data);
    // console.log(data);
  } catch (error) {
    res.status(404).json({ error });
  }
}

//////////////////////////////////////////////////////////////////////////////
async function getTutorPayment(req, res) {
  const tutorId = req.params.id;
  try {
    const data = await Payment.find({ tutor_id: tutorId });
    res.status(200).json(data);
    // console.log(data);
  } catch (error) {
    res.status(404).json({ error });
  }
}

//////////////////////////////////////////////////////////////////////////////
async function getJobPayment(req, res) {
  const jobId = req.params.id;
  try {
    const data = await Payment.find({ job_id: jobId });
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ error });
  }
}

//////////////////////////////////////////////////////////////////////////////
async function updatePayment(req, res) {
  const paymentId = req.params.id;
  try {
    const data = await Payment.findByIdAndUpdate(paymentId, { ...req.body });
    console.log(data);
    res.status(200).json({ msg: "Payment updated" });
  } catch (error) {
    res.status(404).json({ error });
  }
}

//////////////////////////////////////////////////////////////////////////////
async function deletePayment(req, res) {
  const paymentId = req.params.id;
  try {
    await Payment.findByIdAndDelete(paymentId);
    res.status(200).json({ msg: "Payment Deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err.message });
  }
}

module.exports = {
  addPayment,
  getPayments,
  getTutorPayment,
  getJobPayment,
  getSinglePayment,
  updatePayment,
  deletePayment,
};
