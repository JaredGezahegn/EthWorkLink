import { useState, useEffect } from "react";

const blueCollarImages = [
  "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=3840&auto=format&fit=crop", // Construction worker
  "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=3840&auto=format&fit=crop", // Electrician
  "https://images.unsplash.com/photo-1621905251918-48416bd8575a?q=80&w=3840&auto=format&fit=crop", // Plumber
  "https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?q=80&w=3840&auto=format&fit=crop", // Welder
  "https://images.unsplash.com/photo-1513828583688-c52646db42da?q=80&w=3840&auto=format&fit=crop", // Carpenter
];

export function AnimatedBackground() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % blueCollarImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0">
      {blueCollarImages.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-30" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${image})`,
          }}
        />
      ))}
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-sidebar/80 via-sidebar/70 to-primary/80" />
    </div>
  );
}

