import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import "./leads.css";

const formFields = [
  { name: "companyName", type: "text", placeholder: "Company Name *" },
  { name: "companySegment", type: "text", placeholder: "Company Segment *" },
  { name: "product", type: "password", placeholder: "Product Name *" },
  { name: "productPitch", type: "textarea", placeholder: "Product Pitch *" },
];

export const Leads = () => {
  const location = useLocation();
  const user = location.state?.user; // Access user info passed from the Home component

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div class="container register">
      <div class="row">
        <div class="col-md-4 register-left">
          <h3>Welcome, {user?.name}!</h3>
          <p>You are just 2 minutes away from contacting your leads</p>
          <br />
        </div>
        <div class="col-md-8 register-right">
          <div class="row register-form">
            {formFields.map((field, index) => (
              <div
                className={`col-md-${field.type === "textarea" ? "12" : "6"}`}
                key={index}
              >
                <div className="form-group">
                  {field.type === "textarea" ? (
                    <textarea
                      className="form-control"
                      placeholder={field.placeholder}
                      name={field.name}
                      rows="5"
                    />
                  ) : (
                    <input
                      type={field.type}
                      className="form-control"
                      placeholder={field.placeholder}
                      name={field.name}
                    />
                  )}
                </div>
              </div>
            ))}
            <div className="col-md-12 text-right">
              <button type="submit" className="btn btn-primary btn-lg">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
