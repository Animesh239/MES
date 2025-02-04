export const YoutubeVideo = () => {
  return (
    <>
      <div className="relative w-full aspect-video rounded-lg border-4 border-white/[0.05] shadow-lg overflow-hidden">
        <iframe
          className="w-full h-full border-none"
          allow="autoplay"
          src="https://www.youtube.com/embed/TJB7rRN-4Hc"
          title="videolabone"
        ></iframe>
      </div>
    </>
  );
};
