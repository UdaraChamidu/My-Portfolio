export async function sendContactEnquiry(send, formData) {
  const serviceId = "service_qp0jrov";
  const publicKey = "TqR-vRWKOgnaZq2aA";
  await send(serviceId, "template_agqr49w", formData, publicKey);
  // The enquiry is delivered; an acknowledgement failure must not invite a duplicate.
  try {
    await send(serviceId, "template_zja5mq3", formData, publicKey);
    return { acknowledgementSent: true };
  } catch {
    return { acknowledgementSent: false };
  }
}
