import { Layout } from "@/components/Layout";
import { useServices } from "@/hooks/use-services";
import { ServiceCard } from "@/components/ServiceCard";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

export default function Services() {
  const { data: services, isLoading } = useServices();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <Layout>
      <div className="bg-muted/30 py-16">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold font-display text-foreground mb-6">
            Our Premium Services
          </h1>
          <p className="text-lg text-muted-foreground">
            Explore our range of professional finishing services designed to elevate your residential or commercial space.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-[450px] rounded-2xl overflow-hidden">
                <Skeleton className="h-full w-full" />
              </div>
            ))}
          </div>
        ) : (
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services?.map((service) => (
              <motion.div key={service.id} variants={item} className="h-full">
                <ServiceCard service={service} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </Layout>
  );
}
