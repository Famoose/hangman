import * as React from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import * as PropTypes from "prop-types";
import {Trans, useTranslation} from "react-i18next";

const UserSettings = (props) => {
    const [anchorElUser, setAnchorElUser] = React.useState(null)
    const {t} = useTranslation();

    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    }
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget)
    }
    return <>
        <Tooltip title={t('nav.settingsTooltip')}>
            <IconButton
                onClick={handleOpenUserMenu}
                sx={{p: 0}}
            >
                <Avatar alt={props.profile.username} src="/"/>
            </IconButton>
        </Tooltip>
        <Menu
            sx={{mt: "45px"}}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
        >
            {props.settings.map((setting) => (
                <MenuItem
                    key={setting.name}
                    onClick={() => {
                        setting.callback()
                        handleCloseUserMenu()
                    }}
                >
                    <Typography textAlign="center">
                        <Trans>nav.settings.{setting.name}</Trans>
                    </Typography>
                </MenuItem>
            ))}
        </Menu>
    </>;
}

UserSettings.propTypes = {
    profile: PropTypes.any,
    settings: PropTypes.array,
};


export default UserSettings;