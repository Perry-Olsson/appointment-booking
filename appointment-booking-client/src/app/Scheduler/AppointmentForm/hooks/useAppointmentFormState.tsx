import { useAtom } from "jotai";
import { useState } from "react";
import { useMutation } from "react-query";
import { useQueryClient } from "react-query";
import { useDeselectFieldsOnChange } from ".";
import { appointmentService } from "../../../../api";
import { useGetUser } from "../../../../context";
import { NewAppointment } from "../../../../types";
import { showAppointmentsFormAtom } from "../../atoms";
import { useStaticState, useFormApi } from "../../context";
import { FormValues } from "../types";
import { concatUser } from "../utils";

export const useAppointmentFormState = () => {
  const [show, setShow] = useAtom(showAppointmentsFormAtom);
  const [modalIsOpen, setIsOpen] = useState(false);
  const { procedures } = useStaticState();
  const user = useGetUser();
  const client = useQueryClient();
  const {
    formState: { errors, isValid, isValidating },
    getValues,
    setValue,
    register,
    handleSubmit,
    trigger,
  } = useFormApi();
  useDeselectFieldsOnChange();
  const createAppointment = useMutation(
    (appointment: NewAppointment) =>
      appointmentService.createAppointment(appointment),
    {
      onSuccess: async () => {
        await client.refetchQueries("user");
        await client.refetchQueries("/providers");
        setValue("timestamp", "");
      },
    }
  );

  const onSubmit = async (data: FormValues) => {
    const appointment = concatUser(data, procedures, user);
    if (!appointment) {
      alert("oops something went wrong");
      return;
    }

    createAppointment.mutate(appointment);
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    createAppointment.reset();
    setIsOpen(false);
  };

  return {
    show,
    register,
    handleSubmit,
    errors,
    modalIsOpen,
    setShow,
    onSubmit,
    getValues,
    openModal,
    closeModal,
    trigger,
    isValid,
    isValidating,
    createAppointment,
  };
};
