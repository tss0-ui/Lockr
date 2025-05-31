export async function sendEmail(to: string, subject: string, body: string): Promise<void> {
  // Integrate with SendGrid, Mailgun, SES, etc.
  console.log(`Sending email to ${to}: ${subject} → ${body}`);
}
