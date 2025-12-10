import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Code, Download, AlertTriangle } from 'lucide-react';
import { Code2 } from 'phosphor-react';
import { css } from '@codemirror/lang-css';
import { html } from '@codemirror/lang-html';
import { javascript } from '@codemirror/lang-javascript';
import CodeMirror from '@uiw/react-codemirror';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { ReactFlow } from '@xyflow/react';
import { Application } from '@spline/runtime';
import { Rive } from '@rive-app/react-canvas';
import Lottie from 'lottie-react';
import anime from 'animejs';
import gsap from 'gsap';
import barba from '@barba/core';
import Lenis from 'lenis';
import showdown from 'showdown';
import Highlight from 'prism-react-renderer';
import regl from 'regl';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { Button } from '@radix-ui/react-button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@radix-ui/react-tooltip';
import { BarChart } from '@tremor/react';

// Simple Lottie animation data (inline for demo)
const animationData = {
  v: '5.5.2',
  fr: 60,
  ip: 0,
  op: 60,
  w: 400,
  h: 400,
  nm: 'Simple Anim',
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: 'Shape',
      sr: 1,
      ks: { o: { a: 0, k: 100 }, r: { a: 0, k: 0 }, p: { a: 0, k: [200, 200, 0] }, a: { a: 0, k: [0, 0, 0] }, s: { a: 0, k: [100, 100, 100] } },
      ao: 0,
      shapes: [{ ty: 'rc', d: 1, s: { a: 0, k: [100, 100] }, p: { a: 0, k: [0, 0] }, r: { a: 0, k: 0 } }],
      ip: 0,
      op: 60,
      st: 0,
      bm: 0,
    },
  ],
};

// Simple ReactFlow nodes/edges
const nodes = [{ id: '1', position: { x: 0, y: 0 }, data: { label: 'Project Node' } }];
const edges = [];

// Mux Logo SVG
const MuxLogo = () => (
  <svg height="385" viewBox="0 0 1124 385" width="1124" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
    <path d="M468.253 43.25c-6.119 12.696-12.584 26.616-15.208 32.75-1.765 4.125-4.522 10.284-6.127 13.687S444 96.116 444 96.413s-2.25 5.285-5 11.087-5 10.704-5 10.893-2.649 5.915-5.886 12.725c-7.919 16.657-11.132 23.719-18.781 41.279-5.816 13.353-9.16 20.746-16.779 37.103a3707 3707 0 0 0-5.323 11.5 2194 2194 0 0 1-7.97 17c-12.693 26.781-20.416 44.348-20.581 46.81-.153 2.279.202 2.671 2.32 2.566 1.375-.068 3.85-.589 5.5-1.156s4.575-1.558 6.5-2.202 6.2-2.219 9.5-3.5 7.575-2.89 9.5-3.573c1.925-.684 4.4-1.6 5.5-2.035s6.05-2.019 11-3.519c9.765-2.96 46.602-15.033 55.5-18.189 8.523-3.023 20.75-7.109 29-9.691 8.075-2.526 16.105-5.214 36.5-12.214 34.495-11.839 35.567-12.047 44.524-8.614 5 1.916 9.908 3.44 30.476 9.462 3.85 1.127 8.125 2.425 9.5 2.883s7.225 2.258 13 3.997c5.775 1.74 11.625 3.538 13 3.997 5.006 1.668 25.654 7.908 31.5 9.519 3.3.909 8.198 2.509 10.883 3.556 2.686 1.047 5.374 1.903 5.972 1.903 1.233 0 11.721 3.11 22.145 6.565 3.85 1.277 11.5 3.475 17 4.885 5.5 1.411 10.9 2.944 12 3.408 3.726 1.571 8.978 3.279 14.838 4.825 8.849 2.336 9.169 1.238 3.053-10.467-2.793-5.344-6.311-12.191-7.818-15.216s-3.402-6.625-4.211-8-2.162-4.075-3.006-6-4.194-8.991-7.445-15.702S729 209.621 729 209.04c0-.582-2.535-5.441-5.634-10.799-3.098-5.357-6.412-11.541-7.364-13.741-2.29-5.297-8.228-17.798-19.633-41.336-5.153-10.634-9.369-19.59-9.369-19.902 0-.562-23.503-48.563-33.178-67.762-5.73-11.369-6.64-12.702-8.397-12.293-1.081.251-15.877 15.739-21.925 22.948-1.1 1.312-4.671 5.301-7.936 8.865a5487 5487 0 0 0-14.5 15.919c-4.71 5.191-9.497 10.366-10.637 11.5-3.647 3.626-25.776 27.968-30.095 33.104l-4.168 4.957-5.451-6c-2.998-3.3-8.322-9.388-11.832-13.528-3.509-4.14-8.661-10.215-11.448-13.5-2.786-3.285-9.969-12.047-15.961-19.472-5.991-7.425-13.841-16.875-17.444-21s-8.782-10.408-11.511-13.962c-5.365-6.989-10.375-11.962-12.098-12.009-.595-.016-1.569.984-2.166 2.221m157.612 98.104C601.354 168.088 597 172.995 597 173.89c0 .963 6.028 3.092 8.79 3.104.709.003 2.959.83 5 1.838 2.04 1.007 6.41 2.401 9.71 3.098s7.575 1.87 9.5 2.608c1.925.737 5.3 1.891 7.5 2.564s6.7 2.239 10 3.48c6.994 2.63 13.925 4.082 13.378 2.803-.208-.488-6.565-13.438-14.128-28.778-7.562-15.341-13.75-28.278-13.75-28.75 0-1.757-1.649-.487-7.135 5.497m-145.271-.636c-1.048 2.63-4.147 9.507-6.886 15.282-7.56 15.937-15.812 34.259-16.438 36.5-.307 1.1-1.008 2.573-1.557 3.274-1.797 2.294-.071 2.332 5.825.126 3.19-1.194 7.862-2.75 10.381-3.458s10.431-3.307 17.581-5.776 16.262-5.491 20.25-6.716c6.624-2.036 8.503-3.226 6.5-4.117-.413-.183-2.535-2.583-4.716-5.333s-4.206-5.225-4.5-5.5c-.937-.877-12.409-14.32-16.545-19.387a1179 1179 0 0 0-5.989-7.282l-2-2.395z" fill-rule="evenodd" />
  </svg>
);

