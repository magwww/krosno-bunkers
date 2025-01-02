import { routes } from '@/costs/routes'
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
        <Body className="bg-white mx-auto my-auto px-2 font-sans">
          <Container className="border-slate-200 mx-auto my-10 p-5 border border-solid rounded max-w-[465px]">
            <Section className="mt-8">
              <Img
                src={`${baseUrl}/bunker.png`}
                width="50"
                height="50"
                alt="Krosno Bunkers logo"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 font-normal text-2xl text-center">
              Hi <strong>{firstName}</strong>!
            </Heading>
            <Text className="text-sm leading-6">
              Thanks for purchasing a spot at Krosno Bunkers. We&apos;re excited to have you on board!
            </Text>
            <Text className="text-sm leading-6">
              You can manage your purchase in the{' '}
              <Link href={routes.userProfile} className="text-amber-800">
                user panel
              </Link>
              . You can also check who you&apos;re gonna share it with by clicking the name of the bunker.
            </Text>
            <Text className="text-sm leading-6">If you&apos;d like to get another one, feel free to do so:</Text>
            <Section className="my-8 text-center">
              <Button
                className="bg-black px-5 py-2.5 rounded font-semibold text-center text-xs no-underline /80"
                href={routes.bunkers}
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
