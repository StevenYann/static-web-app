import React, { useEffect, useRef, useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import RightMenu from './RightMenu'
import { Backdrop } from '@mui/material'

const RightMenuButton = (props: any) => {
  const [panelAnchor, setPanelAnchor] = useState<null | HTMLElement | any>(null)
  const [menuState, setMenuState] = useState(0)
  const [backDrop, setBackDrop] = useState(false)
  const ref = useRef(null)

  function updateState(state: any) {
    setMenuState(state)
  }

  const handleClick = (dayClick: boolean) => {
    panelAnchor ? setPanelAnchor(null) : setPanelAnchor(ref.current)
    dayClick ? updateState(1.5) : updateState(0)
    setBackDrop(!backDrop)
  }

  useEffect(() => {
    if (props.dayClickBar > 0) handleClick(true)
  }, [props.dayClickBar])

  return (
    <div>
      <MenuIcon onClick={() => handleClick(false)} color="action" ref={ref} />
      <RightMenu
        panelAnchor={panelAnchor}
        onClickAway={() => handleClick(false)}
        updateState={updateState}
        menuState={menuState}
        clickedDate={props.clickedDate}
      />
      <Backdrop
        sx={{
          height: 'calc(100vh - 63px)',
          color: '#fff',
          zIndex: 1200,
          top: '63px'
        }}
        open={backDrop}
        onClick={() => handleClick(false)}
      >
        {''}
      </Backdrop>
    </div>
  )
}

export default RightMenuButton
