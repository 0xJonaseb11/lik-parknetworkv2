'use client';

import React from 'react'
import { createNewCarAtom, draggableCarsAtom } from '../../store/parkingStore';
import { useAtom } from 'jotai';
import { generateUUID } from 'three/src/math/MathUtils';

const Btn = () => {

    const [, addAcar] = useAtom(createNewCarAtom)

    return (
        <a
            className="btn btn-primary shadow-primary mt-n2 mx-auto"
            // click handler to add a new car
            onClick={() => addAcar(generateUUID())}
        >
            Add a car
        </a>
    )
}

export default Btn