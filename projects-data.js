/* ===========================================================
   PROJECTS DATA
   Single source of truth for the Projects section.
   Edit this file to update project content — the UI in
   assets/js/projects.js renders everything from here.
=========================================================== */

const PROJECTS = [

  {
    id: "styleai",
    tag: "Flagship Project",
    title: "StyleAI",
    subtitle: "AI-Powered Virtual Fashion Try-On Platform",
    meta: {
      role: "Full Stack AI Developer",
      duration: "4 Months",
      platform: "Web Application",
      year: "2026",
      status: "Active Development"
    },
    overview:
      "Online shoppers often struggle to judge how a garment will look and fit before purchasing, leading to uncertainty and high product returns. StyleAI addresses this by providing an AI-powered virtual try-on experience that allows users to visualize clothing on their own photos. The system combines computer vision, body landmark detection, and intelligent garment alignment to generate realistic previews, helping users make more confident purchasing decisions while improving the overall online shopping experience.",
    techStack: [
      { group: "Frontend", items: ["React", "Vite", "JavaScript","HTML", "CSS"] },
      { group: "Backend", items: ["FastAPI", "Python"] },
      { group: "AI / CV", items: ["OpenCV", "MediaPipe", "NumPy"] },
      { group: "Database", items: ["PostgreSQL"] },
      { group: "Tools", items: ["Git", "GitHub", "VS Code", "Figma"] }
    ],
    features: [
      "AI-powered virtual try-on", "Real-time body landmark detection", "User authentication", "Body measurement estimation", "Recolored garment",
      "Garment Upload", "User Authentication", "History Tracking", "Responsive Design"
    ],
    images: {
    overview: "assets/images/projects/styleai/home.jpeg",
    tech: "assets/images/projects/styleai/register.jpeg",
    feature: "assets/images/projects/styleai/tryon.jpeg"
},
    repository: { type: "private", url: "", emailSubject: "Request for StyleAI Source Code" },
    demo: { available: false, url: "" }
  },

  {
    id: "empathai",
    tag: "AI · Emotion Intelligence",
    title: "EmpathAI",
    subtitle: "Speech-Based Emotion Recognition Assistant",
    meta: {
      role: "AI & Mobile Developer",
      duration: "3 Months",
      platform: "Mobile Application",
      year: "2025",
      status: "Completed"
    },
    overview:
      "Mental well-being and emotional awareness are often overlooked during everyday interactions, especially for elderly individuals who may not receive continuous support. EmpathAI provides an AI-driven voice assistant that listens to speech, identifies emotional cues from both voice and language, and responds empathetically. By combining speech recognition, emotion detection, multilingual support, and intelligent conversation, the system delivers personalized interactions while also supporting emergency assistance and user authentication.",
    techStack: [
      { group: "AI / NLP", items: ["Whisper", "Speech Processing", "NLP", "CNN-LSTM", "Librosa", "BERT", "Ollama(Phi-3)" ] },
      { group: "Backend", items: ["FastAPI", "Python"] },
      { group: "Mobile", items: ["Flutter"] },
      { group: "Database", items: ["SQLite"] },
      { group: "Tools", items: ["Git", "GitHub"] }
    ],
    features: [
      "Voice emotion recognition", "Speech-to-Text Pipeline", "Text sentiment analysis", "Personalized AI conversations", "Health History",
      "Clean Mobile UI", "Voice authentication","Emergency alert functionality", "Result Insights"
    ],
    images: {
    overview: "assets/images/projects/empathai/app.jpeg",
    tech: "assets/images/projects/empathai/speech.jpeg",
    feature: "assets/images/projects/empathai/alerts.jpeg"
},
    repository: { type: "public", url: "", emailSubject: "" },
    demo: { available: false, url: "" }
  },

  {
    id: "blockchain",
    tag: "Blockchain · Security",
    title: "Certificate Verification",
    subtitle: "Blockchain-Based Secure Certificate Verification",
    meta: {
      role: "Full Stack Developer",
      duration: "2 Months",
      platform: "Web Application",
      year: "2025",
      status: "Completed"
    },
    overview:
      "A tamper-proof way to issue and verify certificates. Every certificate is hashed and " +
      "anchored on-chain through a smart contract, and a QR code on the document lets anyone " +
      "confirm its authenticity in seconds - no phone calls to the issuing institution required.",
    techStack: [
      { group: "Blockchain", items: ["Smart Contracts", "Solidity"] },
      { group: "Frontend", items: ["React", "JavaScript"] },
      { group: "Backend", items: ["Node.js"] },
      { group: "Security", items: ["QR Verification", "Certificate Authentication"] }
    ],
    features: [
      "On-Chain Certificate Hashing", "QR Code Verification", "Tamper Detection",
      "Issuer Dashboard", "Public Verification Portal", "Smart Contract Storage"
    ],
    images: {
    overview: "assets/images/projects/blockchain/home.jpeg",
    tech: "assets/images/projects/blockchain/certificate.jpeg",
    feature: "assets/images/projects/blockchain/qrcode.jpeg"
},
    repository: { type: "public", url: "", emailSubject: "" },
    demo: { available: true, url: "" }
  },

  {
    id: "youtube",
    tag: "AI · NLP",
    title: "YouTube Transcript Summarizer",
    subtitle: "Turning Long Videos Into Short, Readable Summaries",
    meta: {
      role: "Backend & AI Developer",
      duration: "3 Weeks",
      platform: "REST API + Web App",
      year: "2025",
      status: "Completed"
    },
    overview:
      "Pulls the transcript straight from a YouTube link and condenses it using a mix of " +
      "extractive and abstractive summarization, so a 40-minute video becomes a 30-second read. " +
      "Built as a REST API first, so it can be dropped into other tools.",
    techStack: [
      { group: "AI / NLP", items: ["Python", "NLP", "Text Summarization"] },
      { group: "Backend", items: ["REST API"] },
      { group: "Tools", items: ["Git", "GitHub"] }
    ],
    features: [
      "Transcript Extraction", "Extractive + Abstractive Summarization",
      "REST API Endpoint", "Adjustable Summary Length", "Copy / Export Summary"
    ],
   images: {
    overview: "assets/images/projects/youtube/home.jpeg",
    tech: "assets/images/projects/youtube/transcript.jpeg",
    feature: "assets/images/projects/youtube/summarize.jpeg"
},
    repository: { type: "public", url: "", emailSubject: "" },
    demo: { available: true, url: "" }
  },

  {
    id: "batterkart",
    tag: "Full Stack · E-Commerce",
    title: "BatterKart",
    subtitle: "Full-Stack E-Commerce Platform",
    meta: {
      role: "Full Stack Developer",
      duration: "2 Months",
      platform: "Web Application",
      year: "2026",
      status: "Completed"
    },
    overview:
      "Small businesses often lack affordable digital platforms to manage products, customers, and online orders efficiently. BatterKart is a full-stack e-commerce application that enables customers to browse products, place orders, and securely manage their purchases while providing administrators with tools to manage inventory and orders. The platform streamlines the complete shopping workflow through secure authentication and an intuitive user interface.",
    techStack: [
      { group: "Backend", items: ["Spring Boot", "Java", "REST API"] },
      { group: "Frontend", items: ["React", "JavaScript", "HTML", "CSS"] },
      { group: "Database", items: ["PostgreSQL" , "Cloudinary"] },
      { group: "Core", items: ["Authentication", "Shopping Cart", "Orders", "Admin Panel"] }
    ],
    features: [
      "Secure user authentication", "Product Catalog management", "Shopping Cart functionality", "Order placement and Tracking",
      "Admin Dashborad", "Order History","Inventory management", "Responsive Design"
    ],
    images: {
    overview: "assets/images/projects/batterkart/Home.jpeg",
    tech: "assets/images/projects/batterkart/Admin.jpeg",
    feature: "assets/images/projects/batterkart/customer view.jpeg"
},
    repository: { type: "public", url: "", emailSubject: "" },
    demo: { available: true, url: "" }
  },

  {
    id: "medconnect",
    tag: "Healthcare · AI CRM",
    title: "MedConnect",
    subtitle: "AI-Powered CRM for Healthcare Providers",
    meta: {
      role: "Full Stack Developer",
      duration: "2 Months",
      platform: "Web Application",
      year: "2025",
      status: "Completed"
    },
    overview:
      "Healthcare providers often manage patient information across multiple systems, making follow-ups and communication inefficient. MedConnect centralizes patient interactions through an AI-powered CRM that organizes medical records, appointment history, and communication logs in one platform. Intelligent search and AI-assisted interaction summaries help healthcare professionals access patient information quickly, improving workflow efficiency and patient engagement.",
    techStack: [
      { group: "Frontend", items: ["React", "Redux", "JavaScript"] },
      { group: "Backend", items: ["Python","FastAPI", "REST API"] },
      { group: "AI", items: ["LangGraph", "Groq LLM", "NLP"] },
      { group: "Database", items: ["PostgreSQL"] },
      { group: "Tools", items: ["Git", "GitHub"] }
    ],
    features: [
      "Patient Records", "Appointment Scheduling", "AI-Based Patient Insights",
      "Follow-Up Reminders", "Provider Dashboard", "Secure Access Control"
    ],
    images: {
    overview: "assets/images/projects/medconnect/home.png",
    tech: "assets/images/projects/medconnect/doctor.png",
    feature: "assets/images/projects/medconnect/ai.png"
},
    repository: { type: "public", url: "", emailSubject: "" },
    demo: { available: true, url: "" }
  }

];
