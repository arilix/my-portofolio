import React, { useState, useEffect, useCallback } from 'react';

// Import gambar
import profileImage from '../images/Profile.jpg';
import project1Image from '../images/project1.jpg';
import project2Image from '../images/project2.jpg';
import project3Image from '../images/project3.jpg';
import project4Image from '../images/project4.jpg';

const MatrixPortfolio = () => {
  const [columns, setColumns] = useState([]);

  const generateCharacter = useCallback(() => {
    const katakana = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const alphabet = katakana + latin + nums;
    return alphabet[Math.floor(Math.random() * alphabet.length)];
  }, []);

  useEffect(() => {
    const screenWidth = window.innerWidth;
    const columnWidth = 20; // Lebar setiap kolom dalam pixel
    const numberOfColumns = Math.floor(screenWidth / columnWidth);

    const generateColumn = (index) => {
      const columnHeight = Math.floor(Math.random() * 15) + 15; // 15-30 karakter
      const characters = Array.from({ length: columnHeight }, generateCharacter);
      const speed = Math.random() * 2 + 1; // Kecepatan antara 1-3 detik
      const delay = Math.random() * 2; // Delay awal antara 0-2 detik
      const left = `${(index / numberOfColumns) * 100}%`;

      return {
        characters,
        style: {
          left,
          animationDelay: `${delay}s`,
          '--speed': `${speed}s`,
        },
      };
    };

    const newColumns = Array.from({ length: numberOfColumns }, (_, i) => generateColumn(i));
    setColumns(newColumns);

    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newNumberOfColumns = Math.floor(newWidth / columnWidth);
      const newColumns = Array.from({ length: newNumberOfColumns }, (_, i) => generateColumn(i));
      setColumns(newColumns);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [generateCharacter]);

  // Data project
  const projects = [
    {
      id: 1,
      title: "Convolutional Neural Network (CNN)",
      description: "Description of project 1. Add your real project details here.",
      technologies: ["Python", "Tensorflow", "Keras"],
      image: project1Image,
    },
    {
      id: 2,
      title: "Internet of Things",
      description: "Description of project 2. Add your real project details here.",
      technologies: ["C/C++"],
      image: project2Image,
    },
    {
      id: 3,
      title: "Cryptography",
      description: "Description of project 3. Add your real project details here.",
      technologies: ["SHA-256", "Base-64", "RSA"],
      image: project3Image,
    },
    {
      id: 4,
      title: "ARM Machine",
      description: "Description of project 4. Add your real project details here.",
      technologies: ["ROS", "Arduino", "Raspberry", "Jetson" ],
      image: project4Image,
    },
  ];

  // Categorized skills (requested additions)
  const skillCategories = [
    {
      title: "Cloud & Virtualization",
      items: ["Docker (Intermediate)"]
    },
    {
      title: "Pemrograman",
      items: [
        "Python (Machine Learning, TensorFlow, CNN)",
        "C++ (Dasar, untuk robotika)",
        "Go (Dasar)"
      ]
    },
    {
      title: "Machine Learning",
      items: ["Klasifikasi citra dengan CNN (TensorFlow & Keras)"]
    },
    {
      title: "Robotika & Sistem Cerdas",
      items: [
        "ROS (Dasar)",
        "Computer Vision (OpenCV, CUDA)",
        "Drone Control Systems"
      ]
    },
    {
      title: "Sistem Operasi",
      items: ["Linux (CLI, konfigurasi dasar, server administration)"]
    },
    {
      title: "Pengembangan Web & Mobile",
      items: ["Laravel (PHP)", "JavaScript", "TypeScript", "React.js", "Flutter"]
    },
    {
      title: "Basis Data",
      items: ["SQL (MySQL/PostgreSQL)"]
    }
  ];

  return (
    <div className="min-h-screen bg-black text-emerald-400">
      {/* Top Navigation */}
      <nav
        className="fixed top-0 left-0 w-full z-20 bg-black/60 backdrop-blur border-b border-green-600"
        aria-label="Utama"
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-3 text-green-300">
          <span className="font-mono font-bold tracking-wider">arifin</span>
          <div className="flex items-center gap-6 text-sm">
            <a href="#beranda" className="hover:text-green-200 transition-colors">Beranda</a>
            <a href="#projects" className="hover:text-green-200 transition-colors">Project</a>
            <a href="#keahlian" className="hover:text-green-200 transition-colors">Keahlian</a>
            <a href="#media-sosial" className="hover:text-green-200 transition-colors">Media Sosial</a>
          </div>
        </div>
      </nav>

      {/* Matrix Rain Background */}
      <div className="matrix-rain-container fixed top-0 left-0 w-full h-full z-0 opacity-20 overflow-hidden">
        {columns.map((column, columnIndex) => (
          <div
            key={columnIndex}
            className="matrix-column absolute animate-matrix-fall"
            style={column.style}
          >
            {column.characters.map((char, charIndex) => (
              <span
                key={charIndex}
                className="matrix-character block"
                style={{
                  animationDelay: `${charIndex * 0.1}s`,
                }}
              >
                {char}
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* Cinematic ambient glows */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-emerald-400/10 blur-3xl animate-float-slow" />
        <div className="absolute bottom-0 right-0 w-[32rem] h-[32rem] rounded-full bg-emerald-300/10 blur-3xl animate-float" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-6 md:px-10 lg:px-12">
        {/* Hero */}
        <header className="max-w-6xl mx-auto pt-16 md:pt-24 pb-12 md:pb-16 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 md:mb-6">
            <span className="glow-text">Muchammad Noor Arifin</span>
          </h1>
          <p className="text-emerald-300/90 text-lg md:text-xl">
            Machine Learning • Robotics • Computer Vision • Cloud
          </p>
          <div className="mt-6 flex items-center justify-center gap-3 text-sm md:text-base text-emerald-300/80">
            <span className="px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/30">TensorFlow & Keras</span>
            <span className="px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/30">ROS</span>
            <span className="px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/30">OpenCV + CUDA</span>
            <span className="px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/30">Docker</span>
          </div>
        </header>

        {/* Profile & About Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto mb-12">
          <div className="md:col-span-1">
            <div className="glass neon-border rounded-xl p-3 md:p-4 hover:translate-y-0.5 transition-all duration-300">
              <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Profile</h2>
              <div className="w-full h-64 md:h-72 overflow-hidden rounded-lg">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="glass neon-border rounded-xl p-6 md:p-8 h-full hover:translate-y-0.5 transition-all duration-300">
              <h2 className="text-2xl font-bold mb-4">About Me</h2>
              <p className="text-emerald-200/90 leading-relaxed">
                Saya seorang developer yang fokus pada Machine Learning, Computer Vision, dan Robotika. 
                Saya suka membangun sistem cerdas end-to-end: dari data pipeline dan training model, hingga deployment yang terukur di lingkungan cloud/docker. 
                Rasa ingin tahu dan perhatian pada detail mendorong saya untuk membuat solusi yang tidak hanya berfungsi, tetapi juga elegan dan berdampak.
              </p>
            </div>
          </div>
        </div>

        {/* Projects Section */}
        <section className="max-w-6xl mx-auto mb-12">
          <h2 className="section-title">Projects</h2>
          <div className="space-y-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="glass neon-border rounded-xl p-4 md:p-5 hover:translate-y-0.5 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row gap-5 md:gap-6">
                  <div className="md:w-1/3">
                    <div className="w-full h-48 md:h-40">
                      <img
                        src={project.image}
                        alt={`Project ${project.id}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <h3 className="text-xl font-bold mb-2 glow-text-sm">{project.title}</h3>
                    <p className="mb-4 text-emerald-200/90">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-2.5 py-1 text-sm rounded border border-emerald-400/40 bg-emerald-400/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section (categorized) */}
        <section className="max-w-6xl mx-auto mb-12">
          <h2 className="section-title">Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillCategories.map((group) => (
              <div key={group.title} className="glass neon-border rounded-xl p-5 hover:translate-y-0.5 transition-all duration-300">
                <h3 className="text-lg font-semibold mb-3 glow-text-sm">{group.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="px-2.5 py-1 rounded bg-emerald-400/10 border border-emerald-400/40 text-emerald-200/90 text-sm">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="max-w-6xl mx-auto text-center pb-16">
          <h2 className="section-title">Contact</h2>
          <div className="flex justify-center gap-6 text-emerald-200/90">
            <a href="https://github.com/arilix" className="link-soft">
              GitHub
            </a>
            <a href="https://linkedin.com/in/yourusername" className="link-soft">
              LinkedIn
            </a>
            <a href="mailto:noorarifin846@gmail.com" className="link-soft">
              Email
            </a>
            <a href="https://www.instagram.com/arifin__noor/profilecard/?igsh=cmEyMHp6aHpkbTMx" className="link-soft">
              Instagram
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MatrixPortfolio;

