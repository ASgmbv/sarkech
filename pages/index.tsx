import { Box, Button, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { ReactElement } from "react";
import BaseLayout from "~components/layouts/base-layout";
import ReactPlayer from 'react-player'

function HomePage() {
  return (
    <>
      <Header />
      <Box
      // backgroundImage="url(/grid-bg.svg)"
      // backgroundPosition="center"
      // backgroundRepeat="repeat-x"
      >
        <Container maxWidth='container.lg'>
          <Box textAlign="center" paddingY='14'>

            <Heading as="h1" size="2xl" fontWeight="bold" bg="white" textAlign='center'>
              Drag and drop
              <Box as="span" color="#37B6FE">
                {" "}
                Tailwind CSS
              </Box>
              <br />
              templates builder
            </Heading>

            <Flex
              justifyContent='center'
              mt='10'
            >
              <ReactPlayer url='https://youtu.be/-6_F18Yhfr0' />
            </Flex>


            <Text
              pt={6}
              fontSize={["md", null, "xl"]}
              mx="auto"
              color="gray.600"
              bg="white"
              maxWidth='container.sm'
              mb='4'
            >
              Watch short 1 minute demo on how to use the builder
            </Text>

            <Button
              as='a'
              href='/studio'
              size='lg'
              colorScheme='blue'
              rounded='3xl'
            >
              Start playing
            </Button>

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