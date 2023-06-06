import {
  Badge,
  List,
  Stack,
  Typography
} from '@mui/material'
import React, { useState } from 'react'
import NotificationsIcon from '@mui/icons-material/Notifications'
import CloseIcon from '@mui/icons-material/Close'
import { APIManager } from '@/utils/APIManager'
import { Button } from '@mui/material/'
import useAlerts from './UseAlerts'
import Menu from '../menu/Menu'

const defaultColour = 'rgb(137,137,137)'
const fontColour = 'rgb(90,90,90)'

const logNotificationsChecked = () => {
  APIManager.getInstance().then((instance) =>
    instance.setLastNotificationCheck()
  )
}

const AlertButton = () => {
  const [alertsChecked, setAlertsChecked] = useState<boolean>(false)
  const [panelAnchor, setPanelAnchor] = useState<null | HTMLElement>(null)
  const [alerts, setAlerts, hasAlerts, removeAlerts] = useAlerts()

  const handleClick = (event: any) => {
    panelAnchor ? setPanelAnchor(null) : setPanelAnchor(event.currentTarget)
    if (!alertsChecked) logNotificationsChecked()
    setAlertsChecked(true)
  }

  return (
    <Button
      onClick={handleClick}
      sx={{ minWidth: '45px', maxWidth: '45px', borderRadius: '60px' }}
    >
      <Badge
        variant="dot"
        badgeContent={2}
        color="error"
        invisible={!hasAlerts}
      >
        <NotificationsIcon color="action" />
        <AlertPanel
          panelAnchor={panelAnchor}
          onClickAway={handleClick}
          alerts={alerts}
          setAlerts={setAlerts}
          removeAlerts={removeAlerts}
        />
      </Badge>
    </Button>
  )
}

const AlertPanel = (props: any) => {
  const {
    hasAlerts,
    panelAnchor,
    onClickAway,
    alerts,
    removeAlerts,
  } = props
  
  const alertPanelStyle = {
    bgcolor: 'white',
    color: 'black',
    marginTop: '20px',
    paddingTop: '10px',
    height: 'calc(100vh - 64px)',
    overflow: 'auto',
    boxShadow: '0 0 5px #ccc'
  }

  const renderAlerts = () => {
    const alertItems = []
    for (const alert of alerts) {
      alertItems.push(
        <AlertItem key={alert} alert={alert} handleClick={removeAlerts} />
      )
    }
    return alertItems.reverse()
  }

  if (hasAlerts) {
    return (
      <Menu
        panelAnchor={panelAnchor}
        onClickAway={onClickAway}
        sx={{ bgcolor: 'white', width: { sm: '300px', md: '400px' } }}
      >
        <List style={alertPanelStyle}>
          {renderAlerts()}
        </List>
      </Menu>
    )
  }

  return (
    <Menu
      panelAnchor={panelAnchor}
      onClickAway={onClickAway}
      sx={{ bgcolor: 'white', width: { sm: '300px', md: '400px' } }}
    >
      <Typography color={fontColour} align="center">
        No alerts at this time.
      </Typography>
    </Menu>
  )
}

const AlertItem = (props: any) => {
  const { category_name, event_date, update_type } = props.alert

  let action: string
  switch (update_type) {
    case 1:
      action = 'Updated'
      break
    case 3:
      action = 'Deleted'
      break
    default:
      action = 'Added'
  }

  const date = new Date(event_date)

  const alertItemStyle = {
    minHeight: '60px',
    borderStyle: 'solid',
    borderWidth: '1px 0px',
    borderColor: defaultColour,
    color: defaultColour,
    marginTop: '-1px',
    paddingRight: '10px',
    paddingLeft: '10px'
  }

  const dateStr = date.toDateString().substring(4)
  const formattedDateStr =
    dateStr.slice(0, dateStr.length - 5) +
    ',' +
    dateStr.slice(dateStr.length - 5)

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={'5px'}
      justifyContent="space-between"
      style={alertItemStyle}
    >
      <Typography color={fontColour} style={{ paddingLeft: 10 }}>
        {`${action} `}
        <strong>{category_name}</strong>
        {` on ${formattedDateStr}.`}
      </Typography>
      <CloseIcon onClick={props.handleClick}></CloseIcon>
    </Stack>
  )
}

export default AlertButton
