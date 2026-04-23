import React from "react";

function Team() {

  // 🔥 Generate unique human images
  const getImage = (id) => {
    return `https://randomuser.me/api/portraits/${id % 2 === 0 ? "men" : "women"}/${id}.jpg`;
  };

  const guides = [
    { id: 1, name: "Aarav Sharma", role: "Mountain Guide" },
    { id: 2, name: "Riya Mehta", role: "City Tour Expert" },
    { id: 3, name: "Kabir Singh", role: "Adventure Specialist" },
    { id: 4, name: "Ananya Patel", role: "Cultural Guide" },
    { id: 5, name: "Rahul Verma", role: "Wildlife Guide" },
    { id: 6, name: "Sneha Iyer", role: "Heritage Expert" },
    { id: 7, name: "Arjun Nair", role: "Beach Tour Guide" },
    { id: 8, name: "Pooja Desai", role: "Travel Planner" },
    { id: 9, name: "Vikram Joshi", role: "Tour Manager" },
    { id: 10, name: "Neha Kapoor", role: "Luxury Travel Expert" },
    { id: 11, name: "Rohan Malhotra", role: "International Guide" },
    { id: 12, name: "Ishita Shah", role: "Cultural Expert" },
  ];

  return (
    <div>

      {/* Hero Section */}
      <div className="container-fluid bg-primary py-5 mb-5 hero-header">
        <div className="container py-5">
          <div className="row justify-content-center py-5">
            <div className="col-lg-10 text-center">
              <h1 className="display-3 text-white">Guides</h1>
              <nav>
                <ol className="breadcrumb justify-content-center">
                  <li className="breadcrumb-item">
                    <a href="/">Home</a>
                  </li>
                  <li className="breadcrumb-item text-white active">
                    Travel Guides
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="container-xxl py-5">
        <div className="container">

          <div className="text-center mb-5">
            <h6 className="section-title bg-white text-primary px-3">
              Travel Guide
            </h6>
            <h1>Meet Our Experts</h1>
          </div>

          <div className="row g-4">

            {guides.map((guide) => (
              <div key={guide.id} className="col-lg-3 col-md-6">

                <div className="team-item">

                  <div className="overflow-hidden">
                    <img
                      className="img-fluid"
                      src={getImage(guide.id)}
                      alt={guide.name}
                    />
                  </div>

                  {/* Social Icons */}
                  <div
                    className="position-relative d-flex justify-content-center"
                    style={{ marginTop: "-19px" }}
                  >
                    <a className="btn btn-square mx-1" href="#">
                      <i className="fab fa-facebook-f" />
                    </a>
                    <a className="btn btn-square mx-1" href="#">
                      <i className="fab fa-twitter" />
                    </a>
                    <a className="btn btn-square mx-1" href="#">
                      <i className="fab fa-instagram" />
                    </a>
                  </div>

                  {/* Info */}
                  <div className="text-center p-4">
                    <h5 className="mb-0">{guide.name}</h5>
                    <small>{guide.role}</small>
                  </div>

                </div>

              </div>
            ))}

          </div>
        </div>
      </div>

    </div>
  );
}

export default Team;