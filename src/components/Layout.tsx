import { ReactNode } from "react";
import { Navigation } from "./Navigation";
import { PaintRoller, MapPin, Phone, Mail } from "lucide-react";
import { Link } from "wouter";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background font-body">
      <Navigation />
      <main className="flex-1">
        {children}
      </main>
      <footer className="bg-foreground text-white pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                  <PaintRoller className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-display leading-none">
                    Finishing<span className="text-primary">Pro</span>
                  </h3>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Transforming spaces with precision gypsum, painting, and decoration services. Quality finish, every time.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold font-display text-lg mb-4 text-white">Services</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/services" className="hover:text-primary transition-colors">Gypsum Works</Link></li>
                <li><Link href="/services" className="hover:text-primary transition-colors">Interior Painting</Link></li>
                <li><Link href="/services" className="hover:text-primary transition-colors">Decoration</Link></li>
                <li><Link href="/calculator" className="hover:text-primary transition-colors">Cost Calculator</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold font-display text-lg mb-4 text-white">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/gallery" className="hover:text-primary transition-colors">Our Work</Link></li>
                <li><Link href="/contact" className="hover:text-primary transition-colors">Get a Quote</Link></li>
                <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold font-display text-lg mb-4 text-white">Contact</h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary shrink-0" />
                  <span>Kotebe 02, Addis Ababa</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary shrink-0" />
                  <a href="tel:0965810083" className="hover:text-primary transition-colors">0965810083</a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary shrink-0" />
                  <a href="mailto:dd0710302@gmail.com" className="hover:text-primary transition-colors">dd0710302@gmail.com</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500">
            <p>&copy; {new Date().getFullYear()} FinishingPro. All rights reserved.</p>
            <p>Designed with precision.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
