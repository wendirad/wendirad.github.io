import { type JSX } from "react";
import type { PersonalInformation } from "../../data_provider/data_provider";
import { trackClarityEvent } from "../../utils/clarity";
import GitHubIcon from "../icons/social/github";
import LinkedInIcon from "../icons/social/linked-in";
import TelegramIcon from "../icons/social/telegram";
import XIcon from "../icons/social/x";

interface FooterProps {
  pi: PersonalInformation;
}

export default function Footer({ pi }: FooterProps) {
  const socialIcons: Record<string, JSX.Element> = {
    github: GitHubIcon(),
    linkedin: LinkedInIcon(),
    telegram: TelegramIcon(),
    x: XIcon(),
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-secondary-light/30 dark:border-secondary-dark/30 bg-secondary-light/10 dark:bg-secondary-dark/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Left: Name and Copyright */}
          <div className="text-center md:text-left">
            <p className="text-gray-900 dark:text-gray-100 font-semibold mb-1">
              {pi.name}
            </p>
            <p className="text-sm text-secondary-light dark:text-secondary-dark">
              © {currentYear} All rights reserved.
            </p>
          </div>

          {/* Center: Social Links */}
          <div className="flex items-center gap-6">
            {pi.social_links.map((social_link) => (
              <a
                key={social_link.id}
                href={social_link.url}
                target="_blank"
                rel="noopener noreferrer"
                title={social_link.title}
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                onClick={() => trackClarityEvent(`footer-social-link-click-${social_link.id}`)}
              >
                {socialIcons[social_link.id]}
              </a>
            ))}
          </div>

          {/* Right: Quick Links */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 text-sm">
            <a
              href="#home"
              onClick={() => trackClarityEvent("footer-home-click")}
              className="text-secondary-light dark:text-secondary-dark hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              Home
            </a>
            <a
              href="#contact-form"
              onClick={() => trackClarityEvent("footer-contact-click")}
              className="text-secondary-light dark:text-secondary-dark hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              Contact
            </a>
            <a
              href={pi.blog_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackClarityEvent("footer-blog-click")}
              className="text-secondary-light dark:text-secondary-dark hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              Blog
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