const Editor = () => {
  const canvasRef = useRef(null);
  const hackerRef = useRef(null);
  const splineCanvasRef = useRef(null);
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(0);
  const [error, setError] = useState(false);
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  // TipTap editor for readme (prose editing)
  const tiptapEditor = useEditor({
    extensions: [StarterKit],
    content: projects[currentProject]?.readme || '',
    onUpdate: ({ editor }) => {
      const newProjects = [...projects];
      newProjects[currentProject].readme = editor.getHTML();
      setProjects(newProjects);
    },
  });

  // Load projects from persistent storage
  useEffect(() => {
    const saved = localStorage.getItem('muxide-projects');
    if (saved) {
      setProjects(JSON.parse(saved));
    } else {
      setProjects([{ name: 'Project 1', html: '<h1>Hello World</h1>', css: 'body { background: white; }', js: 'console.log("Hello");', readme: '# Readme' }]);
    }
  }, []);

  // Save to persistent storage
  useEffect(() => {
    localStorage.setItem('muxide-projects', JSON.stringify(projects));
  }, [projects]);

  // Lenis for smooth scroll
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  // Barba.js for transitions (example setup, even if single-page)
  useEffect(() => {
    barba.init({
      transitions: [{
        name: 'fade',
        leave(data) {
          return gsap.to(data.current.container, { opacity: 0, duration: 0.5 });
        },
        enter(data) {
          return gsap.from(data.next.container, { opacity: 0, duration: 0.5 });
        },
      }],
    });
  }, []);

  // Anime.js animation
  useEffect(() => {
    anime({
      targets: '.anime-elem',
      translateX: [0, 50],
      duration: 1000,
      loop: true,
      direction: 'alternate',
    });
  }, []);

  // GSAP animation
  useEffect(() => {
    gsap.to('.gsap-elem', { x: 100, duration: 1, repeat: -1, yoyo: true });
  }, []);

  // Regl for plasma background / gradient blobs (simple example; Navier-Stokes approximated via wave-like fluid motion)
  useEffect(() => {
    if (!canvasRef.current) return;
    const reg = regl(canvasRef.current);
    const drawPlasma = reg({
      frag: `
        precision mediump float;
        uniform float time;
        uniform vec2 resolution;
        void main() {
          vec2 uv = gl_FragCoord.xy / resolution;
          float c = sin(uv.x * 10.0 + time) * cos(uv.y * 10.0 + time * 0.5);
          gl_FragColor = vec4(abs(sin(c)), abs(cos(c)), abs(sin(c * 1.5)), 1.0);
        }
      `,
      vert: `
        precision mediump float;
        attribute vec2 position;
        void main() {
          gl_Position = vec4(position, 0, 1);
        }
      `,
      attributes: { position: [-2, 0, 0, -2, 2, 2] },
      uniforms: {
        time: ({ tick }) => tick * 0.05,
        resolution: reg.prop('resolution'),
      },
      count: 3,
    });
    reg.frame(({ viewportWidth, viewportHeight }) => {
      reg.clear({ color: [0, 0, 0, 1] });
      drawPlasma({ resolution: [viewportWidth, viewportHeight] });
    });
  }, []);

  // Hacker text decoration (typing effect from React Bits inspiration)
  useEffect(() => {
    const text = 'Hacking the matrix... 010101';
    let i = 0;
    const type = () => {
      if (i < text.length) {
        hackerRef.current.innerText += text.charAt(i);
        i++;
        setTimeout(type, 100);
      }
    };
    type();
  }, []);

  // Confetti (simple canvas implementation inspired by React Bits)
  const confetti = () => {
    // Placeholder for confetti explosion (canvas-based)
    console.log('Confetti triggered!');
  };

  // Error check example (bump-shake, pulse, sound)
  const checkForError = () => {
    if (!projects[currentProject]?.html.trim()) {
      setError(true);
      playErrorSound();
      confetti(); // Trigger confetti on error for demo
      setTimeout(() => setError(false), 2000);
    }
  };

  // WebAudio sound effect
  const playErrorSound = () => {
    const oscillator = audioCtx.createOscillator();
    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(200, audioCtx.currentTime);
    oscillator.connect(audioCtx.destination);
    oscillator.start();
    setTimeout(() => oscillator.stop(), 300);
  };

  // Update project field
  const updateProject = (field, value) => {
    const newProjects = [...projects];
    newProjects[currentProject][field] = value;
    setProjects(newProjects);
  };

  // Add new project
  const addProject = () => {
    setProjects([...projects, { name: `Project ${projects.length + 1}`, html: '', css: '', js: '', readme: '' }]);
    setCurrentProject(projects.length);
  };

  // Export to ZIP
  const exportProject = () => {
    checkForError();
    if (error) return;
    const project = projects[currentProject];
    const zip = new JSZip();
    zip.file('index.html', project.html);
    zip.file('style.css', project.css);
    zip.file('script.js', project.js);
    zip.generateAsync({ type: 'blob' }).then((content) => {
      saveAs(content, `${project.name}.zip`);
    });
  };

  // Showdown for markdown rendering
  const converter = new showdown.Converter();
  const readmeHtml = converter.makeHtml(projects[currentProject]?.readme || '');

  // Tremor chart data (example: code line counts)
  const chartData = [
    { name: 'HTML', lines: projects[currentProject]?.html.split('\n').length },
    { name: 'CSS', lines: projects[currentProject]?.css.split('\n').length },
    { name: 'JS', lines: projects[currentProject]?.js.split('\n').length },
  ];

  return (
    <motion.div
      className="h-screen w-screen overflow-auto relative font-geist-sans md:font-roboto glass skeu aurora mesh dot-matrix holo"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
    >
      {/* Scifi holographic boot-up with scanline reveal */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500 to-transparent z-40 pointer-events-none"
        initial={{ y: '50%', height: 2 }}
        animate={{ y: ['50%', '0%', '100%'], height: [2, '100%', 2] }}
        transition={{ duration: 2, times: [0, 0.5, 1], ease: 'linear' }}
      />

      {/* Glitch wrapper */}
      <div className={error ? 'glitch' : ''}>
        {/* Mux Logo */}
        <MuxLogo className="w-32 h-32" />

        {/* Lucide icon */}
        <Code className="w-6 h-6" />

        {/* Phosphor icon */}
        <Code2 size={24} />

        {/* Tabs for projects (Radix UI + Shadcn-like) */}
        <Tabs value={currentProject.toString()} onValueChange={(val) => setCurrentProject(parseInt(val))} className="bento-grid">
          <TabsList>
            {projects.map((p, i) => (
              <TabsTrigger key={i} value={i.toString()}>
                {p.name}
              </TabsTrigger>
            ))}
            <Button onClick={addProject}>Add Project</Button>
          </TabsList>
          {projects.map((p, i) => (
            <TabsContent key={i} value={i.toString()}>
              <div className="grid grid-cols-3 gap-4">
                {/* CodeMirror editors */}
                <CodeMirror value={p.html} extensions={[html()]} onChange={(val) => updateProject('html', val)} />
                <CodeMirror value={p.css} extensions={[css()]} onChange={(val) => updateProject('css', val)} />
                <CodeMirror value={p.js} extensions={[javascript()]} onChange={(val) => updateProject('js', val)} />
              </div>

              {/* Preview iframe */}
              <iframe
                srcDoc={`<html><head><style>${p.css}</style></head><body>${p.html}<script>${p.js}</script></body></html>`}
                className="w-full h-64 border"
              />

              {/* TipTap for readme editing */}
              <EditorContent editor={tiptapEditor} />

              {/* Showdown rendered markdown */}
              <div dangerouslySetInnerHTML={{ __html: readmeHtml }} className="blend" />

              {/* React syntax highlighter (Prism) */}
              <Highlight code="console.log('Hello');" language="js">
                {({ className, style, tokens, getLineProps, getTokenProps }) => (
                  <pre className={className} style={style}>
                    {tokens.map((line, i) => (
                      <div {...getLineProps({ line, key: i })}>
                        {line.map((token, key) => <span {...getTokenProps({ token, key })} />)}
                      </div>
                    ))}
                  </pre>
                )}
              </Highlight>

              {/* ReactFlow (xyflow) */}
              <div className="h-32">
                <ReactFlow nodes={nodes} edges={edges} fitView />
              </div>

              {/* 3D UI with Spline Runtime */}
              <canvas ref={splineCanvasRef} className="w-32 h-32" />
              <Application canvas={splineCanvasRef.current} scene="https://prod.spline.design/PV9ztMswK4uUzwBT/scene.splinecode" /> {/* Example scene URL */}

              {/* Rive animation */}
              <Rive src="https://cdn.rive.app/animations/vehicles.riv" width={100} height={100} /> {/* Public example Rive file */}

              {/* Lottie animation */}
              <Lottie animationData={animationData} loop={true} style={{ width: 100, height: 100 }} />

              {/* Tremor chart */}
              <BarChart data={chartData} categories={['lines']} index="name" className="h-32" />

              {/* SVG filters (blur, grain, morph example) */}
              <svg className="hidden">
                <filter id="blur-filter">
                  <feGaussianBlur stdDeviation="5" />
                </filter>
                <filter id="grain-filter">
                  <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                  <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" />
                </filter>
                <filter id="morph-filter">
                  <feMorphology operator="dilate" radius="1" />
                </filter>
              </svg>
              <div style={{ filter: 'url(#blur-filter)' }} className="w-20 h-20 bg-blue-500" />
              <div style={{ filter: 'url(#grain-filter)' }} className="w-20 h-20 bg-gray-500" />
              <div style={{ filter: 'url(#morph-filter)' }} className="w-20 h-20 bg-green-500" />

              {/* Shimmer loading */}
              <div className="shimmer w-32 h-4" />

              {/* Hacker text background */}
              <div ref={hackerRef} className="absolute bottom-0 opacity-10 text-green-500 anime-elem gsap-elem" />

              {/* Error pulse and bump-shake */}
              {error && (
                <motion.div
                  className="fixed top-4 right-4"
                  animate={{ scale: [1, 1.2, 1], x: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <AlertTriangle className="text-red-500" />
                </motion.div>
              )}

              {/* Export button with tooltip (Radix) */}
              <Tooltip>
                <TooltipTrigger>
                  <Button onClick={exportProject}>
                    <Download />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  Export as ZIP. Tip: Deploy to <a href="https://pages.cloudflare.com">Cloudflare Pages</a>, <a href="https://www.netlify.com">Netlify</a>, <a href="https://render.com">Render</a>, <a href="https://vercel.com">Vercel</a>, <a href="https://deno.com">Deno</a>, <a href="https://pages.github.com">GitHub Pages</a>.
                </TooltipContent>
              </Tooltip>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Regl canvas for plasma/3D glass/plasma backgrounds */}
      <canvas ref={canvasRef} className="absolute inset-0 -z-10" />
    </motion.div>
  );
};

export default Editor;
