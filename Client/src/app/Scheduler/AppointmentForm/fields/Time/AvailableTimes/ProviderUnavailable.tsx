import React from "react";
import { Provider } from "../../../../../../types";

export const ProviderUnavailable: React.FC<ProviderUnavailableProps> = ({
  selectedProvider,
}) => {
  return (
    <option disabled value="">
      {selectedProvider.firstName} {selectedProvider.lastName} is unavailable
      today
    </option>
  );
};

interface ProviderUnavailableProps {
  selectedProvider: Provider;
}
