export const Header = ({ label }: { label: string }) => {
  return (
    <>
      <h2
        className={`font-orbitron text-3xl md:text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 drop-shadow-[0_0_2px_rgba(255,255,255,0.3)]`}
      >
        {label}
      </h2>
    </>
  );
};
