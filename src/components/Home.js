
import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { ShoppingBag, Truck, Users, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        } else {
          entry.target.classList.remove('show');
        }
      });
    }, { threshold: 0.1 });

    const hiddenElements = document.querySelectorAll('.hidden-element');
    hiddenElements.forEach(el => observer.observe(el));

    return () => {
      hiddenElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  const handleGoToProducts = () => {
    navigate('/product');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-white text-slate-800">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-purple-900 -z-10" />

        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-5">
          <div className="animate-blob absolute bg-gradient-to-br from-blue-200 to-cyan-100 opacity-40 blur-3xl rounded-full w-96 h-96 top-20 -left-20"></div>
          <div className="animate-blob2 absolute bg-gradient-to-br from-indigo-100 to-blue-100 opacity-40 blur-3xl rounded-full w-80 h-80 top-40 right-10 animation-delay-2000"></div>
          <div className="animate-blob3 absolute bg-gradient-to-br from-orange-100 to-amber-100 opacity-30 blur-3xl rounded-full w-72 h-72 bottom-10 left-1/2 animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 pt-28 pb-24 flex flex-col lg:flex-row items-center relative z-10">
          <div className="w-full lg:w-1/2 pr-0 lg:pr-16 mb-16 lg:mb-0 hidden-element fade-in-left">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-indigo-800 to-cyan-800">
              Welcome to Ink It Up Printing—<span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-400">Custom Tees That Speak Your Style</span>
            </h1>
            <p className="text-xl text-slate-700 mb-10 leading-relaxed">
              At <span className="font-bold text-cyan-600">Ink It Up Printing</span>, we specialize in <span className="font-bold text-blue-500">high-quality,
                custom T-shirt printing</span> designed to bring your unique vision to life. Whether you're representing your brand, uniting your team, or creating a personal statement, we're here to deliver shirts that look amazing and feel even better.
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={handleGoToProducts}
                className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 px-10 py-4 rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-200 text-white text-lg">
                Get Started
              </button>
            </div>
          </div>

          {/* Right Image/Visual */}
          <div className="w-full lg:w-1/2 hidden-element fade-in-right">
            <div className="relative">
              <div className="w-full h-80 md:h-96 lg:h-[30rem] rounded-2xl overflow-hidden bg-gradient-to-r from-blue-600 to-purple-500 shadow-xl shadow-blue-100 flex items-center justify-center border border-blue-100">
                <div className="text-center p-6">
                  <div className="inline-block p-4 rounded-full bg-blue-500/10 backdrop-blur-md mb-6">
                    <ShoppingBag className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold mb-2 text-white">Custom Tees</h3>
                  <p className="text-white">That Speak Your Style</p>
                </div>
              </div>
                <div className="absolute -top-8 -left-8 w-24 h-24 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full blur-md"></div>
              <div className="absolute -bottom-5 -right-5 w-32 h-32 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-md"></div>             
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-24 relative bg-white">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-slate-50 -z-10"></div>

        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%230072CE' fill-opacity='1'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}></div>

        <div className="container mx-auto px-4">
          <h2 className="text-4xl lg:text-5xl font-bold text-center mb-16 hidden-element fade-in-up">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500">Custom Shirts</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-400">for Every Occasion</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Service 1 */}
            <div className="bg-white p-8 rounded-2xl text-center hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-blue-100 group hidden-element fade-in-up delay-100">
              <div className="bg-gradient-to-br from-cyan-100 to-blue-100 w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-blue-100">
                <ShoppingBag className="text-blue-500" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-blue-600">Personal Orders</h3>
              <p className="text-slate-600">
                Perfect for individual custom designs, gifts, and special occasions.
              </p>
            </div>

            {/* Service 2 */}
            <div className="bg-white p-8 rounded-2xl text-center hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-cyan-100 group hidden-element fade-in-up delay-200">
              <div className="bg-gradient-to-br from-cyan-100 to-blue-100 w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-cyan-100">
                <Users className="text-cyan-500" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-cyan-600">Team Gear</h3>
              <p className="text-slate-600">
                Custom jerseys and team shirts with names, numbers, and logos.
              </p>
            </div>

            {/* Service 3 */}
            <div className="bg-white p-8 rounded-2xl text-center hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-blue-100 group hidden-element fade-in-up delay-300">
              <div className="bg-gradient-to-br from-blue-100 to-indigo-100 w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-blue-100">
                <Award className="text-indigo-500" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-indigo-600">Event Merchandise</h3>
              <p className="text-slate-600">
                Bulk orders for conferences, concerts, and special events.
              </p>
            </div>

            {/* Service 4 */}
            <div className="bg-white p-8 rounded-2xl text-center hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-blue-100 group hidden-element fade-in-up delay-400">
              <div className="bg-gradient-to-br from-blue-100 to-cyan-100 w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-blue-100">
                <Truck className="text-blue-500" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-blue-600">Rush Delivery</h3>
              <p className="text-slate-600">
                Fast turnaround times for those last-minute needs.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sports Team Section */}
      <div className="py-24 relative overflow-hidden bg-blue-50">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-blue-50 -z-10"></div>

        {/* Animated wave overlay */}
        <div className="absolute inset-0 opacity-30">
          <svg className="w-full h-full" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
            <path className="wave animate-wave" fill="#4299E1" fillOpacity="0.1" d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,90.7C672,85,768,107,864,122.7C960,139,1056,149,1152,138.7C1248,128,1344,96,1392,80L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>

        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Left Visual */}
            <div className="w-full lg:w-1/2 hidden-element fade-in-left">
              <div className="relative">
                <div className="w-full h-96 lg:h-[30rem] rounded-2xl overflow-hidden bg-gradient-to-r from-blue-600 to-purple-500 shadow-xl flex items-center justify-center border border-blue-100">
                  <div className="text-center p-8">
                      <div className="inline-block p-4 rounded-full bg-white/10 backdrop-blur-md mb-6">
                                         <Users className="w-12 h-12 text-white" />
                                       </div>
                    <h3 className="text-3xl font-bold mb-2 text-blue-100">Team Spirit</h3>
                    <p className="text-pink-50">United in style and purpose</p>
                  </div>
                </div>

                 <div className="absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full blur-lg animate-pulse"></div>
                <div className="absolute -bottom-5 -right-5 w-40 h-40 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full blur-lg animate-pulse animation-delay-2000"></div>
              </div>
            </div>

            {/* Right Text */}
            <div className="w-full lg:w-1/2 hidden-element fade-in-right">
              <h2 className="text-4xl lg:text-5xl font-bold mb-8">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500">Gear Up</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-400">Your Sports Team</span>
              </h2>
              <p className="text-xl text-slate-600 mb-6 leading-relaxed">
                Need jerseys or team tees? We've got your back. We create{" "}
                <span className="font-bold text-blue-500">custom team shirts for sports teams,
                  clubs, school events, and athletic leagues</span> of all sizes.
              </p>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Add names, numbers, mascots, or sponsors — we'll make sure your team shows up in style and unity.
                With <span className="font-bold text-cyan-500">durable materials and vibrant prints,</span> your shirts will hold up on and off the field.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="py-24 relative bg-white">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white -z-10"></div>

        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl lg:text-5xl font-bold text-center mb-16 hidden-element fade-in-up">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500">Why Choose</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-400">Ink It Up?</span>
          </h2>

          <div className="max-w-4xl mx-auto">
            <div className="mb-12 flex flex-col md:flex-row items-start gap-6 hidden-element fade-in-left">
              <div className="bg-gradient-to-br from-blue-100 to-cyan-100 p-5 rounded-2xl shadow-lg shadow-blue-100 flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3 text-blue-600">Fast Turnaround Times</h3>
                <p className="text-xl text-slate-600 leading-relaxed">
                  Need shirts in a rush? We deliver with speed and reliability, so you never miss a deadline.
                </p>
              </div>
            </div>

            <div className="mb-12 flex flex-col md:flex-row items-start gap-6 hidden-element fade-in-right">
              <div className="bg-gradient-to-br from-cyan-100 to-blue-100 p-5 rounded-2xl shadow-lg shadow-cyan-100 flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3 text-cyan-600">Top-Quality Prints</h3>
                <p className="text-xl text-slate-600 leading-relaxed">
                  We use premium inks and materials for vibrant, long-lasting results you can see and feel.
                </p>
              </div>
            </div>

            <div className="mb-12 flex flex-col md:flex-row items-start gap-6 hidden-element fade-in-left">
              <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-5 rounded-2xl shadow-lg shadow-indigo-100 flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3 text-indigo-600">Logo & Design Help</h3>
                <p className="text-xl text-slate-600 leading-relaxed">
                  No design? No problem! Our team can assist with creating or refining your logo so it prints perfectly.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-start gap-6 hidden-element fade-in-right">
              <div className="bg-gradient-to-br from-cyan-100 to-blue-100 p-5 rounded-2xl shadow-lg shadow-blue-100 flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3 text-cyan-600">Responsive Support</h3>
                <p className="text-xl text-slate-600 leading-relaxed">
                  We believe in clear, quick communication. From your first inquiry to the final delivery, we're here every step of the way.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* From One Shirt to a Thousand Section */}
      <div className="py-24 relative overflow-hidden bg-blue-50">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-blue-50 -z-10"></div>

        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230072CE' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
        }}></div>

        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Left Text */}
            <div className="w-full lg:w-1/2 pr-0 lg:pr-8 hidden-element fade-in-left">
              <h2 className="text-4xl lg:text-5xl font-bold mb-8">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500">From One Shirt to a Thousand</span> <span className="block mt-2 text-slate-800">— We've Got You Covered</span>
              </h2>
              <p className="text-xl text-slate-600 mb-6 leading-relaxed">
                Whether it's one shirt for a special event or hundreds for your organization, we handle orders of all sizes with care, precision, and professionalism.
              </p>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Our flexible printing options allow us to accommodate any quantity while maintaining our high quality standards — without compromising on turnaround times.
              </p>
            </div>

            {/* Right Visual */}
            <div className="w-full lg:w-1/2 hidden-element fade-in-right">
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                   <div className="bg-gradient-to-br from-purple-600 to-pink-500 p-6 rounded-2xl shadow-xl shadow-purple-900/30 aspect-square flex items-center justify-center">
                    <span className="text-6xl font-bold text-white">1</span>
                  </div>
                  <div className="bg-gradient-to-br from-blue-600 to-cyan-500 p-6 rounded-2xl shadow-xl shadow-blue-900/30 aspect-square flex items-center justify-center mt-8">
                    <span className="text-6xl font-bold text-white">10</span>
                  </div>
                  <div className="bg-gradient-to-br from-cyan-600 to-blue-500 p-6 rounded-2xl shadow-xl shadow-cyan-900/30 aspect-square flex items-center justify-center">
                    <span className="text-6xl font-bold text-white">50</span>
                  </div>
                  <div className="bg-gradient-to-br from-pink-600 to-purple-500 p-6 rounded-2xl shadow-xl shadow-pink-900/30 aspect-square flex items-center justify-center mt-8">
                    <span className="text-5xl font-bold text-white">1000+</span>
                  </div>
                </div>

                 <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full blur-lg"></div>
                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full blur-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-800 -z-10"></div>

        {/* Animated waves */}
        <div className="absolute inset-0 -z-5">
          <div className="wave-container">
            <svg className="wave1" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
              <path fill="rgba(255, 255, 255, 0.05)" d="M0,192L48,176C96,160,192,128,288,122.7C384,117,480,139,576,154.7C672,171,768,181,864,170.7C960,160,1056,128,1152,117.3C1248,107,1344,117,1392,122.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
            <svg className="wave2" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
              <path fill="rgba(255, 255, 255, 0.05)" d="M0,64L48,90.7C96,117,192,171,288,176C384,181,480,139,576,122.7C672,107,768,117,864,144C960,171,1056,213,1152,202.7C1248,192,1344,128,1392,96L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
          </div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto hidden-element fade-in-up">
            <h2 className="text-5xl lg:text-6xl font-bold mb-8 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-indigo-800 to-cyan-800">Ready to print something amazing? Let’s Ink It Up!
              </span>
            </h2>
            <p className="text-2xl mb-12 bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-400 max-w-3xl mx-auto">
              Custom shirts. Unmatched service. Delivered fast.

            </p>
            <button  onClick={handleGoToProducts}
             className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 px-12 py-5 rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-xl shadow-pink-900/40 text-xl">
              Let's Ink It Up!
            </button>

            {/* Decorative dots */}
            <div className="absolute -top-10 -left-10 w-20 h-20">
              <div className="relative h-full">
                <div className="absolute top-0 left-0 w-4 h-4 rounded-full bg-pink-500 animate-ping-slow"></div>
                <div className="absolute top-8 left-8 w-3 h-3 rounded-full bg-cyan-500 animate-ping-slower"></div>
                <div className="absolute top-16 left-2 w-2 h-2 rounded-full bg-purple-500 animate-ping-slowest"></div>
              </div>
            </div>
            <div className="absolute -bottom-10 -right-10 w-20 h-20">
              <div className="relative h-full">
                <div className="absolute top-0 right-0 w-4 h-4 rounded-full bg-cyan-500 animate-ping-slow"></div>
                <div className="absolute top-8 right-8 w-3 h-3 rounded-full bg-purple-500 animate-ping-slower"></div>
                <div className="absolute top-16 right-2 w-2 h-2 rounded-full bg-pink-500 animate-ping-slowest"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        /* Animation keyframes */
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        @keyframes blob2 {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(-30px, 50px) scale(1.1); }
          66% { transform: translate(20px, -20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        @keyframes blob3 {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, 30px) scale(1.1); }
          66% { transform: translate(-30px, -30px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        @keyframes wave {
          0% { transform: translateX(0) translateZ(0) scaleY(1); }
          50% { transform: translateX(-25%) translateZ(0) scaleY(0.8); }
          100% { transform: translateX(-50%) translateZ(0) scaleY(1); }
        }
        
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(2); opacity: 0.5; }
          100% { transform: scale(1); opacity: 1; }
        }
        
        @keyframes ping-slower {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(2.5); opacity: 0.3; }
          100% { transform: scale(1); opacity: 1; }
        }
        
        @keyframes ping-slowest {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(3); opacity: 0.2; }
          100% { transform: scale(1); opacity: 1; }
        }
        
        /* Stars animation */
        @keyframes animStar {
          from { transform: translateY(0px); }
          to { transform: translateY(-2000px); }
        }
        
        /* Animation classes */
        .animate-blob {
          animation: blob 10s infinite linear alternate;
        }
        
        .animate-blob2 {
          animation: blob2 12s infinite linear alternate;
        }
        
        .animate-blob3 {
          animation: blob3 8s infinite linear alternate;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        /* Wave animations */
        .wave-container {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        
        .wave1, .wave2 {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 200%;
        }
        
        .wave1 {
          animation: wave 25s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite;
          z-index: 1;
        }
        
        .wave2 {
          animation: wave 30s cubic-bezier(0.36, 0.45, 0.63, 0.53) -5s infinite, swell 7s ease -1.25s infinite;
          opacity: 0.5;
          z-index: 0;
        }
        
        /* Scroll animations */
        .hidden-element {
          opacity: 0;
          filter: blur(5px);
          transform: translateY(100px);
          transition: all 1s cubic-bezier(0.17, 0.55, 0.55, 1);
        }
        
        .hidden-element.show {
          opacity: 1;
          filter: blur(0);
          transform: translateY(0);
        }
        
        /* Text transition animations */
        .fade-in-left {
          transform: translateX(-100px);
        }
        
        .fade-in-right {
          transform: translateX(100px);
        }
        
        .fade-in-up {
          transform: translateY(50px);
        }
        
        .delay-100 {
          transition-delay: 100ms;
        }
        
        .delay-200 {
          transition-delay: 200ms;
        }
        
        .delay-300 {
          transition-delay: 300ms;
        }
        
        .delay-400 {
          transition-delay: 400ms;
        }
        
        /* Stars background */
        .stars, .stars2, .stars3 {
          width: 1px;
          height: 1px;
          background: transparent;
          box-shadow: 1744px 122px #fff, 134px 1321px #fff, 92px 859px #fff, 235px 1045px #fff, 366px 912px #fff, 491px 942px #fff, 14px 1831px #fff, 582px 476px #fff, 588px 1230px #fff, 1520px 1343px #fff, 451px 764px #fff, 104px 1331px #fff, 1141px 715px #fff, 986px 1214px #fff, 944px 632px #fff, 1037px 939px #fff, 892px 1948px #fff, 1843px 1917px #fff, 1377px 1265px #fff, 1071px 1591px #fff;
          animation: animStar 100s linear infinite;
        }
        
        .stars2 {
          width: 2px;
          height: 2px;
          box-shadow: 643px 763px #fff, 1086px 1454px #fff, 1108px 1288px #fff, 880px 608px #fff, 936px 1227px #fff, 1334px 1438px #fff, 1165px 1064px #fff, 485px 725px #fff, 1388px 1932px #fff, 140px 245px #fff, 475px 1474px #fff, 806px 1648px #fff, 1118px 377px #fff, 553px 549px #fff, 1575px 787px #fff, 594px 368px #fff, 1401px 82px #fff, 258px 220px #fff, 29px 574px #fff, 387px 192px #fff;
          animation: animStar 120s linear infinite;
        }
        
        .stars3 {
          width: 3px;
          height: 3px;
          box-shadow: 1585px 579px #fff, 1354px 1916px #fff, 1372px 71px #fff, 423px 701px #fff, 343px 181px #fff, 1935px 1684px #fff, 245px 577px #fff, 530px 1588px #fff, 305px 1503px #fff, 1510px 725px #fff, 1410px 956px #fff, 297px 1486px #fff, 1383px 1021px #fff, 1797px 673px #fff, 1833px 1100px #fff, 1169px 723px #fff, 92px 972px #fff, 689px 1258px #fff;
          animation: animStar 150s linear infinite;
        }
        
        .animate-ping-slow {
          animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        
        .animate-ping-slower {
          animation: ping-slower 4s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        
        .animate-ping-slowest {
          animation: ping-slowest 5s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;