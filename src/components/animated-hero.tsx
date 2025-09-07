export const AnimatedHero: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <section className="apple-music-hero text-white flex items-center">
      {/* Floating Particles */}
      <div className="apple-music-particles">
        <div className="apple-music-particle"></div>
        <div className="apple-music-particle"></div>
        <div className="apple-music-particle"></div>
        <div className="apple-music-particle"></div>
        <div className="apple-music-particle"></div>
        <div className="apple-music-particle"></div>
      </div>

      {/* Content */}
      <div className="w-full">{children}</div>
    </section>
  );
};
