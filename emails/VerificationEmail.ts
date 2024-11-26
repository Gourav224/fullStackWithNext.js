// import {
//     Html,
//     Head,
//     Font,
//     Preview,
//     Heading,
//     Row,
//     Section,
//     Text,
//     Button,
// } from "@react-email/components";

// interface VerificationEmailProps {
//     username: string;
//     otp: string;
// }

// export default function VerificationEmail({
//     username,
//     otp,
// }: VerificationEmailProps) {
//     return (
//         <Html lang="en" dir="ltr">
//             <Head>
//                 <title>Verification Code</title>
//                 <Font
//                     fontFamily="Roboto"
//                     fallbackFontFamily="Verdana"
//                     webFont={{
//                         url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
//                         format: "woff2",
//                     }}
//                     fontWeight={400}
//                     fontStyle="normal"
//                 />
//             </Head>
//             <Preview>Here&apos;s your verification code: {otp}</Preview>
//             <Section>
//                 <Row>
//                     <Heading as="h2">Hello {username},</Heading>
//                 </Row>
//                 <Row>
//                     <Text>
//                         Thank you for registering. Please use the following
//                         verification code to complete your registration:
//                     </Text>
//                 </Row>
//                 <Row>
//                     <Text>{otp}</Text>
//                 </Row>
//                 <Row>
//                     <Text>
//                         If you did not request this code, please ignore this
//                         email.
//                     </Text>
//                 </Row>
//                 {/* <Row>
//             <Button
//               href={`http://localhost:3000/verify/${username}`}
//               style={{ color: '#61dafb' }}
//             >
//               Verify here
//             </Button>
//           </Row> */}
//             </Section>
//         </Html>
//     );
// }

interface VerificationEmailProps {
    username: string;
    otp: string;
}

export default function VerificationEmail({
    username,
    otp,
}: VerificationEmailProps): string {
    return `
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Verification Code</title>
    <style>
      @font-face {
        font-family: 'Roboto';
        src: url('https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2') format('woff2');
        font-weight: 400;
        font-style: normal;
      }
      body {
        font-family: 'Roboto', Verdana, sans-serif;
        color: #333;
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
      }
      .container {
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
        background-color: #fff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }
      h2 {
        font-size: 24px;
        margin-bottom: 10px;
      }
      p {
        font-size: 16px;
        line-height: 1.5;
      }
      .otp {
        font-size: 22px;
        font-weight: bold;
        margin: 20px 0;
      }
      .footer {
        margin-top: 20px;
        font-size: 14px;
        color: #666;
      }
      .button {
        display: inline-block;
        background-color: #61dafb;
        color: #fff;
        text-decoration: none;
        padding: 10px 20px;
        border-radius: 4px;
        font-weight: bold;
        margin-top: 20px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h2>Hello ${username},</h2>
      <p>Thank you for registering. Please use the following verification code to complete your registration:</p>
      <p class="otp">${otp}</p>
      <p>If you did not request this code, please ignore this email.</p>
      
      <a href="${process.env.BASE_URL}/verify/${username}" class="button">Verify here</a>
            <div class="footer">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </div>
    </div>
  </body>
</html>
`;
}
