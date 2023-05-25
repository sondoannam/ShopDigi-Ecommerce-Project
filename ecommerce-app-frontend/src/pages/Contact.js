import React from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import { SlEarphonesAlt } from 'react-icons/sl';
import { BsInfoSquare, BsMailbox } from 'react-icons/bs';
import { IoHomeOutline } from 'react-icons/io5';
import Container from '../components/Container';
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { createQuery } from '../features/contact/contactSlice';

let schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('email should be valid').required('email is required'),
  mobile: yup.string().required('Mobile Number is required'),
  comment: yup.string().required('You\'d put your comment here so we can see our problem'),
});

const Contact = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      comment: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createQuery(values))
      },
    });

  return (
    <>
      <Meta title={"Contact Us"} />
      <BreadCrumb title="Contact Us" />
      <Container class1="contact-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <iframe
              title="map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.9442993224848!2d105.8597136148538!3d20.994869786016817!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ad11b1f441bf%3A0xcf480c26f8137a3a!2sVTC%20Online%20Building!5e0!3m2!1svi!2s!4v1679129184208!5m2!1svi!2s"
              width="600"
              height="450"
              className="border-0 w-100"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="col-12 mt-5">
            <div className="contact-inner-wrapper d-flex justify-content-between">
              <div>
                <h3 className="contact-title mb-4">Contact</h3>
                <form action="" onSubmit={formik.handleSubmit} className="d-flex flex-column gap-15">
                  <div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      name='name'
                      onChange={formik.handleChange('name')}
                      onBlur={formik.handleBlur('name')}
                      value={formik.values.name}
                    />
                    <div className="error">
                      {formik.touched.name && formik.errors.name}
                    </div>
                  </div>
                  <div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Email"
                      name='email'
                      onChange={formik.handleChange('email')}
                      onBlur={formik.handleBlur('email')}
                      value={formik.values.email}
                    />
                    <div className="error">
                      {formik.touched.email && formik.errors.email}
                    </div>
                  </div>
                  <div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Mobile Number"
                      name='mobile'
                      onChange={formik.handleChange('mobile')}
                      onBlur={formik.handleBlur('mobile')}
                      value={formik.values.mobile}
                    />
                    <div className="error">
                      {formik.touched.mobile && formik.errors.mobile}
                    </div>
                  </div>
                  <div>
                    <textarea
                      name="comment"
                      id=""
                      className="w-100 form-control"
                      cols="30"
                      rows="4"
                      placeholder="Comments"
                      onChange={formik.handleChange('comment')}
                      onBlur={formik.handleBlur('comment')}
                      value={formik.values.comment}
                    ></textarea>
                    <div className="error">
                      {formik.touched.comment && formik.errors.comment}
                    </div>
                  </div>
                  <div>
                    <button className="button border-0">Submit</button>
                  </div>
                </form>
              </div>
              <div>
                <h3 className="contact-title mb-4">Get in Touch with us</h3>
                <div>
                  <ul className="ps-0">
                    <li className="mb-3 d-flex gap-15 align-items-center">
                      <IoHomeOutline />
                      <address className="mb-0">
                        Hno: 18, Tam Trinh Street, Hoang Mai, Ha Noi
                      </address>
                    </li>
                    <li className="mb-3 d-flex gap-15 align-items-center">
                      <SlEarphonesAlt />
                      <a href="tel:+84 123456789">+84 123456789</a>
                    </li>
                    <li className="mb-3 d-flex gap-15 align-items-center">
                      <BsMailbox />
                      <a href="mailto:sonladepzaizx@gmail.com">
                        sonladepzaizx@gmail.com
                      </a>
                    </li>
                    <li className="mb-3 d-flex gap-15 align-items-center">
                      <BsInfoSquare />
                      <p className="mb-0">Monday - Friday : 10AM - 6PM</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Contact;