import FormField from "src/shared/components/FormField";

const Login = () => {
  return (
    <>
      <FormField
        name="email"
        placeholder="name@company.com"
        type="email"
        label="Your email"
      />
      <FormField
        label={"Password"}
        name={"password"}
        type={"password"}
        placeholder={"••••••••"}
      />
      <div className="flex items-center justify-between">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="remember"
              aria-describedby="remember"
              type="checkbox"
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
              required=""
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="remember" className="text-gray-500">
              Remember me
            </label>
          </div>
        </div>
        <a
          href="#asdf"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          Forgot password?
        </a>
      </div>
      <button
        type="submit"
        className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        Sign in
      </button>
      <p className="text-sm font-light text-gray-500">
        Don't have an account yet?{" "}
        <a href="#wef" className="font-medium text-blue-600 hover:underline">
          Sign up
        </a>
      </p>
    </>
  );
};

export default Login;
