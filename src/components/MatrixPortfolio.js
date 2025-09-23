import React, { useState, useEffect, useCallback } from 'react';

// Import gambar
import profileImage from '../images/Profile.jpg';
// Small icons for projects
import { CpuChipIcon, Cog6ToothIcon, LockClosedIcon, WrenchScrewdriverIcon, Squares2X2Icon, BeakerIcon, RocketLaunchIcon, EyeIcon } from '@heroicons/react/24/outline';

const MatrixPortfolio = () => {
  const [columns, setColumns] = useState([]);
  const [animKey, setAnimKey] = useState(0);

  const generateCharacter = useCallback(() => {
    const katakana = 'ã‚¢ã‚¤ã‚¦ã‚¨ã‚ªã‚«ã‚­ã‚¯ã‚±ã‚³ã‚µã‚·ã‚¹ã‚»ã‚½ã‚¿ãƒãƒ„ãƒ†ãƒˆãƒŠãƒ‹ãƒŒãƒãƒŽãƒãƒ’ãƒ•ãƒ˜ãƒ›ãƒžãƒŸãƒ ãƒ¡ãƒ¢ãƒ¤ãƒ¦ãƒ¨ãƒ©ãƒªãƒ«ãƒ¬ãƒ­ãƒ¯ãƒ²ãƒ³';
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

  // Re-trigger animations on in-page navigation
  useEffect(() => {
    const restartAnimations = () => {
      setAnimKey((k) => k + 1);
      const blocks = document.querySelectorAll('.reveal-up');
      blocks.forEach((el) => el.classList.remove('in'));
    };

    const onHash = () => restartAnimations();
    const onClick = (e) => {
      const a = e.target.closest && e.target.closest('a[href^="#"]');
      if (a) restartAnimations();
    };

    window.addEventListener('hashchange', onHash);
    document.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('hashchange', onHash);
      document.removeEventListener('click', onClick);
    };
  }, []);

  // Reveal blocks on scroll
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('in');
          else entry.target.classList.remove('in');
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -5% 0px' }
    );
    const nodes = document.querySelectorAll('.reveal-up');
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [animKey]);

  // Data project (tanpa foto, gunakan small icon)
  const projects = [
    {
      id: 1,
      title: "Convolutional Neural Network (CNN)",
      description: "Image classification pipeline end‑to‑end: data prep & augmentation, CNN model (TensorFlow/Keras), training & evaluation (accuracy/F1), dan export untuk deployment.",
      technologies: ["Python", "Tensorflow", "Keras"],
      icon: CpuChipIcon,
    },
    {
      id: 2,
      title: "Internet of Things",
      description: "Perangkat IoT berbasis mikrokontroler (C/C++) dengan sensor/actuator, komunikasi MQTT/HTTP, dan dashboard monitoring di cloud.",
      technologies: ["C/C++", "MQTT", "HTTP"],
      icon: Cog6ToothIcon,
    },
    {
      id: 3,
      title: "Cryptography",
      description: "Implementasi algoritma kriptografi: hashing (SHA‑256), encoding (Base64), dan RSA (keygen, encrypt/decrypt) untuk kanal data yang aman.",
      technologies: ["SHA-256", "Base-64", "RSA"],
      icon: LockClosedIcon,
    },
    {
      id: 4,
      title: "ARM Machine",
      description: "Sistem kontrol lengan robot berbasis ROS: inverse kinematics, perencanaan gerak sederhana, dan integrasi Arduino/Raspberry/Jetson.",
      technologies: ["ROS", "Arduino", "Raspberry", "Jetson" ],
      icon: WrenchScrewdriverIcon,
    },
    {
      id: 5,
      title: "Growing Neural Gas (GNG)",
      description: "Implementasi GNG untuk clustering/topological mapping pada data fitur.",
      technologies: ["Python", "GNG", "NumPy"],
      icon: Squares2X2Icon,
    },
    {
      id: 6,
      title: "RANSAC Model Fitting",
      description: "Estimasi robust (garis/plane) menggunakan RANSAC dengan OpenCV.",
      technologies: ["RANSAC", "OpenCV", "Python"],
      icon: BeakerIcon,
    },
    {
      id: 7,
      title: "Drone PX4 (Autonomous)",
      description: "Kontrol dan navigasi drone berbasis PX4 dengan ROS/MAVSDK.",
      technologies: ["PX4", "ROS", "MAVSDK", "QGroundControl"],
      icon: RocketLaunchIcon,
    },
    {
      id: 8,
      title: "YOLOv11 (ONNX)",
      description: "Deteksi objek real-time menggunakan YOLOv11 (export ONNX) dengan inferensi ONNX/OpenCV.",
      technologies: ["YOLOv11", "ONNX", "OpenCV"],
      icon: EyeIcon,
    },
  ];

  // Categorized skills (requested additions)
  const skillCategories = [
    {
      title: "Cloud & Virtualization",
      items: ["Docker (Intermediate)", "Microsoft Azure", "Google Cloud Platform"]
    },
    {
      title: "Bahasa Pemrograman",
      items: [
        "Python",
        "C/C++",
        "C#",
        "Go",
        "PHP",
        "JavaScript",
        "TypeScript"
      ]
    },
    {
      title: "Machine Learning",
      items: ["TensorFlow", "Keras", "PyTorch", "ONNX Runtime"]
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
      items: ["Linux (CLI, konfigurasi dasar, server administration)", "Windows"]
    },
    {
      title: "Pengembangan Web & Mobile",
      items: ["HTML", "CSS", "Laravel (PHP)", "JavaScript", "TypeScript", "React.js", "Flutter"]
    },
    {
      title: "Cyber Security",
      items: ["Nmap", "Hydra", "SQL Injection", "Wireshark"]
    },
    {
      title: "Basis Data",
      items: ["MySQL", "PostgreSQL", "Eloquent ORM (Laravel)"]
    }
  ];

  // Build ticker items from skills with normalization
  const normalizeSkill = (s) => {
    if (s.startsWith('Computer Vision')) return 'OpenCV + CUDA';
    if (s.startsWith('ROS')) return 'ROS';
    if (s.startsWith('Linux')) return 'Linux';
    if (s === 'Docker (Intermediate)') return 'Docker';
    if (s === 'React.js') return 'React';
    if (s === 'Google Cloud Platform') return 'Google Cloud';
    if (s === 'Eloquent ORM (Laravel)') return 'Eloquent ORM';
    return s;
  };

  const allSkillsFlat = skillCategories.flatMap((g) => g.items.map(normalizeSkill));
  const tickerPool = Array.from(new Set([
    'TensorFlow & Keras',
    'ROS',
    'OpenCV + CUDA',
    'Docker',
    ...allSkillsFlat,
  ]));

  const [chipIndex, setChipIndex] = useState(0);

  useEffect(() => {
    setChipIndex(0);
    const interval = setInterval(() => {
      setChipIndex((i) => (i + 1) % Math.max(1, tickerPool.length));
    }, 2800);
    return () => clearInterval(interval);
  }, [animKey, tickerPool.length]);

  const getChips = () => {
    if (tickerPool.length === 0) return [];
    const out = [];
    for (let k = 0; k < 4; k++) {
      out.push(tickerPool[(chipIndex + k) % tickerPool.length]);
    }
    return out;
  };

  return (
    <div className="min-h-screen bg-black text-emerald-400">
      {/* Top Navigation */}
      <nav
        className="fixed top-0 left-0 w-full z-20 bg-black/60 backdrop-blur border-b border-green-600 animate-fade-in-down"
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
      <div className="relative z-10 pt-24 px-6 md:px-10 lg:px-12">
        {/* Hero */}
        <header key={`hero-${animKey}`} className="max-w-6xl mx-auto pt-16 md:pt-24 pb-12 md:pb-16 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 md:mb-6">
            <span className="inline-flex items-baseline gap-6">
              <span className="glow-text animate-slide-in-left-slow">Muchammad</span>
              <span className="glow-text animate-slide-in-right-slow">Noor Arifin</span>
            </span>
          </h1>
          <p className="text-emerald-300/90 text-lg md:text-xl animate-fade-in">
            Machine Learning • Robotics • Computer Vision • Cloud
          </p>
                    <div className="mt-6 flex items-center justify-center gap-3 text-sm md:text-base text-emerald-300/80">
            {getChips().map((label, idx) => (
              <span
                key={`${label}-${idx}-${chipIndex}`}
                className={`px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/30 chip-run anim-loop-${(idx % 4) + 1}`}
              >
                {label}
              </span>
            ))}
          </div>
        </header>

        {/* Profile & About Section */}
        <div id="beranda" className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto mb-12 scroll-mt-24">
          <div className="md:col-span-1">
            <div className="glass neon-border rounded-xl p-3 md:p-4 hover:translate-y-0.5 transition-all duration-300 reveal-up">
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
            <div className="glass neon-border rounded-xl p-6 md:p-8 h-full hover:translate-y-0.5 transition-all duration-300 reveal-up">
              <h2 className="text-2xl font-bold mb-4">About Me</h2>
              <p className="text-emerald-200/90 leading-relaxed">
               Saya seorang developer dengan minat di Machine Learning, Computer Vision, dan Robotika.
Berpengalaman membangun sistem dari tahap pengolahan data, pelatihan model, hingga deployment di cloud/docker.
Saya senang mengutak-atik detail dan mencari solusi yang benar-benar berguna, bukan sekadar jalan.
              </p>
            </div>
          </div>
        </div>

        {/* Projects Section */}
        <section id="projects" className="max-w-6xl mx-auto mb-12 scroll-mt-24">
          <h2 className="section-title">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => {
              const Icon = project.icon;
              return (
                <div
                  key={project.id}
                  className="glass neon-border rounded-xl p-4 md:p-5 hover:translate-y-0.5 transition-all duration-300 h-full reveal-up"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg border border-emerald-400/40 bg-emerald-400/10 flex items-center justify-center">
                      {Icon && <Icon className="w-6 h-6 text-emerald-300" />}
                    </div>
                    <div className="flex-1">
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
              );
            })}
          </div>
        </section>

        {/* Skills Section (categorized) */}
        <section id="keahlian" className="max-w-6xl mx-auto mb-12 scroll-mt-24">
          <h2 className="section-title">Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillCategories.map((group) => (
              <div key={group.title} className="glass neon-border rounded-xl p-5 hover:translate-y-0.5 transition-all duration-300 reveal-up">
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
        <section id="media-sosial" className="max-w-6xl mx-auto text-center pb-16 scroll-mt-24">
          <h2 className="section-title">Media Sosial</h2>
          <div className="flex flex-wrap justify-center gap-6 text-emerald-200/90 reveal-up">
            <a href="https://github.com/arilix" className="link-soft" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href="https://linkedin.com/in/yourusername" className="link-soft" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href="mailto:noorarifin846@gmail.com" className="link-soft">
              Email
            </a>
            <a href="https://www.instagram.com/arifin__noor/profilecard/?igsh=cmEyMHp6aHpkbTMx" className="link-soft" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a href="https://wa.me/6285641595347" className="link-soft" target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
            <a href="https://t.me/arilix46" className="link-soft" target="_blank" rel="noopener noreferrer">
              Telegram
            </a>
            <a href="https://discord.gg/uptmu9BJ" className="link-soft" target="_blank" rel="noopener noreferrer">
              Discord
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MatrixPortfolio;







