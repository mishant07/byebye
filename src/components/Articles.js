import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Clock, ArrowUpRight } from 'lucide-react';

const articles = [
  {
    title: 'Architecting 100% Offline AI Search with Local Vector Embeddings',
    readTime: '8 min read',
    image: '/images/articles/pagination component in reactjs.jpg',
    description:
      'How to build zero-latency semantic search that runs entirely on-device, parsing documents and indexing local files without third-party cloud leakage.',
    tag: 'Offline AI & Privacy',
    url: '#projects',
  },
  {
    title: 'Multimodal Retail Intelligence with Google Gemini Vision API',
    readTime: '9 min read',
    image: '/images/articles/create loading screen in react js.jpg',
    description:
      'Step-by-step pipeline for auto-extracting SKU attributes, catalog metadata, and automated price scraping cross-referencing Amazon and Flipkart.',
    tag: 'Gemini Multimodal',
    url: '#projects',
  },
  {
    title: 'Zero-Internet SOS Protocols: Engineering Low-Latency Emergency Mesh Systems',
    readTime: '10 min read',
    image: '/images/articles/form validation in reactjs using custom react hook.png',
    description:
      'How our winning Solve For Her architecture triggers under-5-second emergency dispatches across network-dead zones using P2P mesh and SMS triggers.',
    tag: 'Hackathon Champion',
    url: '#projects',
  },
  {
    title: 'High-Throughput Microservices with FastAPI, Pydantic & Uvicorn',
    readTime: '7 min read',
    image: '/images/articles/smooth scrolling in reactjs.png',
    description:
      'Architecting asynchronous Python backends with strict type validation, async session pooling, and instant OpenAPI documentation.',
    tag: 'FastAPI & Backend',
    url: '#projects',
  },
  {
    title: 'Rapid Hackathon Prototyping: React 19, Tailwind CSS & Vite',
    readTime: '6 min read',
    image: '/images/articles/create modal component in react using react portals.png',
    description:
      'Lessons learned from securing 1st and 2nd place in competitive hackathons: scaffolding clean, high-performance web frontends in hours.',
    tag: 'Frontend Engineering',
    url: '#projects',
  },
  {
    title: 'Telemedicine Video Architecture: Building Sehat Link with WebRTC',
    readTime: '11 min read',
    image: '/images/articles/todo list app built using react redux and framer motion.png',
    description:
      'Implementing one-to-one secure video streaming and real-time medical appointment scheduling to connect doctors and rural patients.',
    tag: 'WebRTC & Telemedicine',
    url: '#projects',
  },
  {
    title: 'Local State Management & Caching in Privacy-First Web Applications',
    readTime: '8 min read',
    image: '/images/articles/What is Redux with easy explanation.png',
    description:
      'Techniques for indexing and querying client-side data stores with IndexedDB and local vector stores for instant responsiveness.',
    tag: 'State & Caching',
    url: '#projects',
  },
  {
    title: 'From Concept to Pitch: How We Defended Our AI Solutions to Hackathon Juries',
    readTime: '7 min read',
    image: '/images/articles/What is higher order component in React.jpg',
    description:
      'Key strategies for pitching working prototypes, demonstrating benchmarks, and answering technical jury cross-examinations.',
    tag: 'Hackathon Strategy',
    url: '#projects',
  },
];

export default function Articles() {
  return (
    <section id="articles" className="relative py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-primary dark:text-primaryDark">
            Knowledge Sharing
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Words Can Change <span className="text-gradient-primary">The World!</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Deep-dive tutorials, architecture patterns, and engineering insights read by thousands of frontend engineers.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((art, idx) => (
            <motion.a
              key={art.title}
              href={art.url}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              whileHover={{ y: -8 }}
              className="group rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary/50 dark:hover:border-primaryDark/50 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Thumbnail */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider">
                    {art.tag}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-2.5">
                  <div className="flex items-center space-x-1.5 text-[11px] text-slate-400 dark:text-slate-500 font-medium">
                    <Clock className="w-3.5 h-3.5 text-primaryDark" />
                    <span>{art.readTime}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-primary dark:group-hover:text-primaryDark transition-colors leading-snug line-clamp-2">
                    {art.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal line-clamp-2">
                    {art.description}
                  </p>
                </div>
              </div>

              {/* Read Article Footer Link */}
              <div className="px-5 pb-5 pt-2 flex items-center justify-between text-xs font-bold text-primary dark:text-primaryDark group-hover:translate-x-1 transition-transform">
                <span>Read Full Article</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}

