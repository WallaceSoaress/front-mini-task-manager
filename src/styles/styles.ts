import styled from "styled-components";

export const VersionBadge = styled.div`
  position: fixed;
  right: 16px;
  bottom: 12px;
  z-index: 10;
  max-width: calc(100vw - 32px);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 4px 8px;
  color: ${({ theme }) => theme.colors.dark};
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 8px 24px rgba(16, 24, 40, 0.1);
  font-size: 12px;
  line-height: 1.4;
  pointer-events: none;
`;
