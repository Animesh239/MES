import { easeIn, motion } from "framer-motion";

interface VerticalLineProps {
  leftPosition?: string;
  delay?: string;
  topPostion?: string;
}
export const VerticalLine = ({
  leftPosition,
  delay,
  topPostion
}: VerticalLineProps) => {
  return (
    <motion.div
      initial={{
        backgroundSize: "2px 10px",
        backgroundRepeat: "repeat-y"
      }}
      animate={{
        height: ["0%", "100%"],
        backgroundImage: [
          "linear-gradient(to bottom, gray 50%, transparent 50%)"
        ],
        opacity: 0.4
      }}
      transition={{
        backgroundImage: { delay: 1, duration: 0.5, easeIn },
        height: { duration: 1.4, delay: delay },
        ease: "easeInOut"
      }}
      style={{
        width: 1,
        position: "absolute",
        left: `${leftPosition}`,
        top: `${topPostion}`
      }}
    ></motion.div>
  );
};
