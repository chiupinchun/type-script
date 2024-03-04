import React, { FC, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

const GRASS_HEIGHT = 0.3

interface Props {
  range: [number, number]
}
const Grass: FC<Props> = ({ range }) => {
  const mesh = useRef<Mesh>(null!);

  useFrame(() => {
    mesh.current.rotation.z = Math.sin(+new Date() / 750) / 5
  });

  return (
    <mesh ref={mesh} position={[
      - range[0] / 2 + Math.random() * range[0],
      GRASS_HEIGHT / 2,
      - range[1] / 2 + Math.random() * range[1]
    ]} >
      <boxGeometry args={[0.1, GRASS_HEIGHT, 0.01]} />
      <meshStandardMaterial color={0x00ff00} />
    </mesh>
  );
};

export default Grass