import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/Img/logo.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { selectLogin, userLogin } from "../../app/Feature/API/LoginSlice";
import CookieService from "../../Services/CookiesServices";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, data } = useSelector(selectLogin);

  const jwt = CookieService.get("jwt");
  if (jwt) {
    navigate("/moderator", { replace: true });
  }

  const handleNavigate = useCallback(() => {
    navigate("/moderator", { replace: true });
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;

    if (!email) {
      setEmailError("يرجى ملء البريد الالكتروني");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("يرجى ملء كلمة المرور");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!valid) {
      toast.error("يرجى ملء جميع الحقول");
      return;
    }

    const loginData = { email, password };

    dispatch(userLogin(loginData));
  };

  return (
    <section className="h-screen flex flex-col md:flex-row">
      <div className="flex flex-col items-center justify-center bg-gradient-to-r from-[#20b2aa] to-[#48c9b0] text-white w-full md:w-1/2 px-10 py-20">
        <img src={logo} alt="Logo" className="w-40 h-auto mb-8 animate-fadeIn" />
        <h1 className="text-4xl font-bold mb-4 animate-fadeIn">مرحباً بعودتك!</h1>
        <p className="text-lg text-center animate-fadeIn">
          يسعدنا أن نقدم لك تجربة تسجيل دخول مميزة. يرجى إدخال بياناتك للوصول إلى حسابك.
        </p>
      </div>

      <div className="flex items-center justify-center w-full md:w-1/2 bg-gray-100 px-8 md:mt-0 mt-8">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
            تسجيل الدخول
          </h1>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-600"
              >
                البريد الالكتروني
              </label>
              <input
                type="text"
                name="email"
                id="email"
                className={`bg-gray-50 border ${
                  emailError ? "border-red-500" : "border-gray-300"
                } text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-[#20b2aa] focus:outline-none block w-full p-3`}
                placeholder="أدخل البريد الالكتروني"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && (
                <p className="text-red-500 text-sm mt-2">{emailError}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-600"
              >
                كلمة المرور
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className={`bg-gray-50 border ${
                  passwordError ? "border-red-500" : "border-gray-300"
                } text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-[#20b2aa] focus:outline-none block w-full p-3`}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordError && (
                <p className="text-red-500 text-sm mt-2">{passwordError}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-[#20b2aa] text-white hover:bg-[#1e8f8a] focus:ring-4 focus:outline-none focus:ring-[#20b2aa] font-medium rounded-lg text-sm px-5 py-3 transition-all duration-300 ease-in-out"
              disabled={loading}
            >
              {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
            </button>
            <div className="text-center mt-4">
              {error && (
                <p className="text-red-500 text-sm mt-3">
                  فشل تسجيل الدخول. يرجى المحاولة مرة أخرى.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
