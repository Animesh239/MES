import Image from "next/image";
import { getUpcomingMinareEvents } from "@/actions/minare/events/action";
import ComingSoon from "@/components/ui/ComingSoon";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function MinareUpcomingEvents() {
  const response = await getUpcomingMinareEvents();
  const upcomingEvents = response.success && response.data ? response.data : [];

  // If no upcoming events, show coming soon
  if (upcomingEvents.length === 0) {
    return <ComingSoon />;
  }

  return (
    <div className="min-h-screen p-4 pt-24 bg-gradient-to-b from-black/0 via-black/5 to-black/0">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/70 tracking-tight">
            Upcoming Minare Events
          </h1>
          <div className="h-1 w-24 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-full" />
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingEvents.map((event) => {
            const displayImage =
              event.imageLinks &&
              event.imageLinks.length > 0 &&
              event.imageLinks[0]
                ? event.imageLinks[0]
                : null;

            return (
              <div
                key={event.id}
                className="group h-[500px] w-full [perspective:1000px]"
              >
                <div className="relative h-full w-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] rounded-3xl shadow-xl">
                  {/* Front Face */}
                  <div className="absolute inset-0 h-full w-full [backface-visibility:hidden] rounded-3xl overflow-hidden bg-gray-900 border border-gray-800">
                    <div className="relative h-full w-full">
                      {displayImage ? (
                        <Image
                          src={displayImage}
                          alt={event.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-gray-900 to-blue-900/50 flex items-center justify-center">
                          <h3 className="text-4xl font-bold text-white/10 tracking-widest uppercase rotate-45 select-none">
                            Minare
                          </h3>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                      <div className="absolute bottom-0 left-0 right-0 p-8 transform transition-transform duration-300 group-hover:translate-y-4">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="px-3 py-1 rounded-full bg-purple-500/80 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider shadow-lg">
                            {event.participationType || "Event"}
                          </span>
                          {event.prizePool && (
                            <span className="px-3 py-1 rounded-full bg-yellow-500/80 backdrop-blur-md text-black text-xs font-bold uppercase tracking-wider shadow-lg">
                              Prize: {event.prizePool}
                            </span>
                          )}
                        </div>
                        <h3 className="text-3xl font-bold text-white leading-tight">
                          {event.title}
                        </h3>
                        <div className="mt-4 flex items-center text-gray-300 text-sm font-medium">
                          <span className="flex items-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2 animate-pulse"></span>
                            Hover for details
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Back Face */}
                  <div className="absolute inset-0 h-full w-full [transform:rotateY(180deg)] [backface-visibility:hidden] rounded-3xl overflow-hidden bg-black/95 border border-purple-500/30 p-8 flex flex-col">
                    <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 pointer-events-none"></div>
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>

                    <div className="relative z-10 flex flex-col h-full">
                      <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-6">
                        {event.title}
                      </h3>

                      <div className="flex-1 overflow-y-auto pr-2 scrollbar-hide">
                        <p className="text-gray-300 leading-relaxed text-base">
                          {event.description || "No description available yet."}
                        </p>
                      </div>

                      <div className="mt-6 pt-6 border-t border-gray-800 space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-500 text-sm uppercase tracking-wider font-semibold">
                            Prize Pool
                          </span>
                          <span className="text-xl font-bold text-yellow-400 font-mono">
                            {event.prizePool || "TBA"}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-500 text-sm uppercase tracking-wider font-semibold">
                            Type
                          </span>
                          <span className="text-white font-medium">
                            {event.participationType || "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
