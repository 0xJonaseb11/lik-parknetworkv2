import React, { useState } from 'react'
import { Euler, Vector3 } from 'three'
import { draggableCarsAtom, hoveredParkingLot, parkingSlotsAtom } from '../../store/parkingStore';
import { useAtom } from 'jotai';
import { Html } from '@react-three/drei';

interface PropType {
    id: string;
    position: Vector3;
    rotation: Euler;
    num: number;
    carId: string | undefined | null;
}

const SingleBox = (
    {
        id,
        position,
        rotation,
        num,
        carId
    }: PropType
) => {

    const [hoveredParking, setHoveredParking] = useAtom(hoveredParkingLot)
    const [lots] = useAtom(parkingSlotsAtom)
    const [cars] = useAtom(draggableCarsAtom)



    return (
        <>
            <group
                position={position}
                rotation={rotation}
            >
                <mesh
                    name="raycast-catcher"
                    uuid={id}
                    onPointerEnter={() => {
                        setHoveredParking(id)
                    }}
                    onPointerLeave={() => {
                        setHoveredParking(null)
                    }}
                >
                    <boxGeometry args={[0.7, 0.3, 1.5]} />
                    <meshBasicMaterial transparent opacity={hoveredParking === id ? 1 : 0} color={hoveredParking === id ? 'yellow' : 'orange'} />
                </mesh>
                <Html position={[0.2, 0, num < 9 ? -0.65 : 1.1]}>
                    <div>
                        <div className="font-bold rounded-full flex items-center justify-center font-mono"
                            style={{
                                height: '20px',
                                width: '20px',
                                fontSize: '12px',
                                borderStyle: 'solid',
                                borderWidth: '2px',
                                borderColor: carId && cars.find(item => item.uId === carId)?.color ? cars.find(item => item.uId === carId)?.color : 'white',
                                color: carId && cars.find(item => item.uId === carId)?.color ? cars.find(item => item.uId === carId)?.color : 'white',
                            }}
                        >
                            {num}
                        </div>

                    </div>
                </Html>
            </group >
        </>
    )
}

export default SingleBox