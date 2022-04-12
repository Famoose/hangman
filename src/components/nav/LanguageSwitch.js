import React, {useContext} from 'react';
import * as PropTypes from "prop-types";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {LangContext} from "../../lib/LangContext";
import {Trans, useTranslation} from "react-i18next";

const LanguageSwitch = (props) => {
    const {changeLanguage} = useContext(LangContext)
    const [anchorElLang, setAnchorElLang] = React.useState(null)
    const {t} = useTranslation();

    const handleCloseLangMenu = () => {
        setAnchorElLang(null)
    }
    const handleOpenLangMenu = (event) => {
        setAnchorElLang(event.currentTarget)
    }
    return <><Tooltip title={t('nav.selectLanguageTooltip')}>
        <Button
            onClick={handleOpenLangMenu}
            sx={{color: 'white'}}
        >
            <Trans>nav.languageSwitchButton</Trans>
        </Button>
    </Tooltip>
        <Menu
            sx={{mt: "45px"}}
            id="menu-appbar"
            anchorEl={anchorElLang}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={Boolean(anchorElLang)}
            onClose={handleCloseLangMenu}
        >
            {props.langs.map((lang) => (
                <MenuItem
                    key={lang.key}
                    onClick={() => {
                        changeLanguage(lang.key)
                        handleCloseLangMenu()
                    }}
                >
                    <Typography textAlign="center">
                        <Trans>nav.languages.{lang.name}</Trans>
                    </Typography>
                </MenuItem>
            ))}
        </Menu>
    </>;
}

LanguageSwitch.propTypes = {
    profile: PropTypes.any,
    langs: PropTypes.array,
};

export default LanguageSwitch;