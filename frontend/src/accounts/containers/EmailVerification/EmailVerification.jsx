import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

import Loader from "src/shared/components/Loader/Loader";
import StateCard from "src/shared/components/StateCard/StateCard";
import sharedCommonConstants from "src/shared/constants/CommonConstants";
import useApiClient from "src/shared/hooks/useApiClient";
import stateUrls from "src/shared/constants/StateUrls";
import commonUtils from "src/shared/utils/commonUtils";

const EmailVerificationContainer = () => {
  const [verified, setVerified] = useState(false);
  const [apiLoaded, setApiLoaded] = useState(false);
  const [verificationError, setVerificationError] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();

  const { loading, action } = useApiClient({
    isOpenUrl: true,
    requestFor: "EMAIL_VERIFICATION",
    showToast: false,
  });

  const resendEmailVerification = () => {
    navigate(stateUrls.RESEND_EMAIL_VERIFICATION);
  };

  const goToApp = () => {
    navigate(stateUrls.HOME);
    window.location.reload();
  };

  const stateCardAction = useMemo(
    () => (verified ? goToApp : resendEmailVerification),
    [verified]
  );

  const stateCardActionText = useMemo(
    () => (verified ? "Go To Application" : "Re-send Verification Email"),
    [verified]
  );

  useEffect(() => {
    action({
      payload: {
        token: token,
      },
    }).then((res) => {
      setApiLoaded(true);
      if (res?.status === sharedCommonConstants.RESPONSE_STATUS.HTTP_200_OK) {
        setVerified(true);
        commonUtils.setAuthToken(res.data.auth_token);
      } else {
        setVerificationError(
          (res?.data?.non_field_errors && res.data.non_field_errors[0]) ||
            "Something went wrong, try again later."
        );
      }
    });
  }, [token]);

  return (
    <div className="mt-12">
      {loading && <Loader />}
      <div className="max-w-md px-6 mx-auto">
        {apiLoaded && (
          <StateCard
            success={verified}
            icon={verified ? CheckCircleIcon : XCircleIcon}
            description={
              verified
                ? "Congratulations, your account has been verified."
                : verificationError
            }
            action={stateCardAction}
            actionText={stateCardActionText}
          />
        )}
      </div>
    </div>
  );
};

export default EmailVerificationContainer;
