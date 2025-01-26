import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const isSuccess = await login(username, password);
    if (isSuccess) {
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        navigate("/"); // هدایت به صفحه اصلی
      }, 2000);
    } else {
      setError("نام کاربری یا رمز عبور اشتباه است");
    }
  };

  return (
    <div className="container login-page">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2>ورود</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">نام کاربری</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">رمز عبور</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              ورود
            </button>
          </form>
          {error && <p className="text-danger mt-3">{error}</p>}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <p>ورود موفقیت‌آمیز بود!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
