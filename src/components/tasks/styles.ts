import styled, { css } from "styled-components";

export const Toolbar = styled.section`
  display: grid;
  gap: 20px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 22px;
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0 12px 30px rgba(16, 24, 40, 0.06);

  @media (max-width: 640px) {
    padding: 18px;
  }
`;

export const ToolbarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;

  h1 {
    margin: 0;
    color: ${({ theme }) => theme.colors.darker};
    font-size: 26px;
    font-weight: 800;
    line-height: 1.15;
  }

  p {
    margin-top: 4px;
    color: ${({ theme }) => theme.colors.dark};
    font-size: 15px;
    line-height: 1.45;
  }
`;

export const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(170px, 1fr));
  gap: 14px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

export const Field = styled.label`
  display: grid;
  gap: 8px;
  color: ${({ theme }) => theme.colors.text_black};
  font-size: ${({ theme }) => theme.fonts.size.small};
  font-weight: 700;

  input,
  select,
  textarea {
    width: 100%;
    min-height: 44px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 8px;
    padding: 0 12px;
    color: ${({ theme }) => theme.colors.text_black};
    background: ${({ theme }) => theme.colors.white};
    box-sizing: border-box;
    font: inherit;
    transition:
      border-color 160ms ease,
      box-shadow 160ms ease,
      background 160ms ease;
  }

  input::placeholder,
  textarea::placeholder {
    color: ${({ theme }) => theme.colors.placeholder};
  }

  textarea {
    min-height: 92px;
    padding: 12px;
    resize: vertical;
  }

  input:focus,
  select:focus,
  textarea:focus {
    border-color: ${({ theme }) => theme.colors.primary_dark};
    outline: none;
    box-shadow: 0 0 0 3px rgba(17, 153, 163, 0.16);
  }

  input:disabled,
  select:disabled,
  textarea:disabled {
    cursor: not-allowed;
    color: ${({ theme }) => theme.colors.text_desable};
    background: ${({ theme }) => theme.colors.lighter};
  }
`;

export const FieldError = styled.span`
  color: ${({ theme }) => theme.colors.danger};
  font-size: 13px;
  font-weight: 600;
`;

export const Button = styled.button<{ $variant?: "primary" | "ghost" | "danger" }>`
  min-height: 42px;
  border: 1px solid transparent;
  border-radius: 8px;
  padding: 0 16px;
  cursor: pointer;
  font: inherit;
  font-weight: 700;
  line-height: 1;
  transition:
    transform 140ms ease,
    border-color 140ms ease,
    background 140ms ease,
    box-shadow 140ms ease;

  ${({ $variant = "primary", theme }) => {
    if ($variant === "danger") {
      return css`
        color: ${theme.colors.text_white};
        background: ${theme.colors.danger};

        &:hover:not(:disabled) {
          background: #9f1f16;
        }
      `;
    }

    if ($variant === "ghost") {
      return css`
        color: ${theme.colors.text_black};
        border-color: ${theme.colors.border};
        background: ${theme.colors.white};

        &:hover:not(:disabled) {
          border-color: ${theme.colors.primary};
          color: ${theme.colors.primary_dark};
          background: ${theme.colors.primary_light};
        }
      `;
    }

    return css`
      color: ${theme.colors.text_white};
      background: ${theme.colors.primary_dark};
      box-shadow: 0 8px 18px rgba(8, 119, 130, 0.18);

      &:hover:not(:disabled) {
        background: ${theme.colors.primary};
      }
    `;
  }}

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px rgba(17, 153, 163, 0.2);
  }

  &:active:not(:disabled) {
    transform: translateY(1px);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.65;
  }
`;

export const BoardScroller = styled.section`
  display: grid;
  gap: 18px;
  overflow-x: auto;
  padding: 2px 0 14px;
  scrollbar-color: ${({ theme }) => theme.colors.light} transparent;
`;

export const BoardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(280px, 1fr));
  gap: 16px;
  min-width: 940px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
    min-width: 0;
  }
`;

export const Column = styled.article<{ $isDropTarget?: boolean }>`
  min-height: 320px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  overflow: hidden;
  background: #f3f6f8;

  ${({ $isDropTarget, theme }) =>
    $isDropTarget &&
    css`
      border-color: ${theme.colors.primary_dark};
      background: ${theme.colors.primary_light};
      box-shadow: 0 0 0 3px rgba(17, 153, 163, 0.12);
    `}
`;

export const ColumnHeader = styled.header`
  min-height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 0 16px;
  border-radius: 8px 8px 0 0;
  color: ${({ theme }) => theme.colors.text_black};
  background: ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  font-weight: 800;
`;

export const CountBadge = styled.span`
  min-width: 24px;
  border-radius: 6px;
  padding: 2px 8px;
  color: ${({ theme }) => theme.colors.primary_dark};
  background: ${({ theme }) => theme.colors.primary_light};
  border: 1px solid rgba(17, 153, 163, 0.2);
  text-align: center;
  font-size: 13px;
  font-weight: 800;
`;

