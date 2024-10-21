'use client'

import React, { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { ACESFilmicToneMapping, SRGBColorSpace, sRGBEncoding } from 'three'
import { Bvh, Environment, OrbitControls } from '@react-three/drei'
import Env from './Env'
import ParkingLots from './ParkingLots'
import { useAtom } from 'jotai'
import { createNewCarAtom, draggableCarsAtom, parkingSlotsAtom, updateCarInParkingSlotAtom } from '../../store/parkingStore'
import DraggableCars from './DraggableCars'
import { Globals } from '@react-spring/three'
import { getParkSpaceTransactions } from '../../store/transactionStore'
import { generateUUID } from 'three/src/math/MathUtils';
import { IParkSpaceTransactions } from '../../types/transcation.type'

Globals.assign({
    frameLoop: "always",
});

const SimulatorCanvas = () => {
    const [draggableCars] = useAtom(draggableCarsAtom)
    const [, addAcar] = useAtom(createNewCarAtom)
    const [, updateCar] = useAtom(updateCarInParkingSlotAtom)
    const [, setCars] = useAtom(draggableCarsAtom)
    const [plots] = useAtom(parkingSlotsAtom)
    const [trans, setTrans] = useState<IParkSpaceTransactions[]>([])

    useEffect(() => {
      const init = async () => {
        const trans = await getParkSpaceTransactions();
        trans && trans.forEach(item => addAcar(generateUUID()));
        if (trans) setTrans(trans);
      };
      init();
    }, []);

    /**
    useEffect(() => {
      draggableCars.forEach(car => {
        console.log("dragcars", plots);
        updateCar(car.uId);
        // setCars(prev => [...prev.map(car => {
        //     if (car.uId === uId) {
        //         return { ...car, position: new Vector3(pos[0], pos[1], pos[2]) }
        //     } else {
        //         return { ...car }
        //     }
        // })]
        // )
      });
    }, [trans]);
    console.log("================", plots,draggableCars)
    */

    return (
        <Canvas
            gl={{
                // outputEncoding: sRGBEncoding,
                outputColorSpace: SRGBColorSpace,
                toneMapping: ACESFilmicToneMapping,
            }}
            style={{ width: '100%', height: '100%' }}
            camera={{ fov: 45, near: 0.1, far: 10000, position: [0, 20, -2] }}
            onContextMenu={(e) => e.preventDefault()}
        >
            <color attach="background" args={['#bbbbbb']} />
            <Bvh firstHitOnly>
                <OrbitControls
                    makeDefault
                    enableRotate={true}
                    enabled={false}
                /> {/* NEEDED FOR CAMERA POSITION AND TARTED */}
                <Environment preset={'studio'} background={true} /> {/* NEEDED FOR LIGHTING */}
                <Env /> {/* LOADING GROUND, PARKING AND DUMPSTER MODELS */}
                <ParkingLots /> {/* PARKING LOTS FUNCTIONALITY */}
                {
                    draggableCars.length && draggableCars.map((item) => (
                        <DraggableCars color={item.color} uId={item.uId} key={item.uId} position={item.position} rotation={item.rotation} />
                    ))
                } {/* DRAGGABLE CARS */}
            </Bvh>
        </Canvas>
    )
}

export default SimulatorCanvas