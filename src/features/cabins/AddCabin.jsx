import React, { useState } from 'react'
import Button from '../../ui/Button'
import CreateCabinForm from './CreateCabinForm'
import Model from '../../ui/Modal'
import CabinTable from './CabinTable'


export default function AddCabin() {
    return (
        <Model>
            <Model.Open opens="cabin-form">
                <Button>Add new cabin</Button>
            </Model.Open>
            <Model.Window name="cabin-form">
                <CreateCabinForm />
            </Model.Window>

            <Model.Open opens="table">
                <Button>SHOW TABLE</Button>
            </Model.Open>
            <Model.Window name="table">
                <CabinTable />
            </Model.Window>
        </Model>
    )


}
