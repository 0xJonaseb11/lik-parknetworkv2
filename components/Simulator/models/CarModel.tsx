
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GroupProps } from '@react-three/fiber'
import { GLTF } from 'three-stdlib'
import { Mesh, MeshStandardMaterial } from 'three'


type GLTFResult = GLTF & {
    nodes: {
        Object_16: Mesh
        Object_16_1: Mesh
        Object_16_2: Mesh
        Object_16_3: Mesh
        Object_16_4: Mesh
        Object_16_5: Mesh
        Object_16_6: Mesh
        Object_16_7: Mesh
        Object_16_8: Mesh
        Object_16_9: Mesh
        Object_16_10: Mesh
        Object_16_11: Mesh
    },
    materials: {
        TireCenter: MeshStandardMaterial
        Body: MeshStandardMaterial
        Tire: MeshStandardMaterial
        Metal: MeshStandardMaterial
        Handle: MeshStandardMaterial
        Back_Light: MeshStandardMaterial
        material_6: MeshStandardMaterial
        Door: MeshStandardMaterial
        retro: MeshStandardMaterial
        material: MeshStandardMaterial
        WindScreen: MeshStandardMaterial
        FrontLights: MeshStandardMaterial
    }
}
interface PropType extends GroupProps {
    uColor: string
}

export function CarModel(props: PropType) {
    const { nodes, materials } = useGLTF('/car.glb') as unknown as GLTFResult
    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_16.geometry}
                material={materials.TireCenter}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_16_1.geometry}
            >
                <meshStandardMaterial {...materials.Body} color={props.uColor} />
            </mesh>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_16_2.geometry}
                material={materials.FrontLights}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_16_3.geometry}
                material={materials.WindScreen}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_16_4.geometry}
                material={materials.material}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_16_5.geometry}
                material={materials.retro}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_16_6.geometry}
                material={materials.Door}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_16_7.geometry}
                material={materials.material_6}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_16_8.geometry}
                material={materials.Back_Light}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_16_9.geometry}
                material={materials.Handle}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_16_10.geometry}
                material={materials.Metal}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_16_11.geometry}
                material={materials.Tire}
            />
        </group>
    )
}

useGLTF.preload('/car.glb')