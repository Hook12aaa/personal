import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import './App.css'
import ParticleBackground from './ParticleBackground'

function App() {
  const mountRef = useRef(null)

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
