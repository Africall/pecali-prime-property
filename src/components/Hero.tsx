import heroImage from "@/assets/hero-luxury-properties.jpg";

const Hero = () => {

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Luxury Properties"
          className="w-full h-full object-cover"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 via-primary/70 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-16">
        <div className="max-w-4xl mx-auto text-center text-white">
          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6 animate-slide-up leading-tight">
            <span className="block">Discover Modern Living</span>
            <span className="bg-gradient-gold bg-clip-text text-transparent block"> at Its Best </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            Your Gateway to Premium Properties and Investment Opportunities
          </p>

        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute bottom-10 left-10 w-20 h-20 bg-accent/20 rounded-full animate-float hidden lg:block"></div>
      <div className="absolute top-1/3 right-20 w-16 h-16 bg-primary/20 rounded-full animate-float hidden lg:block" style={{ animationDelay: "1s" }}></div>
    </section>
  );
};

export default Hero;