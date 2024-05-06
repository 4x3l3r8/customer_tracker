
import { UserCard } from "@/components/UserCard";
import { CreatePost } from "@/components/create-post";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import Link from "next/link";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await getServerAuthSession();

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-2xl font-bold text-gray-800">Customer Manager</h1>
            </div>
            <UserCard />
          </div>
        </div>
      </nav>

      {/* Jumbotron */}
      <div className="bg-primary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
              Manage Your Customers Effortlessly
            </h2>
            <p className="max-w-xl mt-5 mx-auto text-xl text-gray-200">
              Our powerful customer management application lets you track and visualize your customers&apos; data, including their locations on a map.
            </p>
            <div className="mt-10">
              <Link
                href="/signin"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Key Features</h2>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800">Customer Data Management</h3>
              <p className="mt-2 text-gray-600">Easily store and manage customer data in a centralized location.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800">Location Tracking</h3>
              <p className="mt-2 text-gray-600">Visualize your customers&apos; locations on an interactive map.</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800">Analytics and Reporting</h3>
              <p className="mt-2 text-gray-600">Generate reports and gain valuable insights into your customer base.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

async function CrudShowcase() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const secretMessage = await api.post.getSecretMessage();

  return (
    <div className="w-full max-w-xs">
      {secretMessage ? (
        <p className="truncate">Your secret message: {secretMessage}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}

      <CreatePost />
    </div>
  );
}
