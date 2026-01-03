import { useState, useRef, useEffect } from "react";
import { trackClarityEvent } from "../../../utils/clarity";

const FORM_ENDPOINT = "tele-forms.wendirad.com/Pyr1UufknHh9/contact-form-main";

export default function ContactForm() {
  const sectionRef = useRef<HTMLElement>(null);
  const hasTrackedViewRef = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);
  
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
    // Clear error when user starts typing
    if (submitStatus === "error") {
      setSubmitStatus("idle");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");
    
    // Add Pageclip loading class
    const submitButton = formRef.current?.querySelector('.pageclip-form__submit') as HTMLElement;
    if (submitButton) {
      submitButton.classList.add('is-loading');
    }
    
    trackClarityEvent("contact-form-submitted");

    try {
      if (!formRef.current) {
        throw new Error("Form not found");
      }

      const formDataToSend = new FormData(formRef.current);

      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success === false) {
        throw new Error(result.error || "Failed to send message");
      }

      // Success
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      // Reset form element
      if (formRef.current) {
        formRef.current.reset();
      }

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 5000);

      trackClarityEvent("contact-form-success");
    } catch (error) {
      setSubmitStatus("error");
      trackClarityEvent("contact-form-error");
    } finally {
      setIsSubmitting(false);
      // Remove Pageclip loading class
      const button = formRef.current?.querySelector('.pageclip-form__submit') as HTMLElement;
      if (button) {
        button.classList.remove('is-loading');
      }
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
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="space-y-4 pageclip-form"
                action={FORM_ENDPOINT}
                method="post"
              >
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
                      disabled={isSubmitting}
                      className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-secondary-light/30 dark:border-secondary-dark/30 rounded-xl text-gray-900 dark:text-gray-100 placeholder-secondary-light dark:placeholder-secondary-dark focus:outline-none focus:ring-2 focus:ring-tertiary-light dark:focus:ring-tertiary-dark focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
                      disabled={isSubmitting}
                      className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-secondary-light/30 dark:border-secondary-dark/30 rounded-xl text-gray-900 dark:text-gray-100 placeholder-secondary-light dark:placeholder-secondary-dark focus:outline-none focus:ring-2 focus:ring-tertiary-light dark:focus:ring-tertiary-dark focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
                    disabled={isSubmitting}
                    className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-secondary-light/30 dark:border-secondary-dark/30 rounded-xl text-gray-900 dark:text-gray-100 placeholder-secondary-light dark:placeholder-secondary-dark focus:outline-none focus:ring-2 focus:ring-tertiary-light dark:focus:ring-tertiary-dark focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
                    disabled={isSubmitting}
                    className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-secondary-light/30 dark:border-secondary-dark/30 rounded-xl text-gray-900 dark:text-gray-100 placeholder-secondary-light dark:placeholder-secondary-dark focus:outline-none focus:ring-2 focus:ring-tertiary-light dark:focus:ring-tertiary-dark focus:border-transparent transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
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
                    Unable to send message. Please try again later.
                  </div>
                )}

                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="pageclip-form__submit px-10 py-4 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-full font-black uppercase tracking-widest text-[11px] hover:bg-tertiary-light dark:hover:bg-tertiary-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed relative min-w-[140px]"
                  >
                    <span className="pageclip-form__submit-text">
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg
                            className="animate-spin h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        "Send Message"
                      )}
                    </span>
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

