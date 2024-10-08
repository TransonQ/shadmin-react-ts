import { useEffect } from "react"
import { useBlocker } from "react-router-dom"
import { Modal, ModalSection } from "./modal"

type NavigationBlockerProps = {
  isBlocked: boolean
}

export const NavigationBlocker = ({ isBlocked }: NavigationBlockerProps) => {
  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      isBlocked && currentLocation.pathname !== nextLocation.pathname
  )

  const confirmLeave = () => {
    if (blocker.state === "blocked") {
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
  }, [blocker])

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
      <ModalSection>
        <p>{"Are you sure you want to leave?"}</p>
      </ModalSection>
    </Modal>
  )
}
