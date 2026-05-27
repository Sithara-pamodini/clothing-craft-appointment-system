import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="w-full">
        {children}
      </main>
    </div>
  );
}

export default Layout;