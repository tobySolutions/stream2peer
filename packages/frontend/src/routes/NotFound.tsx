import { Link } from "react-router-dom";
import AppIcon from "../lib/icons/AppIcon";

export default function NotFound() {
  return (
    <div className="bg-black">
      <div className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <AppIcon />
        </div>
        <div className="max-w-md w-full space-y-8 text-center">
          <div className="space-y-4">
            <h1 className="text-9xl font-extrabold text-primary-white">404</h1>
            <h2 className="text-4xl font-bold text-yellow-dark-12">
              Page Not Found
            </h2>
            <p className="text-xl text-yellow-dark-12">
              Oops! The page you are looking for doesn't exist or has been
              moved.
            </p>
          </div>
          <div className="mt-8">
            <Link
              to="https://stream2peer.on-fleek.app/"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              Go back home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
