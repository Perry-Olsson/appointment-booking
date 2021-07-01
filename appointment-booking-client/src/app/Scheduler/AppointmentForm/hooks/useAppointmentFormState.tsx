import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation } from "react-query";
import { useQueryClient } from "react-query";
import { useDeselectFieldsOnChange } from ".";
import { appointmentService } from "../../../../api";
import { device } from "../../../../components";
import { useGetUser } from "../../../../context";
import { NewAppointment } from "../../../../types";
import { dimensionsAtom, showAppointmentsFormAtom } from "../../atoms";
import { useStaticState, useFormApi } from "../../context";
import { useWatchProcedure, useWatchProvider } from "../../hooks";
import { FormValues } from "../types";
import { concatUser } from "../utils";

export const useAppointmentFormState = () => {
  const [show, setShow] = useAtom(showAppointmentsFormAtom);
  const [modalIsOpen, setIsOpen] = useState(false);

  const [dimensions] = useAtom(dimensionsAtom);

  const user = useGetUser();
  const { procedures } = useStaticState();

  const client = useQueryClient();
  const router = useRouter();

  const provider = useWatchProvider();
  const procedure = useWatchProcedure();
  const {
    formState: { errors, isValid, isValidating },
    getValues,
    register,
    handleSubmit,
    reset,
    trigger,
  } = useFormApi();

  const createAppointment = useMutation(
    (appointment: NewAppointment) =>
      appointmentService.createAppointment(appointment),
    {
      onSuccess: async () => {
        await client.refetchQueries("user");
        await client.refetchQueries("/providers");
        reset();
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
    if (createAppointment.isSuccess) {
      setIsOpen(false);
      return router.push("/dashboard");
    }
    hideConfirmModal();
    setTimeout(() => {
      setIsOpen(false);
    }, 500);
  };

  useDeselectFieldsOnChange();

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
    provider,
    procedure,
    isSmallDevice: !device.isDesktop(dimensions.width),
  };
};

const hideConfirmModal = () => {
  const ele = document.getElementById("confirm-modal");
  if (ele) {
    if (device.isTabletOrSmaller(window.innerWidth))
      ele.style.top = window.innerHeight + "px";
    else ele.style.opacity = "0";
  }
};
