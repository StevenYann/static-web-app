import { Alert } from "@/interfaces/Alert"
import { APIManager } from "@/utils/APIManager"
import { useState, useEffect } from "react"

const useAlerts = () => {
	const [hasAlerts, setHasAlerts] = useState<boolean>(false)
	const [alerts, setAlerts] = useState<Alert[]>([])

  useEffect(() => {
    APIManager.getInstance()
      .then((instance) => instance.getNotification())
      .then((data) => data.result)
      .then((result) => {
        if (result.length > 0) {
          setAlerts(result)
          setHasAlerts(true)
        }
      })
  }, [])

	const removeAlerts = (alert: Alert) => {
		var index = alerts.indexOf(alert)
		if (index > -1) {
			alerts.splice(index, 1)
			setAlerts([...alerts])
			if (alerts.length == 0) setHasAlerts(false)
		}
	}

	return [alerts, setAlerts, hasAlerts, removeAlerts]
}

export default useAlerts