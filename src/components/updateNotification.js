import { Box, Button, Slide } from "@chakra-ui/react";
import React, { useEffect } from "react";
import * as serviceWorkerRegistration from "../serviceWorkerRegistration";

const UpdateNotification = () => {
  const [showReload, setShowReload] = React.useState(false);
  const [waitingWorker, setWaitingWorker] = React.useState(null);

  const onSWUpdate = (registration) => {
    setShowReload(true);
    setWaitingWorker(registration.waiting);
  };

  useEffect(() => {
    serviceWorkerRegistration.register({ onUpdate: onSWUpdate });
  }, []);

  const reloadPage = () => {
    waitingWorker?.postMessage({ type: "SKIP_WAITING" });
    setShowReload(false);
    //eslint-disable-next-line
    window.location.href = window.location.href;
  };

  return (
    <>
      <Slide direction="bottom" in={showReload} style={{ zIndex: 10, maxWidth: "500px" }}>
        <Box
          p="4"
          color="white"
          mt="4"
          bg="teal.500"
          rounded="md"
          shadow="md"
          m={4}
          d="flex"
          alignItems="center"
          justifyContent="space-between">
          <Box>New version is available!</Box>
          <Button size="sm" variant="outline" colorScheme="gray" onClick={reloadPage}>
            Reload
          </Button>
        </Box>
      </Slide>
    </>
  );
};

export default UpdateNotification;
