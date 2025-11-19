"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Compass, Globe2, GraduationCap, Plane, ShieldCheck, Phone, Mail, MapPin } from "lucide-react";

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

      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
        <Section className="flex items-center justify-between py-3">
          <a href="#home" className="flex items-center gap-2 font-semibold" aria-label="Go to Twin Compass Travel home">
            <Compass className="w-6 h-6" aria-hidden />
            <span className="tracking-tight">Twin Compass Travel</span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm" aria-label="Primary">
            <a href="#services" className="hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 rounded-md px-1">Services</a>
            <a href="#destinations" className="hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 rounded-md px-1">Destinations</a>
            <a href="#whyus" className="hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 rounded-md px-1">Why Us</a>
            <a href="#faq" className="hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 rounded-md px-1">FAQ</a>
            <a href="#contact" className="hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 rounded-md px-1">Contact</a>
          </nav>
          <a href="#contact" className="hidden md:inline-block">
            <Button>Get Started</Button>
          </a>
        </Section>
      </header>

      <div id="home" className="bg-gradient-to-b from-slate-50 to-white">
        <Section className="py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <motion.div initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight">Professional Visa & Travel Services</h1>
            <p className="mt-4 text-slate-600 text-lg">
              We help with <span className="font-semibold">school visas</span> and <span className="font-semibold">visit visas</span> for the <span className="font-semibold">USA</span>, <span className="font-semibold">Canada</span>, and other countries—handled with precision and care.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#contact"><Button>Free Consultation</Button></a>
              <a href="#services"><Button className="bg-white text-slate-900 border border-slate-300 hover:bg-slate-50">View Services</Button></a>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 text-sm text-slate-600">
              <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4" aria-hidden/>Trusted Guidance</div>
              <div className="flex items-center gap-2"><Globe2 className="w-4 h-4" aria-hidden/>Global Reach</div>
              <div className="flex items-center gap-2"><Plane className="w-4 h-4" aria-hidden/>Timely Processing</div>
            </div>
          </motion.div>

          <motion.div initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <Card className="rounded-3xl shadow-md">
              <CardContent className="p-6">
                <div className="aspect-video w-full overflow-hidden rounded-2xl border bg-slate-100 grid place-items-center">
                  <div className="text-center">
                    <Compass className="w-14 h-14 mx-auto" aria-hidden/>
                    <div className="mt-2 text-xl font-semibold">Twin Compass Travel</div>
                    <div className="text-slate-500 text-sm">Your Gateway to Global Opportunities</div>
                  </div>
                </div>
                <ul className="mt-6 space-y-3 text-slate-600">
                  <li className="flex items-center gap-3"><GraduationCap className="w-5 h-5" aria-hidden/> School (Study) Visas</li>
                  <li className="flex items-center gap-3"><Plane className="w-5 h-5" aria-hidden/> Visitor/Tourist Visas</li>
                  <li className="flex items-center gap-3"><Globe2 className="w-5 h-5" aria-hidden/> USA • Canada • More Destinations</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </Section>
      </div>

      <Section id="services" className="py-16 md:py-24">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight">Services</h2>
          <p className="mt-3 text-slate-600 max-w-2xl mx-auto">End-to-end assistance—from eligibility checks and document preparation to application submission and interview readiness.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <Feature icon={GraduationCap} title="School Visas" desc="Admissions guidance, program matching, document checklists, SEVIS/DS-160 support, and interview preparation." />
          <Feature icon={Plane} title="Visit/Visitor Visas" desc="Purpose-of-travel strategy, ties-to-home documentation, application filing, and profile reviews." />
          <Feature icon={ShieldCheck} title="Compliance & Accuracy" desc="Transparent timelines, clear requirements, and best-practice reviews to minimize errors and delays." />
        </div>
      </Section>

      <Section id="destinations" className="py-16 md:py-24 bg-slate-50 rounded-[3rem]">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight">Primary Destinations</h2>
          <p className="mt-3 text-slate-600">Focused expertise where it matters most—while supporting other countries on request.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Globe2 className="w-5 h-5" aria-hidden/>United States (USA)</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-600 space-y-2">
              <p>F-1 (study) and B-1/B-2 (visitor) guidance, financial documentation, I-20 coordination, and interview prep.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><MapPin className="w-5 h-5" aria-hidden/>Canada</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-600 space-y-2">
              <p>Study permits and visitor visas, GCKey/IRCC profile setup, proof-of-funds advice, and statement of purpose reviews.</p>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section id="whyus" className="py-16 md:py-24">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight">Why Choose Twin Compass</h2>
          <p className="mt-3 text-slate-600 max-w-2xl mx-auto">A boutique, client-first approach—clear communication, careful documentation, and ethical guidance at every step.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <Feature icon={ShieldCheck} title="Ethical & Transparent" desc="No false promises. You get requirements, realistic timelines, and honest feedback."/>
          <Feature icon={Compass} title="Personalized Roadmaps" desc="We tailor a step-by-step plan to your background, goals, and deadlines."/>
          <Feature icon={Globe2} title="Global Network" desc="University partners, travel resources, and up-to-date process knowledge."/>
        </div>
      </Section>

      <Section id="contact" className="py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight">Contact Us</h2>
            <p className="mt-3 text-slate-600">Book a free consultation or send your questions. We’ll get back to you promptly.</p>
            <div className="mt-6 space-y-3 text-slate-700">
              <div className="flex items-center gap-3"><Phone className="w-5 h-5" aria-hidden/> <a className="underline-offset-4 hover:underline" href="tel:+19175826825">+1 (917) 582-6825</a></div>
              <div className="flex items-center gap-3"><Phone className="w-5 h-5" aria-hidden/> <a className="underline-offset-4 hover:underline" href="tel:+14359192513">435-919-2513</a></div>
              <div className="flex items-center gap-3"><Mail className="w-5 h-5" aria-hidden/> <a className="underline" href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a></div>
            </div>
            <p className="mt-6 text-xs text-slate-500">Twin Compass Travel is a private consultancy and is not affiliated with any government. Visa approval decisions are made solely by the respective embassies/consulates.</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Request a Callback</CardTitle>
            </CardHeader>
            <CardContent>
              <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-4" aria-label="Request a callback form">
                <div>
                  <Input name="name" placeholder="Full Name" aria-label="Full Name" aria-invalid={!!errors.name} required />
                  {errors.name && <p className="mt-1 text-sm text-red-600" role="alert">{errors.name}</p>}
                </div>
                <div>
                  <Input type="email" name="email" placeholder="Email" aria-label="Email" aria-invalid={!!errors.email} required />
                  {errors.email && <p className="mt-1 text-sm text-red-600" role="alert">{errors.email}</p>}
                </div>
                <div>
                  <Input name="phone" placeholder="Phone" aria-label="Phone" aria-invalid={!!errors.phone} />
                  {errors.phone && <p className="mt-1 text-sm text-red-600" role="alert">{errors.phone}</p>}
                </div>
                <div>
                  <Textarea name="message" rows={4} placeholder="Tell us about your plans (study/visit, country, timing)" aria-label="Your message" aria-invalid={!!errors.message} />
                  {errors.message && <p className="mt-1 text-sm text-red-600" role="alert">{errors.message}</p>}
                </div>

                {!success && (
                  <Button type="submit" disabled={submitting} className="w-full">
                    {submitting ? "Submitting…" : "Submit"}
                  </Button>
                )}
                {success && (
                  <div className="rounded-xl bg-green-50 text-green-700 p-3 text-sm" role="status">
                    Thanks! We opened your email client with a prefilled message. If it didn't open, email us at {SUPPORT_EMAIL}.
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </Section>

      <footer className="border-t">
        <Section className="py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-600">
          <div className="flex items-center gap-2"><Compass className="w-4 h-4" aria-hidden/> Twin Compass Travel</div>
          <div className="flex items-center gap-4">
            <a href="#services" className="hover:text-slate-800">Services</a>
            <a href="#destinations" className="hover:text-slate-800">Destinations</a>
            <a href="#contact" className="hover:text-slate-800">Contact</a>
          </div>
          <div>© {new Date().getFullYear()} Twin Compass Travel. All rights reserved.</div>
        </Section>
      </footer>
    </div>
  );
}
