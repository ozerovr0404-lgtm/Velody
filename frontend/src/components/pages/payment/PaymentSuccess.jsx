import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {

  const navigate = useNavigate();

  useEffect(() => {

    const returnUrl = sessionStorage.getItem(
      "payment_return_url"
    );

    console.log("RETURN:", returnUrl);

    sessionStorage.removeItem(
      "payment_return_url"
    );

    if (returnUrl) {
      navigate(returnUrl, {
        replace: true
      });
    }

  }, [navigate]);


  return (
    <div>
      Оплата успешно прошла
    </div>
  );
};

export default PaymentSuccess;