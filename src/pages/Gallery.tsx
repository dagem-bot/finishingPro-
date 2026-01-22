import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";

// Using dynamic images
const GALLERY_IMAGES = [
  { id: 1, category: "Gypsum Board", url: "/images/gypsum-1.jpg", title: "Gypsum Board" },
  { id: 2, category: "Gypsum Board", url: "/images/gypsum-2.jpg", title: "Gypsum Board" },
  { id: 3, category: "Gypsum Board", url: "/images/gypsum-3.jpg", title: "Gypsum Board" },
  { id: 4, category: "Gypsum Board", url: "/images/gypsum-wall-chak.webp", title: "Gypsum wall chak" },
  { id: 5, category: "Painting", url: "/images/painting-1.avif", title: "Professional Wall Painting & Finishing" },
  { id: 6, category: "Painting", url: "/images/painting-2.avif", title: "Professional Wall Painting & Finishing" },
];

export default function Gallery() {
  return (
    <Layout>
      <div className="bg-muted/30 py-16">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold font-display text-foreground mb-6">
            Our Portfolio
          </h1>
          <p className="text-lg text-muted-foreground">
            A showcase of our finest work in gypsum, painting, and decoration.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_IMAGES.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all"
            >
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-primary font-bold text-xs uppercase tracking-wider mb-2 bg-white/20 backdrop-blur w-fit px-2 py-1 rounded">
                  {item.category}
                </span>
                <h3 className="text-white font-display font-bold text-xl">{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
