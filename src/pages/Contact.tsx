import { Layout } from "@/components/Layout";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <Layout>
      <div className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-bold font-display text-foreground mb-6">
                Get in Touch
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Ready to start your project? Contact us for a free consultation and quote.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {/* Call Card */}
              <motion.a
                href="tel:0965810083"
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-3xl border border-border shadow-lg shadow-primary/5 hover:shadow-xl hover:border-primary/50 transition-all group text-center"
              >
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                  <Phone className="w-8 h-8 text-primary group-hover:text-white" />
                </div>
                <h2 className="text-2xl font-bold font-display mb-2">Call Us Now</h2>
                <p className="text-muted-foreground mb-6">Immediate assistance for your project</p>
                <div className="text-3xl font-bold text-primary font-mono">0965810083</div>
              </motion.a>

              {/* WhatsApp Card */}
              <motion.a
                href="https://wa.me/251965810083"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5 }}
                className="bg-[#25D366]/10 p-8 rounded-3xl border border-[#25D366]/20 shadow-lg shadow-[#25D366]/5 hover:shadow-xl hover:border-[#25D366]/50 transition-all group text-center"
              >
                <div className="w-16 h-16 mx-auto bg-[#25D366]/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                  <MessageCircle className="w-8 h-8 text-[#25D366] group-hover:text-white" />
                </div>
                <h2 className="text-2xl font-bold font-display mb-2 text-foreground">Chat on WhatsApp</h2>
                <p className="text-muted-foreground mb-6">Send us photos or message us anytime</p>
                <div className="inline-block bg-[#25D366] text-white font-bold px-8 py-3 rounded-xl shadow-lg shadow-[#25D366]/20">
                  Open WhatsApp
                </div>
              </motion.a>
            </div>

            <div className="bg-muted/30 rounded-3xl p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold font-display">Office Location</h3>
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <p className="font-bold text-lg">FinishingPro HQ</p>
                      <p className="text-muted-foreground">Kotebe 02</p>
                      <p className="text-muted-foreground">Addis Ababa, Ethiopia</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <p className="font-bold text-lg">Email Us</p>
                      <a href="mailto:dd0710302@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">dd0710302@gmail.com</a>
                    </div>
                  </div>
                </div>

                {/* Google Map Embedded */}
                <div className="h-80 bg-gray-200 rounded-2xl overflow-hidden relative border border-border">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.5034604555816!2d38.7831!3d9.0016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85cef5ab402d%3A0x8467b6b037a24d40!2sBole%2C%20Addis%20Ababa!5e0!3m2!1sen!2set!4v1705574400000!5m2!1sen!2set"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Office Location"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
