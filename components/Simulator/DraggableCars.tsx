import React, { useState, useRef, useMemo, useEffect } from "react";
import { useDrag } from "@use-gesture/react";
import { Globals, animated, useSpring } from "@react-spring/three";
import { useThree } from "@react-three/fiber";
import { Euler, Plane, Vector3 } from "three";
import { useAtom } from "jotai";
import { ethers } from "ethers";
import { CarModel } from "./models/CarModel";
import { SlotType, draggableCarsAtom, hoverDumpsterAtom, hoveredParkingLot, parkingSlotsAtom, removeCarAtom, updateCarInParkingSlotAtom } from "../../store/parkingStore";
import { PARKSPACE_CONTRACT_ADDRESS, provider } from "../../store/transactionStore";
import parkSpaceNFTABI from '../../app/mint/ParkSpaceNFT.json';

Globals.assign({
    frameLoop: "always",
});

interface PropType {
    position: Vector3;
    rotation: Euler;
    color: string;
    uId: string
}

const DraggableCars = ({
    position,
    rotation,
    color,
    uId,
}: PropType) => {

    // raycast catcher to one of the boxes with name: raycast-catcher
    // raycaster to plane to detect
    const floorPlane = new Plane(new Vector3(0, 1, 0), 0);

    const [, updateCar] = useAtom(updateCarInParkingSlotAtom)
    const [plots] = useAtom(parkingSlotsAtom)
    const [hoveredLot] = useAtom(hoveredParkingLot)
    const [, setCars] = useAtom(draggableCarsAtom)
    const [, removeCar] = useAtom(removeCarAtom)
    const [hoverDumpster] = useAtom(hoverDumpsterAtom)

    const [pos, setPos] = useState([position.x, position.y, position.z]);

    const { size, viewport } = useThree();

    const aspect = size.width / viewport.width;

    const [draggingAction, setDraggingAction] = useState(false)

    const selectedParkingSlot = useMemo(() => {
        return plots.find(item => item.carId === uId)
    }, [plots, uId, draggingAction])

    const planeIntersectPoint = new Vector3();

    const [spring, api] = useSpring(() => ({
        position: pos,
        scale: 1,
        rotation: [0, 0, 0],
        config: { friction: 15 }
    }));

    const startPosRef = useRef<number[] | null>(null)

    // DRAGGING FUNCTIONALITY
    const bind = useDrag(
        ({ active, movement: [x, y], timeStamp, event }) => {
            if (active) {
                setDraggingAction(true);
                (event as any).ray.intersectPlane(floorPlane, planeIntersectPoint);
                setPos([planeIntersectPoint.x, 0, planeIntersectPoint.z]);

                if (!startPosRef.current) {
                    startPosRef.current = [planeIntersectPoint.x, 0, planeIntersectPoint.z]
                }
            }
            api.start({
                position: pos,
                scale: active ? 1.2 : 1,
                rotation: [0, x / aspect * 0.1, 0]
            });
            if (!active) {
                // drag ended
                if (hoverDumpster) {
                    removeCar(uId)
                    console.log("removeCar", color, uId);
                    return
                }

                // check if lane is occupied; ADD CANCEL PLACEMENT ERROR MESSAGE HERE
                const laneOccupied = plots.find(item => item.id === hoveredLot)

                if (!startPosRef.current) return
                if (laneOccupied?.carId && startPosRef.current) {
                    // revert back
                    api({
                        to: {
                            position: [
                                startPosRef.current[0],
                                startPosRef.current[1],
                                startPosRef.current[2],
                            ]
                        }
                    });
                    setDraggingAction(false)
                    return
                }

                // if lane is empty
                // ADD UPDATE CAR AND LANE FUNCTIOALITY HERE
                updateCar(uId);
                setCars(prev => [...prev.map(car => {
                    if (car.uId === uId) {
                        return { ...car, position: new Vector3(pos[0], pos[1], pos[2]) }
                    } else {
                        return { ...car }
                    }
                })]
                )
                setDraggingAction(false)
                if (laneOccupied) mintParkSpaceNFT(laneOccupied)
                console.log("updateCar", laneOccupied, uId);
            }
            return timeStamp;
        },
        { delay: true }
    );

    const mintParkSpaceNFT = async (parkSpace: SlotType) => {
        try {
            const signer = await provider.getSigner();
            const publicAddress = await signer.getAddress();
            console.log("signer", parkSpace);
            const mintContract = new ethers.Contract(PARKSPACE_CONTRACT_ADDRESS, parkSpaceNFTABI, signer);
            if (!parkSpace.tokenURI) return;
            console.log(publicAddress, parkSpace.num, parkSpace?.tokenURI);
            
            const txs = await mintContract.ERC721Mint(publicAddress, parkSpace.num, parkSpace?.tokenURI);
            console.log("txs", txs);
        } catch (err) {
          console.log("mintParkSpaceNFT", err);
        }
    }

    useEffect(() => {
        if (draggingAction) return
        if (!selectedParkingSlot) return

        api({
            to: {
                position: [
                    selectedParkingSlot.position.x,
                    selectedParkingSlot.position.y,
                    selectedParkingSlot.position.z,
                ],
                rotation: [0, 0, 0]
            }
        });

    }, [api, draggingAction, pos, selectedParkingSlot])


    return (
        // @ts-ignore
        <animated.group {...spring} {...bind()}>
            <CarModel scale={1} uColor={color} />
        </animated.group>
    )
}

export default DraggableCars