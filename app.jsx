'''
// Umm Kulthum Tribute Site :: React SPA
// by Gemini, 2024

import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Play, Music, Image as ImageIcon, BookOpen, ArrowDown } from "lucide-react";

const content = {
  albums: [
    { title: "أنت عمري", year: 1964, img: "https://images.unsplash.com/photo-1579833214938-c3571a38f3d0?q=80&w=800&auto=format&fit=crop" },
    { title: "الأطلال", year: 1966, img: "https://images.unsplash.com/photo-1502828734495-200b39d1059f?q=80&w=800&auto=format&fit=crop" },
    { title: "سيرة الحب", year: 1964, img: "https://images.unsplash.com/photo-1548858221-5975b9ea8a24?q=80&w=800&auto=format&fit=crop" },
    { title: "ألف ليلة وليلة", year: 1969, img: "https://images.unsplash.com/photo-1524230659263-98a2b53b0544?q=80&w=800&auto=format&fit=crop" },
    { title: "الحب كله", year: 1971, img: "https://images.unsplash.com/photo-1614036980995-b286196ae14c?q=80&w=800&auto=format&fit=crop" },
    { title: "فات المعاد", year: 1967, img: "https://images.unsplash.com/photo-1511393695349-36a8385d0a6a?q=80&w=800&auto=format&fit=crop" },
  ],
  songs: [
    { title: "ألف ليلة وليلة", year: 1969, duration: "45:00" },
    { title: "فات المعاد", year: 1967, duration: "38:00" },
    { title: "هذه ليلتي", year: 1968, duration: "42:00" },
    { title: "أمل حياتي", year: 1965, duration: "35:00" },
    { title: "يا ظالمني", year: 1950, duration: "28:00" },
  ],
  gallery: [
    { src: "https://images.unsplash.com/photo-1526413227220-4a841261d763?q=80&w=800&auto=format&fit=crop", style: { gridColumn: "span 2", gridRow: "span 2" } },
    { src: "https://images.unsplash.com/photo-1549421522-386d3a8a3a2a?q=80&w=800&auto=format&fit=crop", style: {} },
    { src: "https://images.unsplash.com/photo-1519502523298-5f25ff41a84c?q=80&w=800&auto=format&fit=crop", style: {} },
    { src: "https://images.unsplash.com/photo-1510906594845-59d45a049493?q=80&w=800&auto=format&fit=crop", style: { gridRow: "span 2" } },
    { src: "https://images.unsplash.com/photo-1516558836529-74e50338f323?q=80&w=800&auto=format&fit=crop", style: {} },
    { src: "https://images.unsplash.com/photo-1517588970462-9d32d431f3c1?q=80&w=800&auto=format&fit=crop", style: { gridColumn: "span 2" } },
  ]
};

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.6
};

const AnimatedPage = ({ children }) => (
  <motion.div
    initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}
    transition={pageTransition}
  >
    {children}
  </motion.div>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AnimatedItem = ({ children, className }) => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

    return (
        <div ref={ref} className={className} data-animate data-in={isInView}>
            {children}
        </div>
    );
};

const SiteHeader = () => {
  const location = useLocation();
  const navLinks = [
    { path: "/", label: "الرئيسية" },
    { path: "/biography", label: "السيرة" },
    { path: "/discography", label: "الأعمال" },
    { path: "/gallery", label: "الصور" },
  ];

  return (
    <header className="site-header">
      <div className="container nav-row">
        <Link to="/" className="wordmark">كوكب الشرق</Link>
        <nav className="main-nav">
          {navLinks.map(link => (
            <Link 
              key={link.path} 
              to={link.path} 
              className={location.pathname === link.path ? 'active' : ''}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

const SiteFooter = () => (
  <footer className="site-footer">
    <div className="container">
        <div className="footer-content">
            <span className="wordmark">موقع تكريمي لأم كلثوم</span>
            <p className="footer-meta">&copy; {new Date().getFullYear()} تكريم رقمي لكوكب الشرق. كل الحقوق محفوظة.</p>
        </div>
    </div>
  </footer>
);

const HomePage = () => (
  <AnimatedPage>
    <main>
      <section className="section hero hero-fullbleed-image" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1549421522-386d3a8a3a2a?q=80&w=1920&h=1080&auto=format&fit=crop)` }}>
        <div className="hero-content">
          <motion.h1 
            className="display-xxl" 
            initial={{ opacity: 0, y: 40 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
          >
            أم كلثوم: <em>كوكب الشرق</em>
          </motion.h1>
          <motion.p 
            className="lead"
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
          >اكتشف المسيرة الفنية الخالدة لأيقونة الطرب العربي.</motion.p>
          <motion.div 
            className="scroll-hint"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 1, delay: 1 }}
          >
            <ArrowDown size={24} className="mx-auto mb-2 animate-bounce" />
            <span>اسحب للأسفل</span>
          </motion.div>
        </div>
      </section>
      
      <section className="section">
        <div className="container-narrow text-center">
          <AnimatedItem>
            <h2 className="title-section">صوت الأمة الخالد</h2>
            <p className="lead-sm bio-prose">
              وُلدت فاطمة إبراهيم السيد البلتاجي، المعروفة عالميًا باسم أم كلثوم. بدأت مسيرتها الفنية في سن مبكرة لتتربع على عرش الغناء العربي لعقود طويلة، تاركةً إرثًا لا يموت.
            </p>
            <Link to="/biography" className="btn btn-primary mt-8">اقرأ السيرة الكاملة <BookOpen size={18}/></Link>
          </AnimatedItem>
        </div>
      </section>

       <section className="section bg-card">
        <div className="container">
            <AnimatedItem className="text-center">
                <h2 className="title-section">أعمال خالدة</h2>
                <p className="lead-sm max-w-3xl mx-auto">استعرض مجموعة من أشهر ألبوماتها التي شكلت وجدان الأمة العربية.</p>
            </AnimatedItem>
            <div className="discography-grid mt-16">
                {content.albums.slice(0, 3).map((album, i) => (
                    <AnimatedItem key={i}>
                        <Link to="/discography" className="card album-card">
                            <figure className="img-frame aspect-square">
                                <img src={album.img} alt={album.title} className="img-cover" />
                            </figure>
                            <h3 className="card-title">{album.title}</h3>
                            <p className="card-year">{album.year}</p>
                        </Link>
                    </AnimatedItem>
                ))}
            </div>
             <div className="text-center mt-12">
                <Link to="/discography" className="btn btn-ghost">تصفح كامل الأعمال <Music size={18}/></Link>
            </div>
        </div>
      </section>

    </main>
  </AnimatedPage>
);

const BioPage = () => (
  <AnimatedPage>
    <main className="section page-header">
       <div className="container-narrow">
        <AnimatedItem>
            <h1 className="display-xl text-center">السيرة الذاتية</h1>
            <p className="lead text-center mt-4">رحلة كوكب الشرق من قرية طماي الزهايرة إلى قمة المجد الفني.</p>
         </AnimatedItem>
       </div>
       <div className="container mt-16">
        <div className="bio-prose">
          <AnimatedItem>
            <p><span className="drop-cap">و</span>ُلدت فاطمة إبراهيم السيد البلتاجي، المعروفة عالميًا باسم أم كلثوم، في 4 مايو 1904 بقرية طماي الزهايرة، محافظة الدقهلية بمصر. بدأت مسيرتها الفنية في سن مبكرة، حيث كانت ترافق والدها في إحياء الموالد والأفراح الدينية، متنكرة في زي صبي لتجنب نظرة المجتمع للمرأة المغنية في ذلك الوقت. تميزت بصوتها القوي والفريد الذي جمع بين الأصالة والعذوبة، مما جعلها تتربع على عرش الغناء العربي لعقود طويلة.</p>
          </AnimatedItem>
          <AnimatedItem>
            <p>انتقلت أم كلثوم إلى القاهرة في أوائل العشرينات من القرن الماضي، وهناك بدأت رحلتها نحو الشهرة الأسطورية. تعاونت مع كبار الملحنين والشعراء مثل زكريا أحمد، رياض السنباطي، محمد عبد الوهاب، أحمد رامي، وبيرم التونسي. قدمت روائع خالدة مثل "أنت عمري"، "الأطلال"، "سيرة الحب"، و"يا ظالمني"، التي لا تزال تتردد أصداؤها حتى اليوم.</p>
          </AnimatedItem>
        </div>
      </div>
      
      <div className="section">
        <div className="container">
            <AnimatedItem className="pull-quote">
              <figure className="pull-quote-img">
                <img src="https://images.unsplash.com/photo-1519502523298-5f25ff41a84c?q=80&w=800&auto=format&fit=crop" alt="صورة مقربة لأم كلثوم" className="img-cover"/>
              </figure>
              <blockquote>
                "الفن هو الرسالة الوحيدة التي تعلو فوق كل الرسائل."
                <footer>— أم كلثوم</footer>
              </blockquote>
            </AnimatedItem>
        </div>
      </div>

      <div className="container">
        <div className="bio-prose">
          <AnimatedItem>
            <p>لم تكن أم كلثوم مجرد مطربة، بل كانت ظاهرة ثقافية واجتماعية وسياسية. كانت حفلاتها الشهرية ليلة الخميس حدثًا ينتظره الملايين في العالم العربي، حيث كانت الراديوات تتوقف عن بث برامجها لتنقل صوتها الشجي. ساهمت في دعم القضايا الوطنية، وقدمت العديد من الحفلات لدعم المجهود الحربي بعد هزيمة 1967. رحلت عن عالمنا في 3 فبراير 1975، تاركة خلفها إرثًا فنيًا لا يموت، ومكانة "كوكب الشرق" التي لا ينازعها أحد.</p>
          </AnimatedItem>
        </div>
      </div>
    </main>
  </AnimatedPage>
);

const DiscographyPage = () => (
  <AnimatedPage>
    <main className="section page-header">
      <div className="container-narrow text-center">
          <AnimatedItem>
            <h1 className="display-xl">الأعمال الفنية</h1>
            <p className="lead mt-4">مجموعة من أشهر ألبومات وأغاني كوكب الشرق التي شكلت وجدان الأمة العربية.</p>
          </AnimatedItem>
      </div>

      <div className="container mt-16">
        <AnimatedItem>
            <h2 className="title-subsection">ألبومات خالدة</h2>
        </AnimatedItem>
        <div className="discography-grid mt-8">
          {content.albums.map((album, i) => (
            <AnimatedItem key={i}>
                <div className="card album-card">
                    <figure className="img-frame aspect-square">
                        <img src={album.img} alt={album.title} className="img-cover" />
                    </figure>
                    <h3 className="card-title">{album.title}</h3>
                    <p className="card-year">{album.year}</p>
                </div>
            </AnimatedItem>
          ))}
        </div>
      </div>

      <div className="container mt-16">
        <AnimatedItem>
            <h2 className="title-subsection">أغاني من الزمن الجميل</h2>
        </AnimatedItem>
        <div className="songs-list mt-8">
          {content.songs.map((song, i) => (
            <AnimatedItem key={i}>
                <div className="song-item">
                    <span className="song-index">0{i + 1}.</span>
                    <h3 className="song-title">{song.title}</h3>
                    <span className="song-meta">{song.year} &middot; {song.duration}</span>
                    <button className="play-btn">
                        <Play size={16} />
                    </button>
                </div>
            </AnimatedItem>
          ))}
        </div>
      </div>
    </main>
  </AnimatedPage>
);

const GalleryPage = () => (
  <AnimatedPage>
    <main className="section page-header">
      <div className="container-narrow text-center">
        <AnimatedItem>
          <h1 className="display-xl">ألبوم الصور</h1>
          <p className="lead mt-4">لمحات نادرة من حياة كوكب الشرق، على المسرح وخارجه.</p>
        </AnimatedItem>
      </div>

      <div className="container mt-16">
        <div className="gallery-mosaic">
          {content.gallery.map((image, i) => (
            <AnimatedItem key={i} className="img-frame" style={image.style}>
                <img src={image.src} alt={`صورة نادرة لأم كلثوم ${i + 1}`} className="img-cover" />
            </AnimatedItem>
          ))}
        </div>
      </div>
    </main>
  </AnimatedPage>
);


const App = () => {
  const location = useLocation();

  return (
    <>
      <SiteHeader />
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/biography" element={<BioPage />} />
          <Route path="/discography" element={<DiscographyPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
        </Routes>
      </AnimatePresence>
      <SiteFooter />
    </>
  );
};

const Main = () => (
    <HashRouter>
        <App />
    </HashRouter>
);

createRoot(document.getElementById("root")).render(<Main />);

'''