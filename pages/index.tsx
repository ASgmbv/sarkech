import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { ReactElement } from "react";
import BaseLayout from "~components/layouts/base-layout";

function HomePage() {
  return (
    <>
      <Header />
      <Box
        backgroundImage="url(/grid-bg.svg)"
        backgroundPosition="center"
        backgroundRepeat="repeat-x">
        <Container maxWidth='container.lg'>
          <Box textAlign="center" paddingY={32}>

            <Heading as="h1" size="2xl" fontWeight="bold" bg="white" textAlign='center'>
              DnD
              <Box as="span" color="#37B6FE">
                {" "}
                Tailwind{" "}
              </Box>
              <br />
              Builder
            </Heading>

            <Text
              pt={6}
              fontSize={["md", null, "xl"]}
              mx="auto"
              color="gray.600"
              bg="white"
              maxWidth='container.sm'
            >
              Starting at just $2000/month, get Unlimited MVP development
              subscription. Cancel anytime.
            </Text>

          </Box>
        </Container>
      </Box>
    </>
  );
}

const Header = () => {
  return (
    <Box
      as='header'
      boxShadow='0 -1px 0 #fff, 0 3px 6px 0 rgb(0 0 0 / 5%), 0 0.5px 0 0 rgb(0 0 0 / 10%)'
    >
      <Container
        maxWidth='container.lg'
      >
        <Flex
          py='3'
          alignItems='center'
        >
          Header
        </Flex>
      </Container>
    </Box>
  )
}

HomePage.getLayout = (page: ReactElement) => (
  <BaseLayout
    title="Sarkech"
  >
    {page}
  </BaseLayout>
)

export default HomePage;