import { useState, useRef, useEffect } from "react";
import type { PersonalInformation } from "../../../data_provider/data_provider";
import { trackClarityEvent } from "../../../utils/clarity";

interface ContactFormProps {
  pi: PersonalInformation;
}

export default function ContactForm({ pi }: ContactFormProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const hasTrackedViewRef = useRef(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTrackedViewRef.current) {
            trackClarityEvent("contact-form-section-viewed");
            hasTrackedViewRef.current = true;
          }
        });
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    trackClarityEvent("contact-form-submitted");

    // Simulate form submission (you can replace this with actual API call)
    try {
      // Create mailto link as fallback
      const mailtoLink = `mailto:${pi.email}?subject=${encodeURIComponent(
        formData.subject || "Contact Form Submission"
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;

      // For now, we'll use mailto as the submission method
      // In production, you'd typically send this to a backend API
      window.location.href = mailtoLink;

      // Simulate delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 500));

      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 5000);
    } catch (error) {
      setSubmitStatus("error");
      trackClarityEvent("contact-form-error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact-form"
      className="w-full flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16"
    >
      <div className="max-w-6xl w-full">
        <div className="bg-secondary-light/20 dark:bg-secondary-dark/20 border border-secondary-light/30 dark:border-secondary-dark/30 rounded-[2.5rem] p-12 md:p-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-tertiary-light/10 dark:bg-tertiary-dark/10 blur-[100px] -z-10"></div>
          
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
            {/* Left Column - Text Content */}
            <div className="flex-1 lg:max-w-md">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-[2px] w-12 bg-tertiary-light dark:bg-tertiary-dark"></div>
                <h2 className="text-tertiary-light dark:text-tertiary-dark font-bold tracking-[.4em] text-[11px] uppercase">
                  Ready to work with me
                </h2>
                <div className="h-[2px] w-12 bg-tertiary-light dark:bg-tertiary-dark"></div>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-gray-100 tracking-tighter mb-6">
                Send me a <br />
                <span className="text-tertiary-light dark:text-tertiary-dark italic">message</span>
              </h2>
              <p className="text-secondary-light dark:text-secondary-dark text-lg">
                Have a question or want to work together? Fill out the form and I'll get back to you as soon as possible.
              </p>
            </div>

            {/* Right Column - Form */}
            <div className="flex-1 w-full lg:max-w-lg">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2"
                    >
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-secondary-light/30 dark:border-secondary-dark/30 rounded-xl text-gray-900 dark:text-gray-100 placeholder-secondary-light dark:placeholder-secondary-dark focus:outline-none focus:ring-2 focus:ring-tertiary-light dark:focus:ring-tertiary-dark focus:border-transparent transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2"
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-secondary-light/30 dark:border-secondary-dark/30 rounded-xl text-gray-900 dark:text-gray-100 placeholder-secondary-light dark:placeholder-secondary-dark focus:outline-none focus:ring-2 focus:ring-tertiary-light dark:focus:ring-tertiary-dark focus:border-transparent transition-all"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2"
                  >
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-secondary-light/30 dark:border-secondary-dark/30 rounded-xl text-gray-900 dark:text-gray-100 placeholder-secondary-light dark:placeholder-secondary-dark focus:outline-none focus:ring-2 focus:ring-tertiary-light dark:focus:ring-tertiary-dark focus:border-transparent transition-all"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-secondary-light/30 dark:border-secondary-dark/30 rounded-xl text-gray-900 dark:text-gray-100 placeholder-secondary-light dark:placeholder-secondary-dark focus:outline-none focus:ring-2 focus:ring-tertiary-light dark:focus:ring-tertiary-dark focus:border-transparent transition-all resize-none"
                    placeholder="Tell me about your project or question..."
                  />
                </div>

                {submitStatus === "success" && (
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-xl text-green-800 dark:text-green-200 text-sm">
                    Thank you! Your message has been sent. I'll get back to you soon.
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-xl text-red-800 dark:text-red-200 text-sm">
                    Something went wrong. Please try again or send an email directly.
                  </div>
                )}

                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-10 py-4 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-full font-black uppercase tracking-widest text-[11px] hover:bg-tertiary-light dark:hover:bg-tertiary-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

