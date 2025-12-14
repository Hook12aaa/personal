import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import './App.css'
import ParticleBackground from './ParticleBackground'
import { pickInitialOutcomeIndex } from './personalization'
import outcomes from './data/outcomes'
import useImpactRotation from './hooks/useImpactRotation'
import useImpactPopover from './hooks/useImpactPopover'

function App() {
  const mountRef = useRef(null)
  const { detailsRef, popoverRef, outcomesOpen, openPopover, smoothClose } = useImpactPopover()
  const initialOutcomeIndex = pickInitialOutcomeIndex(outcomes)
  const { rollingIndex, fading } = useImpactRotation(outcomes, outcomesOpen, initialOutcomeIndex)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return 
    const width = mount.clientWidth
    const height = mount.clientHeight
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    mount.appendChild(renderer.domElement)


    return () => {
      mount.removeChild(renderer.domElement)
    }
  }, [])

  

  

  return (
    <div className="homepage-container">
      <ParticleBackground />
      <main className="main-content">
        <div className="headshot-container">
          <div className="profile-bg-blob">
            <img 
              src="/assets/headshot.jpg" 
              className="headshot-img-circle"
              alt="Headshot of Anton Chepaldin"
            />
          </div>
        </div>
        <div className="nameDisplay">
          <span className="terminalPrefix" aria-hidden="true">&gt;</span>
          <span className="name-glitch">
            Anton_Chepaldin
            <span className="cursor" aria-hidden="true">_</span>
          </span>
        </div>
        <h1 className="sr-only">Anton Chepaldin</h1>
        <p className="founder-title">AI, systems and human behaviour</p>
        <p className="bio-text">
          I work at the intersection of AI, systems and human behaviour. I reduce ambiguity so organisations can move with clarity.
        </p>
        <section className="outcomes" aria-labelledby="outcomes-heading">
          <h2 id="outcomes-heading" className="sr-only">Selected outcomes</h2>
          <details ref={detailsRef} className="outcomes-details">
            <summary
              className="outcomes-summary"
              onClick={(e) => {
                e.preventDefault()
                if (outcomesOpen) smoothClose()
                else openPopover()
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  if (outcomesOpen) smoothClose()
                  else openPopover()
                }
              }}
            >
              <span className="outcomes-seeall">Impact</span>
              <span className={"outcomes-rolling" + (fading ? " is-fading" : "")} aria-hidden="true">{outcomes[rollingIndex]}</span>
            </summary>
            <div
              ref={popoverRef}
              className={`outcomes-popover ${outcomesOpen ? 'is-open' : ''}`}
              role="region"
              aria-label="Selected outcomes"
            >
              <button
                type="button"
                className="outcomes-close"
                aria-label="Close outcomes"
                onClick={smoothClose}
              >
                Close
              </button>
              <div className="outcomes-scroll">
                <ul className="outcomes-list">
                  <li>Enterprise GenAI programme trained <strong className="figure">10,000+</strong> colleagues with <strong className="figure">97%</strong> satisfaction and <span className="key">two awards</span>.</li>
                  <li>AI mapping tool exposed complexity in the global IT delivery model and <span className="key">prompted a redesign by senior leaders</span>.</li>
                  <li>Neurodiversity network grew from <strong className="figure">~20</strong> to <strong className="figure">400 active members, 4000+ network</strong> across <strong className="figure">9</strong> countries with a scalable playbook.</li>
                  <li>Global innovation hackathons mobilised <strong className="figure">330+</strong> colleagues across <strong className="figure">9</strong> countries to deliver <strong className="figure">69</strong> solutions; recognised by <strong className="figure">2</strong> enterprise awards.</li>
                  <li>Delivered AI workshops for senior leaders and employee representatives, helping teams <span className="key">apply AI with confidence</span>.</li>
                  <li>AI toolkit helped markets localise global brand content <span className="key">far faster</span>, reducing manual rework.</li>
                  <li>Synspire’s AI engine gave artists and labels audience insights in <strong className="figure">minutes</strong>, not days.</li>
                </ul>
              </div>
            </div>
          </details>
        </section>

        <a
          className="socialButton linkedinButton primary-cta"
          href="https://www.linkedin.com/in/anton-chepaldin/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="buttonText" data-text="Connect on LinkedIn">Connect on LinkedIn</span>
        </a>
        <div className="social-buttons">
          <a
            className="socialButton githubButton"
            href="https://github.com/Hook12aaa"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="bracket">[</span>
            <span className="buttonText" data-text="GitHub">GitHub</span>
            <span className="bracket">]</span>
          </a>
          <a
            className="socialButton kaggleButton"
            href="https://www.kaggle.com/chepaldin"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="bracket">[</span>
            <span className="buttonText" data-text="Kaggle">Kaggle</span>
            <span className="bracket">]</span>
          </a>
        </div>
      </main>
    </div>
  )
}

export default App
