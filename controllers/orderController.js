const nodemailer = require('nodemailer');
const Order = require('../models/Order');

const createOrder = (req, res) => {
  const { customerName, email, colors, fabricMaterial, dressType, personality, other, price } = req.body;
  const newOrder = new Order({ customerName, email, colors, fabricMaterial, dressType, personality, other, price });

  newOrder.save()
    .then(() => {
      req.flash('message', 'Order created successfully');
      
      // Email setup
      let transporter = nodemailer.createTransport({
        service: 'gmail', // e.g., 'gmail'
        auth: {
          user: "anjolaaaa@gmail.com",
            pass: "ykvpryafrvtbexvp"  // replace with your email password
        }
      });

      let mailOptions = {
        from: email, // replace with your email
        to: 'anjolaaaa@gmail.com',   // replace with the recipient email (you can send it to yourself)
        subject: 'New Order Placed',
        text: `A new order has been placed by ${customerName}.\n
               Email: ${email}\n
               Colors: ${colors}\n
               Fabric Material: ${fabricMaterial}\n
               Dress Type: ${dressType}\n
               Personality: ${personality}\n
               Other Specifications: ${other}`
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });

      res.redirect('/'); // redirect to dashboard or appropriate route
    })
    .catch(err => {
      console.error('Error saving order:', err);
      req.flash('error_msg', 'Failed to place order');
      res.redirect('/'); // handle error redirection appropriately
    });
};

module.exports = { createOrder };
