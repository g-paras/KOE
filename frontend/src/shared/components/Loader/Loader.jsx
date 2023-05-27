import { ArrowPathIcon } from "@heroicons/react/24/outline";
import logo from "src/shared/assets/logo.png";

const Loader = ({ overlay = true }) => (
  <div
    className={`fixed inset-0 h-screen w-full z-50 grid place-items-center ${
      overlay ? "bg-gray-500/80" : "bg-white"
    }`}
  >
    <div>
      {overlay ? (
        <div className="animate-spin">
          <ArrowPathIcon className="h-6 text-bloack" />
        </div>
      ) : (
        <>
          {" "}
          <img src={logo} className="h-16" alt="logo" />
          <div className="relative w-content h-2 rounded-full overflow-hidden mt-2">
            <div className="absolute top-0 left-0 h-full w-10 bg-gray-900 animate-loader rounded-full"></div>
          </div>
        </>
      )}
    </div>
  </div>
);

export default Loader;
