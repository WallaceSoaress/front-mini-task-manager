import styled, { css } from "styled-components";

export const Toolbar = styled.section`
  display: grid;
  gap: 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 16px;
  background: ${({ theme }) => theme.colors.white};
`;

export const ToolbarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;

  h1 {
    margin: 0;
    font-size: 28px;
  }

  p {
    color: ${({ theme }) => theme.colors.dark};
  }
`;

export const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(150px, 1fr));
  gap: 12px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

export const Field = styled.label`
  display: grid;
  gap: 6px;
  color: ${({ theme }) => theme.colors.text_black};
  font-size: ${({ theme }) => theme.fonts.size.small};
  font-weight: 700;

  input,
  select,
  textarea {
    width: 100%;
    min-height: 40px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 8px;
    padding: 0 10px;
    color: ${({ theme }) => theme.colors.text_black};
    background: ${({ theme }) => theme.colors.white};
    box-sizing: border-box;
    font: inherit;
  }

  textarea {
    min-height: 92px;
    padding: 10px;
    resize: vertical;
  }

  input:focus,
  select:focus,
  textarea:focus {
    border-color: ${({ theme }) => theme.colors.primary_dark};
    outline: 3px solid rgba(67, 190, 198, 0.18);
  }
`;

export const FieldError = styled.span`
  color: ${({ theme }) => theme.colors.danger};
  font-size: 13px;
  font-weight: 600;
`;

export const Button = styled.button<{ $variant?: "primary" | "ghost" | "danger" }>`
  min-height: 40px;
  border: 1px solid transparent;
  border-radius: 8px;
  padding: 0 14px;
  cursor: pointer;
  font: inherit;
  font-weight: 700;

  ${({ $variant = "primary", theme }) => {
    if ($variant === "danger") {
      return css`
        color: ${theme.colors.text_white};
        background: ${theme.colors.danger};
      `;
    }

    if ($variant === "ghost") {
      return css`
        color: ${theme.colors.text_black};
        border-color: ${theme.colors.border};
        background: ${theme.colors.white};
      `;
    }

    return css`
      color: ${theme.colors.text_white};
      background: ${theme.colors.primary_dark};
    `;
  }}

  &:disabled {
    cursor: not-allowed;
    opacity: 0.65;
  }
`;

export const BoardScroller = styled.section`
  display: grid;
  gap: 16px;
  overflow-x: auto;
  padding: 4px 0 12px;
`;

export const BoardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(280px, 1fr));
  gap: 14px;
  min-width: 900px;

  @media (max-width: 720px) {
    min-width: 840px;
  }
`;

export const Column = styled.article<{ $isDropTarget?: boolean }>`
  min-height: 320px;
  border: 1px solid transparent;
  border-radius: 8px;
  background: #f7f7f8;

  ${({ $isDropTarget, theme }) =>
    $isDropTarget &&
    css`
      border-color: ${theme.colors.primary_dark};
      background: rgba(67, 190, 198, 0.08);
    `}
`;

export const ColumnHeader = styled.header`
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 0 14px;
  border-radius: 8px 8px 0 0;
  color: ${({ theme }) => theme.colors.text_black};
  background: #f3f3f4;
  font-weight: 700;
`;

export const CountBadge = styled.span`
  min-width: 24px;
  border-radius: 6px;
  padding: 1px 7px;
  color: ${({ theme }) => theme.colors.dark};
  background: ${({ theme }) => theme.colors.light};
  text-align: center;
  font-size: 13px;
`;

export const CardList = styled.div`
  display: grid;
  gap: 8px;
  padding: 8px;
`;

export const TaskCardButton = styled.button`
  display: grid;
  gap: 10px;
  width: 100%;
  border: 1px solid #d9dce1;
  border-radius: 8px;
  padding: 12px;
  color: ${({ theme }) => theme.colors.text_black};
  background: ${({ theme }) => theme.colors.white};
  text-align: left;
  cursor: pointer;
  box-shadow: 0 1px 2px rgba(9, 30, 66, 0.12);

  &:active {
    cursor: grabbing;
  }

  &:hover,
  &:focus-visible {
    border-color: ${({ theme }) => theme.colors.primary_dark};
    outline: none;
  }
`;

export const CardTitle = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.text_black};
  font-size: 15px;
  font-weight: 600;
  line-height: 1.35;
`;

export const CardMeta = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  color: ${({ theme }) => theme.colors.dark};
  font-size: 13px;
`;

export const Chip = styled.span<{ $tone?: "default" | "low" | "medium" | "high" | "danger" | "warning" }>`
  display: inline-flex;
  align-items: center;
  min-height: 24px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  padding: 0 8px;
  background: ${({ theme }) => theme.colors.white};
  font-size: 12px;
  font-weight: 700;

  ${({ $tone }) =>
    $tone === "low" &&
    css`
      color: #157743;
      background: #f0fdf5;
    `}

  ${({ $tone }) =>
    $tone === "medium" &&
    css`
      color: #8a5a00;
      background: #fff7df;
    `}

  ${({ $tone }) =>
    $tone === "high" &&
    css`
      color: #b42318;
      background: #fff4f4;
    `}

  ${({ $tone }) =>
    $tone === "danger" &&
    css`
      color: #b42318;
      background: #fff4f4;
    `}

  ${({ $tone }) =>
    $tone === "warning" &&
    css`
      color: #8a5a00;
      background: #fff7df;
    `}
`;

export const EmptyColumn = styled.div`
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 18px;
  color: ${({ theme }) => theme.colors.dark};
  background: rgba(255, 255, 255, 0.7);
  text-align: center;
  font-size: 14px;
`;

export const StateBox = styled.div`
  display: grid;
  place-items: center;
  gap: 12px;
  min-height: 220px;
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 24px;
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.dark};
  text-align: center;
`;

export const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 30;
  display: grid;
  place-items: center;
  padding: 20px;
  background: rgba(0, 0, 0, 0.36);
`;

export const ModalPanel = styled.section`
  width: min(100%, 720px);
  max-height: calc(100svh - 40px);
  overflow: auto;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0 24px 70px rgba(9, 30, 66, 0.28);
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
  }
`;

export const ModalBody = styled.div`
  display: grid;
  gap: 16px;
  padding: 22px;
`;

export const FormGrid = styled.form`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;

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
  padding-top: 6px;
  grid-column: 1 / -1;
`;

export const DetailGrid = styled.dl`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin: 0;

  div {
    display: grid;
    gap: 4px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 8px;
    padding: 12px;
  }

  dt {
    color: ${({ theme }) => theme.colors.dark};
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
  }

  dd {
    margin: 0;
    color: ${({ theme }) => theme.colors.text_black};
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
`;
