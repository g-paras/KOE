import { useState, useEffect } from "react";

import useApiClient from "src/shared/hooks/useApiClient";
import commonUtils from "src/shared/utils/commonUtils";
import Loader from "../Loader/Loader";
import commonConstants from "src/shared/constants/CommonConstants";
import { BaseProvider } from "src/shared/contexts/BaseContext";

const BaseConnect = ({ component }) => {
  const [baseAPILoaded, setBaseAPILoaded] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const { loading, action, data } = useApiClient({
    isOpenUrl: true,
    requestFor: "BASE_API",
  });

  useEffect(() => {
    const authToken = commonUtils.getAuthToken();
    if (authToken) {
      action({
        headers: {
          Authorization: `Token ${authToken}`,
        },
      }).then((res) => {
        if (res?.status === commonConstants.RESPONSE_STATUS.HTTP_200_OK) {
          setAuthenticated(true);
        }
        setBaseAPILoaded(true);
      });
    } else {
      setBaseAPILoaded(true);
    }
  }, []);

  const Component = component;
  return (
    <>
      {!baseAPILoaded || loading ? (
        <Loader overlay={false} />
      ) : (
        <BaseProvider value={{ authenticated, ...(data || {}) }}>
          <Component authenticated={authenticated} />
        </BaseProvider>
      )}
    </>
  );
};

export default BaseConnect;
