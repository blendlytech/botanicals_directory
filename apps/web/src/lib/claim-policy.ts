export type ClaimInput = { vendorId: string; evidence: string };
export function parseClaimInput(value: unknown): ClaimInput {
  if (!value || typeof value !== 'object') throw new Error('Provide the listing and ownership details.');
  const { vendorId, evidence } = value as Record<string, unknown>;
  if (typeof vendorId !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(vendorId))
    throw new Error('Choose a valid listing.');
  if (typeof evidence !== 'string' || evidence.trim().length < 20 || evidence.trim().length > 2000)
    throw new Error('Provide 20–2,000 characters explaining how we can verify you represent this business.');
  return { vendorId, evidence: evidence.trim() };
}
export function safeReturnPath(value: string | null): string {
  if (!value || !value.startsWith('/') || value.startsWith('//') || /[\\\\\u0000-\u0020]/.test(value)) return '/dashboard';
  const resolved = new URL(value, 'https://rpv.invalid');
  return resolved.origin === 'https://rpv.invalid' ? resolved.pathname + resolved.search + resolved.hash : '/dashboard';
}
