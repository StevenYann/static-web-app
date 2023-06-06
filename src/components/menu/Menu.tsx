import { Popper, ClickAwayListener } from "@mui/material"

interface menuProps {
	panelAnchor: null | HTMLElement,
	onClickAway: (event: any) => void,
	children: any,
	sx: any,
	modifiers?: any,
}

const Menu = (props: menuProps) => {
	const {
		panelAnchor,
		onClickAway,
		children,
		sx,
		modifiers,
	} = props

	return (
		<Popper
      open={Boolean(panelAnchor)}
      anchorEl={panelAnchor}
      sx={sx}
			modifiers={modifiers}
    >
      <ClickAwayListener onClickAway={onClickAway}>
				{children}
			</ClickAwayListener>
		</Popper>
		
	)
}

export default Menu