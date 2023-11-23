import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import logo from "../../assets/images/logo.png";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DescriptionIcon from '@mui/icons-material/Description';
import PersonIcon from '@mui/icons-material/Person';
import ContactsIcon from '@mui/icons-material/Contacts';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme ();
  const colors = tokens(theme.palette.mode);
  return(
    <MenuItem 
    active={selected === title}
    style={{
      color: colors.grey[100],
      marginBottom: "8px"
    }}
    onClick={()=>setSelected(title)} 
    icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to}/>
    </MenuItem>
  );
};


const Sidebar = () => {
    const theme = useTheme ();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState('Dashboard');

    return (
    <Box
    sx={
      theme.palette.mode === 'dark'
          ? {
                "& .pro-sidebar-inner": {
                    background: `${colors.primary[400]} `,
                },
                "& .pro-icon-wrapper": {
                    backgroundColor: "transparent !important",
                },
                "& .pro-inner-item": {
                    // color: "#47b747 !important",
                    padding: "5px 35px 5px 20px !important",
                },
                "& .pro-inner-item:hover": {
                    color: "#fff !important",
                    background: "#6870fa !important",
                },
                "& .pro-menu-item.active": {
                    color: "#ffffff !important",
                    background: "#6870fa !important",
                },
            }
          : {
                "& .pro-sidebar-inner": {
                    background: "#FFFFFF !important",
                },
                "& .pro-icon-wrapper": {
                    backgroundColor: "transparent !important",
                },
                "& .pro-inner-item": {
                  padding: "5px 35px 5px 20px !important",
                },
                "& .pro-inner-item:hover": {
                  color: "#fff !important",
                  background: "#47b747 !important"
                },
                "& .pro-menu-item.active": {
                  color: "#ffffff !important",
                  background: "#47b747 !important",
                },
            }
  }
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
            <MenuItem
              onClick={()=>setIsCollapsed(!isCollapsed)}
              icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
              style={{
                margin: "10px 0 20px 0",
                color: colors.grey[100],
              }}
              >
                {!isCollapsed &&(
                  <Box 
                  display="flex" 
                  justifyContent="space-between"
                  // alignItems="center"
                  // ml="15px"
                  >
                    {/* <Typography>ADMIN</Typography> */}
                    <img 
                    src={logo} 
                    alt="Dummy Logo" 
                    style={{ width: '180px', height: '50px' }} 
                    />
                    <IconButton onClick={()=> setIsCollapsed(!isCollapsed)}>
                      <MenuOutlinedIcon/>
                    </IconButton>
                  </Box>
                )}
            </MenuItem>
            {/* MENU ITEMS */}
            <Box paddingLeft={isCollapsed? undefined: "10%"}>
                  <Item
                    title="Dashboard"
                    to="/"
                    icon={<DashboardIcon/>}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Accounts"
                    to="/accounts"
                    icon={<AccountBalanceWalletIcon/>}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Payroll"
                    to="/payroll"
                    icon={<AttachMoneyIcon/>}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Reports"
                    to="/reports"
                    icon={<DescriptionIcon/>}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Advisor"
                    to="/advisor"
                    icon={<PersonIcon/>}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Contacts"
                    to="/contacts"
                    icon={<ContactsIcon/>}
                    selected={selected}
                    setSelected={setSelected}
                  />
            </Box>
            
        </Menu>
      </ProSidebar>

    </Box>
    );
}
export default Sidebar;