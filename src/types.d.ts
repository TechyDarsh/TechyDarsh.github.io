import * as THREE from 'three';
import { ThreeElement } from '@react-three/fiber';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';

declare module 'meshline' {
  export class MeshLineGeometry extends THREE.BufferGeometry {
    constructor();
    setPoints(points: THREE.Vector3[] | number[]): void;
  }
  export class MeshLineMaterial extends THREE.ShaderMaterial {
    constructor(parameters?: any);
    color: THREE.Color | string;
    lineWidth: number;
    map: THREE.Texture;
    useMap: number | boolean;
    repeat: THREE.Vector2 | [number, number];
    resolution: THREE.Vector2 | [number, number];
    sizeAttenuation: number | boolean;
    near: number;
    far: number;
    dashArray: number;
    dashOffset: number;
    dashRatio: number;
    transparent: boolean;
    opacity: number;
  }
}

declare module '@react-three/fiber' {
  interface ThreeElements {
    meshLineGeometry: ThreeElement<typeof MeshLineGeometry>;
    meshLineMaterial: ThreeElement<typeof MeshLineMaterial>;
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: any;
      meshLineMaterial: any;
    }
  }
}
