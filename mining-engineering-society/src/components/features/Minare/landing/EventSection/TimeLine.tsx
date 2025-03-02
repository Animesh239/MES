import { Button } from "@/components/ui/button";
import { UpdateData } from "@/lib/firebase/updateData";
import { easeIn, motion, useScroll } from "framer-motion";
import { RefObject, useEffect, useRef, useState } from "react";
import { getAuth } from "firebase/auth";
import { getDocument } from "@/lib/firebase/dbOperation";
import { events } from "@/config/Minare/landingpagedata";
import {
  initializeAuthListener,
  useAuthStore
} from "@/lib/firebase/authListener";
import { GetUserDetail } from "@/lib/firebase/getUserData";
// import toast from "react-hot-toast";

const Timeline = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [registeredEventsTitle, setRegisteredEventsTitle] = useState<string[]>(
    []
  );
  const [registeredEventIds, setRegisteredEventIds] = useState<number[]>([]);
  const [loadingEventId, setLoadingEventId] = useState<number | null>(null);
  const isLoading = useAuthStore((state) => state.isLoading);

  useEffect(() => {
    initializeAuthListener();

    const fetchUserData = async () => {
      if (!isLoading) {
        const result = await GetUserDetail();
        if (result.success && result.data?.participatedEventTitles) {
          setRegisteredEventsTitle(result.data.participatedEventTitles);
        }
      }
    };

    const updateScreenSize = () => setIsMobile(window.innerWidth < 900);
    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);

    fetchUserData();
    return () => window.removeEventListener("resize", updateScreenSize);
  }, [isLoading]);

  useEffect(() => {
    const registeredIds = events
      .filter((event) => registeredEventsTitle.includes(event.title))
      .map((event) => event.id);

    setRegisteredEventIds(registeredIds);
  }, [registeredEventsTitle]);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef as RefObject<HTMLElement>,
    offset: ["start start", "end end"]
  });

  function xOrientation(index: number) {
    return isMobile ? 100 : index % 2 === 0 ? -100 : 100;
  }

  const eventRegisterationHandler = async (
    eventId: number,
    eventTitle: string
  ) => {
    if (registeredEventIds.includes(eventId)) return;

    setLoadingEventId(eventId);

    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      if (!currentUser?.uid) throw new Error("No user is currently logged in");

      const userData = await getDocument("users", currentUser.uid);
      const previousEvents = userData?.data?.participatedEventTitles || [];

      const updatedEvents = [...previousEvents, eventTitle];

      const reqdResult = await UpdateData({
        participatedEventTitles: updatedEvents
      });

      if (reqdResult.success) {
        setRegisteredEventsTitle(updatedEvents);
      } else {
        console.error("Failed to register:", reqdResult.error);
      }
    } catch (error) {
      console.error("Error registering for event:", error);
    } finally {
      setLoadingEventId(null);
    }
  };

  return (
    <div className="relative min-h-screen overflow-y-hidden">
      <motion.div style={{ scaleX: scrollYProgress }}>
        <div className="fixed top-0 left-0 right-0 h-1 bg-white/20 z-50"></div>
      </motion.div>

      <div className="relative mx-auto max-w-7xl p-4 sm:p-8" ref={containerRef}>
        <div className="absolute lg:left-1/2 left-8 h-full w-0.5 lg:-translate-x-1/2 transform bg-white/30" />

        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: xOrientation(index) }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, type: "tween", ease: easeIn }}
          >
            <div
              className={`flex ${
                !isMobile
                  ? index % 2 === 0
                    ? "lg:justify-start lg:pr-8"
                    : "lg:justify-end lg:pl-8"
                  : "justify-start pl-16"
              } mb-16 relative`}
            >
              <motion.div
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: easeIn }}
              >
                <div
                  className="absolute lg:left-1/2 left-8 -translate-x-1/2 top-6 h-6 w-6 
                    rounded-full border-2 border-white/50 bg-black/80
                    flex items-center justify-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                  >
                    <div className="h-3 w-3 rounded-full bg-white/80"></div>
                  </motion.div>
                </div>
              </motion.div>

              <div className="relative w-full max-w-md">
                <div
                  style={{
                    background:
                      "linear-gradient(180deg, #ffffff 0%, #000000 100%)",
                    boxShadow:
                      "0px 10px 50px rgba(0, 0, 0, 0.3), 0px 5px 15px rgba(0, 0, 0, 0.6)"
                  }}
                  className="w-full min-h-[300px] sm:min-h-[350px] lg:min-h-[416px] 
                    flex flex-col justify-center items-center p-6 
                    text-[20px] sm:text-[24px] font-bold leading-relaxed 
                    break-words text-center rounded-3xl"
                >
                  <h3 className="text-xl font-bold text-white mb-4">
                    {event.title}
                  </h3>
                  <p className="text-base font-normal text-white/60 mb-2">
                    {event.date}
                  </p>
                  <p className="text-sm font-normal text-white/80">
                    {event.description}
                  </p>
                  <Button
                    onClick={() =>
                      eventRegisterationHandler(event.id, event.title)
                    }
                    className={`w-full z-50 mt-7 h-10  font-normal font-roboto text-[#211330] rounded-lg transition-all duration-200 disabled:opacity-50 text-sm sm:text-base`}
                    disabled={
                      registeredEventIds.includes(event.id) ||
                      loadingEventId === event.id
                    }
                  >
                    {registeredEventIds.includes(event.id)
                      ? "Registered"
                      : loadingEventId === event.id
                      ? "Registering..."
                      : "Register"}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
