import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import { InputBase } from "@mui/material";
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
// import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";

const Topbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    return(
        <Box display="flex" justifyContent="flex-end" p={2}>
            {/* search bar */}
            {theme.palette.mode==='dark'?(
            <Box backgroundColor={colors.primary[700]} borderRadius="3px">
                <IconButton type="button" sx={{p:1}}>
                    <SearchIcon/>
                </IconButton>
                <InputBase sx={{ml: 1 }} placeholder="Search"/>
            </Box>):(
            <Box display="flex" backgroundColor="#F6F7F9" borderRadius="3px">
                <IconButton type="button" sx={{p:1}}>
                    <SearchIcon/>
                </IconButton>
                <InputBase sx={{ml: 1 }} placeholder="Search"/>
            </Box>)}
            {/* Icons section */}
            <Box display="flex">
                <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === 'dark' ? (
                    <DarkModeOutlinedIcon />):(
                        <LightModeOutlinedIcon />
                    )}
                </IconButton>
                <IconButton>
                <Box sx={{ color: 'action.active' }}>
                    <Badge color="secondary" variant="dot">
                      <NotificationsOutlinedIcon />
                    </Badge>
                </Box>
                </IconButton>
                <IconButton>
                    <Avatar sx={{ width: 25, height: 25 }} src="https://mui.com/static/images/avatar/1.jpg" />
                </IconButton>
            </Box>
        </Box>
    )
}
export default Topbar;