import React from 'react'

function Services() {

  // 🔥 Real-world services data
  const services = [
    {
      id: 1,
      icon: "fa-globe",
      title: "International Tour Packages",
      desc: "Explore top destinations like Dubai, Bali, Thailand, and Europe with fully planned travel packages."
    },
    {
      id: 2,
      icon: "fa-hotel",
      title: "Hotel & Resort Booking",
      desc: "Book luxury hotels, budget stays, and premium resorts at the best prices."
    },
    {
      id: 3,
      icon: "fa-plane",
      title: "Flight Booking",
      desc: "Affordable domestic and international flight booking with instant confirmation."
    },
    {
      id: 4,
      icon: "fa-user",
      title: "Expert Travel Guides",
      desc: "Professional local guides to give you the best travel experience."
    },
    {
      id: 5,
      icon: "fa-map",
      title: "Customized Trip Planning",
      desc: "Personalized itineraries based on your preferences and budget."
    },
    {
      id: 6,
      icon: "fa-car",
      title: "Transport & Cab Services",
      desc: "Comfortable transport including airport pickup, cabs, and tour vehicles."
    },
    {
      id: 7,
      icon: "fa-briefcase",
      title: "Corporate Travel",
      desc: "Business travel solutions with complete planning and management."
    },
    {
      id: 8,
      icon: "fa-heart",
      title: "Honeymoon Packages",
      desc: "Romantic destinations with special arrangements for couples."
    },
  ];

  // 🔥 Testimonials
  const testimonials = [
    {
      id: 1,
      name: "Rahul Patil",
      place: "Mumbai, India",
      image: "https://randomuser.me/api/portraits/men/11.jpg",
      text: "Amazing service! Everything was perfectly planned and stress-free."
    },
    {
      id: 2,
      name: "Pooja Shah",
      place: "Ahmedabad, India",
      image: "https://randomuser.me/api/portraits/women/12.jpg",
      text: "Best travel experience ever. Highly recommended!"
    },
    {
      id: 3,
      name: "Amit Verma",
      place: "Delhi, India",
      image: "https://randomuser.me/api/portraits/men/13.jpg",
      text: "Affordable packages and great support throughout the trip."
    },
    {
      id: 4,
      name: "Neha Kapoor",
      place: "Pune, India",
      image: "https://randomuser.me/api/portraits/women/14.jpg",
      text: "Loved the planning and hotel arrangements. Smooth experience!"
    },
  ];

  return (
    <div>

      {/* HERO */}
      <div className="container-fluid bg-primary py-5 mb-5 hero-header">
        <div className="container py-5">
          <div className="row justify-content-center py-5">
            <div className="col-lg-10 pt-lg-5 mt-lg-5 text-center">
              <h1 className="display-3 text-white animated slideInDown">
                Our Services
              </h1>
              <p className="text-white">
                Complete travel solutions for domestic and international trips
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SERVICES */}
      <div className="container-xxl py-5">
        <div className="container">

          <div className="text-center mb-5">
            <h6 className="section-title bg-white text-primary px-3">
              What We Offer
            </h6>
            <h1>Premium Travel Services</h1>
          </div>

          <div className="row g-4">

            {services.map((service, index) => (
              <div key={service.id} className="col-lg-3 col-sm-6">

                <div className="service-item rounded pt-3">
                  <div className="p-4">

                    <i className={`fa fa-3x ${service.icon} text-primary mb-4`} />

                    <h5>{service.title}</h5>
                    <p>{service.desc}</p>

                  </div>
                </div>

              </div>
            ))}

          </div>

        </div>
      </div>

      {/* TESTIMONIAL */}
      <div className="container-xxl py-5">
        <div className="container">

          <div className="text-center mb-5">
            <h6 className="section-title bg-white text-primary px-3">
              Testimonials
            </h6>
            <h1>What Our Clients Say</h1>
          </div>

          <div className="row g-4">

            {testimonials.map((t) => (
              <div key={t.id} className="col-md-3">

                <div className="testimonial-item bg-white text-center border p-4">

                  <img
                    className="bg-white rounded-circle shadow p-1 mx-auto mb-3"
                    src={t.image}
                    style={{ width: 80, height: 80 }}
                    alt={t.name}
                  />

                  <h5>{t.name}</h5>
                  <p>{t.place}</p>

                  <p className="mb-0">{t.text}</p>

                </div>

              </div>
            ))}

          </div>

        </div>
      </div>

    </div>
  );
}

export default Services;