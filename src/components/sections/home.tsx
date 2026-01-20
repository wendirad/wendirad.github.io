import { useEffect, type JSX } from "react";
import { type PersonalInformation } from "../../data_provider/data_provider";
import { useTheme } from "../utils/theme";
import { trackClarityEvent } from "../../utils/clarity";
import LocationPinIcon from "../icons/location-pin";
import PhoneIcon from "../icons/phone";
import EmailIcon from "../icons/email";
import DownloadIcon from "../icons/download";
import ContactIcon from "../icons/contact";
import BlogIcon from "../icons/blog";
import GitHubIcon from "../icons/social/github";
import LinkedInIcon from "../icons/social/linked-in";
import TelegramIcon from "../icons/social/telegram";
import XIcon from "../icons/social/x";
import AIIcon from "../icons/ai";

function Home({ pi }: { pi: PersonalInformation }) {
  const socialIcons: Record<string, JSX.Element> = {
    github: GitHubIcon(),
    linkedin: LinkedInIcon(),
    telegram: TelegramIcon(),
    x: XIcon(),
  };

  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    new Image().src = pi.photo.light;
    new Image().src = pi.photo.dark;
  }, [pi.photo.light, pi.photo.dark]);

  const handleProfileImageClick = () => {
    const newTheme = isDark ? "light" : "dark";
    trackClarityEvent(`theme-toggle-${newTheme}`);
    toggleTheme();
  };

  return (
    <section
      id="home"
      className="min-h-screen w-full flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 overflow-x-hidden"
    >
      <div className="max-w-6xl w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="flex-1 order-2 lg:order-1 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-gray-100 sm:whitespace-nowrap">
              {pi.name}
            </h1>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-8 text-gray-700 dark:text-gray-300">
              {pi.title}
            </h2>
            <p className="text-base sm:text-lg mb-10 text-gray-600 dark:text-gray-400 leading-relaxed">
              {pi.summary}
            </p>
            <div className="flex flex-col items-center lg:items-start gap-6">
              <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-8">
                <div className="flex items-center gap-2">
                  <LocationPinIcon />
                  <span className="text-gray-700 dark:text-gray-300">
                    {pi.location}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <PhoneIcon />
                  <a
                    href={`tel:${pi.phone}`}
                    onClick={() => trackClarityEvent("home-phone-click")}
                    className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                  >
                    {pi.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <EmailIcon />
                  <a
                    href={`mailto:${pi.email}`}
                    onClick={() => trackClarityEvent("home-email-click")}
                    className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                  >
                    {pi.email}
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-6">
                {pi.social_links.map((social_link) => (
                  <a
                    key={social_link.id}
                    href={social_link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social_link.title}
                    className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                    onClick={() =>
                      trackClarityEvent(`social-link-click-${social_link.id}`)
                    }
                  >
                    {socialIcons[social_link.id]}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2 flex-shrink-0 flex flex-col items-center gap-6">
            <img
              src={isDark ? pi.photo.dark : pi.photo.light}
              alt={pi.name}
              onClick={handleProfileImageClick}
              className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-lg object-contain cursor-pointer transition-opacity hover:opacity-90"
            />
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <a
                href={pi.blog_url}
                onClick={() => trackClarityEvent("home-blogs-click")}
                className="px-6 py-3 border-2 border-gray-900 dark:border-gray-100 text-gray-900 dark:text-gray-100 rounded-lg font-semibold text-center hover:bg-gray-900 dark:hover:bg-gray-100 hover:text-gray-100 dark:hover:text-gray-900 transition-colors duration-200 flex items-center justify-center gap-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BlogIcon />
                My Blogs
              </a>
              <a
                href="#contact"
                onClick={() => trackClarityEvent("home-contact-me-click")}
                className="px-6 py-3 bg-gray-900 dark:bg-gray-100 text-gray-100 dark:text-gray-900 rounded-lg font-semibold text-center hover:bg-transparent dark:hover:bg-gray-900 hover:border-2 hover:border-gray-900 dark:hover:border-gray-100 hover:text-gray-900 dark:hover:text-gray-100 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <ContactIcon />
                Contact Me
              </a>
              <a
                href={pi.cv_link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border-2 border-gray-900 dark:border-gray-100 text-gray-900 dark:text-gray-100 rounded-lg font-semibold text-center hover:bg-gray-900 dark:hover:bg-gray-100 hover:text-gray-100 dark:hover:text-gray-900 transition-colors duration-200 flex items-center justify-center gap-2"
                onClick={() => trackClarityEvent("file-download-cv")}
              >
                <DownloadIcon />
                Download CV
              </a>
              <a
                href="#about"
                className="px-6 py-3 bg-gray-900 dark:bg-gray-100 text-gray-100 dark:text-gray-900 rounded-lg font-semibold text-center hover:bg-transparent dark:hover:bg-gray-900 hover:border-2 hover:border-gray-900 dark:hover:border-gray-100 hover:text-gray-900 dark:hover:text-gray-100 transition-all duration-200 flex items-center justify-center gap-2"
                onClick={() => trackClarityEvent("home-ai-pitch-click")}
              >
                <AIIcon />
                AI Pitch
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
