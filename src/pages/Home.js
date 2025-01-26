import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [latestCourses, setLatestCourses] = useState([]); // حالت برای ذخیره ۶ محصول آخر
  const [loading, setLoading] = useState(true); // حالت برای نمایش لودینگ
  const [error, setError] = useState(null); // حالت برای خطا

  useEffect(() => {
    const fetchLatestCourses = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products'); // فراخوانی API محصولات
        if (!response.ok) {
          throw new Error('Failed to fetch courses.');
        }
        const data = await response.json();
        setLatestCourses(data.slice(-6)); // انتخاب ۶ محصول آخر
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestCourses();
  }, []);

  if (loading) {
    return <div className="text-center">در حال بارگذاری...</div>;
  }

  if (error) {
    return <div className="text-center text-danger">{error}</div>;
  }

  return (
    <div className="container my-4">
      <div className="row align-items-center mb-5">
        <div className="col-md-6">
          <h1>به سایت ما خوش آمدید</h1>
          <p>
            دوره‌های آموزشی با کیفیت بالا و متناسب با نیازهای شما.
            <br />
            جدیدترین دوره‌ها را در اینجا ببینید!
          </p>
          <Link to="/courses" className="btn btn-primary">
            مشاهده همه دوره‌ها
          </Link>
        </div>
        <div className="col-md-6 text-center">
          <img
            src="/chatgpt.jpg"
            alt="Sample Banner"
            className="img-fluid rounded"
          />
        </div>
      </div>

      <h2 className="text-center mb-4">جدیدترین دوره‌ها</h2>
      <div className="row">
        {latestCourses.map((course) => (
          <div key={course.id} className="col-md-4 mb-4">
            <div className="card">
              <img src={"http://localhost:5000"+course.thumbnail} alt={course.title} className="card-img-top" />
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

export default Home;
