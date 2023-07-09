
import Form from "../../ui/Form";
import Spinner from "../../ui/Spinner";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";

function UpdateSettingsForm() {
    
    //getting all the settings 
    const { isLoading, error, settings: {
        minBookingLength,
        maxBookingLength,
        maxguestsPerBooking,
        breakfastPrice
    } = {} } = useSettings();

    //update the settings
    const { isUpdating, updateSetting } = useUpdateSetting({});

    function handleBlur(e, field) {
        const { value } = e.target;
        if (!value) return;
        updateSetting({ [field]: value });
    }

    //show spinner while getiing the settings
    if (isLoading) return <Spinner />;

    // This time we are using UNCONTROLLED fields, so we will NOT store state
    return (
        <Form>
            <FormRow label='Minimum nights/booking'>
                <Input
                    type='number'
                    defaultValue={minBookingLength}
                    onBlur={(e) => handleBlur(e, 'minBookingLength')}
                    disabled={isUpdating}
                    id='min-nights'
                />
            </FormRow>
            <FormRow label='Maximum nights/booking'>
                <Input
                    type='number'
                    defaultValue={maxBookingLength}
                    onBlur={(e) => handleBlur(e, 'maxBookingLength')}
                    disabled={isUpdating}
                    id='max-nights'
                />
            </FormRow>
            <FormRow label='Maximum guests/booking'>
                <Input
                    type='number'
                    defaultValue={maxguestsPerBooking}
                    onBlur={(e) => handleBlur(e, 'maxguestsPerBooking')}
                    disabled={isUpdating}
                    id='max-guests'
                />
            </FormRow>
            <FormRow label='Breakfast price'>
                <Input
                    type='number'
                    defaultValue={breakfastPrice}
                    onBlur={(e) => handleBlur(e, 'breakfastPrice')}
                    disabled={isUpdating}
                    id='breakfast-price'
                />
            </FormRow>
        </Form>
    );
}

export default UpdateSettingsForm;
