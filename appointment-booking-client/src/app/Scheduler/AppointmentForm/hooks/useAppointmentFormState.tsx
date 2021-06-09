import { useAtom } from "jotai";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { useDeselectFieldsOnChange } from ".";
import { appointmentService } from "../../../../api";
import { useGetUser } from "../../../../context";
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

  const onSubmit = async (data: FormValues) => {
    const appointment = concatUser(data, procedures, user);
    if (!appointment) {
      alert("oops something went wrong");
      return;
    }

    await appointmentService.createAppointment(appointment);
    await client.refetchQueries("user");
    await client.refetchQueries("/providers");
    setValue("timestamp", "");
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

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
  };
};
