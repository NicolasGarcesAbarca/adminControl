import { useRouteError } from "react-router-dom";
import { Flex, Box ,Text} from "@chakra-ui/react";
interface RouteError {
  status: number;
  statusText: string;
  message: string;
}

export default function ErrorPage() {
  const error = useRouteError() as RouteError;
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      h={'100vh'}
    >
      <Box>

        <Text fontSize='4xl'>Oops!</Text>
        <Text>Sorry, an unexpected error has occurred.</Text>
        <Text>
          Error msg: <i>{error.statusText || error.message}</i>
        </Text>
      </Box>
    </Flex>
  );
}