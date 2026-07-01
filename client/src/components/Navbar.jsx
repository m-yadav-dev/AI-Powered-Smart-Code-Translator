import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
const Navbar = () => {
  const { authUser, logoutUser } = useAuthStore();
  return (
    <header className="border-b border-slate-200/80 bg-white/90 backdrop-blur-sm shadow-[0_8px_30px_rgb(15,23,42,0.04)]">
      <div className=" flex max-w-7xl items-center justify-between  gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-lg font-semibold tracking-tight text-slate-900 transition-colors hover:text-slate-700 sm:text-xl"
          >
            CodeTranslator
          </Link>
        </div>
        <nav className="flex items-center gap-1 rounded-full bg-slate-100 p-1">
          <Link
            to="/"
            className="rounded-full px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-white hover:text-slate-950"
          >
            Editor
          </Link>
          <Link
            to="/history"
            className="rounded-full px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-white hover:text-slate-950"
          >
            History
          </Link>
        </nav>

        <div className="flex items-center gap-3 sm:gap-4">
          {authUser?.picture && (
            <img
              src={authUser.picture}
              className="h-10 w-10 rounded-full border border-slate-200 object-cover shadow-sm"
              alt="Profile"
            />
          )}
          <span className="hidden text-sm font-medium text-slate-700 sm:block">
            {authUser?.name}
          </span>
          <button
            onClick={logoutUser}
            className="rounded-full border cursor-pointer border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
