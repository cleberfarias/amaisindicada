import React, { useEffect } from "react";
import styled from "styled-components";
import { FiX } from "react-icons/fi";
import { theme } from "../../styles/theme";

const Panel = styled.aside`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1100;
  width: min(460px, 100vw);
  height: 100vh;
  overflow: auto;
  border: 1px solid ${theme.colors.line};
  border-radius: 8px 0 0 8px;
  background: ${theme.colors.white};
  box-shadow: -24px 0 70px rgba(48, 38, 29, 0.22);
  transform: translateX(${({ $open }) => ($open ? "0" : "104%")});
  transition: transform 0.14s ease;

  @media (max-width: 560px) {
    width: 100vw;
    border-radius: 0;
  }
`;

const Overlay = styled.button`
  position: fixed;
  inset: 0;
  z-index: 1090;
  border: 0;
  background: rgba(48, 38, 29, 0.36);
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  pointer-events: ${({ $open }) => ($open ? "auto" : "none")};
  transition: opacity 0.14s ease;
`;

const FloatingButton = styled.button`
  position: fixed;
  right: 22px;
  bottom: 22px;
  z-index: 1080;
  display: ${({ $visible }) => ($visible ? "inline-flex" : "none")};
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 52px;
  padding: 0 18px;
  border: 1px solid ${theme.colors.tealDark};
  border-radius: 999px;
  color: ${theme.colors.white};
  background: ${theme.colors.tealDark};
  box-shadow: 0 18px 48px rgba(48, 38, 29, 0.22);
  font-weight: 800;
  cursor: pointer;

  @media (max-width: 560px) {
    right: 16px;
    bottom: 16px;
    left: 16px;
    min-height: 56px;
    padding: 0 16px;
  }
`;

const Header = styled.div`
  position: sticky;
  top: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 18px;
  border-bottom: 1px solid ${theme.colors.line};
  background: ${theme.colors.white};

  h2 {
    margin: 0;
    font-family: ${theme.fonts.heading};
    font-size: 1.5rem;
    line-height: 1;
  }
`;

const CloseButton = styled.button`
  display: inline-grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border: 1px solid ${theme.colors.line};
  border-radius: 999px;
  color: ${theme.colors.brown};
  background: ${theme.colors.white};
  cursor: pointer;
`;

const Body = styled.form`
  display: grid;
  gap: 14px;
  padding: 18px;

  @media (max-width: 560px) {
    padding: 16px 18px 96px;
  }
`;

function CheckoutDrawer({
  open,
  floatingVisible,
  floatingLabel,
  floatingIcon,
  title,
  closeLabel,
  children,
  onOpen,
  onClose,
  onSubmit,
}) {
  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, open]);

  return (
    <>
      <Overlay type="button" $open={open} aria-label={closeLabel} onClick={onClose} />
      <FloatingButton type="button" $visible={floatingVisible} onClick={onOpen}>
        {floatingIcon} {floatingLabel}
      </FloatingButton>
      <Panel role="dialog" aria-modal="true" aria-hidden={!open} aria-label={title} $open={open}>
        <Header>
          <h2>{title}</h2>
          <CloseButton type="button" onClick={onClose} aria-label={closeLabel}>
            <FiX />
          </CloseButton>
        </Header>
        <Body onSubmit={onSubmit}>{children}</Body>
      </Panel>
    </>
  );
}

export default CheckoutDrawer;
