const bodyParser = require('body-parser');
const express = require('express');
const dbConnect = require('./config/dbConnect');
const { notFound, errorHandler } = require('./middlewares/errorHandler');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 6000;
const authRouter = require('./routes/authRoute');
const productRouter = require('./routes/productRoute');
const blogRouter = require('./routes/blogRoute');
const productCategoryRouter = require('./routes/productCategoryRoute');
const blogCategoryRouter = require('./routes/blogCategoryRoute');
const brandRouter = require('./routes/brandRoute');
const colorRouter = require("./routes/colorRoute");
const couponRouter = require('./routes/couponRoute');
const enquiryRouter = require('./routes/enquiryRoute');
const uploadRouter = require('./routes/uploadRoute');
const paymentRouter = require('./routes/paymentRoute');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');

dbConnect();

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/user', authRouter);
app.use('/api/product', productRouter);
app.use('/api/blog', blogRouter);
app.use('/api/product-cat', productCategoryRouter);
app.use('/api/blog-cat', blogCategoryRouter);
app.use('/api/brand', brandRouter);
app.use('/api/color', colorRouter);
app.use('/api/coupon', couponRouter);
app.use('/api/enquiry', enquiryRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/payment', paymentRouter);

app.use(notFound);
app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
