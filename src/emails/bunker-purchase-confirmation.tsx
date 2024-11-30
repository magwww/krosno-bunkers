import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
} from '@react-email/components'

interface BunkerPurchaseConfirmationProps {
  firstName: string
}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || ''

export const BunkerPurchaseConfirmation = ({ firstName }: BunkerPurchaseConfirmationProps) => {
  const previewText = 'Bunker purchase confirmation'

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-slate-200 rounded my-10 mx-auto p-5 max-w-[465px]">
            <Section className="mt-8">
              <Img
                src={`${baseUrl}/bunker.png`}
                width="50"
                height="50"
                alt="Krosno Bunkers logo"
                className="my-0 mx-auto"
              />
            </Section>
            <Heading className="text-2xl font-normal text-center p-0 my-[30px] mx-0">
              Hi <strong>{firstName}</strong>!
            </Heading>
            <Text className="text-sm leading-6">
              Thanks for purchasing a spot at Krosno Bunkers. We&apos;re excited to have you on board!
            </Text>
            <Text className="text-sm leading-6">
              You can manage your purchase in the{' '}
              <Link href="https://krosno-bunkers.vercel.app/user-profile" className="text-amber-800">
                user panel
              </Link>
              . You can also check who you&apos;re gonna share it with by clicking the name of the bunker.
            </Text>
            <Text className="text-sm leading-6">If you&apos;d like to get another one, feel free to do so:</Text>
            <Section className="text-center my-8">
              <Button
                className="bg-black rounded text-white text-xs font-semibold no-underline text-center px-5 py-2.5"
                href="https://krosno-bunkers.vercel.app/bunkers"
              >
                Get a spot
              </Button>
            </Section>
            <Text className="text-sm leading-6">
              Thank you for choosing Krosno Bunkers! We look forward to seeing you soon. Stay safe! 🫡
            </Text>
            <Text className="text-sm leading-6">Krosno Bunkers Team</Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default BunkerPurchaseConfirmation
