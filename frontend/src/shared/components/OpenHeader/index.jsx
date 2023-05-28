import { Link } from "react-router-dom";

import logo from "src/shared/assets/logo.png";
import stateUrls from "src/shared/constants/StateUrls";

const OpenHeader = () => {
  return (
    <div className="w-full">
      <nav className="px-4 md:px-8 py-3 bg-gray-100 flex justify-between items-center space-x-4">
        <Link to={stateUrls.HOME} className="inline-block ">
          <img className="h-12" src={logo} alt="KIET Online Exchange" />
        </Link>
      </nav>
    </div>
  );
};

export default OpenHeader;
