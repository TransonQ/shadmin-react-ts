import { useEffect } from "react"
import { useBlocker } from "react-router-dom"
import { Modal } from "./modal"

type NavigationBlockerProps = {
  isBlocked: boolean
}

export const NavigationBlocker = ({ isBlocked }: NavigationBlockerProps) => {
  const blocker = useBlocker(({ currentLocation, nextLocation }) => {
    console.log('{ currentLocation, nextLocation }: ', { currentLocation, nextLocation });

    return isBlocked && currentLocation.pathname !== nextLocation.pathname
  })

  const confirmLeave = () => {
    if (blocker.state === "blocked") {
      console.log("blocker: ", blocker)
      blocker.proceed()
    }
  }
  const cancel = () => {
    if (blocker.state === "blocked") {
      blocker.reset()
    }
  }

  useEffect(() => {
    return () => {
      if (blocker.state === "blocked") {
        blocker.reset()
      }
    }
  }, [blocker.state])

  return (
    <Modal
      title="Confirm Leave"
      open={blocker.state === "blocked"}
      onClose={cancel}
      secondaryAction={{ content: "Cancel", onAction: cancel }}
      primaryAction={{
        content: "Leave",
        destructive: true,
        onAction: confirmLeave,
      }}
    >
      <Modal.Section>
        <p>{"Are you sure you want to leave?"}</p>
      </Modal.Section>
    </Modal>
  )
}
