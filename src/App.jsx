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
              src="/assets/headshot.jpeg" 
              alt="Anton Chepaldin headshot" 
              className="headshot-img-circle" 
            />
          </div>
        </div>
        <div className="nameDisplay">
          <span className="terminalPrefix">&gt;</span>
          <span className="name-glitch">
            Anton_Chepaldin
            <span className="cursor">_</span>
          </span>
        </div>
        <h1 style={{ visibility: 'hidden', height: 0, margin: 0, padding: 0 }}>Anton Chepaldin</h1>
        <p className="founder-title">Founder @ Synspire</p>
        <p className="bio-text">
          Building technology that connects artists and audiences.
          Passionate about AI, music, and meaningful innovation.
        </p>
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
            className="socialButton linkedinButton"
            href="https://www.linkedin.com/in/anton-chepaldin/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="bracket">[</span>
            <span className="buttonText" data-text="LinkedIn">LinkedIn</span>
            <span className="bracket">]</span>
          </a>
          <a
            className="socialButton synspireButton"
            href="https://synspireforartists.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="bracket">[</span>
            <span className="buttonText" data-text="Synspire">Synspire</span>
            <span className="bracket">]</span>
          </a>
        </div>
      </main>
    </div>
  )
}

export default App
