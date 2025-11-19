"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Compass, Globe2, GraduationCap, Plane, ShieldCheck, Phone, Mail, MapPin, CheckCircle2} from "lucide-react";
import NextImage from "next/image";

const SUPPORT_EMAIL = "twincompasstravel@gmail.com";

const Section = ({ id, children, className = "" }) => (
  <section id={id} className={`w-full max-w-6xl mx-auto px-4 md:px-6 ${className}`}>{children}</section>
);

const Card = ({ className = "", children }) => (
  <div className={`rounded-2xl border bg-white shadow-sm ${className}`}>{children}</div>
);
const CardHeader = ({ children, className = "" }) => (
  <div className={`p-6 pb-2 ${className}`}>{children}</div>
);
const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>
);
const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 pt-2 ${className}`}>{children}</div>
);

const Button = ({ className = "", children, ...props }) => (
  <button
    className={`inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-medium bg-black text-white hover:bg-black/85 disabled:opacity-50 ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Input = (props) => (
  <input
    className="w-full rounded-2xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-400"
    {...props}
  />
);

const Textarea = (props) => (
  <textarea
    className="w-full rounded-2xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-400"
    {...props}
  />
);

const Feature = ({ icon: Icon, title, desc }) => (
  <Card>
    <CardHeader className="pb-2">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-slate-100"><Icon className="w-6 h-6" aria-hidden /></div>
        <CardTitle>{title}</CardTitle>
      </div>
    </CardHeader>
    <CardContent className="text-slate-600 leading-relaxed">{desc}</CardContent>
  </Card>
);

