import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  Mail,
  Copy,
  Check,
  Code2,
  BriefcaseBusiness
} from "lucide-react";
import "./FinalContact.css";

const EMAIL = "oishipaul45@gmail.com";
const GITHUB = "https://github.com/oishipaul45-engineer";
const LINKEDIN = "https://www.linkedin.com/in/oishi-paul-328a37399";

export default function FinalContact() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  }

  return (
    <section className="oishi-final-contact" id="final-contact">
      <div className="fc-noise" />

      <div className="fc-top">
        <span>OISHI PAUL / OPEN FOR CONNECTIONS</span>
        <span>THE NEXT CHAPTER STARTS HERE.</span>
      </div>

      <div className="fc-layout">
        <motion.div
          className="fc-copy"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="fc-eyebrow">
            HAVE SOMETHING INTERESTING IN MIND?
          </span>

          <h2>
            LET'S MAKE
            <span>THE</span>
            <em>UNEXPECTED.</em>
          </h2>

          <p>
            An unusual idea? An ambitious project?
            Or simply a conversation about technology
            and creativity? I'm all ears.
          </p>

          <div className="fc-email-row">
            <a href={`mailto:${EMAIL}`} className="fc-email">
              <Mail size={21} />
              <span>{EMAIL}</span>
              <ArrowUpRight size={20} />
            </a>

            <button
              className="fc-copy-button"
              onClick={copyEmail}
              aria-label="Copy email address"
            >
              {copied ? <Check size={20} /> : <Copy size={20} />}
              <span>{copied ? "Copied!" : "Copy"}</span>
            </button>
          </div>

          <div className="fc-socials">
            <a href={GITHUB} target="_blank" rel="noopener noreferrer">
              <span className="fc-social-icon">
                <Code2 size={23} />
              </span>
              <span className="fc-social-text">
                <strong>GitHub</strong>
                <small>See what I'm building</small>
              </span>
              <ArrowUpRight size={20} />
            </a>

            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">
              <span className="fc-social-icon">
                <BriefcaseBusiness size={23} />
              </span>
              <span className="fc-social-text">
                <strong>LinkedIn</strong>
                <small>Let's connect professionally</small>
              </span>
              <ArrowUpRight size={20} />
            </a>
          </div>
        </motion.div>

        <div className="fc-art" aria-hidden="true">
          <div className="fc-art-glow" />

          <motion.div
            className="fc-art-sculpture"
            animate={{
              y: [0, -22, 0],
              rotate: [-8, 6, -8]
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="fc-art-ring fc-ring-one" />
            <div className="fc-art-ring fc-ring-two" />
            <div className="fc-art-core">✳</div>
          </motion.div>

          <span className="fc-art-caption">
            GREAT THINGS BEGIN WITH A HELLO.
          </span>
        </div>
      </div>

      <div className="fc-footer">
        <span>DESIGNED WITH CURIOSITY.</span>
        <span>OISHI PAUL © {new Date().getFullYear()}</span>
        <a href="#intro">BACK TO THE TOP ↑</a>
      </div>
    </section>
  );
}