export const CardList = styled.div`
  display: grid;
  gap: 10px;
  padding: 10px;
`;

export const TaskCardButton = styled.button`
  display: grid;
  gap: 10px;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 14px;
  color: ${({ theme }) => theme.colors.text_black};
  background: ${({ theme }) => theme.colors.white};
  text-align: left;
  cursor: pointer;
  box-shadow: 0 8px 18px rgba(16, 24, 40, 0.06);
  transition:
    transform 140ms ease,
    border-color 140ms ease,
    box-shadow 140ms ease;

  &:active {
    cursor: grabbing;
  }

  &:hover,
  &:focus-visible {
    border-color: ${({ theme }) => theme.colors.primary_dark};
    outline: none;
    box-shadow: 0 12px 24px rgba(16, 24, 40, 0.1);
  }

  &:hover {
    transform: translateY(-1px);
  }
`;

export const CardTitle = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.darker};
  font-size: 15px;
  font-weight: 800;
  line-height: 1.35;
`;

export const CardMeta = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  color: ${({ theme }) => theme.colors.dark};
  font-size: 13px;
  line-height: 1.35;
`;

export const Chip = styled.span<{ $tone?: "default" | "low" | "medium" | "high" | "danger" | "warning" }>`
  display: inline-flex;
  align-items: center;
  min-height: 24px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  padding: 0 8px;
  color: ${({ theme }) => theme.colors.dark};
  background: ${({ theme }) => theme.colors.lighter};
  font-size: 12px;
  font-weight: 700;

  ${({ $tone }) =>
    $tone === "low" &&
    css`
      color: #157743;
      border-color: #c9ead8;
      background: #eaf8f0;
    `}

  ${({ $tone }) =>
    $tone === "medium" &&
    css`
      color: #8a5a00;
      border-color: #f4d895;
      background: #fff4d6;
    `}

  ${({ $tone }) =>
    $tone === "high" &&
    css`
      color: #b42318;
      border-color: #f4c7c3;
      background: #fff1f0;
    `}

  ${({ $tone }) =>
    $tone === "danger" &&
    css`
      color: #b42318;
      border-color: #f4c7c3;
      background: #fff1f0;
    `}

  ${({ $tone }) =>
    $tone === "warning" &&
    css`
      color: #8a5a00;
      border-color: #f4d895;
      background: #fff4d6;
    `}
`;

export const EmptyColumn = styled.div`
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 20px;
  color: ${({ theme }) => theme.colors.dark};
  background: rgba(255, 255, 255, 0.78);
  text-align: center;
  font-size: 14px;
  line-height: 1.45;
`;

export const StateBox = styled.div`
  display: grid;
  place-items: center;
  gap: 12px;
  min-height: 220px;
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 32px 24px;
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.dark};
  text-align: center;
  box-shadow: 0 8px 22px rgba(16, 24, 40, 0.04);

  strong {
    color: ${({ theme }) => theme.colors.text_black};
  }
`;

export const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 30;
  display: grid;
  place-items: center;
  padding: 20px;
  background: rgba(16, 24, 40, 0.52);
`;

export const ModalPanel = styled.section`
  width: min(100%, 720px);
  max-height: calc(100svh - 40px);
  overflow: auto;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0 28px 80px rgba(16, 24, 40, 0.26);
`;

export const ModalHeader = styled.header`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  padding: 20px 22px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  h2 {
    margin: 0;
    color: ${({ theme }) => theme.colors.darker};
    font-size: 22px;
    font-weight: 800;
    line-height: 1.25;
  }

  p {
    margin-top: 4px;
    color: ${({ theme }) => theme.colors.dark};
  }
`;

export const ModalBody = styled.div`
  display: grid;
  gap: 18px;
  padding: 24px 22px 22px;
`;

export const FormGrid = styled.form`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;

  ${Field}:first-child,
  ${Field}:nth-child(2),
  .full {
    grid-column: 1 / -1;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  padding-top: 8px;
  grid-column: 1 / -1;

  @media (max-width: 480px) {
    button {
      flex: 1;
    }
  }
`;

export const DetailGrid = styled.dl`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin: 0;

  div {
    display: grid;
    gap: 6px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 8px;
    padding: 14px;
    background: ${({ theme }) => theme.colors.lighter};
  }

  dt {
    color: ${({ theme }) => theme.colors.dark};
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0;
  }

  dd {
    margin: 0;
    color: ${({ theme }) => theme.colors.text_black};
    font-weight: 650;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const Pagination = styled.nav`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  color: ${({ theme }) => theme.colors.dark};
  font-size: 14px;
  font-weight: 650;

  @media (max-width: 560px) {
    justify-content: stretch;

    button {
      flex: 1;
    }
  }
`;
