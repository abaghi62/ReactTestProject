import React from 'react';

function CourseCard({ title, description, image, price }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100">
        <img src={image} className="card-img-top" alt={title} />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
        </div>
        <div className="card-footer">
          <span className="text-muted">{price}</span>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
