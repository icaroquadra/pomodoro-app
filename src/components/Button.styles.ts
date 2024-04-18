import styled from "styled-components";

export type ButtonVariant = "primary" | "secondary" | "danger" | "success";

interface ButtonContainerProps {
  variant: ButtonVariant;
}

const buttonVariants = {
  primary: "blue",
  secondary: "purple",
  danger: "red",
  success: "green",
};

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 200px;
  height: 50px;
  border-radius: 5px;
  border: 0;
  margin: 10px;
  
  ${(props) => {
    return `background-color: ${buttonVariants[props.variant]};`;
  }}
`;
