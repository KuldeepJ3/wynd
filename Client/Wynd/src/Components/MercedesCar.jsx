import { useRef } from 'react';
import { useGLTF, Center } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export default function MercedesCar() {
  const { scene } = useGLTF('/car.glb');
  const carRef = useRef();

  // Distinctly scale down for mobile/tablet screens without touching your laptop setup
  const isSmallerScreen = typeof window !== 'undefined' && window.innerWidth < 1024;
  const responsiveScale = isSmallerScreen ? 35.0 : 60.0;
  const responsiveYPos = isSmallerScreen ? 0.0 : -0.4;

  useFrame(() => {
    if (carRef.current) {
      const section = document.getElementById('car-showcase-section');
      if (section) {
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        const scrollDistance = windowHeight - rect.top;
        const totalDistance = windowHeight + section.offsetHeight;
        
        let progress = scrollDistance / totalDistance;
        progress = Math.max(0, Math.min(1, progress));

        carRef.current.rotation.y = Math.PI - progress * Math.PI * 2;
      }
    }
  });

  return (
    <Center top>
      <group ref={carRef} position={[0, responsiveYPos, 0]}>
        <primitive object={scene} scale={responsiveScale} />
      </group>
    </Center>
  );
}