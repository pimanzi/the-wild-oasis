import { useForm } from 'react-hook-form';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';

import { useCreateCabin } from './useCreateCabin';
import { useEditCabin } from './useEditCabin';

function CreateCabinForm({ cabinToEdit = {}, onClose }) {
  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();
  const isWorking = isCreating || isEditing;

  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  function onSubmit(data) {
    const image = typeof data.image === 'string' ? data.image : data.image[0];

    if (isEditSession)
      editCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: (data) => {
            reset();
            onClose?.();
          },
        }
      );
    else
      createCabin(
        { ...data, image: image },
        {
          onSuccess: (data) => {
            reset();
            onClose?.();
          },
        }
      );
  }

  function onError(errors) {
    // console.log(errors);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onClose ? 'modal' : 'regular'}
    >
      <FormRow label="Cabin name" error={errors?.name?.message} type="non-auth">
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register('name', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow
        label="Maximum capacity"
        error={errors?.maxCapacity?.message}
        type="non-auth"
      >
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register('maxCapacity', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Capacity should be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Regular price"
        error={errors?.regularPrice?.message}
        type="non-auth"
      >
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register('regularPrice', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Capacity should be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Discount"
        error={errors?.discount?.message}
        type="non-auth"
      >
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register('discount', {
            required: 'This field is required',
            validate: (value) =>
              value <= getValues().regularPrice ||
              'Discount should be less than regular price',
          })}
        />
      </FormRow>

      <FormRow
        type="non-auth"
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          disabled={isWorking}
          {...register('description', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo" type="non-auth">
        <FileInput
          id="image"
          accept="image/*"
          {...register('image', {
            required: isEditSession ? false : 'This field is required',
          })}
        />
      </FormRow>

      <FormRow type="non-auth">
        <Button variation="secondary" type="reset" onClick={() => onClose?.()}>
          Cancel
        </Button>
        <Button disabled={isWorking} type="submit">
          {isEditSession ? 'Edit cabin' : 'Create new cabin'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
