import { FC } from "react";
import styled from "styled-components";
import { Circle, Flex2 } from "../../../components";

export const Socials: FC = () => (
  <Container>
    <Icon
      as="a"
      href="https://www.facebook.com/therenewalcentermukilteo/"
      target="_blank"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 117.7 226.6"
        height="30px"
        width="30px"
      >
        <path
          fill="white"
          d="M76.4 226.6V123.2h34.7l5.2-40.3H76.4V57.2c0-11.7 3.2-19.6 20-19.6h21.3v-36C114 1.1 101.3 0 86.6 0 55.8 0 34.8 18.8 34.8 53.2v29.7H0v40.3h34.8v103.4h41.6z"
        ></path>
      </svg>
    </Icon>
    <Icon as="a" href="https://twitter.com/TheRenewalCtr" target="_blank">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        height="30px"
        width="30px"
      >
        <path
          fill="white"
          d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
        />
      </svg>
    </Icon>
    <Icon
      as="a"
      href="https://plus.google.com/+TheRenewalCenterMukilteo"
      target="_blank"
    >
      <GooglePlus>G+</GooglePlus>
    </Icon>
  </Container>
);
const Container = styled(Flex2)`
  flex-direction: row;
`;

const Icon = styled(Circle)`
  margin-right: 1.5rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
`;

const GooglePlus = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  color: inherit;
`;
