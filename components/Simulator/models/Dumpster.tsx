import { useGLTF } from '@react-three/drei'
import { GroupProps } from '@react-three/fiber'
import { useAtom } from 'jotai';
import { GLTF } from 'three-stdlib'
import { hoverDumpsterAtom } from '../../../store/parkingStore';
import { Mesh, MeshStandardMaterial } from 'three';

type GLTFResult = GLTF & {
    nodes: {
        Cube004_Material006_0: Mesh
        Cube004_Material005_0: Mesh
        Cube004_Material001_0: Mesh
    },
    materials: {
        ['Material.006']: MeshStandardMaterial
        ['Material.001']: MeshStandardMaterial
    }
}

export function Dumpster(props: GroupProps) {
    const { nodes, materials } = useGLTF('/dumpster.glb') as unknown as GLTFResult
    const [hovered, setHovered] = useAtom(hoverDumpsterAtom)
    return (
        <group {...props} dispose={null}
            onPointerEnter={() => setHovered(true)}
            onPointerLeave={() => setHovered(false)}
        >
            <group scale={hovered ? 0.012 : 0.01}>
                <group rotation={[-1.466, 0, 0]} scale={[70.319, 38.369, 2.458]}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Cube004_Material006_0.geometry}
                        material={materials['Material.006']}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Cube004_Material005_0.geometry}
                    // material={materials['Material.005']}
                    >
                        <meshStandardMaterial color={'red'} />
                    </mesh>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Cube004_Material001_0.geometry}
                        material={materials['Material.001']}
                    />
                </group>
            </group>
        </group>
    )
}

useGLTF.preload('/dumpster.glb')