import { useGLTF } from '@react-three/drei'
import { GroupProps } from '@react-three/fiber'
import { Mesh, MeshStandardMaterial } from 'three'
import { GLTF } from 'three-stdlib'


type GLTFResult = GLTF & {
  nodes: {
    Material2: Mesh
    Material3: Mesh
    Material3001: Mesh
    Material3002: Mesh
    Material3003: Mesh
    Material2001: Mesh
    Material2011: Mesh
    Material2002: Mesh
    Material2012: Mesh
    Material2013: Mesh
    Material2014: Mesh
    Material2015: Mesh
    Material2016: Mesh
    Material2017: Mesh
    Material2018: Mesh
    Material2019: Mesh
    Material2020: Mesh
    Material2021: Mesh
    Material2022: Mesh
    Material2023: Mesh
    Material2024: Mesh
    Material2025: Mesh
    Material2026: Mesh
    Material2027: Mesh
    Material2028: Mesh
    Material2029: Mesh
    Material2030: Mesh
    Material2031: Mesh
    Material2032: Mesh
    Material2033: Mesh
    Material2034: Mesh
    Material2035: Mesh
    Material2036: Mesh
    Material2037: Mesh
    Material2038: Mesh
    Material2039: Mesh
    Material2040: Mesh
    Material2041: Mesh
    Material2042: Mesh
    Material2043: Mesh
    Material2044: Mesh
    Material2045: Mesh
    Material2046: Mesh
    Material2047: Mesh
    Material2049: Mesh
    Material2048: Mesh
    Material2050: Mesh
    Material2051: Mesh
    Material2052: Mesh
    Material2053: Mesh
    Material2054: Mesh
    Material2055: Mesh
    Material2056: Mesh
    Material2057: Mesh
    Material2008: Mesh
    Material2003: Mesh
    Material2004: Mesh
    Material2005: Mesh
    Material2006: Mesh
    Material2007: Mesh
    Material2009: Mesh
    Material2010: Mesh
  },
  materials: {
    Color_000: MeshStandardMaterial
    ['material.001']: MeshStandardMaterial
    Asphalt_New: MeshStandardMaterial
    Vegetation_Grass1: MeshStandardMaterial
    Polished_Concrete_New: MeshStandardMaterial
    Back_Light: MeshStandardMaterial
    material_6: MeshStandardMaterial
    Door: MeshStandardMaterial
    retro: MeshStandardMaterial
    material: MeshStandardMaterial
    WindScreen: MeshStandardMaterial
    FrontLights: MeshStandardMaterial
  }
}

export function ParkingModel(props: GroupProps) {
  const { nodes, materials } = useGLTF('/parking.glb') as unknown as GLTFResult
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material2.geometry}
          material={materials['material.001']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material3.geometry}
          material={materials.Color_000}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material3001.geometry}
          material={materials.Asphalt_New}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material3002.geometry}
          material={materials.Vegetation_Grass1}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material3003.geometry}
          material={materials.Polished_Concrete_New}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material2001.geometry}
          material={materials['material.001']}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material2002.geometry}
          material={materials['material.001']}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material2011.geometry}
          material={materials.Color_000}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material2012.geometry}
          material={materials['material.001']}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material2013.geometry}
          material={materials.Color_000}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material2014.geometry}
          material={materials['material.001']}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material2015.geometry}
          material={materials.Color_000}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material2016.geometry}
          material={materials['material.001']}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material2017.geometry}
          material={materials.Color_000}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material2018.geometry}
          material={materials['material.001']}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material2019.geometry}
          material={materials.Color_000}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material2020.geometry}
          material={materials['material.001']}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material2021.geometry}
          material={materials.Color_000}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material2022.geometry}
          material={materials['material.001']}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material2023.geometry}
          material={materials.Color_000}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material2024.geometry}
          material={materials['material.001']}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material2025.geometry}
          material={materials.Color_000}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material2026.geometry}
          material={materials['material.001']}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material2027.geometry}
          material={materials.Color_000}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material2028.geometry}
          material={materials['material.001']}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material2029.geometry}
          material={materials.Color_000}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material2030.geometry}
          material={materials['material.001']}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material2003.geometry}
          material={materials['material.001']}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material2031.geometry}
          material={materials.Color_000}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material2032.geometry}
          material={materials['material.001']}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material2033.geometry}
          material={materials.Color_000}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material2034.geometry}
          material={materials['material.001']}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material2035.geometry}
          material={materials.Color_000}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material2036.geometry}
          material={materials['material.001']}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material2037.geometry}
          material={materials.Color_000}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material2038.geometry}
          material={materials['material.001']}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material2039.geometry}
          material={materials.Color_000}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material2040.geometry}
          material={materials['material.001']}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material2041.geometry}
          material={materials.Color_000}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material2042.geometry}
          material={materials['material.001']}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material2043.geometry}
          material={materials.Color_000}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material2044.geometry}
          material={materials['material.001']}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material2045.geometry}
          material={materials.Color_000}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material2046.geometry}
          material={materials['material.001']}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material2047.geometry}
          material={materials['material.001']}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material2048.geometry}
          material={materials['material.001']}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material2004.geometry}
          material={materials['material.001']}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material2049.geometry}
          material={materials['material.001']}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material2050.geometry}
          material={materials['material.001']}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material2051.geometry}
          material={materials['material.001']}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material2052.geometry}
          material={materials['material.001']}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material2053.geometry}
          material={materials['material.001']}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material2054.geometry}
          material={materials['material.001']}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material2005.geometry}
          material={materials['material.001']}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material2006.geometry}
          material={materials['material.001']}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material2007.geometry}
          material={materials['material.001']}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material2008.geometry}
          material={materials['material.001']}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material2009.geometry}
          material={materials.Color_000}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Material2010.geometry}
          material={materials['material.001']}
          rotation={[Math.PI / 2, 0, 0]}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/parking.glb')
