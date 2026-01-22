import { Link, useLocation } from "wouter";
import { useState } from "react";
import { Menu, X, Phone, PaintRoller } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const links = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/calculator", label: "Calculator" },
    { href: "/gallery", label: "Gallery" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-border/40">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <PaintRoller className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold font-display text-foreground leading-none">
                Finishing<span className="text-primary">Pro</span>
              </h1>
              <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                Gypsum & Decor
              </p>
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary relative py-1",
                location === link.href ? "text-primary font-semibold" : "text-muted-foreground"
              )}
            >
              {link.label}
              {location === link.href && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-primary"
                />
              )}
            </Link>
          ))}
          <Link href="/contact">
            <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-md shadow-primary/20 flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Get Quote
            </button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-foreground"
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-2">
              {links.map((link) => (
                <Link key={link.href} href={link.href}>
                  <div
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "px-4 py-3 rounded-xl text-base font-medium transition-colors cursor-pointer",
                      location === link.href
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-muted text-muted-foreground"
                    )}
                  >
                    {link.label}
                  </div>
                </Link>
              ))}
              <div className="h-px bg-border my-2" />
              <Link href="/contact">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-full bg-primary text-white px-4 py-3 rounded-xl font-semibold shadow-lg shadow-primary/20"
                >
                  Get a Free Quote
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
