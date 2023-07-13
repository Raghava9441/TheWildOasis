import React, { useState } from 'react'
import Button from '../../ui/Button'
import CreateCabinForm from './CreateCabinForm'
import Model from '../../ui/Modal'

export default function AddCabin() {
    return (
        <div>
            <Model>
                <Model.Open opens="cabin-form">
                    <Button>Add new cabin</Button>
                </Model.Open>
                <Model.Window name="cabin-form">
                    <CreateCabinForm />
                </Model.Window>
            </Model>
        </div>
    )
}
