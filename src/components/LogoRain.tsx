import { useEffect, useState } from "react";

interface RainDrop {
  id: number;
  left: number;
  animationDuration: number;
  animationDelay: number;
  size: number;
  opacity: number;
}

interface BouncingLogo {
  id: number;
  left: number;
  top: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
}

const LogoRain = () => {
  const [rainDrops, setRainDrops] = useState<RainDrop[]>([]);
  const [bouncingLogos, setBouncingLogos] = useState<BouncingLogo[]>([]);

  useEffect(() => {
    // Create 20 bigger logo rain drops
    const drops: RainDrop[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100, // Random position across screen width
      animationDuration: Math.random() * 4 + 5, // 5-9 seconds fall time
      animationDelay: Math.random() * 8, // 0-8 seconds delay
      size: Math.random() * 60 + 50, // 50-110px size (much bigger)
      opacity: Math.random() * 0.4 + 0.2, // 0.2-0.6 opacity
    }));

    // Create 8 bouncing logos
    const bouncing: BouncingLogo[] = Array.from({ length: 8 }, (_, i) => ({
      id: i + 100,
      left: Math.random() * 80 + 10, // Keep away from edges
      top: Math.random() * 60 + 20, // Keep in middle area
      size: Math.random() * 40 + 35, // 35-75px size
      opacity: Math.random() * 0.3 + 0.15, // 0.15-0.45 opacity
      duration: Math.random() * 3 + 2, // 2-5 seconds bounce
      delay: Math.random() * 4, // 0-4 seconds delay
    }));

    setRainDrops(drops);
    setBouncingLogos(bouncing);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {/* Central Rotating Watermark */}
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src="/lovable-uploads/fa8c1598-094b-41c9-94da-4e5dff4aecfe.png"
          alt="PECALI Watermark"
          className="w-96 h-auto opacity-5 animate-spin"
          loading="lazy"
          decoding="async"
          style={{
            animation: "spin 20s linear infinite",
            filter: "brightness(0.6) contrast(1.5)",
          }}
        />
      </div>

      {/* Falling Logo Rain */}
      {rainDrops.map((drop) => (
        <div
          key={drop.id}
          className="absolute animate-fade-in"
          style={{
            left: `${drop.left}%`,
            top: "-150px",
            animationName: "logoFall",
            animationDuration: `${drop.animationDuration}s`,
            animationDelay: `${drop.animationDelay}s`,
            animationIterationCount: "infinite",
            animationTimingFunction: "linear",
          }}
        >
          <img
            src="/lovable-uploads/fa8c1598-094b-41c9-94da-4e5dff4aecfe.png"
            alt="PECALI Logo Rain"
            loading="lazy"
            decoding="async"
            style={{
              width: `${drop.size}px`,
              height: "auto",
              filter: "brightness(0.7) contrast(1.3) drop-shadow(0 0 10px rgba(59, 130, 246, 0.3))",
              transform: `rotate(${Math.random() * 40 - 20}deg)`,
              opacity: drop.opacity,
            }}
            className="hover:scale-110 transition-transform duration-200"
          />
        </div>
      ))}

      {/* Bouncing Logos */}
      {bouncingLogos.map((logo) => (
        <div
          key={logo.id}
          className="absolute"
          style={{
            left: `${logo.left}%`,
            top: `${logo.top}%`,
            animationName: "logoBounce",
            animationDuration: `${logo.duration}s`,
            animationDelay: `${logo.delay}s`,
            animationIterationCount: "infinite",
            animationTimingFunction: "ease-in-out",
          }}
        >
          <img
            src="/lovable-uploads/fa8c1598-094b-41c9-94da-4e5dff4aecfe.png"
            alt="PECALI Bouncing Logo"
            loading="lazy"
            decoding="async"
            style={{
              width: `${logo.size}px`,
              height: "auto",
              filter: "brightness(0.8) contrast(1.2) drop-shadow(0 0 15px rgba(245, 158, 11, 0.4))",
              opacity: logo.opacity,
            }}
            className="hover:scale-125 transition-transform duration-300"
          />
        </div>
      ))}
    </div>
  );
};

export default LogoRain;