import { useAtom } from "jotai";
import SingleBox from "./SingleBox";
import { parkingSlotsAtom } from "../../store/parkingStore";




const ParkingLots = () => {

    const [parkingSlots] = useAtom(parkingSlotsAtom)

    return (
        <>
            {parkingSlots.map((item, key) => (
                <SingleBox
                    key={key}
                    position={item.position}
                    rotation={item.rotation}
                    id={item.id}
                    num={item.num}
                    carId={item.carId}
                />
            ))}
        </>
    )
}

export default ParkingLots