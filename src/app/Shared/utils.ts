interface HeaderDict {
    token: string;
    contentType?: string;
  }
export const headerDict = (arg: HeaderDict = { token: '', contentType: 'application/json' }) => ({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    ...(arg.contentType && { 'Content-Type': arg.contentType }),
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Accept: 'application/json',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'Access-Control-Allow-Headers': 'Content-Type',
    Authorization: `Bearer ${arg.token}`
  });