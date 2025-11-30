"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/atoms/Button";
import { Droplet, Shield, Truck, Volume2, VolumeX } from "lucide-react";
import { charms } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { Card, CardContent } from "@/components/molecules/Card";

export default function Home() {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Get best seller charms (Cherry, Bow, Boot)
  const bestSellers = charms.filter(
    (charm) =>
      charm.id === "charm-cherry" ||
      charm.id === "charm-bow" ||
      charm.id === "charm-cowboy-boot"
  );

  const toggleMusic = async () => {
    if (!audioRef.current) return;

    try {
      if (isMusicPlaying) {
        audioRef.current.pause();
        setIsMusicPlaying(false);
      } else {
        await audioRef.current.play();
        setIsMusicPlaying(true);
      }
    } catch (error) {
      console.error("Audio file missing or failed to play:", error);
      // Don't crash the app, just log the error
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Video */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Layer 1: Background Video (-z-10) */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>

        {/* Layer 2: Dark Overlay (z-10) */}
        <div className="absolute inset-0 bg-black/40 z-10" />

        {/* Layer 3: Content (z-20) */}
        <div className="relative z-20 container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-white leading-tight drop-shadow-lg">
              Tell Your Story,
              <br />
              One Charm at a Time.
            </h1>
            <p className="text-lg md:text-xl text-white mb-10 max-w-2xl mx-auto drop-shadow-md">
              Handcrafted Italian charms & snake chains. Waterproof & Tarnish-free.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/builder">
                <Button variant="primary" size="lg" className="w-full sm:w-auto px-8 shadow-lg">
                  Start Designing
                </Button>
              </Link>
              <Link href="/products">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto px-8 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 shadow-lg"
                >
                  Shop Collections
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Layer 4: Audio Toggle Button (z-30) */}
        <button
          onClick={toggleMusic}
          className="absolute bottom-8 right-8 z-30 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all shadow-lg"
          aria-label={isMusicPlaying ? "Mute music" : "Play music"}
        >
          {isMusicPlaying ? (
            <Volume2 className="h-6 w-6" />
          ) : (
            <VolumeX className="h-6 w-6" />
          )}
        </button>

        {/* Hidden Audio Element */}
        <audio
          ref={audioRef}
          loop
          src="/background-music.mp3"
          onPlay={() => setIsMusicPlaying(true)}
          onPause={() => setIsMusicPlaying(false)}
          onError={(e) => {
            console.error("Audio file missing or failed to load");
          }}
        />
      </section>

      {/* Features Banner */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-4">
                <Droplet className="h-8 w-8 text-gray-900" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-gray-900">Waterproof</h3>
              <p className="text-sm text-gray-600">
                Wear your necklace anywhere, anytime. Fully waterproof design.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-gray-900" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-gray-900">Hypoallergenic</h3>
              <p className="text-sm text-gray-600">
                Safe for sensitive skin. Premium materials you can trust.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-4">
                <Truck className="h-8 w-8 text-gray-900" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-gray-900">
                Fast Shipping from Istanbul
              </h3>
              <p className="text-sm text-gray-600">
                Direct from our workshop. Quick and secure delivery worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trending / Best Sellers Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-3 text-gray-900">
              Best Sellers
            </h2>
            <p className="text-gray-600">
              Our most loved charms, handpicked by our community
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
            {bestSellers.map((charm) => (
              <Card key={charm.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative aspect-square bg-gray-50 p-6">
                  <img
                    src={charm.image}
                    alt={charm.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <CardContent className="p-4 text-center">
                  <h3 className="font-semibold text-lg mb-2 text-gray-900">{charm.name}</h3>
                  <p className="font-display text-xl font-bold text-gray-900 mb-4">
                    {formatPrice(charm.price)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center">
            <Link href="/products">
              <Button variant="outline" size="lg">
                Shop Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
