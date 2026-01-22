import { Layout } from "@/components/Layout";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useServices } from "@/hooks/use-services";
import { ServiceCard } from "@/components/ServiceCard";
import { Skeleton } from "@/components/ui/skeleton";
import { BookingForm } from "@/components/BookingForm";

export default function Home() {
  const { data: services, isLoading } = useServices();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-foreground py-20 lg:py-32">
        {/* Abstract shapes/gradient background */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/20 to-transparent pointer-events-none opacity-50" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur border border-white/20 text-primary-foreground font-semibold text-sm mb-6">
                Premium Finishing Services in Ethiopia
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display text-white leading-tight mb-6">
                We Bring Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  Interior Vision
                </span>{" "}
                to Life
              </h1>
              <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-xl leading-relaxed">
                Expert gypsum work, flawless painting, and modern decoration services.
                Get professional quality for your home or office.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/calculator">
                  <button className="px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2">
                    Get Price Estimate
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
                <Link href="/gallery">
                  <button className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/20 text-white rounded-xl font-bold text-lg transition-all flex items-center justify-center">
                    View Our Work
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground mb-4">
              Our Expertise
            </h2>
            <p className="text-muted-foreground text-lg">
              We specialize in transforming spaces with high-quality materials and skilled craftsmanship.
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-[400px] rounded-2xl overflow-hidden">
                  <Skeleton className="h-full w-full" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services?.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-primary rounded-3xl transform rotate-3 opacity-10"></div>
              {/* construction worker painting wall */}
              <img
                src="/images/home-hero.jpg"
                alt="Professional Painting and Finishing"
                className="relative rounded-3xl shadow-2xl object-cover aspect-[4/3]"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border border-border max-w-xs hidden md:block">
                <div className="flex items-center gap-1 text-yellow-500 mb-2">
                  <Star className="fill-current w-5 h-5" />
                  <Star className="fill-current w-5 h-5" />
                  <Star className="fill-current w-5 h-5" />
                  <Star className="fill-current w-5 h-5" />
                  <Star className="fill-current w-5 h-5" />
                </div>
                <p className="font-bold text-foreground">"Best finishing work in Addis!"</p>
              </div>
            </div>

            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground">
                Why Choose FinishingPro?
              </h2>
              <p className="text-lg text-muted-foreground">
                We take pride in our attention to detail and commitment to customer satisfaction. 
                Your space deserves the best finishing touch.
              </p>

              <ul className="space-y-4">
                {[
                  "Experienced and professional team",
                  "High-quality materials sourced reliably",
                  "Transparent pricing with no hidden costs",
                  "Timely project completion",
                  "Modern designs and techniques"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    </div>
                    <span className="font-medium text-foreground">{item}</span>
                  </li>
                ))}
              </ul>

              <Link href="/contact">
                <button className="bg-foreground text-white px-8 py-3 rounded-xl font-bold hover:bg-foreground/90 transition-colors">
                  Contact Us Today
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white text-center px-4">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-6">
            Ready to Transform Your Space?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
            Use our calculator to get an instant estimate for your project needs.
          </p>
          <Link href="/calculator">
            <button className="bg-white text-primary px-10 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
              Try Cost Calculator
            </button>
          </Link>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground mb-4">
              Book a Service
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Ready to start your project? Fill out the form below and our team will get back to you with a personalized quote.
            </p>
          </div>
          <BookingForm />
        </div>
      </section>
    </Layout>
  );
}
