import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const NetworkStatus = ({ children }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast.success("تم الاتصال بالإنترنت مجددًا...");
    };
    const handleOffline = () => {
      setIsOnline(false);
      toast.error("تم فقدان الاتصال بالإنترنت، الرجاء الانتظار...");
    };
    const handleKeyDown = (event) => {
      if (event.keyCode === 116) { 
        event.preventDefault();
        toast.info("تم منع إعادة التحميل يدويًا.");
      }
    };
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

//   if (!isOnline) {
//     return (
//       <div
//         style={{ pointerEvents: "none", textAlign: "center", padding: "20px" }}
//       >
//         <h1>الاتصال بالإنترنت مفقود</h1>
//         <p>الرجاء الانتظار حتى يعود الاتصال...</p>
//       </div>
//     );
//   }

  return children;
};

export default NetworkStatus;
