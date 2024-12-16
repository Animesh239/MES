import { easeIn, motion } from "framer-motion";

interface HorizontalLineProps {
  topPostion?: string;
  delay?: number;
}

export const HorizontalLine = ({ topPostion, delay }: HorizontalLineProps) => {
  return (
    <motion.div
      initial={{
        backgroundSize: "10px 2px",
        backgroundRepeat: "repeat-x"
      }}
      animate={{
        backgroundImage: [
          "linear-gradient(to right, gray 50%, transparent 50%)"
        ],
        opacity: 0.4,
        width: ["0%", "100%"]
      }}
      transition={{
        backgroundImage: { delay: 1, duration: 0.5, easeIn },
        width: { duration: 1.4, delay: delay }
        // ease: "easeInOut"
      }}
      style={{
        height: 1,
        position: "absolute",
        top: topPostion || "0"
      }}
    />
  );
};
