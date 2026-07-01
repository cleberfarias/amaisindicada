import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { FiBarChart2, FiBox, FiEdit3 } from "react-icons/fi";
import { theme } from "../../styles/theme";

const Shell = styled.div`
  margin-bottom: 28px;
`;

const Tabs = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 10px;
  border: 1px solid ${theme.colors.line};
  border-radius: 8px;
  background: ${theme.colors.white};
`;

const Tab = styled(NavLink)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 42px;
  padding: 0 16px;
  border-radius: 999px;
  color: ${theme.colors.brown};
  font-weight: 800;
  text-decoration: none;

  &:hover,
  &.active {
    color: ${theme.colors.white};
    background: ${theme.colors.teal};
  }
`;

function AdminShell() {
  return (
    <Shell>
      <Tabs aria-label="Menu administrativo">
        <Tab to="/admin/produtos">
          <FiBox /> Produtos
        </Tab>
        <Tab to="/admin/marketing">
          <FiBarChart2 /> Marketing
        </Tab>
        <Tab to="/admin/blog">
          <FiEdit3 /> Blog
        </Tab>
      </Tabs>
    </Shell>
  );
}

export default AdminShell;
