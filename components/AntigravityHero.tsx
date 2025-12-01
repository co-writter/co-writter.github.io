import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import { IconRocket, IconBook, IconSparkles, APP_NAME } from '../constants';
import { Link } from 'react-router-dom';

const AntigravityHero: React.FC = () => {
    const sceneRef = useRef<HTMLDivElement>(null);
    const engineRef = useRef<Matter.Engine | null>(null);
    const [gravityEnabled, setGravityEnabled] = useState(false);

    // Refs for DOM elements we want to control with physics
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const btn1Ref = useRef<HTMLAnchorElement>(null);
    const btn2Ref = useRef<HTMLAnchorElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sceneRef.current) return;

        // Module aliases
        const Engine = Matter.Engine,
            Render = Matter.Render,
            Runner = Matter.Runner,
            Bodies = Matter.Bodies,
            Composite = Matter.Composite,
            Mouse = Matter.Mouse,
            MouseConstraint = Matter.MouseConstraint,
            Events = Matter.Events,
            Body = Matter.Body;

        // Create engine
        const engine = Engine.create();
        engine.world.gravity.y = 0; // Start with zero gravity
        engineRef.current = engine;

        // Create renderer
        const render = Render.create({
            element: sceneRef.current,
            engine: engine,
            options: {
                width: window.innerWidth,
                height: window.innerHeight,
                wireframes: false, // Set to true to debug physics bodies
                background: 'transparent',
                pixelRatio: window.devicePixelRatio
            }
        });

        const width = window.innerWidth;
        const height = window.innerHeight;

        // Walls
        const wallOptions = { isStatic: true, render: { visible: false } };
        const ground = Bodies.rectangle(width / 2, height + 50, width, 100, wallOptions);
        const leftWall = Bodies.rectangle(-50, height / 2, 100, height, wallOptions);
        const rightWall = Bodies.rectangle(width + 50, height / 2, 100, height, wallOptions);
        const ceiling = Bodies.rectangle(width / 2, -50, width, 100, wallOptions);

        Composite.add(engine.world, [ground, leftWall, rightWall, ceiling]);

        // Create bodies for our DOM elements
        // We need to know their initial positions and sizes.
        // For simplicity, we'll hardcode approximate sizes or measure them.
        // In a real app, we'd measure them after mount.

        const createBodyForElement = (ref: React.RefObject<HTMLElement>, x: number, y: number, w: number, h: number, options: any = {}) => {
            if (!ref.current) return null;
            const body = Bodies.rectangle(x, y, w, h, {
                restitution: 0.8,
                friction: 0.1,
                ...options
            });
            return { body, ref };
        };

        // Center coordinates
        const cx = width / 2;
        const cy = height / 2;

        const bodiesAndRefs = [
            createBodyForElement(logoRef, cx, cy - 120, 100, 100), // Logo
            createBodyForElement(titleRef, cx, cy - 20, 600, 100), // Title
            createBodyForElement(subtitleRef, cx, cy + 60, 600, 50), // Search Bar
            createBodyForElement(btn1Ref, cx - 90, cy + 140, 160, 46), // Button 1
            createBodyForElement(btn2Ref, cx + 90, cy + 140, 160, 46)  // Button 2
        ].filter(item => item !== null) as { body: Matter.Body, ref: React.RefObject<HTMLElement> }[];

        Composite.add(engine.world, bodiesAndRefs.map(b => b.body));

        // Mouse control
        const mouse = Mouse.create(render.canvas);
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: { visible: false }
            }
        });
        Composite.add(engine.world, mouseConstraint);
        render.mouse = mouse;

        // Run
        Render.run(render);
        const runner = Runner.create();
        Runner.run(runner, engine);

        // Sync loop
        const updateLoop = () => {
            bodiesAndRefs.forEach(({ body, ref }) => {
                if (ref.current) {
                    const { x, y } = body.position;
                    const angle = body.angle;
                    // We use translate(-50%, -50%) in CSS to center the element on the point
                    ref.current.style.transform = `translate(${x}px, ${y}px) rotate(${angle}rad)`;
                }
            });
            requestAnimationFrame(updateLoop);
        };
        updateLoop();

        return () => {
            Render.stop(render);
            Runner.stop(runner);
            if (render.canvas) render.canvas.remove();
        };
    }, []);

    const toggleGravity = () => {
        if (!engineRef.current) return;
        const newGravity = !gravityEnabled;
        setGravityEnabled(newGravity);
        engineRef.current.world.gravity.y = newGravity ? 1 : 0;

        // If turning gravity on, maybe give things a little random push to start the chaos
        if (newGravity) {
            Matter.Composite.allBodies(engineRef.current.world).forEach(body => {
                if (!body.isStatic) {
                    Matter.Body.applyForce(body, body.position, {
                        x: (Math.random() - 0.5) * 0.05,
                        y: (Math.random() - 0.5) * 0.05
                    });
                }
            });
        }
    };

    return (
        <div className="relative w-full h-screen overflow-hidden bg-white">
            <div ref={sceneRef} className="absolute inset-0 z-0 pointer-events-none opacity-0" />

            <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10">

                {/* Logo - Google Colors */}
                <div ref={logoRef} className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[100px] h-[100px] flex items-center justify-center bg-white rounded-full shadow-md border border-gray-200">
                    <IconBook className="w-12 h-12 text-blue-600" />
                </div>

                {/* Title - Google Style */}
                <h1 ref={titleRef} className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] text-gray-800 text-center w-[600px] cursor-pointer pointer-events-auto select-none" onClick={toggleGravity}>
                    {APP_NAME}
                </h1>

                {/* Subtitle - Search Bar Style */}
                <div ref={subtitleRef} className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[50px] bg-white border border-gray-300 rounded-full shadow-sm flex items-center px-6 text-gray-500 pointer-events-auto cursor-text">
                    <span className="mr-4 text-gray-400">🔍</span>
                    <span>Search for eBooks, authors, or genres...</span>
                </div>

                {/* Buttons - Google Style */}
                <Link
                    ref={btn1Ref}
                    to="/store"
                    className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[160px] h-[46px] bg-gray-100 text-gray-700 font-medium rounded-md text-sm hover:bg-gray-200 hover:text-black transition-colors flex items-center justify-center gap-2 pointer-events-auto border border-transparent hover:border-gray-300 hover:shadow-sm"
                >
                    Google Search
                </Link>

                <Link
                    ref={btn2Ref}
                    to="/dashboard"
                    className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[160px] h-[46px] bg-gray-100 text-gray-700 font-medium rounded-md text-sm hover:bg-gray-200 hover:text-black transition-colors flex items-center justify-center gap-2 pointer-events-auto border border-transparent hover:border-gray-300 hover:shadow-sm"
                >
                    I'm Feeling Lucky
                </Link>

            </div>

            <div className="absolute bottom-10 left-0 w-full text-center text-gray-400 text-sm z-0">
                Click the title to toggle gravity • Google Antigravity Theme
            </div>
        </div>
    );
};

export default AntigravityHero;
