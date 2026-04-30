import networkingImg from "../assets/networking.webp";
import hallImg from "../assets/hall.webp";
import visualImg from "../assets/visual.webp";
import onecctvImg from "../assets/onecctv.jpg";
import integratedImg from "../assets/integrated.jpg";
import oneparkingImg from "../assets/oneparking.jpg";
import controlsImg from "../assets/controls.jpg";
import homeImg from "../assets/home.jpg";

import networkingVideo from "../assets/networking-video.mp4";
import conferencingVideo from "../assets/conferencing-video.mp4";
import audioVideo from "../assets/audio-video.mp4";
import cctvVideo from "../assets/cctv-video.mp4";
import integrationVideo from "../assets/integration-video.mp4";
import parkingVideo from "../assets/parking-video.mp4";
import accessVideo from "../assets/access-video.mp4";
import smarthomeVideo from "../assets/smarthome-video.mp4";
// src/data/productsData.js
const products = [
  {
    id: 1,
    category: "Networking",
    title: "Passive Networking & Structured Cabling",
    sectionTitle: "The Foundation of | Your Digital Infrastructure",
    description: "In a connected world, your network is only as strong as its physical infrastructure. We provide comprehensive structured cabling solutions that serve as the lifeline of your IT operations. From data centers to office complexes, we design and install high-quality copper and fiber optic networks that ensure seamless data transfer and minimal downtime. Our team handles everything from cable routing and termination to racking and labeling, delivering a tidy, organized, and certified network environment that is easy to manage and ready for future technology upgrades.",
    longDescription: "Build a robust digital backbone with reliable and scalable solutions. Enterprise-grade technology for modern infrastructure needs.",
    detailedDescription: "Our structured cabling solutions provide the foundation for your entire network infrastructure. We design and install CAT6, CAT6A, and fiber optic cabling systems that ensure high-speed data transfer, minimal latency, and future scalability for your business.",
   image: networkingImg,
      heroText:
    "Build a robust digital backbone. High-performance fiber and copper infrastructure designed for speed, reliability, and future scalability.",
   
     video: networkingVideo,
    features: ["Fiber Optics", "CAT6 Cabling", "Network Racks", "24/7 Support"],
    benefits: [
      { icon: "Zap", title: "High Speed", desc: "10 Gbps data transfer" },
      { icon: "Shield", title: "Reliable", desc: "99.9% uptime guarantee" }
    ]
  },
  {
    id: 2,
    category: "Conferencig & Meeting Hall Solutions",
    title: "Conferencing & Meeting Hall Solutions",
    sectionTitle: "Transforming Meetings into | Seamless Experiences",
    description: "Modern business demands more than just a projector and a phone line. We engineer intelligent meeting spaces that foster collaboration and productivity. Our solutions integrate high-definition video conferencing, crystal-clear audio pickup, interactive smart boards, and wireless presentation systems into a single, easy-to-use interface. Whether you need a huddle room for quick brainstorms or a large-scale auditorium for town halls, we ensure that technology works invisibly in the background so you can focus on the conversation, not the cables.",
    longDescription: "Collaborate without boundaries. State-of-the-art video and audio conferencing solutions that bridge the gap between remote and in-person teams.",
    detailedDescription: "Modern business demands more than just a projector and a phone line. We engineer intelligent meeting spaces that foster collaboration and productivity. Our solutions integrate high-definition video conferencing, crystal-clear audio pickup, interactive smart boards, and wireless presentation systems into a single, easy-to-use interface. Whether you need a huddle room for quick brainstorms or a large-scale auditorium for town halls, we ensure that technology works invisibly in the background so you can focus on the conversation, not the cables.",
    image: hallImg,
      heroText:
    "Collaborate without boundaries. State-of-the-art video and audio conferencing solutions that bridge the gap between remote and in-person teams.",

     video: conferencingVideo,
    features: ["HD Video Conferencing", "Crystal Clear Audio", "Wireless Presentation", "Interactive Smart Boards", "Room Scheduling", "One-touch Meeting Start"],
    benefits: [
      { icon: "Video", title: "Seamless Video", desc: "4K video quality with auto-framing" },
      { icon: "Mic", title: "Studio Audio", desc: "Noise-cancelling microphones" }
    ]
  },
  {
    id: 3,
    category: "Audio Visual",
    title: "Audio & Visual Systems",
    sectionTitle: "Crystal Clear Sound | and Stunning Visuals",
    description: "We create sensory environments that leave a lasting impression. Our Audio-Visual (AV) expertise covers the full spectrum of commercial needs, including Public Address (PA) systems, background music for ambiance, digital signage, and large-format video walls. We carefully analyze the acoustics and lighting of your space to design systems that deliver uniform sound coverage and vibrant imagery. From emergency voice evacuation systems to entertainment setups in hotels and malls, our installations are designed for clarity, impact, and reliability.",
    longDescription: "Professional sound and display systems for businesses.",
    detailedDescription: "Our audio and visual systems deliver immersive experiences for presentations, events, and daily operations. From high-end speakers to large-format LED displays, we provide solutions that captivate audiences and convey your message with impact.",
    image: visualImg,
      heroText:
    "Captivate your audience with immersive experiences. Professional audio and visual solutions tailored for retail, hospitality, and corporate environments.",
    
     video: audioVideo,
    features: ["Sound Systems", "LED Screens", "Control Panels", "Digital Signage"],
    benefits: [
      { icon: "Headphones", title: "Premium Sound", desc: "Crystal clear audio" },
      { icon: "Monitor", title: "Stunning Visuals", desc: "4K LED displays" }
    ]
  },
  {
    id: 4,
    category: "Security",
    title: "Closed Circuit Television [CCTV] & VMS",
    sectionTitle: "Uncompromised Visibility | and Safety",
    description: "Security is not just about recording footage; it’s about having actionable intelligence. We deploy high-definition IP surveillance systems equipped with advanced analytics like motion detection, line crossing, and object tracking. Paired with powerful Video Management Software (VMS), our solutions allow you to monitor multiple locations from a central command center or a mobile device. Whether it’s night-vision capability for perimeter security or facial recognition for critical entry points, we provide the tools you need to detect, deter, and document security events effectively.",
    longDescription: "Advanced surveillance with AI analytics and monitoring.",
    detailedDescription: "Protect your assets with our advanced CCTV and Video Management Systems. Our solutions feature AI-powered analytics, remote monitoring capabilities, and high-resolution cameras that provide 24/7 security for your facility.",
    image: onecctvImg,
      heroText:
    "24/7 intelligent surveillance. Advanced IP camera systems and Video Management Software (VMS) for total situational awareness.",
    
     video: cctvVideo,
    features: ["4K Cameras", "Remote Access", "AI Analytics", "Motion Detection"],
    benefits: [
      { icon: "Camera", title: "4K Quality", desc: "Crystal clear footage" },
      { icon: "Cloud", title: "Cloud Storage", desc: "30-day backup" }
    ]
  },
  {
    id: 5,
    category: "Security",
    title: "Integrated Security Solutions",
    sectionTitle: "Comprehensive Protection, | Unified",
    description: "Managing disjointed security systems creates gaps that vulnerabilities can exploit. Our Integrated Security Solutions bring your CCTV, intrusion detection, fire alarms, and perimeter fencing into a single, unified platform. This convergence allows for automated responses—such as a camera zooming in when a door is forced open or lights flashing when a perimeter breach is detected. We design holistic security architectures that provide layered protection for critical infrastructure, commercial buildings, and industrial facilities, ensuring that threats are neutralized before they escalate.",
    longDescription: "Unified platform combining access control, intrusion detection, and video surveillance.",
    detailedDescription: "Our Integrated Security Solutions combine access control, intrusion detection, and video surveillance into a single unified platform. This holistic approach ensures no security gaps and provides complete visibility of your facility.",
     image: integratedImg,
      heroText:
    "A unified shield for your assets. Bringing alarms, surveillance, and perimeter protection into one cohesive security ecosystem.",

     video: integrationVideo,
    features: ["Biometrics", "Real-time Alerts", "Central Management", "Access Control"],
    benefits: [
      { icon: "Fingerprint", title: "Biometric Access", desc: "Secure authentication" },
      { icon: "Bell", title: "Instant Alerts", desc: "Real-time notifications" }
    ]
  },
  {
    id: 6,
    category: "Parking",
    title: "Parking Control & Parking Guidance",
    sectionTitle: "Intelligent | Parking  Management",
    description: "First impressions often start in the parking lot. We implement smart parking solutions that reduce congestion and improve user convenience. Our systems include automated boom barriers, ticket dispensers, and ANPR (Automatic Number Plate Recognition) for frictionless entry. Inside the facility, our sensor-based Parking Guidance System (PGS) uses LED indicators and digital signage to guide drivers instantly to available spots, eliminating the frustration of circling for space. This not only improves customer satisfaction but also maximizes facility utilization and revenue generation.",
    longDescription: "Smart parking solutions with real-time guidance and automated payment integration.",
    detailedDescription: "Our smart parking solutions eliminate the frustration of finding parking spots. With real-time guidance systems, ANPR technology, and automated payment integration, we transform parking facilities into efficient, user-friendly spaces.",
    image: oneparkingImg,
      heroText:
    "Optimize traffic flow and maximize space. Smart barriers, ticketing systems, and sensor-based guidance for a stress-free parking experience.",
  
     video: parkingVideo,
    features: ["ANPR", "Space Detection", "Mobile Payment", "Barrier Control"],
    benefits: [
      { icon: "Car", title: "Smart Guidance", desc: "Real-time space detection" },
      { icon: "CreditCard", title: "Cashless Payment", desc: "Mobile payments" }
    ]
  },
  {
    id: 7,
    category: "Security",
    title: "Access Control & E-Gates",
    sectionTitle: "Secure Entry Management | for Modern Facilities",
    description: "Controlling who enters your facility is the first line of defense. We provide sophisticated Access Control solutions ranging from standard RFID card readers to advanced biometric scanners (fingerprint, face, iris). For high-traffic areas, we install robust E-Gates, turnstiles, and flap barriers that ensure orderly pedestrian flow while preventing unauthorized tailgating. Our systems seamlessly integrate with time-attendance software and visitor management systems, giving you a complete audit trail of everyone who enters and exits your building.",
    longDescription: "Advanced entry solutions with biometric verification and automated barrier systems.",
    detailedDescription: "Control who enters your facility with our advanced access control systems. From biometric scanners to RFID cards and automated e-gates, we provide secure, convenient entry solutions for businesses of all sizes.",
   image: controlsImg,
      heroText:
    "Define boundaries and control movement. Secure biometric, RFID, and mobile access systems for authorized personnel only.",
    
     video: accessVideo,
    features: ["Facial Recognition", "RFID", "Remote Access", "Audit Trail"],
    benefits: [
      { icon: "Lock", title: "Secure Entry", desc: "Multi-factor authentication" },
      { icon: "Key", title: "Remote Access", desc: "Control from anywhere" }
    ]
  },
  {
    id: 8,
    category: "Automation",
    title: "Smart Home & Automation Systems",
    sectionTitle: "The Future of | Living is Intelligent",
    description: "Experience a home that responds to your needs. Our Smart Home & Automation systems allow you to control lighting, temperature, curtains, and media from a single app or via voice commands. We design systems that not only add luxury but also improve energy efficiency—dimming lights when rooms are empty or adjusting the AC based on sunlight. From smart locks and video doorbells to mood-based lighting scenes, we customize automation to fit your lifestyle, creating an environment that is secure, efficient, and effortlessly comfortable.",
    longDescription: "Complete home automation including lighting control, climate, and security integration.",
    detailedDescription: "Transform your home into a smart, automated environment. Our systems integrate lighting, climate control, security, and entertainment into a seamless, voice-controlled experience that enhances comfort and energy efficiency.",
    image: homeImg,
      heroText:
    "Comfort, convenience, and control at your fingertips. Elevate your living space with intelligent lighting, climate, and security automation.",
    
     video: smarthomeVideo,
    features: ["Voice Control", "Energy Saving", "Scene Automation", "Remote Monitoring"],
    benefits: [
      { icon: "Home", title: "Smart Living", desc: "Voice-controlled automation" },
      { icon: "Zap", title: "Energy Efficient", desc: "Reduce utility costs" }
    ]
  }
];

export default products;