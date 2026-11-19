import { useEffect, useState } from "react";
import "./ResumeFloat.css";

const resumeUrl = `${import.meta.env.BASE_URL}resume/Oishi_Paul_Resume.pdf`;

export default function ResumeFloat() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <button
        className="resume-floating"
        type="button"
        aria-label="Open Oishi Paul's résumé"
        onClick={() => setOpen(true)}
      >
        <span className="resume-floating__clip" aria-hidden="true">↗</span>
        <span className="resume-floating__title">THE UNWRITTEN<br />SIDE OF ME.</span>
      </button>

      {open && (
        <div className="resume-modal" role="presentation" onMouseDown={(e) => {
          if (e.target === e.currentTarget) setOpen(false);
        }}>
          <section className="resume-modal__panel" role="dialog" aria-modal="true" aria-label="Oishi Paul résumé preview">
            <div className="resume-modal__bar">
              <div className="resume-modal__heading">
                <span>OISHI PAUL</span>
                <strong>RÉSUMÉ / PREVIEW</strong>
              </div>
              <div className="resume-modal__actions">
                <a href={resumeUrl} download="Oishi_Paul_Resume.pdf" className="resume-modal__download">DOWNLOAD PDF ↓</a>
                <button type="button" onClick={() => setOpen(false)} aria-label="Close résumé preview" className="resume-modal__close">×</button>
              </div>
            </div>
            <iframe className="resume-modal__viewer" title="Oishi Paul's résumé PDF" src={resumeUrl} />
            <div className="resume-modal__fallback">Preview not working? <a href={resumeUrl} target="_blank" rel="noreferrer">Open the PDF in a new tab ↗</a></div>
          </section>
        </div>
      )}
    </>
  );
}
