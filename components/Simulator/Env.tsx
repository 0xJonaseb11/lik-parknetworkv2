import React from 'react'
import { ParkingModel } from './models/ParkingModel'
import { Dumpster } from './models/Dumpster'
import { useTexture } from '@react-three/drei'
import { Texture } from 'three'

const Env = () => {

    const [disabText, evText] = useTexture(['/disable.png', '/electriclogo.png'], (texture) => {
        const textArr = texture as Texture[]
        textArr.forEach(element => {
            element.colorSpace = "srgb-linear"
        });
    })

    return (
        <>
            <ParkingModel scale={0.008} position={[-7, 0, 5.3]} />
            <Dumpster position={[0, 0, 5]} />

            <group scale={0.15} rotation={[0, Math.PI, 0]}>
                <mesh position={[1, 1, 16]} rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[4, 4]} />
                    <meshStandardMaterial map={disabText}
                        alphaMap={disabText}
                        color={'white'}
                    />
                </mesh>
            </group>

            <group scale={0.15} rotation={[0, Math.PI, 0]}>
                <mesh position={[6.7, 1, 16]} rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[4, 4]} />
                    <meshStandardMaterial map={disabText}
                        alphaMap={disabText}
                        color={'white'}
                    />
                </mesh>
            </group>

            <group scale={0.15} rotation={[0, Math.PI, 0]}>
                <mesh position={[12.3, 1, 16]} rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[4, 4]} />
                    <meshStandardMaterial
                        map={evText}
                        alphaMap={evText}
                        transparent
                        opacity={1}
                        color={'white'}
                    />
                </mesh>
            </group>

            <group scale={0.15} rotation={[0, Math.PI, 0]}>
                <mesh position={[18, 1, 16]} rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[4, 4]} />
                    <meshStandardMaterial
                        map={evText}
                        alphaMap={evText}
                        transparent
                        opacity={1}
                        color={'white'}
                    />
                </mesh>
            </group>


            {/* <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[1, 1]} />
                <meshStandardMaterial color={'red'} />
            </mesh> */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]}>
                <planeGeometry args={[50, 50]} />
                <meshStandardMaterial color={'gray'} />
            </mesh>
        </>
    )
}

export default Env