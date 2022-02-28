import Dashboard from "./dashboard";
import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import Header from "./Header";

export default function DashboardHome() {
  const data = {
    emoji: "📰",
    reactionCount: 5,
    rewardAmount: 5,
    channelName: "member-curated",
  };
  return (
    <>
      <Dashboard>
        <form className="mx-auto">
          <div className="mx-auto">
            <div className="pt-8">
              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="emoji"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Emoji
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="emoji"
                      id="emoji"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      defaultValue={data.emoji}
                    />
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <label
                    htmlFor="reactionCount"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Reaction threshold
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      name="reactionCount"
                      id="reactionCount"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      defaultValue={data.reactionCount}
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="rewardAmount"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Reward amount
                  </label>
                  <div className="mt-1">
                    <input
                      id="rewardAmount"
                      name="rewardAmount"
                      type="number"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      defaultValue={data.rewardAmount}
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Channel name
                  </label>
                  <div className="mt-1">
                    <input
                      id="channelName"
                      name="channelName"
                      type="text"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      defaultValue={data.channelName}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-5">
            <div className="flex justify-end">
              <button
                type="button"
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </Dashboard>
    </>
  );
}
