import './App.css';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="username">
              {' '}
              Username
            </label>
            <input
              className="w-full px-3 py-2 border rounded"
              type="text"
              id="username"
              name="username"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              {' '}
              Password
            </label>
            <input
              className="w-full px-3 py-2 border rounded"
              type="password"
              id="password"
              name="password"
            />
          </div>
          <button
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            type="submit"
          >
            {' '}
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
