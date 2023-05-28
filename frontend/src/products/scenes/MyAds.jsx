import Header from "src/shared/components/Header/Header";
import MyAdsContainer from "../containers/MyAds";

const MyAds = () => {
  return (
    <>
      <Header />
      <div className="px-6 lg:mx-5">
        <h1 className="mt-4 mb-3 text-xl font-bold">My Advertisements</h1>
        <MyAdsContainer />
      </div>
    </>
  );
};

export default MyAds;
