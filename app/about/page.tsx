import Link from "next/link";
import { Button } from "@/components/atoms/Button";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            About Takı Toka
          </h1>
          <p className="text-lg text-gray-600">
            Crafting personalized charm necklaces with love and care
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="font-display text-3xl font-semibold mb-4 text-gray-900">
              Our Story
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Takı Toka was born from a passion for creating meaningful, personalized jewelry 
              that tells your unique story. Each piece is carefully crafted to reflect your 
              personality, memories, and style.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We believe that jewelry should be more than just an accessory—it should be a 
              reflection of who you are and the moments that matter most to you.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-3xl font-semibold mb-4 text-gray-900">
              Handmade in Istanbul
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Every chain and charm in our collection is meticulously handcrafted by skilled 
              artisans in Istanbul, a city with a rich tradition of jewelry making spanning 
              centuries. Our craftspeople bring decades of experience and passion to each 
              piece, ensuring exceptional quality and attention to detail.
            </p>
            <p className="text-gray-700 leading-relaxed">
              By choosing Takı Toka, you're not just buying jewelry—you're supporting a 
              tradition of artisanal craftsmanship and the talented individuals who keep 
              this beautiful art form alive.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-3xl font-semibold mb-4 text-gray-900">
              Sustainable Materials
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We are committed to sustainability and ethical sourcing. All our materials are 
              carefully selected to meet the highest standards of quality while minimizing 
              our environmental impact.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Our chains are made from premium metals that are designed to last a lifetime, 
              and we work with suppliers who share our commitment to ethical and sustainable 
              practices. When you choose Takı Toka, you're making a choice that's good for 
              you and good for the planet.
            </p>
          </section>

          <section>
            <h2 className="font-display text-3xl font-semibold mb-4 text-gray-900">
              Your Personal Touch
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              What makes Takı Toka special is the ability to create something uniquely yours. 
              Our charm builder lets you mix and match chains and charms to create a necklace 
              that's as individual as you are.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Whether you're celebrating a milestone, honoring a memory, or simply expressing 
              your style, we're here to help you create the perfect piece of jewelry that 
              tells your story.
            </p>
          </section>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/builder"
            className="inline-block"
          >
            <Button variant="primary" size="lg">
              Start Building Your Necklace
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

