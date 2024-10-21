import { atom } from 'jotai'
import { Euler, Vector3 } from 'three'
import { generateUUID } from 'three/src/math/MathUtils'


////////////// TYPES //////////////
export interface CarType {
    position: Vector3
    rotation: Euler
    uId: string
    color: string;
};

export interface SlotType {
    id: string;
    position: Vector3;
    rotation: Euler;
    carId?: string | null;
    num: number;
    tokenURI?: string;
};


//////////// DATA AND CONSTANTS /////////////
///// dummy data for parking lots
const dummyData: SlotType[] = [
    {
        id: generateUUID(),
        position: new Vector3(4.19, 0, 2.15),
        rotation: new Euler(0, 0, 0),
        num: 0,
    },
    {
        id: generateUUID(),
        position: new Vector3(3.33, 0, 2.15),
        rotation: new Euler(0, 0, 0),
        num: 1,
        tokenURI: 'https://purple-rare-meadowlark-866.mypinata.cloud/ipfs/QmYTfzvQUACQF1qaxVn9zDVn6waHj4cdncgKYrQZE4zJy3',
    },
    {
        id: generateUUID(),
        position: new Vector3(2.47, 0, 2.15),
        rotation: new Euler(0, 0, 0),
        num: 2,
        tokenURI: 'https://purple-rare-meadowlark-866.mypinata.cloud/ipfs/QmQ4oEwca33fWKVF4UweeswrxTeEkZhZtDAb8yWo372oDW',
    },
    {
        id: generateUUID(),
        position: new Vector3(1.61, 0, 2.15),
        rotation: new Euler(0, 0, 0),
        num: 3,
        tokenURI: 'https://purple-rare-meadowlark-866.mypinata.cloud/ipfs/QmQ4oEwca33fWKVF4UweeswrxTeEkZhZtDAb8yWo372oDW',
    },
    {
        id: generateUUID(),
        position: new Vector3(0.75, 0, 2.15),
        rotation: new Euler(0, 0, 0),
        num: 4,
        tokenURI: 'https://purple-rare-meadowlark-866.mypinata.cloud/ipfs/Qma26R6YA97ZHEjZMRwp1XEGfGfH8ZwCPKb7rmE6fqY5KG',
    },
    {
        id: generateUUID(),
        position: new Vector3(-0.11, 0, 2.15),
        rotation: new Euler(0, 0, 0),
        num: 5,
        tokenURI: 'https://purple-rare-meadowlark-866.mypinata.cloud/ipfs/QmeGyDCUoVZS77z1uFTvs4rTpc1FFHZygTYWC25qSGp87m',
    },
    {
        id: generateUUID(),
        position: new Vector3(-0.98, 0, 2.15),
        rotation: new Euler(0, 0, 0),
        num: 6,
        tokenURI: 'https://purple-rare-meadowlark-866.mypinata.cloud/ipfs/QmSoBX4uaQCjB4uKPRnf3WZTjC2cTTVxG8T2kfANPXtGag',
    },
    {
        id: generateUUID(),
        position: new Vector3(-1.83, 0, 2.15),
        rotation: new Euler(0, 0, 0),
        num: 7,
        tokenURI: 'https://purple-rare-meadowlark-866.mypinata.cloud/ipfs/QmWwZEbACiKmGffbwX3Pu4xPQBmwYKkCBJSbxuBB4uFVwy',
    },
    {
        id: generateUUID(),
        position: new Vector3(-2.70, 0, 2.15),
        rotation: new Euler(0, 0, 0),
        num: 8,
        tokenURI: 'https://purple-rare-meadowlark-866.mypinata.cloud/ipfs/QmWJj21Kv619nrGecEZgx4SsMLxAQyMqWrsTPWGoctWEEY',
    },
    {
        id: generateUUID(),
        position: new Vector3(4.19, 0, -2.44),
        rotation: new Euler(0, 0, 0),
        num: 9,
        tokenURI: 'https://purple-rare-meadowlark-866.mypinata.cloud/ipfs/QmRHj6i3j5pyi4kXY77JwdrPRYitQAt3KjZouyMya2PCNf',
    },
    {
        id: generateUUID(),
        position: new Vector3(3.33, 0, -2.44),
        rotation: new Euler(0, 0, 0),
        num: 10,
        tokenURI: 'https://purple-rare-meadowlark-866.mypinata.cloud/ipfs/QmXfUbBGeXwoq8osp7DGtETaEDty78Wy872nApUxWoBoUr',
    },
    {
        id: generateUUID(),
        position: new Vector3(2.47, 0, -2.44),
        rotation: new Euler(0, 0, 0),
        num: 11,
        tokenURI: 'https://purple-rare-meadowlark-866.mypinata.cloud/ipfs/QmbJ6xCi5kaKnb3syVe4VxwPsJGQTXYG9GtTdDw22dMqob',
    },
    {
        id: generateUUID(),
        position: new Vector3(1.61, 0, -2.44),
        rotation: new Euler(0, 0, 0),
        num: 12,
        tokenURI: 'https://purple-rare-meadowlark-866.mypinata.cloud/ipfs/QmRTvu3Yis9sWjwWYwQJnzaKGCMRWhinLmEe47PhHub7dz',
    },
    {
        id: generateUUID(),
        position: new Vector3(0.75, 0, -2.44),
        rotation: new Euler(0, 0, 0),
        num: 13,
        tokenURI: 'https://purple-rare-meadowlark-866.mypinata.cloud/ipfs/QmQdBetPQBbMHL6MhbUbmsRU9fmFYggNZYHoFiSGKjw7LF',
    },
    {
        id: generateUUID(),
        position: new Vector3(-0.11, 0, -2.44),
        rotation: new Euler(0, 0, 0),
        num: 14,
        tokenURI: 'https://purple-rare-meadowlark-866.mypinata.cloud/ipfs/QmdpovEirgRbAvci9CCijLapg9Tr2XMjrnLmqZdnR1R9kU',
    },
    {
        id: generateUUID(),
        position: new Vector3(-0.98, 0, -2.44),
        rotation: new Euler(0, 0, 0),
        num: 15,
        tokenURI: 'https://purple-rare-meadowlark-866.mypinata.cloud/ipfs/Qma4hMEXy83ZrYKQ2yWAnFyZUfKLczWcxamjPDMmHmzrZg',
    },
    {
        id: generateUUID(),
        position: new Vector3(-1.83, 0, -2.44),
        rotation: new Euler(0, 0, 0),
        num: 16,
        tokenURI: 'https://purple-rare-meadowlark-866.mypinata.cloud/ipfs/QmNXLLENpcEVvBmSZMXWSLoewv55N4FWyXKByCdJ7PyuCS',
    },
    {
        id: generateUUID(),
        position: new Vector3(-2.70, 0, -2.44),
        rotation: new Euler(0, 0, 0),
        num: 17,
        tokenURI: 'https://purple-rare-meadowlark-866.mypinata.cloud/ipfs/QmZe1cwhz5etk4ZBax1HAfYX4KcmWF3w6eNQjn3GtPSVYY',
    },
];

