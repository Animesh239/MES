interface labelProps {
  label: string;
}

export const HeadingText = ({ label }: labelProps) => {
  return (
    <div
      style={{
        background: "linear-gradient( #333,#eee)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent"
      }}
      className="text-5xl xxsm:text-6xl xsm:text-6xl sm:text-7xl overflow-visible text-center py-3 sm:py-5 leading-normal sm:leading-relaxed  font-[900]"
    >
      {label}
    </div>
  );
};

export const SubHeadingText = ({ label }: labelProps) => {
  const wordsArr = label.split(" ");

  const highlightWords = [
    "innovation,",
    "collaboration,",
    "knowledge",
    "NIT",
    "Rourkela"
  ];

  return (
    <div className="text-lg xxsm:text-xl xsm:text-2xl sm:text-3xl flex gap-2 flex-wrap justify-center xsm:text-center py-2 xsm:py-5 w-full sm:w-[80%] font-[500] leading-snug sm:leading-normal">
      {wordsArr.map((word, index) => (
        <div
          style={{
            color: !highlightWords.includes(word) ? "gray" : "white"
          }}
          key={index}
        >
          {word}
        </div>
      ))}
    </div>
  );
};
