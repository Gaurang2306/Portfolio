// Import necessary libraries
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

// Initialize GSAP and ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// ==========================================
// Three.js Hero Background Animation
// ==========================================
function initThreeJsBackground() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / (window.innerHeight - 60), 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight - 60);
    renderer.setClearColor(0x0a0e27, 0.1);
    camera.position.z = 5;

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCnt = 100;
    const posArray = new Float32Array(particlesCnt * 3);

    for (let i = 0; i < particlesCnt * 3; i += 3) {
        posArray[i] = (Math.random() - 0.5) * 10;
        posArray[i + 1] = (Math.random() - 0.5) * 10;
        posArray[i + 2] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.08,
        color: 0x0066ff,
        transparent: true,
        opacity: 0.8,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Add some floating cubes
    const cubeGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const cubeMaterial = new THREE.MeshStandardMaterial({
        color: 0x00d4ff,
        wireframe: true,
        emissive: 0x0066ff,
        metalness: 0.8,
        roughness: 0.2,
    });

    for (let i = 0; i < 3; i++) {
        const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cube.position.set(
            (Math.random() - 0.5) * 8,
            (Math.random() - 0.5) * 8,
            (Math.random() - 0.5) * 8
        );
        cube.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
        scene.add(cube);
    }

    // Animation loop
    let animationId;
    const animate = () => {
        animationId = requestAnimationFrame(animate);

        particles.rotation.x += 0.0001;
        particles.rotation.y += 0.0002;

        scene.children.forEach((child) => {
            if (child instanceof THREE.Mesh) {
                child.rotation.x += 0.002;
                child.rotation.y += 0.003;
            }
        });

        renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
        camera.aspect = window.innerWidth / (window.innerHeight - 60);
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight - 60);
    };
    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationId);
        renderer.dispose();
    };
}

// ==========================================
// GSAP Animations
// ==========================================
function initHeroAnimations() {
    const words = document.querySelectorAll('.word');
    
    const tl = gsap.timeline();

    words.forEach((word, index) => {
        const letters = word.textContent.split('');
        word.textContent = '';

        letters.forEach((letter) => {
            const span = document.createElement('span');
            span.textContent = letter;
            span.style.display = 'inline-block';
            word.appendChild(span);
        });

        tl.from(
            word.querySelectorAll('span'),
            {
                opacity: 0,
                y: 20,
                stagger: 0.05,
                duration: 0.5,
            },
            index * 0.1
        );
    });

    gsap.from('.hero-subtitle', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.5,
    });

    gsap.from('.hero-cta', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.7,
    });
}

function initScrollAnimations() {
    // About section
    gsap.from('.about-text p', {
        scrollTrigger: {
            trigger: '.about',
            start: 'top 80%',
        },
        opacity: 0,
        x: -30,
        stagger: 0.2,
        duration: 0.8,
    });

    gsap.from('.image-wrapper', {
        scrollTrigger: {
            trigger: '.about',
            start: 'top 80%',
        },
        opacity: 0,
        x: 30,
        duration: 0.8,
    });

    // Skills section
    gsap.from('.skill-card', {
        scrollTrigger: {
            trigger: '.skills',
            start: 'top 80%',
        },
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.8,
    });

    // Projects section
    gsap.from('.project-card', {
        scrollTrigger: {
            trigger: '.projects',
            start: 'top 80%',
        },
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 0.8,
    });

    // Timeline
    gsap.from('.timeline-item', {
        scrollTrigger: {
            trigger: '.experience',
            start: 'top 80%',
        },
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.8,
    });

    // Contact section
    gsap.from('.contact-form', {
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 80%',
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
    });
}

// ==========================================
// Form Handling
// ==========================================
function initFormHandler() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const button = form.querySelector('button');
        const originalText = button.textContent;
        button.textContent = 'Sending...';
        button.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            button.textContent = 'Message Sent!';
            form.reset();
            
            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
            }, 2000);
        }, 1500);
    });
}

// ==========================================
// Navigation
// ==========================================
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            navLinks.forEach((l) => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Smooth scroll highlighting
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;

        document.querySelectorAll('section').forEach((section) => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach((link) => link.classList.remove('active'));
                const activeLink = document.querySelector(`a[href="#${section.id}"]`);
                if (activeLink) activeLink.classList.add('active');
            }
        });
    });
}

// ==========================================
// Back to Top Button
// ==========================================
function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        gsap.to(window, {
            duration: 1,
            scrollTo: 0,
            ease: 'power2.inOut',
        });
    });
}

// ==========================================
// Initialize All
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    initThreeJsBackground();
    initHeroAnimations();
    initScrollAnimations();
    initFormHandler();
    initNavigation();
    initBackToTop();

    console.log('[v0] Portfolio website initialized');
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    gsap.killTweensOf('*');
});