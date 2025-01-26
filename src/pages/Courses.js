import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // اضافه کردن Link برای مسیریابی

function Courses() {
  const [courses, setCourses] = useState([]); // حالت برای ذخیره لیست دوره‌ها
  const [loading, setLoading] = useState(true); // حالت برای نمایش لودینگ
  const [error, setError] = useState(null); // حالت برای خطا

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch courses.');
        }
        const data = await response.json();
        setCourses(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return <div className="text-center">در حال بارگذاری...</div>;
  }

  if (error) {
    return <div className="text-center text-danger">{error}</div>;
  }

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">دوره‌های آموزشی</h1>
      <div className="row">
        {courses.map((course) => (
          <div key={course.id} className="col-md-4 mb-4">
            <div className="card">
              <img src={"http://localhost:5000"+course.thumbnail} alt={course.thumbnail} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{course.title}</h5>
                <p className="card-text">{course.description}</p>
                <p className="text-primary fw-bold">{course.price} تومان</p>
                <Link to={`/product/${course.id}`} className="btn btn-primary">
                  مشاهده جزئیات
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;