const randomColors = [
    'white',
    'green',
    'red',
    'yellow',
    'blue',
    'cyan',
];



////////////// ATOMS //////////////

// parking lots atoms
export const hoveredParkingLot = atom<string | null>(null)
export const parkingSlotsAtom = atom(dummyData)


// cars atoms
export const draggableCarsAtom = atom<CarType[]>([])
export const createNewCarAtom = atom(
    () => '',
    (get, set, id: string) => set(draggableCarsAtom, createNewCar(get(parkingSlotsAtom), get(draggableCarsAtom), id))
)
export const updateCarAtom = atom(
    () => '',
    (get, set, carProp: CarType) => set(draggableCarsAtom, updateCar(get(draggableCarsAtom), carProp))
)
export const removeCarAtom = atom(
    () => '',
    (get, set, str: string) => set(draggableCarsAtom, [...get(draggableCarsAtom).filter(item => item.uId !== str)])
)
export const updateCarInParkingSlotAtom = atom(
    () => '',
    (get, set, carId: string) => set(parkingSlotsAtom, updateSlot(get(parkingSlotsAtom), get(hoveredParkingLot), carId))
)


// dumpster atoms
export const hoverDumpsterAtom = atom(false);




/////////////////// FUNCTIONS ////////////////////////////

// parking lot functions
// CAN ADD ASSIGN CAR TO LANE HERE THROUGH API
const updateSlot = (slots: SlotType[], parkingLot: string | null, carId: string) => {
    const arr: SlotType[] = slots.map(item => {
        if (item.carId === carId) {
            return { ...item, carId: null }
        } else {
            return { ...item }
        }
    })

    const selectedPlot = arr.find(item => item.id === parkingLot)

    if (selectedPlot) {
        selectedPlot.carId = carId
    }

    return [...arr]
}


// cars functions
const checkForSpawnPositionNotToBeClose = (slots: SlotType[], cars: CarType[]) => {
    const parkedCars = slots.filter(item => item.carId).map(item => item.carId)
    const unParkedCars = cars.filter(car => !parkedCars.includes(car.uId))
    const unParkedCarsInSpawnArea = unParkedCars.filter(car => car.position.x < -5.7 && car.position.x > -6.7)

    if (!unParkedCarsInSpawnArea.length) {
        return new Vector3(-6.2, 0, -5)
    }
    const sortUnParkedCars = unParkedCarsInSpawnArea.sort((a, b) => a.position.z - b.position.z)

    const newSpaces = sortUnParkedCars.filter((car, key) => {
        if (sortUnParkedCars[key + 1] && sortUnParkedCars[key + 1].position.z > car.position.z + 2.5) {
            return car
        }
    })

    const lastPointStanding = unParkedCarsInSpawnArea[unParkedCarsInSpawnArea.length - 1].position.z

    if (lastPointStanding > 2.5 && !newSpaces.length) return // no space on top
    if (!newSpaces.length) return new Vector3(-6.2, 0, lastPointStanding + 1.5) // if no space in between

    return new Vector3(-6.2, 0, newSpaces[0].position.z + 1.5)
}

// CREATING NEW CAR
const createNewCar = (slots: SlotType[], cars: CarType[], id: string) => {
    const randomNumber = Math.floor(Math.random() * randomColors.length);

    const spawnDistance = checkForSpawnPositionNotToBeClose(slots, cars); // recalculate spawning position depending on extra room between cars or at the top of the column

    if (!spawnDistance) return [...cars];

    if (cars.length > 12) return [...cars]; // set a maximum number of cars
    return [...cars, {
        position: spawnDistance,
        rotation: new Euler,
        uId: id,
        color: randomColors[randomNumber] // randomize colors for every new spawned car
    }]
}

// UPDATE CAR HERE
const updateCar = (cars: CarType[], carProp: CarType) => {
    cars.forEach(item => {
        if (item.uId === carProp.uId) {
            return { ...carProp }
        } else {
            return { ...item }
        }
    })
    return cars
}