import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import './App.css'
import ParticleBackground from './ParticleBackground'
import { pickInitialOutcomeIndex } from './personalization'
import outcomes from './data/outcomes'
import useImpactRotation from './hooks/useImpactRotation'
import { Analytics } from '@vercel/analytics/react'

function App() {
  const mountRef = useRef(null)
  const initialOutcomeIndex = pickInitialOutcomeIndex(outcomes)
  const { rollingIndex, fading } = useImpactRotation(outcomes, false, initialOutcomeIndex)

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
          <div className="outcomes-summary" role="presentation">
            <span className="outcomes-seeall">Impact</span>
            <span className={"outcomes-rolling" + (fading ? " is-fading" : "")} aria-hidden="true">{outcomes[rollingIndex]}</span>
          </div>
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
      <Analytics />
    </div>
  )
}

export default App
