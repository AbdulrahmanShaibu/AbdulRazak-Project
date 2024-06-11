import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fontsource/roboto';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HowToWrite from './components/HowToWrite';
import ContactUs from './components/category';
import Student from './components/student';
import Teacher from './components/teacher';
import Payment from './components/payment';
import User from './components/user';
import Syllabus from './components/syllabus';
import Category from './components/category';
import Website from './components/website';
// import SignIn from './forms/signin';

// Website imports
import NewHome from './website/pages/Home';
import About from './website/pages/About';
import BlogDetails from './website/pages/BlogDetails';
import Blogs from './website/pages/Blogs';
import Contact from './website/pages/Contact';
import Faq from './website/pages/Faq';
import Project from './website/pages/Project';
import ProjectDetails from './website/pages/ProjectDetails';
import ServiceDetails from './website/pages/ServiceDetails';
import Services from './website/pages/Services';

//CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './website/assets/css/default.css';
import './website/assets/css/main.css';
import './website/assets/css/responsive.css';
import './website/assets/vendor/modal-video/modal-video.min.css';
import './website/assets/vendor/slick/slick.css';
import Level from './components/level';
import Class from './components/class';
import StudentSelectedSubject from './components/StudentSelectedSubject';
import StudentNotes from './components/StudentNotes';
import StudentPaymentStatus from './components/StudentPaymentStatus';
import StudentSelectedTeacher from './components/StudentSelectedTeacher';
import Profile from './Teacher/Profile';
import ClassRegistration from './Teacher/ClassRegistration';
import Classes from './Teacher/Classes';
import ClassStatus from './Teacher/ClassStatus';
import CourseOutline from './Teacher/CourseOutline';
import Notes from './Teacher/Notes';
import Topics from './Teacher/Topics';
import Videos from './Teacher/Videos';
import Rate from './Payments/Rate';
import Reviews from './Payments/Reviews';
import Payments from './Payments/Payments';
import PaymentsRecord from './Payments/PaymentsRecord';
import ClassWork from './Teacher/ClassWork';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="how-to-write" element={<HowToWrite />} />
          <Route path="teacher" element={<Teacher />} />
          {/* <Route path="syllabus" element={<Syllabus/>} /> */}
          <Route path="syllabus" element={<Syllabus />} />
          <Route path="category" element={<Category />} />
          <Route path="student" element={<Student />} />
          <Route path="user" element={<User />} />
          <Route path="payment" element={<Payment />} />
          <Route path="website" element={<Website />} />
          <Route path="contact-us" element={<ContactUs />} />
          <Route path='level' element={<Level />} />
          <Route path='class' element={<Class />} />
          <Route path='view_subjects' element={<StudentSelectedSubject />} />
          <Route path='view_notes' element={<StudentNotes />} />
          <Route path='view_payment' element={<StudentPaymentStatus />} />
          <Route path='view_teachers' element={<StudentSelectedTeacher />} />
          {/* <Route path="sign-in" element={<SignIn />} /> */}


          {/* Teacher Routing Components */}
          <Route path="/teacher/profile" element={<Profile />} />
          <Route path="/teacher/class-registration" element={<ClassRegistration />} />
          <Route path="/teacher/classes" element={<Classes />} />
          <Route path="/teacher/class-status" element={<ClassStatus />} />
          <Route path="/teacher/course-outline" element={<CourseOutline />} />
          <Route path="/teacher/notes" element={<Notes />} />
          <Route path="/teacher/topics" element={<Topics />} /> {/* Add route for Topics component */}
          <Route path="/teacher/videos" element={<Videos />} />
          <Route path="/teacher/class-work" element={<ClassWork />} />

          {/* Payment Components */}
          <Route path="/rate" element={<Rate />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/payments-record" element={<PaymentsRecord />} />

          {/* Website Routing components */}
          <Route path="/website/view" exact element={<NewHome />} />
          <Route path="/about" exact element={<About />} />
          <Route path="/services" exact element={<Services />} />
          <Route path="/service-details" exact element={<ServiceDetails />} />
          <Route path="/projects" exact element={<Project />} />
          <Route path="/project-details" exact element={<ProjectDetails />} />
          <Route path="/blogs" exact element={<Blogs />} />
          <Route path="/blog-details" exact element={<BlogDetails />} />
          <Route path="/faq" exact element={<Faq />} />
          <Route path="/contact" exact element={<Contact />} />
          <Route path="*" element={<p>Path not found</p>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