export default function Home() {
  const prefersReducedMotion = useReducedMotion();
  const [submitting, setSubmitting] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const formRef = React.useRef(null);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  React.useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMenuOpen]);

  function validate(fd) {
    const e = {};
    const name = (fd.get("name") || "").toString().trim();
    const email = (fd.get("email") || "").toString().trim();
    const phone = (fd.get("phone") || "").toString().trim();
    const message = (fd.get("message") || "").toString().trim();
    if (!name) e.name = "Please enter your full name.";
    if (!email || !email.includes("@") || !email.split("@")[1]?.includes(".")) e.email = "Enter a valid email address.";
    const digits = phone.replace(/[^0-9]/g, "");
    if (phone && digits.length < 7) e.phone = "Enter a valid phone (digits only).";
    if (!message) e.message = "Tell us briefly about your plans.";
    return e;
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    const fd = new FormData(formRef.current);
    const v = validate(fd);
    setErrors(v);
    if (Object.keys(v).length) return;

    setSubmitting(true);
    try {
      const name = (fd.get("name") || "").toString().trim();
      const email = (fd.get("email") || "").toString().trim();
      const phone = (fd.get("phone") || "").toString().trim();
      const message = (fd.get("message") || "").toString().trim();
      const subject = encodeURIComponent(`New consultation request from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`);
      window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`;
      setSuccess(true);
      ev.target.reset();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <a href="#home" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 bg-white shadow px-3 py-2 rounded-md">Skip to content</a>

<header className="sticky top-0 z-40">
  <Section className="flex items-center justify-between py-4">
    <a href="#home" className="flex items-center gap-2 logo" aria-label="Go to Twin Compass Travel home">
      <NextImage src="/Images/TWINCOMPASSLOGO.png" alt="Twin Compass Travel Logo" width={52} height={52} />
      <span className="tracking-tight">Twin Compass Travel</span>
    </a>
    <nav className="hidden md:flex items-center gap-6 text-sm" aria-label="Primary">
      <a href="#services">Services</a>
      <a href="#destinations">Destinations</a>
      <a href="#whyus">Why Us</a>
      <a href="#faq">FAQ</a>
      <a href="#contact">Contact</a>
    </nav>
    <a href="#contact" className="hidden md:inline-block">
      <Button className="get-started-btn">Get Started</Button>
    </a>
    <button className="md:hidden" onClick={() => setIsMenuOpen(true)} aria-label="Open menu">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
    </button>
  </Section>
</header>

{isMenuOpen && (
  <motion.div
    initial={{ x: "-100%" }}
    animate={{ x: 0 }}
    exit={{ x: "-100%" }}
    transition={{ duration: 0.3 }}
    className="mobile-menu"
  >
    <div className="flex justify-end">
      <button onClick={() => setIsMenuOpen(false)} aria-label="Close menu">
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
    <nav>
      <a href="#services" onClick={() => setIsMenuOpen(false)}>Services</a>
      <a href="#destinations" onClick={() => setIsMenuOpen(false)}>Destinations</a>
      <a href="#whyus" onClick={() => setIsMenuOpen(false)}>Why Us</a>
      <a href="#faq" onClick={() => setIsMenuOpen(false)}>FAQ</a>
      <a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a>
    </nav>
  </motion.div>
)}


{/*HERO SECTION*/}
      <div id="home" className="hero-section">
  <Section className="grid md:grid-cols-2 gap-10 items-center">
    <motion.div
  initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="hero-left"
>
  <h4 className="tagline">Your Trusted Partner in Global Mobility</h4>
  <h1>
    Explore Opportunities<br />
    <span className="highlight">Beyond Borders</span>
  </h1>
  <p>
    We provide reliable <span className="font-semibold">visa assistance</span> and
    <span className="font-semibold"> travel consultation</span> for
    <span className="font-semibold"> USA</span>, <span className="font-semibold">Canada</span>, and other destinations <br></br>All handled with
    precision, transparency, and care.
  </p>

  <div className="hero-buttons mt-8 flex flex-wrap gap-4">
    <a href="#contact"><Button>Free Consultation</Button></a>
    <a href="#services"><Button>View Services</Button></a>
  </div>

  <div className="hero-points mt-8 flex flex-col sm:flex-row gap-4 text-sm text-slate-600">
    <div className="point"><ShieldCheck className="icon" aria-hidden/> Trusted Guidance</div>
    <div className="point"><Globe2 className="icon" aria-hidden/> Global Reach</div>
    <div className="point"><Plane className="icon" aria-hidden/> Timely Processing</div>
  </div>

        <img
        src="/Images/BlackAirplane.png"
        alt="Flying airplane"
        className="plane-animation"
      />
</motion.div>


<motion.div
  initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.98 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.6, delay: 0.1 }}
>
  <div className="hero-card">
    <div className="hero-card-content">
      <div className="card-header">
        <div className="text-center">
          <NextImage src="/Images/TWINCOMPASSLOGO.png" alt="Twin Compass Travel Logo" width={106} height={106} className="mx-auto" />
          <h3 className="mt-2">Twin Compass Travel</h3>
          <p>Your Gateway to Global Opportunities</p>
        </div>
      </div>

      <ul>
        <li><GraduationCap className="w-5 h-5" aria-hidden /> School (Study) Visas</li>
        <li><Plane className="w-5 h-5" aria-hidden /> Visitor/Tourist Visas</li>
        <li><Globe2 className="w-5 h-5" aria-hidden /> USA • Canada • More Destinations</li>
      </ul>
    </div>
  </div>
</motion.div>
  </Section>
</div>


{/*VISA SECTION*/}
<div className="visa-section">
  <Section className="grid md:grid-cols-2 gap-10 items-center min-h-[75vh]">
    
    <div className="visa-image-container">
      <img 
        src="/Images/Visa.JPG"
        alt="Visa documents"
        className="visa-image"
      />
    </div>

    <div className="visa-text">
      <h2 className="visa-title">
        A Clear Path Toward Your Approved Visa
      </h2>

      <p className="visa-subtext">
        We simplify the complex visa process with clarity, accuracy, and proven guidance.
        From understanding your options to preparing your documents, we support you every step of the way.
      </p>

      <ul className="visa-points">
        <li><span className="dot" /> We review your case and identify possible red flags</li>
        <li><span className="dot" /> We explain your options in simple, clear language</li>
        <li><span className="dot" /> We guide you with best-practice preparation strategies</li>
        <li><span className="dot" /> We stay with you from consultation to final submission</li>
      </ul>

      <a href="#contact">
        <button className="visa-btn">Start Your Process</button>
      </a>
    </div>

  </Section>
</div>



{/*SERVICES SECTION*/}
      <div id="services" className="relative py-10 md:py-18 overflow-hidden">
        <Section>
          <div className="relative text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight font-[var(--font-display)] bg-gradient-to-r from-[#0a2e66] to-[#2563eb] bg-clip-text text-transparent">
              Our Services
            </h2>
            <p className="mt-4 text-slate-600 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
              End-to-end assistance <br></br>From eligibility checks and document preparation to application submission and interview readiness.
            </p>
          </div>

          <div className="relative grid md:grid-cols-3 gap-8 z-10">
            {/*Card 1*/}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="feature-card text-center md:text-left"
            >
              <div className="icon-wrapper mx-auto md:mx-0">
                <GraduationCap />
              </div>
              <h3>School Visas</h3>
              <div className="mt-4 space-y-2">
                <div className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 mr-2 mt-1 text-green-500 flex-shrink-0" />
                  <span className="text-slate-600 leading-relaxed font-medium hover:text-blue-600 transition-colors">Admissions guidance & program matching</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 mr-2 mt-1 text-green-500 flex-shrink-0" />
                  <span className="text-slate-600 leading-relaxed font-medium hover:text-blue-600 transition-colors">Document checklists & SEVIS/DS-160 support</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 mr-2 mt-1 text-green-500 flex-shrink-0" />
                  <span className="text-slate-600 leading-relaxed font-medium hover:text-blue-600 transition-colors">Interview preparation</span>
                </div>
              </div>
            </motion.div>


            {/*Card 2*/}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="feature-card text-center md:text-left"
            >
               <div className="icon-wrapper mx-auto md:mx-0">
                <Plane />
              </div>
              <h3>Visit / Visitor Visas</h3>
              <div className="mt-4 space-y-2">
                <div className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 mr-2 mt-1 text-green-500 flex-shrink-0" />
                  <span className="text-slate-600 leading-relaxed font-medium hover:text-blue-600 transition-colors">Purpose-of-travel strategy</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 mr-2 mt-1 text-green-500 flex-shrink-0" />
                  <span className="text-slate-600 leading-relaxed font-medium hover:text-blue-600 transition-colors">Ties-to-home documentation</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 mr-2 mt-1 text-green-500 flex-shrink-0" />
                  <span className="text-slate-600 leading-relaxed font-medium hover:text-blue-600 transition-colors">Application filing & profile reviews</span>
                </div>
              </div>
            </motion.div>


            {/*Card 3*/}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="feature-card text-center md:text-left"
            >
              <div className="icon-wrapper mx-auto md:mx-0">
                <ShieldCheck />
              </div>
              <h3>Compliance & Accuracy</h3>
              <div className="mt-4 space-y-2">
                <div className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 mr-2 mt-1 text-green-500 flex-shrink-0" />
                  <span className="text-slate-600 leading-relaxed font-medium hover:text-blue-600 transition-colors">Transparent timelines & clear requirements</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 mr-2 mt-1 text-green-500 flex-shrink-0" />
                  <span className="text-slate-600 leading-relaxed font-medium hover:text-blue-600 transition-colors">Best-practice reviews to minimize errors</span>
                </div>
              </div>
            </motion.div>
          </div>
        </Section>
      </div>


      
{/*DESTINATIONS SECTION*/} 
      <div className="destinations-section">
  <Section id="destinations">
    <div className="destinations-header">
      <h2>Primary Destinations</h2>
      <p>
        Focused expertise where it matters most while supporting other
        countries on request.
      </p>
    </div>

    <div className="destinations-grid">
      <div className="destination-card usa-card">
        <div className="destination-header">
          <Globe2 className="destination-icon" aria-hidden />
          <h3>United States (USA)</h3>
        </div>
        <ul className="destination-points">
          <li>
            <CheckCircle2 className="w-4 h-4 mr-2 mt-1 text-green-500 flex-shrink-0" />
            F-1 (study) and B-1/B-2 (visitor) guidance
          </li>
          <li>
            <CheckCircle2 className="w-4 h-4 mr-2 mt-1 text-green-500 flex-shrink-0" />
            Financial documentation
          </li>
          <li>
            <CheckCircle2 className="w-4 h-4 mr-2 mt-1 text-green-500 flex-shrink-0" />
            I-20 coordination
          </li>
          <li>
            <CheckCircle2 className="w-4 h-4 mr-2 mt-1 text-green-500 flex-shrink-0" />
            Interview preparation
          </li>
        </ul>
      </div>

      <div className="destination-card canada-card">
        <div className="destination-header">
          <MapPin className="destination-icon" aria-hidden />
          <h3>Canada</h3>
        </div>
        <ul className="destination-points">
          <li>
            <CheckCircle2 className="w-4 h-4 mr-2 mt-1 text-green-500 flex-shrink-0" />
            Study permits and visitor visas
          </li>
          <li>
            <CheckCircle2 className="w-4 h-4 mr-2 mt-1 text-green-500 flex-shrink-0" />
            GCKey / IRCC profile setup
          </li>
          <li>
            <CheckCircle2 className="w-4 h-4 mr-2 mt-1 text-green-500 flex-shrink-0" />
            Proof-of-funds advice
          </li>
          <li>
            <CheckCircle2 className="w-4 h-4 mr-2 mt-1 text-green-500 flex-shrink-0" />
            Statement of purpose reviews
          </li>
        </ul>
      </div>
    </div>
  </Section>
</div>



{/*WHY US SECTION*/}
 <div className="why-us-section">
        <Section id="whyus">
          <div className="why-us-header">
            <h2>
              Why Choose <span>Twin Compass</span>
            </h2>
            <p>
              A boutique, client-first approach with clear communication, careful
              documentation, and ethical guidance at every step.
            </p>
          </div>

          <div className="why-us-grid">
            <div className="why-us-item">
              <ShieldCheck className="why-us-icon" aria-hidden />
              <h3>Ethical & Transparent</h3>
              <p>
                No false promises. You get requirements, realistic timelines, and
                honest feedback.
              </p>
            </div>

            <div className="why-us-item">
              <Compass className="why-us-icon" aria-hidden />
              <h3>Personalized Roadmaps</h3>
              <p>
                We tailor a step-by-step plan to your background, goals, and
                deadlines.
              </p>
            </div>

            <div className="why-us-item">
              <Globe2 className="why-us-icon" aria-hidden />
              <h3>Global Network</h3>
              <p>
                University partners, travel resources, and up-to-date process
                knowledge.
              </p>
            </div>
          </div>
        </Section>
      </div>



{/*FAQ SECTION*/}
 <div className="contact-section-wrapper">
        <Section id="contact" className="contact-section">
          <div className="grid md:grid-cols-2 gap-10 items-start">
            
            <div className="contact-info">
              <h2>
                Contact <span>Us</span>
              </h2>
              <p className="intro">
                Book a free consultation or send your questions. We’ll get back
                to you promptly.
              </p>

              <div className="contact-links">
                <div>
                  <Phone /> <a href="tel:+19175826825">+1 (917) 582-6825</a>
                </div>
                <div>
                  <Phone /> <a href="tel:+14359192513">+1 (435) 919-2513</a>
                </div>
                <div>
                  <Mail />{" "}
                  <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
                </div>
              </div>

              <p className="disclaimer">
                <strong>Disclaimer:</strong> Twin Compass Travel is a private
                consultancy and not affiliated with any government.
              </p>
            </div>


            <Card className="contact-card">
              <CardHeader>
                <CardTitle>Request a Callback</CardTitle>
              </CardHeader>
              <CardContent>
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  noValidate
                  className="contact-form"
                >
                  <div>
                    <Input name="name" placeholder="Full Name" required />
                  </div>
                  <div>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Email"
                      required
                    />
                  </div>
                  <div>
                    <Input name="phone" placeholder="Phone" />
                  </div>
                  <div>
                    <Textarea
                      name="message"
                      rows={4}
                      placeholder="Your message..."
                    />
                  </div>

                  {!success && (
                    <Button
                      type="submit"
                      disabled={submitting}
                      className="submit-btn"
                    >
                      {submitting ? "Submitting…" : "Submit"}
                    </Button>
                  )}

                  {success && (
                    <div className="success-msg">
                      Thanks! If your email didn’t open, message us directly at{" "}
                      {SUPPORT_EMAIL}.
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>
        </Section>
      </div>


{/*FOOTER SECTION*/}
      <footer className="footer">
        <Section className="footer-content">
          <div className="footer-grid">
            {/* Column 1: Brand */}
            <div className="footer-brand">
              <div className="brand-title">
                <NextImage src="/Images/TWINCOMPASSLOGO.png" alt="Twin Compass Travel Logo" width={50} height={50} className="footer-icon" />
                Twin Compass Travel
              </div>
              <p className="slogan">Your Global Journey, Guided.</p>
            </div>

            {/* Column 2: Services */}
            <div className="footer-links">
              <h4>Services</h4>
              <ul>
                <li>
                  <a href="#services">Visa & Permit Applications</a>
                </li>
                <li>
                  <a href="#services">Documentation & Financials</a>
                </li>
                <li>
                  <a href="#services">Interview Preparation</a>
                </li>
              </ul>
            </div>

            {/* Column 3: Destinations */}
            <div className="footer-links">
              <h4>Destinations</h4>
              <ul>
                <li>
                  <a href="#destinations">United States (USA)</a>
                </li>
                <li>
                  <a href="#destinations">Canada</a>
                </li>
              </ul>
            </div>

            {/* Column 4: Contact */}
            <div className="footer-contact">
              <h4>Contact Us</h4>
              <div className="contact-details">
                <a href="tel:+19175826825">
                  <Phone /> +1 (917) 582-6825
                </a>
                <a href="tel:+14359192513">
                  <Phone /> +1 (435) 919-2513
                </a>
                <a href={`mailto:${SUPPORT_EMAIL}`}>
                  <Mail /> {SUPPORT_EMAIL}
                </a>
              </div>
            </div>
          </div>
        </Section>
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} Twin Compass Travel. All rights
            reserved.
          </p>
        </div>
      </footer>

    </div>
  );
}