// Timeline.tsx
import { Button } from "@/components/ui/button";
import { UpdateData } from "@/lib/firebase/updateData";
import { easeIn, motion, useScroll } from "framer-motion";
import { RefObject, useEffect, useRef, useState } from "react";
import { getAuth } from "firebase/auth";
import { getDocument } from "@/lib/firebase/dbOperation";
import { events } from "@/config/Minare/landingpagedata";
import {
  initializeAuthListener,
  useAuthStore,
} from "@/lib/firebase/authListener";
import { GetUserDetail } from "@/lib/firebase/getUserData";
import toast from "react-hot-toast";
import Image from "next/image";
import { RulesDialog } from "../HeroSection/rulesAndRegulation";

export const Timeline = () => {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [registeredEventsTitle, setRegisteredEventsTitle] = useState<string[]>(
    []
  );
  const [registeredEventIds, setRegisteredEventIds] = useState<number[]>([]);
  const [loadingEventId, setLoadingEventId] = useState<number | null>(null);
  const isLoading = useAuthStore((state) => state.isLoading);
  const [isLogin, setislogin] = useState(false);
  const [selectedEventTitle, setSelectedEventTitle] = useState<string>("");

  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    const updateScreenSize = () => setIsMobile(window.innerWidth < 600);
    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  const toggleDescription = (sectionId: number) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const truncateDescription = (text: string, sectionId: number) => {
    const words = text.split(" ");
    const isExpanded = expandedSections[sectionId];

    if (isExpanded) return text;

    const truncatedText = words.slice(0, 20).join(" ");
    return words.length > 20 ? `${truncatedText}...` : truncatedText;
  };

  useEffect(() => {
    initializeAuthListener();

    const fetchUserData = async () => {
      if (!isLoading) {
        const result = await GetUserDetail();
        if (result.success && result.data?.participatedEventTitles) {
          setRegisteredEventsTitle(result.data.participatedEventTitles);
          setislogin(true);
        }
      }
    };

    fetchUserData();
  }, [isLoading]);

  useEffect(() => {
    const registeredIds = events
      .filter((event) => registeredEventsTitle.includes(event.title))
      .map((event) => event.id);

    setRegisteredEventIds(registeredIds);
  }, [registeredEventsTitle]);

  const handleOpenRules = (title: string) => {
    setSelectedEventTitle(title);
    setOpen(true);
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef as RefObject<HTMLElement>,
    offset: ["start start", "end end"],
  });

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
        participatedEventTitles: updatedEvents,
      });

      if (reqdResult.success) {
        setRegisteredEventsTitle(updatedEvents);
      } else {
        console.error("Failed to register:", reqdResult.error);
      }
    } catch (error) {
      console.error("Error registering for event:", error);
      if (!isLogin) toast("Register before Registering for an Event");
    } finally {
      setLoadingEventId(null);
    }
  };

  return (
    <div className="relative min-h-screen overflow-y-hidden">
      <motion.div style={{ scaleX: scrollYProgress }}>
        <div className="fixed top-0 left-0 right-0 h-1 bg-white/20 z-50"></div>
      </motion.div>

      <div
        className="relative mx-auto max-w-7xl p-0 xxsm:p-8"
        ref={containerRef}
      >
        <div className="absolute lg:left-1/2 left-3 xxsm:left-8 h-full w-0.5 lg:-translate-x-1/2 transform bg-white/30" />

        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
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
                  // style={{
                  //   background:
                  //     "linear-gradient(180deg, #ffffff 0%, #000000 100%)",
                  //   boxShadow:
                  //     "-10px 10px 50px rgba(0, 0, 0, 0.3), 0px 5px 15px rgba(0, 0, 0, 0.6)"
                  // }}
                  className="w-full h-auto bg-white/10
                    flex flex-col justify-end gap-3 items-center p-3 xxsm:p-6 sm:pb-10
                    text-[20px] sm:text-[24px] font-roboto font-bold leading-relaxed 
                    break-words text-center rounded-xl "
                >
                  <div className="w-full h-56  md:h-80 relative">
                    <Image
                      src={event.imgurl}
                      alt="event image"
                      layout="fill"
                      className="z-20 rounded-xl hover:scale-105 duration-300 cursor-pointer"
                    />
                  </div>

                  <h3 className="text-xl font-bold text-white ">
                    {event.title}
                  </h3>

                  <div className="text-base font-normal text-center text-white/80">
                    {isMobile ? (
                      <>
                        {truncateDescription(event.description, event.id)}
                        {event.description.split(" ").length > 42 && (
                          <button
                            onClick={() => toggleDescription(event.id)}
                            className=" text-white/30 hover:text-white/50 transition-colors"
                          >
                            {expandedSections[event.id]
                              ? "Show Less"
                              : "Show More"}
                          </button>
                        )}
                      </>
                    ) : (
                      event.description
                    )}
                  </div>

                  <div className="w-full mt-2 flex flex-col sm:flex-row gap-3 sm:gap-5">
                    <Button
                      onClick={() =>
                        eventRegisterationHandler(event.id, event.title)
                      }
                      className={`w-full z-50  h-10 font-normal font-roboto text-[#211330] rounded-lg transition-all duration-200 disabled:opacity-50 text-sm sm:text-base`}
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
                    <Button
                      variant="default"
                      onClick={() => handleOpenRules(event.title)}
                      className={`w-full z-50 mb-0 h-10 font-normal font-roboto text-white bg-white/[0.05] border-white border-[2px] rounded-lg transition-all hover:bg-white hover:text-black duration-200 disabled:opacity-50 text-sm sm:text-base`}
                    >
                      Rules
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <RulesDialog title={selectedEventTitle} open={open} setOpen={setOpen} />
    </div>
  );
};
