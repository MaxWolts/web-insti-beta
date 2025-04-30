import { useRef, useEffect, useState } from "react";
import {
  Renderer,
  Camera,
  Transform,
  Plane,
  Mesh,
  Program,
  Texture,
} from "ogl";
type GL = Renderer["gl"];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

interface ImageProps {
  src: string;
  alt?: string;
  className?: string;
}

export default function Image({ src, alt = "", className = "" }: ImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Efecto de agua con OGL (se activa con el scroll)
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const renderer = new Renderer({
      canvas: canvasRef.current,
      width: containerRef.current.clientWidth,
      height: containerRef.current.clientHeight,
      dpr: window.devicePixelRatio,
      alpha: true,
    });
    const gl = renderer.gl as GL;
    gl.clearColor(0, 0, 0, 0);

    const camera = new Camera(gl, { fov: 45 });
    camera.position.z = 5;

    const scene = new Transform();

    // Geometría del plano (alta subdivisión para el efecto de agua)
    const geometry = new Plane(gl, {
      widthSegments: 100,
      heightSegments: 50,
    });

    // Shader para el efecto de agua
    const program = new Program(gl, {
      vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uTime;
        uniform float uScrollY;
        varying vec2 vUv;

        void main() {
          vUv = uv;
          vec3 p = position;
          
          // Efecto de agua (similar al ejemplo anterior)
          p.z += (sin(p.x * 3.0 + uTime * 0.5) + cos(p.y * 2.0 + uTime * 0.3)) * 0.1 * (1.0 + uScrollY * 0.2);
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        varying vec2 vUv;

        void main() {
          vec4 color = texture2D(tMap, vUv);
          gl_FragColor = color;
        }
      `,
      uniforms: {
        tMap: { value: null },
        uTime: { value: 0 },
        uScrollY: { value: 0 },
      },
      transparent: true,
    });

    const mesh = new Mesh(gl, { geometry, program, scene });
    scene.addChild(mesh);

    // Cargar la textura de la imagen
    const texture = new Texture(gl);
    const img = new Image();
    img.src = src;
    img.onload = () => {
      texture.image = img;
      program.uniforms.tMap.value = texture;
    };

    // Ajustar tamaño al contenedor
    const resize = () => {
      if (!containerRef.current) return;
      const { clientWidth: width, clientHeight: height } = containerRef.current;
      renderer.setSize(width, height);
      camera.perspective({ aspect: width / height });
      mesh.scale.set(width / height, 1, 1);
    };
    resize();
    window.addEventListener("resize", resize);

    // Animación y scroll
    let time = 0;
    let scrollY = 0;
    let targetScrollY = 0;

    const handleScroll = () => {
      targetScrollY = window.scrollY * 0.01;
    };
    window.addEventListener("scroll", handleScroll);

    const animate = () => {
      time += 0.01;
      scrollY = lerp(scrollY, targetScrollY, 0.1);

      program.uniforms.uTime.value = time;
      program.uniforms.uScrollY.value = scrollY;

      renderer.render({ scene, camera });
      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", handleScroll);
      gl.getExtension("WEBGL_lose_context")?.loseContext(); // Limpiar WebGL
    };
  }, [src]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Canvas para WebGL (efecto de agua) */}
      <canvas
        ref={canvasRef}
        className={`w-full h-full transition-transform duration-300 ${
          isHovered ? "scale-120" : "scale-100"
        }`}
      />

      {/* Fallback para imágenes (opcional) */}
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover opacity-0 pointer-events-none"
        draggable="false"
      />
    </div>
  );
}
