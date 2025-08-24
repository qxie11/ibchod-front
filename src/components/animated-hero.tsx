export const AnimatedHero: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white">
      {/* Static Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700"></div>

      {/* Static overlay */}

      {children}
    </section>
  );
};
